# UX Review: Josef Kruckenberg / dasjo Personal Website

**Date:** December 22, 2025  
**Reviewer:** Cloud Agent  
**Scope:** Top 10 Pages Analysis

---

## Executive Summary

This personal portfolio website showcases Josef Kruckenberg's work across technology, UX, and business. The site has a clean, professional foundation but suffers from **navigation inconsistencies**, **information hierarchy issues**, and **readability challenges**. This review identifies 15 key improvements across navigation, content structure, and visual design.

---

## Pages Reviewed

1. **Homepage** (`/`)
2. **Experience** (`/experience`)
3. **Photography** (`/photography`)
4. **Speaking** (`/speaking`)
5. **Contact** (`/contact`)
6. **Tags** (`/tags`)
7. **Writing** (`/writing`)
8. **Individual Post** (`/writing/[slug]`)
9. **Individual Talk** (`/speaking/[slug]`)
10. **Tag Archive** (`/[tag-name]`)

---

## Critical Issues

### 1. **Navigation Disconnect** 🚨 HIGH PRIORITY

**Problem:**
- **Header navigation** shows: Agile, Drupal, Community, Diversity & Inclusion (topic-based)
- **Footer navigation** shows: Experience, Writing, Speaking, Photography (content-based)
- **No visible link to "Writing"** page in the main navigation
- Users cannot easily discover the writing section without scrolling to footer

**Impact:** Users struggle to understand site structure and access key content.

**Recommendation:**
```
Option A (Recommended): Make footer navigation the primary nav
- Move: Experience, Writing, Speaking, Photography to header
- Keep topic tags as secondary navigation or convert to filters

Option B: Add "More" dropdown to header
- Add a dropdown with: Experience, Writing, Speaking, Photography, Tags
```

**Files to modify:**
- `src/components/Nav.tsx` (lines 243-270)
- `src/components/Footer.tsx` (lines 49-78)

---

### 2. **No Clear Visual Hierarchy on Homepage** 🚨 HIGH PRIORITY

**Problem:**
- Homepage jumps from bio directly to "What People Say" testimonials
- No clear call-to-action beyond "Get in touch"
- Visitors don't see recent work, writing, or key accomplishments
- No preview of portfolio content

**Impact:** Users leave without exploring the depth of content available.

**Recommendation:**
- Add a "Featured Work" section showcasing 2-3 recent projects
- Add "Latest Writing" section with 2-3 recent blog posts
- Add "Recent Talks" section with 2-3 speaking engagements
- Reorder: Bio → Featured Content → Testimonials → CTA

**Mockup Structure:**
```
1. Header (bio + photo)
2. Featured Work (2-3 cards)
3. Latest Writing (2-3 posts with images)
4. Recent Talks (2-3 talks)
5. What People Say (testimonials)
6. CTA (Get in touch)
```

---

### 3. **Missing Breadcrumb Navigation** 🔶 MEDIUM PRIORITY

**Problem:**
- Deep pages (post/talk/album) lack breadcrumbs
- Users can't easily navigate back to parent sections
- "Back" button is the only option (poor UX)

**Impact:** Users get lost in content and have difficulty returning to overview pages.

**Recommendation:**
Add breadcrumb component to all template pages:
- Writing post: `Home > Writing > Post Title`
- Talk: `Home > Speaking > Talk Title`
- Album: `Home > Photography > Album Title`
- Tag: `Home > Tags > Tag Name`

---

### 4. **Experience Page Information Overload** 🔶 MEDIUM PRIORITY

**Problem:**
- Work, Education, and Volunteering sections are all expanded by default
- Long page with dense information
- No filtering or search capability
- Difficult to scan quickly

**Current structure:** `/experience` shows:
```
Work (all entries expanded)
Education (all entries expanded)
Volunteering (all entries expanded)
```

**Recommendation:**
```
Option A: Add tabbed interface
[Work] [Education] [Volunteering]
(Show one section at a time)

Option B: Collapsible sections
▼ Work (8 entries) - Click to collapse
▼ Education (4 entries)
▼ Volunteering (6 entries)

Option C: Timeline view
2025 ─┬─ Current Position
      ├─ Recent Project
2024 ─┤
      └─ Previous Role
```

---

### 5. **Tags Page Lacks Context** 🔶 MEDIUM PRIORITY

**Problem:**
- `/tags` shows only tag names without descriptions
- No indication of how many items each tag contains
- No preview of what clicking a tag will show
- Poor information scent

**Current:**
```
Agile  |  Drupal  |  Community  |  Diversity & Inclusion
```

