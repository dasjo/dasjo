// scripts/instagram-to-airtable.js
require('dotenv').config({
    path: `.env.${process.env.NODE_ENV || 'development'}`,
  });
  
  const Airtable = require('airtable');
  const axios = require('axios');
  const fs = require('fs');
  const path = require('path');
  const FormData = require('form-data');
  
  // Configuration
  const AIRTABLE_BASE_ID = process.env.AIRTABLE_DASJOPIC_BASEID;
  const AIRTABLE_API_KEY = process.env.AIRTABLE_APIKEY;
  const INSTAGRAM_ACCESS_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN;
  const INSTAGRAM_USER_ID = process.env.INSTAGRAM_USER_ID;
  const TEMP_DIR = path.join(__dirname, '..', '.temp', 'instagram');
  
  // Initialize Airtable
  const base = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(AIRTABLE_BASE_ID);
  const photographyTable = base('Photography');
  
  // Ensure temp directory exists
  if (!fs.existsSync(TEMP_DIR)) {
    fs.mkdirSync(TEMP_DIR, { recursive: true });
  }
  
  /**
   * Fetch media from Instagram Graph API
   */
  async function fetchInstagramMedia() {
    const url = `https://graph.instagram.com/${INSTAGRAM_USER_ID}/media`;
    const params = {
      fields: 'id,caption,media_type,media_url,thumbnail_url,permalink,timestamp',
      access_token: INSTAGRAM_ACCESS_TOKEN,
      limit: 100, // Max per request
    };
  
    const allMedia = [];
    let nextUrl = null;
  
    do {
      try {
        const response = await axios.get(nextUrl || url, { params: nextUrl ? {} : params });
        const data = response.data;
  
        // Filter for images only (IMAGE type)
        const images = data.data.filter(item => item.media_type === 'IMAGE');
        allMedia.push(...images);
  
        // Check for pagination
        nextUrl = data.paging?.next || null;
        
        if (nextUrl) {
          // Extract access_token from next URL if present
          const urlObj = new URL(nextUrl);
          urlObj.searchParams.set('access_token', INSTAGRAM_ACCESS_TOKEN);
          nextUrl = urlObj.toString();
        }
  
        console.log(`Fetched ${images.length} images (total: ${allMedia.length})`);
      } catch (error) {
        console.error('Error fetching Instagram media:', error.response?.data || error.message);
        throw error;
      }
    } while (nextUrl);
  
    return allMedia;
  }
  
  /**
   * Download image from URL
   */
  async function downloadImage(url, filepath) {
    const response = await axios({
      url,
      method: 'GET',
      responseType: 'stream',
    });
  
    const writer = fs.createWriteStream(filepath);
    response.data.pipe(writer);
  
    return new Promise((resolve, reject) => {
      writer.on('finish', resolve);
      writer.on('error', reject);
    });
  }
  
  /**
   * Upload file to Airtable
   */
  async function uploadFileToAirtable(filepath, filename) {
    const fileStream = fs.createReadStream(filepath);
    const formData = new FormData();
    formData.append('file', fileStream, filename);
  
    try {
      const response = await axios.post(
        `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/Photography`,
        formData,
        {
          headers: {
            ...formData.getHeaders(),
            Authorization: `Bearer ${AIRTABLE_API_KEY}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      // Airtable file upload requires a different approach
      // We'll use the Airtable SDK's attachment upload method
      throw error;
    }
  }
  
  /**
   * Generate slug from title or caption
   */
  function generateSlug(text) {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .substring(0, 50); // Limit length
  }
  
  /**
   * Check if record already exists in Airtable
   */
  async function recordExists(slug) {
    try {
      const records = await photographyTable
        .select({
          filterByFormula: `{slug} = "${slug}"`,
          maxRecords: 1,
        })
        .firstPage();
      
      return records.length > 0;
    } catch (error) {
      console.error('Error checking existing record:', error);
      return false;
    }
  }
  
  /**
   * Create Airtable record with image attachment
   */
  async function createAirtableRecord(mediaItem) {
    const caption = mediaItem.caption || 'Instagram Photo';
    const slug = generateSlug(caption) || `instagram-${mediaItem.id}`;
    const timestamp = mediaItem.timestamp || new Date().toISOString();
    const date = timestamp.split('T')[0]; // Extract date part
  
    // Check if already exists
    if (await recordExists(slug)) {
      console.log(`Skipping ${slug} - already exists`);
      return null;
    }
  
    // Download image
    const filename = `${mediaItem.id}.jpg`;
    const filepath = path.join(TEMP_DIR, filename);
  
    try {
      console.log(`Downloading ${mediaItem.media_url}...`);
      await downloadImage(mediaItem.media_url, filepath);
  
      // Read file for Airtable upload
      const fileBuffer = fs.readFileSync(filepath);
      const fileBase64 = fileBuffer.toString('base64');
  
      // Create record with attachment
      // Note: Airtable SDK handles file uploads differently
      // We need to use the URL approach or base64 encoding
      const recordData = {
        fields: {
          title: caption.substring(0, 100) || 'Instagram Photo', // Limit title length
          date: date,
          slug: slug,
          link: mediaItem.permalink || '',
          attachments: [
            {
              url: mediaItem.media_url, // Airtable can fetch from URL
              filename: filename,
            },
          ],
        },
      };
  
      const record = await photographyTable.create(recordData.fields);
      console.log(`Created record: ${slug} (${record.id})`);
  
      // Clean up temp file
      fs.unlinkSync(filepath);
  
      return record;
    } catch (error) {
      console.error(`Error creating record for ${slug}:`, error.message);
      // Clean up temp file on error
      if (fs.existsSync(filepath)) {
        fs.unlinkSync(filepath);
      }
      throw error;
    }
  }
  
  /**
   * Main migration function
   */
  async function migrateInstagramToAirtable() {
    console.log('Starting Instagram to Airtable migration...');
    console.log(`Airtable Base: ${AIRTABLE_BASE_ID}`);
  
    // Validate environment variables
    if (!AIRTABLE_API_KEY) {
      throw new Error('AIRTABLE_APIKEY environment variable is required');
    }
    if (!INSTAGRAM_ACCESS_TOKEN) {
      throw new Error('INSTAGRAM_ACCESS_TOKEN environment variable is required');
    }
    if (!INSTAGRAM_USER_ID) {
      throw new Error('INSTAGRAM_USER_ID environment variable is required');
    }
  
    try {
      // Fetch all Instagram media
      console.log('Fetching Instagram media...');
      const mediaItems = await fetchInstagramMedia();
      console.log(`Found ${mediaItems.length} images to migrate`);
  
      // Process each image
      let successCount = 0;
      let errorCount = 0;
  
      for (let i = 0; i < mediaItems.length; i++) {
        const mediaItem = mediaItems[i];
        console.log(`\nProcessing ${i + 1}/${mediaItems.length}: ${mediaItem.id}`);
  
        try {
          await createAirtableRecord(mediaItem);
          successCount++;
          
          // Rate limiting: wait 1 second between requests
          if (i < mediaItems.length - 1) {
            await new Promise(resolve => setTimeout(resolve, 1000));
          }
        } catch (error) {
          console.error(`Failed to process ${mediaItem.id}:`, error.message);
          errorCount++;
        }
      }
  
      console.log('\n=== Migration Complete ===');
      console.log(`Success: ${successCount}`);
      console.log(`Errors: ${errorCount}`);
      console.log(`Total: ${mediaItems.length}`);
    } catch (error) {
      console.error('Migration failed:', error);
      process.exit(1);
    }
  }
  
  // Run migration if called directly
  if (require.main === module) {
    migrateInstagramToAirtable()
      .then(() => {
        console.log('Done!');
        process.exit(0);
      })
      .catch((error) => {
        console.error('Fatal error:', error);
        process.exit(1);
      });
  }
  
  module.exports = { migrateInstagramToAirtable };