# Kaz Mielony Website Documentation

## Table of Contents

- [Project Overview](#project-overview)
- [Project Structure](#project-structure)
- [Content Management](#content-management)
- [Adding New Content](#adding-new-content)
- [Styling and Components](#styling-and-components)
- [Development Workflow](#development-workflow)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)

## Project Overview

The Kaz Mielony website is built with **Astro**, a modern static site generator optimized for content-heavy websites. It features:

- ⚡ Fast static generation
- 📱 Responsive design with Tailwind CSS
- 📝 Content management via Markdown
- 🎬 YouTube video integration
- 🔍 Type-safe content collections
- 🚀 Ready for deployment on Vercel/Netlify

## Project Structure

```
kaz-mielony/
├── astro.config.mjs          # Astro configuration
├── package.json              # Dependencies and scripts
├── tailwind.config.mjs       # Tailwind CSS configuration
├── README.md                 # Basic project info
├── DOCS.md                   # This documentation file
│
├── public/                   # Static assets (images, icons, etc.)
│   └── favicon.svg          # Website favicon
│
└── src/
    ├── env.d.ts             # TypeScript environment declarations
    │
    ├── components/          # Reusable UI components
    │   ├── FilterBar.tsx    # React component for filtering recipes
    │   ├── Layout.astro     # Main page layout wrapper
    │   ├── RecipeCard.astro # Recipe preview cards
    │   └── VideoEmbed.astro # YouTube video embedding
    │
    ├── content/             # Markdown content with type safety
    │   ├── config.ts        # Content collection schemas
    │   ├── episodes/        # YouTube episode content
    │   └── recipes/         # Recipe content
    │
    └── pages/               # File-based routing
        ├── index.astro      # Homepage
        ├── about.astro      # About page
        ├── episodes/        # Episode pages
        │   ├── index.astro  # All episodes listing
        │   └── [slug].astro # Individual episode pages
        └── recipes/         # Recipe pages
            ├── index.astro  # All recipes listing
            └── [slug].astro # Individual recipe pages
```

## Content Management

### Content Collections

The website uses Astro's Content Collections for type-safe content management. All content is defined in `src/content/config.ts`:

- **Recipes Collection**: Located in `src/content/recipes/`
- **Episodes Collection**: Located in `src/content/episodes/`

### Content Schema

#### Recipe Schema

```typescript
{
  title: string                    // Recipe title
  description: string              // Brief description
  historicalFigure: string         // Associated historical figure
  timePeriod: string              // Historical time period
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'dessert'
  difficulty: 'easy' | 'medium' | 'hard'
  cookTime: number                // Cooking time in minutes
  prepTime: number                // Preparation time in minutes
  servings: number                // Number of servings
  youtubeId?: string              // Optional YouTube video ID
  publishDate: Date               // Publication date
  tags: string[]                  // Recipe tags
  ingredients: string[]           // List of ingredients
  equipment?: string[]            // Optional equipment list
  image?: string                  // Optional recipe image
}
```

#### Episode Schema

```typescript
{
  title: string                   // Episode title
  episodeNumber: number           // Episode number
  historicalFigure: string        // Featured historical figure
  publishDate: Date              // Publication date
  youtubeId: string              // YouTube video ID (required)
  description: string            // Episode description
  relatedRecipes: string[]       // Array of related recipe slugs
  thumbnail?: string             // Optional custom thumbnail
}
```

## Adding New Content

### Adding a New Recipe

1. **Create the file**: Add a new `.md` file in `src/content/recipes/`

   ```bash
   touch src/content/recipes/your-recipe-name.md
   ```

2. **Add frontmatter**: Include all required fields at the top:

   ```markdown
   ---
   title: "Your Recipe Title"
   description: "Brief description of the recipe"
   historicalFigure: "Historical Figure Name"
   timePeriod: "Time Period (e.g., Ancient Rome)"
   mealType: "dinner"
   difficulty: "medium"
   cookTime: 45
   prepTime: 30
   servings: 6
   youtubeId: "your-youtube-id" # Optional
   publishDate: 2024-07-29
   tags: ["tag1", "tag2", "tag3"]
   ingredients:
     - "1 cup flour"
     - "2 eggs"
     - "1/2 cup milk"
   equipment:
     - "Large mixing bowl"
     - "Whisk"
   ---

   ## Historical Context

   Write about the historical background...

   ## Instructions

   ### Step 1

   Your cooking instructions...
   ```

3. **Write content**: Use Markdown for the recipe content. Common sections include:
   - Historical Context
   - Instructions (with subsections)
   - Chef's Notes
   - Historical Serving Suggestions

### Adding a New Episode

1. **Create the file**: Add a new `.md` file in `src/content/episodes/`

   ```bash
   touch src/content/episodes/episode-XX-figure-name.md
   ```

2. **Add frontmatter**:

   ```markdown
   ---
   title: "Episode X: Title"
   episodeNumber: X
   historicalFigure: "Figure Name"
   publishDate: 2024-07-29
   youtubeId: "your-youtube-video-id"
   description: "Episode description"
   relatedRecipes: ["recipe-slug-1", "recipe-slug-2"]
   ---

   ## Episode Content

   Write about the episode, behind-the-scenes content, etc.
   ```

3. **Link to recipes**: Use the exact slug names (filename without `.md`) in the `relatedRecipes` array.

### File Naming Conventions

- **Recipes**: Use kebab-case: `napoleon-honey-cakes.md`
- **Episodes**: Use format: `episode-01-napoleon.md`
- **Slugs**: Automatically generated from filename (without `.md`)

### Content Writing Tips

1. **Frontmatter dates**: Use YYYY-MM-DD format
2. **YouTube IDs**: Extract from URL (e.g., `https://youtube.com/watch?v=dQw4w9WgXcQ` → `dQw4w9WgXcQ`)
3. **Tags**: Use lowercase, descriptive keywords
4. **Ingredients**: Be specific with measurements
5. **Historical context**: Include interesting background information

## Styling and Components

### Tailwind CSS

The project uses Tailwind CSS for styling. Key design elements:

- **Primary color**: Amber (`amber-600`, `amber-700`)
- **Typography**: Clean, readable fonts
- **Layout**: Responsive grid system
- **Cards**: Rounded with subtle shadows

### Component Usage

#### VideoEmbed Component

```astro
---
import VideoEmbed from '../components/VideoEmbed.astro';
---

<VideoEmbed videoId="your-youtube-id" title="Video Title" />
```

#### RecipeCard Component

```astro
---
import RecipeCard from '../components/RecipeCard.astro';
---

<RecipeCard recipe={recipeObject} />
```

### Adding Images

1. **Place images** in the `public/` directory:

   ```
   public/
   ├── images/
   │   ├── recipes/
   │   │   ├── napoleon-honey-cakes.jpg
   │   │   └── henry-viii-roast.jpg
   │   └── episodes/
   │       └── episode-01-thumb.jpg
   ```

2. **Reference in frontmatter**:

   ```yaml
   image: "/images/recipes/napoleon-honey-cakes.jpg"
   ```

3. **Use in content**:
   ```markdown
   ![Recipe Image](/images/recipes/napoleon-honey-cakes.jpg)
   ```

## Development Workflow

### Starting Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Visit http://localhost:4321
```

### Building for Production

```bash
# Build static site
npm run build

# Preview production build
npm run preview
```

### Common Tasks

1. **Add content**: Create new `.md` files in content collections
2. **Preview changes**: Development server auto-reloads
3. **Check types**: TypeScript will validate content schema
4. **Test build**: Run `npm run build` before deploying

## Deployment

### Vercel (Recommended)

1. **Connect repository** to Vercel
2. **Configure build settings**:
   - Build Command: `npm run build`
   - Output Directory: `dist`
3. **Deploy**: Automatic on git push

### Netlify

1. **Connect repository** to Netlify
2. **Configure build settings**:
   - Build Command: `npm run build`
   - Publish Directory: `dist`
3. **Deploy**: Automatic on git push

### Environment Variables

If needed, add environment variables in your deployment platform:

- `YOUTUBE_API_KEY`: For enhanced YouTube integration
- `SITE_URL`: Your production URL

## Troubleshooting

### Common Issues

#### "Cannot find module 'astro:content'"

- **Solution**: Restart the development server after adding content
- **Command**: `npm run dev`

#### Content not appearing

- **Check**: Frontmatter syntax is correct
- **Check**: File is in correct directory (`src/content/recipes/` or `src/content/episodes/`)
- **Check**: Required fields are present

#### Build errors

- **Check**: All frontmatter dates are valid
- **Check**: All required fields are present
- **Check**: Referenced recipe slugs exist in `relatedRecipes`

#### YouTube videos not loading

- **Check**: YouTube ID is correct (11 characters)
- **Check**: Video is public or unlisted (not private)

### TypeScript Errors

The project uses strict TypeScript checking. Common fixes:

1. **Missing required fields**: Add all required frontmatter fields
2. **Wrong data types**: Ensure numbers are numbers, dates are dates
3. **Invalid enum values**: Check `mealType` and `difficulty` values

### Getting Help

1. **Check logs**: Development server shows detailed error messages
2. **Validate content**: TypeScript will catch schema violations
3. **Test locally**: Always test with `npm run build` before deploying

## Advanced Features

### Custom Components

Create new components in `src/components/`:

```astro
---
// src/components/CustomComponent.astro
export interface Props {
  title: string;
}

const { title } = Astro.props;
---

<div class="custom-component">
  <h2>{title}</h2>
  <slot />
</div>
```

### Adding New Collections

1. **Define schema** in `src/content/config.ts`
2. **Create directory** in `src/content/`
3. **Add pages** in `src/pages/`

### SEO Optimization

- **Meta descriptions**: Defined in Layout component
- **Structured data**: Can be added to recipe pages
- **Sitemap**: Automatically generated by Astro

This documentation covers the essential aspects of managing your Kaz Mielony website. For more advanced customization, refer to the [Astro documentation](https://docs.astro.build/).
