# Implementation Guide: Top Priority UX Improvements

This guide provides specific code changes for the highest-priority UX issues identified in the review.

---

## Issue #1: Navigation Disconnect - CRITICAL

### Current State
- Header: Agile, Drupal, Community, Diversity & Inclusion (topic tags)
- Footer: Experience, Writing, Speaking, Photography (content sections)
- Writing section not accessible from header

### Proposed Solution: Unified Navigation

Replace header navigation with content-based structure and move topics to a filter/tag system.

### Code Changes

#### File: `src/components/Nav.tsx`

**Replace lines 241-270 with:**

```tsx
<ul className={isShown ? "shown" : "hidden"}>
  <li>
    <Link className="link" activeClassName="link--active" to="/experience">
      Experience
    </Link>
  </li>
  <li>
    <Link className="link" activeClassName="link--active" to="/writing">
      Writing
    </Link>
  </li>
  <li>
    <Link className="link" activeClassName="link--active" to="/speaking">
      Speaking
    </Link>
  </li>
  <li>
    <Link className="link" activeClassName="link--active" to="/photography">
      Photography
    </Link>
  </li>
  <li>
    <Link className="link" activeClassName="link--active" to="/contact">
      Contact
    </Link>
  </li>
</ul>
```

#### File: `src/components/Footer.tsx`

**Replace lines 49-78 with:**

```tsx
<ul className="links">
  <li>
    <Link className="link" activeClassName="link--active" to="/agile">
      Agile
    </Link>
  </li>
  <li>
    <Link className="link" activeClassName="link--active" to="/drupal">
      Drupal
    </Link>
  </li>
  <li>
    <Link className="link" activeClassName="link--active" to="/community">
      Community
    </Link>
  </li>
  <li>
    <Link className="link" activeClassName="link--active" to="/diversity-&-inclusion">
      Diversity & Inclusion
    </Link>
  </li>
  <li>
    <Link className="link" activeClassName="link--active" to="/tags">
      All Topics
    </Link>
  </li>
</ul>
```

---

## Issue #2: Homepage Visual Hierarchy - CRITICAL

### Current State
Homepage only shows bio + testimonials, no content preview.

### Proposed Solution
Add featured content sections before testimonials.

### New Components Needed

#### File: `src/components/index/FeaturedWork.tsx` (NEW)

```tsx
import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'gatsby';
import { breakpoints } from '../../styles/variables';

const StyledFeaturedWork = styled.section`
  background: var(--white-0);
  border-top: var(--border-light-1);

  .container {
    max-width: var(--grid-max-width);
    margin: 0 auto;
  }

  h2 {
    text-align: center;
    margin-bottom: var(--gutter-large);
  }

  .cards {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--gutter-medium);
    margin-bottom: var(--gutter-medium);

    @media (max-width: ${breakpoints.large}) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: ${breakpoints.small}) {
      grid-template-columns: 1fr;
    }
  }

  .card {
    background: var(--white);
    padding: var(--gutter-small);
    border: var(--border-light-1);
    box-shadow: var(--shadow-light);
    transition: transform 0.2s, box-shadow 0.2s;

    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 0.8rem 1.6rem rgba(0, 0, 0, 0.1);
    }
  }

  .card-type {
    text-transform: uppercase;
    font-size: var(--font-size-small-0);
    color: var(--blue-0);
    font-weight: 600;
    margin-bottom: var(--gutter-small-3);
  }

  .card-title {
    font-size: var(--font-size-normal-1);
    font-weight: 600;
    margin-bottom: var(--gutter-small-3);
    line-height: 1.3;
  }

  .card-excerpt {
    font-size: var(--font-size-small);
    color: var(--black-0);
    margin-bottom: var(--gutter-small-2);
  }

  .card-date {
    font-size: var(--font-size-small-0);
    color: #666;
  }

  .view-all {
    text-align: center;
  }
