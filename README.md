# Kaz Mielony Website

A website for the YouTube channel "Kaz Mielony" where I cook meals inspired by iconic and controversial historical figures.

## Features

- Recipe collection with detailed instructions and historical context
- Episode listings with embedded YouTube videos
- Content organized by historical figure, time period, and meal type
- Fast, static-generated site built with Astro
- Responsive design optimized for recipe viewing

## Tech Stack

- **Framework**: Astro
- **Styling**: Tailwind CSS
- **Content**: Markdown with frontmatter
- **Deployment**: Ready for Vercel/Netlify

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Content Structure

### Recipes

Located in `src/content/recipes/`, each recipe includes:

- Historical context and background
- Complete ingredient lists
- Step-by-step instructions
- Chef's notes and historical accuracy details
- Optional YouTube video embedding

### Episodes

Located in `src/content/episodes/`, each episode includes:

- YouTube video embedding
- Behind-the-scenes content
- Links to related recipes
- Historical discussion and context

## Adding New Content

### New Recipe

1. Create a new `.md` file in `src/content/recipes/`
2. Use the frontmatter schema defined in `src/content/config.ts`
3. Write the content in Markdown format

### New Episode

1. Create a new `.md` file in `src/content/episodes/`
2. Include the YouTube video ID
3. Reference related recipes by their slug names

## License

All content is original and created for the Kaz Mielony YouTube channel.