**Recommendation:**
```
Agile (23 items)
└─ 8 posts, 5 talks, 10 projects

Drupal (45 items)
└─ 15 posts, 12 talks, 18 projects

Community (32 items)
└─ 10 posts, 8 talks, 14 projects
```

Add tag counts and content type breakdown for better context.

---

## Readability Issues

### 6. **Inconsistent Font Sizing** 🔶 MEDIUM PRIORITY

**Problem:**
- Font sizes vary dramatically: 1.3rem to 6rem
- Body text at 1.9rem feels large
- Headings sometimes too large (h1 at 6rem)
- Responsive breakpoints cause dramatic size jumps

**Locations:**
- `src/styles/BaseStyles.tsx` (lines 22-29)

**Recommendation:**
Establish clearer typography scale:
```css
--font-size-xs: 1.4rem     /* 14px - captions */
--font-size-sm: 1.6rem     /* 16px - small text */
--font-size-base: 1.8rem   /* 18px - body text */
--font-size-lg: 2.2rem     /* 22px - large body */
--font-size-xl: 3rem       /* 30px - h3 */
--font-size-2xl: 3.6rem    /* 36px - h2 */
--font-size-3xl: 4.8rem    /* 48px - h1 */
--font-size-4xl: 6rem      /* 60px - display */
```

---

### 7. **Dense Text Blocks in Post Template** 🔶 MEDIUM PRIORITY

**Problem:**
- Posts render markdown without additional spacing
- Long paragraphs are visually exhausting
- No pull quotes or visual breaks
- Line length too wide in some viewports

**Location:**
- `src/templates/Post.tsx` (lines 43-49)

**Recommendation:**
- Add max-width to text content: `max-width: 65ch` (65 characters)
- Increase line-height from 1.5 to 1.7 for body text
- Add more spacing between paragraphs
- Style blockquotes distinctly
- Add visual breaks with horizontal rules

---

### 8. **Poor Color Contrast on Links** ⚠️ LOW PRIORITY

**Problem:**
- Link color `#28aaff` (blue-0) may have contrast issues
- Footer links in light blue `#7cd9ff` on dark background
- Need to verify WCAG AA compliance

**Location:**
- `src/styles/BaseStyles.tsx` (line 40)
- `src/components/Footer.tsx` (line 41)

**Recommendation:**
- Test all color combinations with contrast checker
- Ensure minimum 4.5:1 ratio for normal text
- Consider darker blue for body links
- Add underline by default for accessibility

---

## Navigation & Wayfinding

### 9. **No "Skip to Main Content" Link** ⚠️ ACCESSIBILITY

**Problem:**
- Keyboard users must tab through entire navigation
- No way to skip directly to main content
- Violates WCAG 2.4.1 Bypass Blocks

**Recommendation:**
Add skip link at top of every page:
```tsx
<a href="#main-content" className="skip-link">
  Skip to main content
</a>
```

Style to be visible on keyboard focus only.

---

### 10. **Mobile Menu Usability Issues** 🔶 MEDIUM PRIORITY

**Problem:**
- Burger menu covers full viewport when open
- No way to dismiss by clicking outside menu
- Menu items too spaced out (entire screen height)
- Escape key works but not intuitive

**Location:**
- `src/components/Nav.tsx` (lines 116-139)

**Recommendation:**
- Add overlay that closes menu when clicked
- Reduce vertical spacing of menu items
- Add visible "Close" button in addition to X icon
- Consider slide-in menu instead of full-screen

---

### 11. **Photography Grid Lacks Captions** ⚠️ LOW PRIORITY

**Problem:**
- Photo thumbnails on `/photography` show only images
- No context until clicked
- Difficult to decide which album to explore

**Location:**
- `src/components/photography/Photos.tsx`

**Recommendation:**
Add hover states or visible captions:
```
[Photo]
Album Title
Date | 12 photos
```

---

## Content Organization

### 12. **Writing Page Lacks Filtering** 🔶 MEDIUM PRIORITY

**Problem:**
- All blog posts shown chronologically
- No way to filter by topic/tag
- No search functionality
- Pagination helps but not enough

**Location:**
- `src/templates/Writing.tsx`

**Recommendation:**
Add filtering UI:
```
Filter by topic:
[All] [Agile] [Drupal] [Community] [D&I]

Sort by:
[Newest] [Oldest] [Popular]

12 posts found
```

---

### 13. **Speaking Page Lacks Grouping** ⚠️ LOW PRIORITY

**Problem:**
- All talks listed chronologically
- No grouping by event, year, or topic
- Difficult to see patterns or progression

**Location:**
- `src/pages/speaking.tsx`

**Recommendation:**
Group talks by year:
```
2025
├─ Talk at Conference A
└─ Workshop at Event B

2024
├─ Keynote at Summit C
└─ Panel at Forum D
```