`;

export interface FeaturedItem {
  type: 'writing' | 'speaking' | 'work';
  title: string;
  excerpt?: string;
  date: string;
  slug?: string;
  link?: string;
}

interface FeaturedWorkProps {
  items: FeaturedItem[];
}

const FeaturedWork: React.FC<FeaturedWorkProps> = ({ items }) => {
  const getItemLink = (item: FeaturedItem) => {
    if (item.type === 'writing') return `/writing/${item.slug}`;
    if (item.type === 'speaking') return `/speaking/${item.slug}`;
    return item.link || '/experience';
  };

  const getTypeLabel = (type: string) => {
    if (type === 'writing') return 'Recent Article';
    if (type === 'speaking') return 'Recent Talk';
    return 'Recent Work';
  };

  return (
    <StyledFeaturedWork>
      <div className="row">
        <div className="container">
          <h2>Featured Work</h2>
          <div className="cards">
            {items.map((item, index) => (
              <Link to={getItemLink(item)} key={index} className="card">
                <div className="card-type">{getTypeLabel(item.type)}</div>
                <h3 className="card-title">{item.title}</h3>
                {item.excerpt && <p className="card-excerpt">{item.excerpt}</p>}
                <p className="card-date">
                  {new Date(item.date).toLocaleDateString('en-GB', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </Link>
            ))}
          </div>
          <div className="view-all">
            <Link to="/experience" className="btn--text">
              View all work <span>&nbsp;&rarr;</span>
            </Link>
          </div>
        </div>
      </div>
    </StyledFeaturedWork>
  );
};

export default FeaturedWork;
```

#### File: `src/pages/index.tsx`

**Update to include featured content:**

```tsx
import React from 'react';

import Header from '../components/index/Header';
import IndexLayout from '../layouts';
import { SayingProps } from '../components/index/Saying';
import WhatPeopleSay from '../components/index/WhatPeopleSay';
import FeaturedWork, { FeaturedItem } from '../components/index/FeaturedWork';
import { graphql } from 'gatsby';
import { filterByFeatured } from '../utils/helpers';

export const IndexPageQuery = graphql`{
  allAirtable(
    filter: {table: {eq: "Quotes"}}
    sort: {fields: [data___id], order: DESC}
  ) {
    nodes {
      data {
        quote
        featured
        person {
          data {
            title
          }
        }
        organisation {
          data {
            title
          }
        }
        tags {
          data {
            name
          }
        }
      }
    }
  }
  recentWriting: allAirtable(
    filter: {table: {eq: "Writing"}}
    sort: {fields: [data___date], order: DESC}
    limit: 2
  ) {
    nodes {
      data {
        title
        slug
        date
        text_en {
          childMarkdownRemark {
            excerpt(pruneLength: 150)
          }
        }
      }
    }
  }
  recentSpeaking: allAirtable(
    filter: {table: {eq: "Speaking"}}
    sort: {fields: [data___date], order: DESC}
    limit: 1
  ) {
    nodes {
      data {
        title
        slug
        date
        notes {
          childMarkdownRemark {
            excerpt(pruneLength: 150)
          }
        }
      }
    }
  }
  file(relativePath: {eq: "josef.jpg"}) {
    childImageSharp {
      gatsbyImageData(
        width: 500
        height: 500
        placeholder: BLURRED
        layout: CONSTRAINED
      )
    }
  }
}
`;

const IndexPage = ({ data }: any) => {
  const sayings: SayingProps[] = filterByFeatured(
    data.allAirtable.nodes.map((saying: any) => ({
      quote: saying.data.quote,
      person: saying.data.person[0].data.title,
      organisation: (saying.data.organisation
        ? saying.data.organisation.map((o: any) => o.data.title)
        : [])[0],
      tags: saying.data.tags
        ? saying.data.tags.map((t: any) => t.data.name)
        : null,
      featured: saying.data.featured,
    }))
  );

  // Build featured items array
  const featuredItems: FeaturedItem[] = [];

  // Add recent writing
  data.recentWriting.nodes.forEach((node: any) => {
    featuredItems.push({
      type: 'writing',
      title: node.data.title,
      slug: node.data.slug,
      date: node.data.date,
      excerpt: node.data.text_en?.childMarkdownRemark?.excerpt,
    });
  });

  // Add recent speaking
  data.recentSpeaking.nodes.forEach((node: any) => {
    featuredItems.push({
      type: 'speaking',
      title: node.data.title,
      slug: node.data.slug,
      date: node.data.date,
      excerpt: node.data.notes?.childMarkdownRemark?.excerpt,
    });
  });

  const josefImg = data.file.childImageSharp.gatsbyImageData;

  return (
    <IndexLayout>
      <>
        <Header josefImg={josefImg} />
        {featuredItems.length > 0 && <FeaturedWork items={featuredItems} />}
        <WhatPeopleSay
          sayings={sayings}
          styles={{
            background: 'var(--white-0)',
            borderTop: 'var(--border-light-1)',
          }}
          rowClass="true"
        />
      </>
    </IndexLayout>
  );
};

export default IndexPage;
```