---

### 14. **Tag Archive Pages Too Dense** 🔶 MEDIUM PRIORITY

**Problem:**
- Tag pages show ALL related content mixed together
- Work/Speaking/Writing/Photos all in same list
- Difficult to scan and find specific content type
- No filtering by content type

**Location:**
- `src/templates/Tag.tsx` (lines 275-318)

**Recommendation:**
Add tabbed interface or clear sections:
```
[Drupal Tag Page]

┌─────────────────────────────┐
│ [Work] [Writing] [Speaking] [Photos] │
└─────────────────────────────┘

Work (8 entries)
─────────────
• Project Manager @ Company A
• Developer @ Company B

[Show more work...]
```

---

### 15. **Contact Form Lacks Validation Feedback** ⚠️ LOW PRIORITY

**Problem:**
- Need to verify form validation provides clear error messages
- Success state redirects to `/success` page (consider inline confirmation)
- No character count or field guidance

**Location:**
- `src/components/contact/ContactForm.tsx`

**Recommendation:**
- Add inline validation with clear error messages
- Show character count for textarea fields
- Consider inline success message instead of redirect
- Add loading state during submission

---

## Quick Wins (Easy to Implement)

1. **Add breadcrumbs** to template pages (Post, Talk, Album)
2. **Increase paragraph spacing** in blog posts
3. **Add tag counts** on `/tags` page
4. **Group talks by year** on speaking page
5. **Add skip-to-content link** for accessibility
6. **Fix h3 "Files" heading** in Post template (lines 53-62) - shows even when no files present

---

## Priority Implementation Order

### Phase 1: Critical Navigation (Week 1)
- Fix navigation disconnect (Issue #1)
- Add breadcrumbs (Issue #3)
- Improve homepage hierarchy (Issue #2)

### Phase 2: Readability (Week 2)
- Fix typography scale (Issue #6)
- Improve text readability in posts (Issue #7)
- Add color contrast improvements (Issue #8)

### Phase 3: Content Organization (Week 3)
- Add filtering to Writing page (Issue #12)
- Improve Experience page structure (Issue #4)
- Add content type tabs to Tag pages (Issue #14)

### Phase 4: Polish (Week 4)
- Improve Tags page context (Issue #5)
- Mobile menu improvements (Issue #10)
- Remaining accessibility fixes (Issue #9, #15)

---

## Design System Recommendations

### Create Reusable Components

**ContentCard Component:**
```tsx
<ContentCard
  title="Post Title"
  date="2025-01-15"
  excerpt="Short description..."
  tags={['Agile', 'UX']}
  type="writing|speaking|photography"
  image={imageData}
/>
```

**SectionHeader Component:**
```tsx
<SectionHeader
  title="Latest Writing"
  subtitle="Recent thoughts and articles"
  action={<Link to="/writing">View all</Link>}
/>
```

**FilterBar Component:**
```tsx
<FilterBar
  options={['All', 'Work', 'Education', 'Volunteering']}
  active="All"
  onChange={handleFilter}
/>
```

---

## Accessibility Checklist

- [ ] All images have alt text
- [ ] Color contrast meets WCAG AA (4.5:1)
- [ ] Skip to main content link present
- [ ] Focus indicators visible and clear
- [ ] Keyboard navigation works throughout
- [ ] Form validation is screen reader friendly
- [ ] Semantic HTML used correctly
- [ ] ARIA labels where needed
- [ ] Text can be resized to 200% without breaking layout
- [ ] No content relies solely on color to convey meaning

---

## Performance Considerations

While not strictly UX, these impact user experience:

1. **Optimize images:** Ensure all photos use Gatsby Image optimization
2. **Lazy load:** Implement lazy loading for below-fold content
3. **Reduce font variations:** Limit to 2-3 font weights maximum
4. **Bundle size:** Check for unnecessary dependencies

---

## Conclusion

The site has a solid foundation but needs **navigation clarity** and **content hierarchy** improvements. The most impactful changes are:

1. **Unifying navigation** structure between header and footer
2. **Adding featured content** to homepage
3. **Implementing breadcrumbs** for better wayfinding
4. **Adding filters** to content listing pages
5. **Improving typography** and readability

These changes will transform the site from a simple portfolio to an engaging, user-friendly professional showcase.

---

## Next Steps

1. **Prioritize issues** based on business goals and user research
2. **Create prototypes** for navigation improvements
3. **A/B test** homepage variations if traffic allows
4. **User testing** with 5-7 target users to validate changes
5. **Implement changes** in priority order
6. **Measure impact** with analytics (bounce rate, time on site, pages per session)

---

**Questions or feedback?** Please contact [your contact info]