---

## Issue #3: Breadcrumb Navigation - HIGH PRIORITY

### Create Breadcrumb Component

#### File: `src/components/Breadcrumbs.tsx` (NEW)

```tsx
import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'gatsby';

const StyledBreadcrumbs = styled.nav`
  font-size: var(--font-size-small);
  padding: var(--gutter-small) 0;
  color: #666;

  ol {
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding: 0;
    margin: 0;
  }

  li {
    display: flex;
    align-items: center;

    &:not(:last-child)::after {
      content: '›';
      margin: 0 0.8rem;
      color: #999;
      font-size: 1.6rem;
    }
  }

  a {
    color: var(--blue-0);
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  .current {
    color: var(--black-0);
    font-weight: 500;
  }
`;

export interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <StyledBreadcrumbs aria-label="Breadcrumb">
      <ol>
        <li>
          <Link to="/">Home</Link>
        </li>
        {items.map((item, index) => (
          <li key={index}>
            {item.path ? (
              <Link to={item.path}>{item.label}</Link>
            ) : (
              <span className="current">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </StyledBreadcrumbs>
  );
};

export default Breadcrumbs;
```

#### Update Post Template: `src/templates/Post.tsx`

**Add breadcrumbs after line 29:**

```tsx
import Breadcrumbs from "../components/Breadcrumbs";

// ... inside the component

return (
  <IndexLayout pageTitle={title} node={writing}>
    <div className="row">
      <div className="container--small template">
        <Breadcrumbs 
          items={[
            { label: 'Writing', path: '/writing' },
            { label: title }
          ]}
        />
        <p>
          {new Date(date).toLocaleDateString("en-GB", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        {/* ... rest of the template */}
```

#### Update Talk Template: `src/templates/Talk.tsx`

**Add breadcrumbs after line 54:**

```tsx
import Breadcrumbs from "../components/Breadcrumbs";

// ... inside the component

return (
  <IndexLayout pageTitle={title} node={speaking}>
    <div className="template">
      <div className="row">
        <div className="container--small">
          <Breadcrumbs 
            items={[
              { label: 'Speaking', path: '/speaking' },
              { label: title }
            ]}
          />
          {/* ... rest of the template */}
```

#### Update Album Template: `src/templates/Album.tsx`

**Add breadcrumbs after line 80:**

```tsx
import Breadcrumbs from "../components/Breadcrumbs";

// ... inside the component

return (
  <IndexLayout pageTitle={album.data.title}>
    <div className="row">
      <StyledAlbumTemplate className="template">
        <Breadcrumbs 
          items={[
            { label: 'Photography', path: '/photography' },
            { label: album.data.title }
          ]}
        />
        {/* ... rest of the template */}
```

---

## Issue #6: Typography Scale - MEDIUM PRIORITY

### Improved Font Size System

#### File: `src/styles/BaseStyles.tsx`

**Replace lines 21-29 with:**

```tsx
:root {
  /* Typography Scale - Modular Scale (1.250 - Major Third) */
  --font-size-xs: 1.3rem;      /* 13px - captions, meta info */
  --font-size-sm: 1.5rem;      /* 15px - small text */
  --font-size-base: 1.8rem;    /* 18px - body text (was 1.9) */
  --font-size-lg: 2rem;        /* 20px - large body text */
  --font-size-xl: 2.5rem;      /* 25px - h4 */
  --font-size-2xl: 3.2rem;     /* 32px - h3 */
  --font-size-3xl: 4rem;       /* 40px - h2 */
  --font-size-4xl: 5rem;       /* 50px - h1 */
  --font-size-5xl: 6rem;       /* 60px - hero/display (rare) */

  /* Line heights for readability */
  --line-height-tight: 1.25;   /* Headings */
  --line-height-base: 1.6;     /* Body text (was 1.5) */
  --line-height-relaxed: 1.8;  /* Long-form content */

  --font-stack-sub: 'HK Grotesk', sans-serif;
```

**Update body text line-height (around line 78):**

```css
body {
  font-size: var(--font-size-base);
  font-family: var(--font-stack-sub);
  font-weight: 400;
  line-height: var(--line-height-base); /* Changed from 1.5 to 1.6 */
  color: var(--black-0);
  background: var(--white);
}
```

**Update heading sizes (lines 282-304):**

```css
h1 {
  font-size: var(--font-size-4xl); /* Was font-size-large (6rem) */
  line-height: var(--line-height-tight);

  @media (max-width: ${breakpoints.large}) {
    font-size: var(--font-size-3xl);
  }

  @media (max-width: ${breakpoints.medium0}) {
    font-size: var(--font-size-2xl);
  }
}

h2 {
  font-size: var(--font-size-3xl);
  line-height: var(--line-height-tight);
  margin-bottom: var(--gutter-medium);

  @media (max-width: ${breakpoints.large}) {
    font-size: var(--font-size-2xl);
  }

  @media (max-width: ${breakpoints.medium0}) {
    font-size: var(--font-size-xl);
  }
  
  /* ... rest of h2 styles */
}

h3 {
  font-size: var(--font-size-2xl);
  line-height: var(--line-height-tight);
  margin: var(--gutter-small) 0 var(--gutter-small-3);

  @media (max-width: ${breakpoints.medium0}) {
    font-size: var(--font-size-xl);
  }
}
```

---

## Issue #7: Blog Post Readability - MEDIUM PRIORITY

### Improve Post Content Styling

#### File: `src/templates/Post.tsx`

**Add styled component for better content formatting:**

```tsx
import styled from '@emotion/styled';

const PostContent = styled.div`
  /* Optimal line length for readability */
  max-width: 65ch;
  
  /* Increase line height for long-form content */
  line-height: var(--line-height-relaxed);
  
  /* Better paragraph spacing */
  p {
    margin-bottom: var(--gutter-small);
    
    &:last-child {
      margin-bottom: 0;
    }
  }
  
  /* Style for blockquotes */
  blockquote {
    margin: var(--gutter-medium) 0;
    padding: var(--gutter-small) var(--gutter-medium);
    border-left: 4px solid var(--blue-0);
    background: var(--light-blue);
    font-style: italic;
    font-size: var(--font-size-lg);
    
    p {
      margin-bottom: var(--gutter-small-2);
    }
  }
  
  /* Styled lists */
  ul, ol {
    margin: var(--gutter-small) 0;
    padding-left: var(--gutter-medium);
    
    li {
      margin-bottom: var(--gutter-small-3);
      line-height: var(--line-height-relaxed);
    }
  }
  
  /* Code blocks */
  pre {
    background: var(--off-white);
    padding: var(--gutter-small);
    border-radius: 4px;
    overflow-x: auto;
    margin: var(--gutter-small) 0;
  }
  
  code {
    font-family: 'Courier New', monospace;
    font-size: 0.9em;
  }
  
  /* Inline code */
  p code {
    background: var(--off-white);
    padding: 0.2em 0.4em;
    border-radius: 3px;
  }
  
  /* Horizontal rules for section breaks */
  hr {
    margin: var(--gutter-large) 0;
    border: none;
    border-top: 2px solid var(--off-white);
  }
  
  /* Better image spacing */
  img {
    margin: var(--gutter-medium) 0;
    border-radius: 4px;
  }
`;

// Then wrap the content in this component:
return (
  <IndexLayout pageTitle={title} node={writing}>
    <div className="row">
      <div className="container--small template">
        <Breadcrumbs 
          items={[
            { label: 'Writing', path: '/writing' },
            { label: title }
          ]}
        />
        <p>
          {new Date(date).toLocaleDateString("en-GB", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <h1>{title}</h1>
        <CompanyAndTags organisation={organisation} tags={tags} />
        {text_en ? (
          <PostContent
            dangerouslySetInnerHTML={{
              __html: text_en.childMarkdownRemark.html,
            }}
          />
        ) : null}
        {/* ... rest of template */}
```

---

## Issue #9: Skip to Main Content - ACCESSIBILITY

### Add Skip Link

#### File: `src/components/LayoutRoot.tsx`

**Add skip link at the very top of the page:**

```tsx
import styled from '@emotion/styled';

const SkipLink = styled.a`
  position: absolute;
  top: -40px;
  left: 0;
  background: var(--blue-0);
  color: var(--white);
  padding: 0.8rem 1.6rem;
  text-decoration: none;
  z-index: 100;
  
  &:focus {
    top: 0;
  }
`;

// In the component:
return (
  <>
    <SkipLink href="#main-content">
      Skip to main content
    </SkipLink>
    {/* ... rest of layout */}
  </>
);
```

#### Update layout to include main content ID:

**File: `src/components/LayoutMain.tsx` or wherever main content starts:**

```tsx
<main id="main-content" role="main">
  {children}
</main>
```

---

## Issue #12: Writing Page Filtering - MEDIUM PRIORITY

### Add Filter Component

#### File: `src/components/FilterBar.tsx` (NEW)

```tsx
import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'gatsby';
import { breakpoints } from '../styles/variables';

const StyledFilterBar = styled.div`
  margin-bottom: var(--gutter-medium);
  padding: var(--gutter-small) 0;
  border-bottom: var(--border-light-1);

  .label {
    font-weight: 600;
    margin-bottom: var(--gutter-small-2);
    font-size: var(--font-size-small);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #666;
  }

  .filters {
    display: flex;
    flex-wrap: wrap;
    gap: var(--gutter-small-2);

    @media (max-width: ${breakpoints.small}) {
      flex-direction: column;
    }
  }

  .filter-btn {
    padding: 0.6rem 1.6rem;
    border: 1px solid var(--off-white);
    border-radius: 2rem;
    background: var(--white);
    font-size: var(--font-size-small);
    transition: all 0.2s;
    color: var(--black-0);
    text-decoration: none;
    display: inline-block;

    &:hover {
      border-color: var(--blue-0);
      color: var(--blue-0);
      text-decoration: none;
    }

    &.active {
      background: var(--blue-0);
      color: var(--white);
      border-color: var(--blue-0);
    }
  }

  .count {
    margin-top: var(--gutter-small-2);
    font-size: var(--font-size-small);
    color: #666;
  }
`;

interface FilterOption {
  label: string;
  value: string;
  count?: number;
}

interface FilterBarProps {
  label: string;
  options: FilterOption[];
  activeFilter: string;
  onFilterChange?: (value: string) => void;
  resultCount?: number;
}

const FilterBar: React.FC<FilterBarProps> = ({
  label,
  options,
  activeFilter,
  onFilterChange,
  resultCount,
}) => {
  return (
    <StyledFilterBar>
      <div className="label">{label}</div>
      <div className="filters">
        {options.map((option) => (
          <button
            key={option.value}
            className={`filter-btn ${activeFilter === option.value ? 'active' : ''}`}
            onClick={() => onFilterChange && onFilterChange(option.value)}
          >
            {option.label}
            {option.count !== undefined && ` (${option.count})`}
          </button>
        ))}
      </div>
      {resultCount !== undefined && (
        <div className="count">
          {resultCount} {resultCount === 1 ? 'post' : 'posts'} found
        </div>
      )}
    </StyledFilterBar>
  );
};

export default FilterBar;
```

#### Update Writing Template: `src/templates/Writing.tsx`

```tsx
import React, { useState, useMemo } from "react";
import { graphql } from "gatsby";
import IndexLayout from "../layouts";
import PostBanner, { PostBannerProps } from "../components/writing/PostBanner";
import Pager from "../components/pager";
import FilterBar from "../components/FilterBar";

// ... existing query ...

const WritingPage = ({ data, pageContext }: any) => {
  const [activeTag, setActiveTag] = useState<string>('all');

  const allWritings = data.allAirtable.nodes.map((w: any) => ({
    title: w.data.title,
    slug: w.data.slug,
    featured: w.data.featured,
    date: w.data.date,
    excerpt: w.data.text_en ? w.data.text_en.childMarkdownRemark.excerpt : null,
    organisation: (w.data.organisation
      ? w.data.organisation.map((o: any) => o.data.title)
      : [])[0],
    teaser:
      w.data.attachments &&
      w.data.attachments.localFiles &&
      w.data.attachments.localFiles.map((a: any) => {
        return a.childImageSharp.gatsbyImageData;
      })[0],
    tags: w.data.tags ? w.data.tags.map((t: any) => t.data.name) : [],
  }));

  // Get unique tags and their counts
  const tagCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    allWritings.forEach((w: any) => {
      w.tags?.forEach((tag: string) => {
        counts[tag] = (counts[tag] || 0) + 1;
      });
    });
    return counts;
  }, [allWritings]);

  // Filter writings by selected tag
  const filteredWritings = useMemo(() => {
    if (activeTag === 'all') return allWritings;
    return allWritings.filter((w: any) => 
      w.tags?.includes(activeTag)
    );
  }, [activeTag, allWritings]);

  // Build filter options
  const filterOptions = [
    { label: 'All Topics', value: 'all', count: allWritings.length },
    ...Object.entries(tagCounts).map(([tag, count]) => ({
      label: tag,
      value: tag,
      count: count as number,
    })),
  ];

  return (
    <IndexLayout pageTitle="Writing">
      <div className="row">
        <section>
          <h1>Writing</h1>
          <div className="container--small">
            <FilterBar
              label="Filter by topic"
              options={filterOptions}
              activeFilter={activeTag}
              onFilterChange={setActiveTag}
              resultCount={filteredWritings.length}
            />
            <div className="writings">
              {filteredWritings.map((w: PostBannerProps, i: any) => (
                <PostBanner key={i + w.title} {...w} />
              ))}
              {!pageContext.isFiltered && <Pager pageContext={pageContext} />}
            </div>
          </div>
        </section>
      </div>
    </IndexLayout>
  );
};

export default WritingPage;
```

---

## Testing Checklist

After implementing these changes, test:

- [ ] All navigation links work correctly
- [ ] Breadcrumbs appear and function on all detail pages
- [ ] Featured content shows on homepage
- [ ] Typography is readable on all screen sizes
- [ ] Filter works on writing page
- [ ] Skip link appears on keyboard focus
- [ ] Mobile menu still functions correctly
- [ ] All pages pass WCAG AA contrast requirements
- [ ] Site builds without errors: `gatsby build`
- [ ] No console errors in browser

---

## Performance Notes

These changes should have minimal performance impact:
- New components are lightweight
- No additional API calls required (using existing GraphQL queries)
- CSS-in-JS styles are already in use, no new bundle size concerns

Monitor bundle size after adding new components:
```bash
gatsby build
npm run analyze # if you have bundle analyzer
```

---

## Next Steps

1. Implement changes in order of priority
2. Test thoroughly on multiple devices/browsers
3. Get user feedback on navigation changes
4. Monitor analytics for improved engagement metrics
5. Iterate based on real user behavior

