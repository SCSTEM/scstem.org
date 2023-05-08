# scstem.org

Welcome to the public repo for our website and web-apps! There is a lot to unpack, so lets dive in!

## Development

This readme assumes _some_ familiarity with VSCode, NodeJS, and Git.

### Requirements

- VSCode
- Git (If you prefer a GUI, [GitKraken](https://www.gitkraken.com/) is great)
- NodeJS v18.16.0 or greater
  - If you use Node Version Manager (NVM) or Fast Node Manager (FNM), simply run `[nvm|fnm] use` to auto-select the appropriate NodeKJS version from `.nvmrc`
- Recommended extensions
  - VSCode will likely ask if you want to use these
  - Although optional, it does help to ensure a consistent dev experience

### Getting Started

1. Install dependencies: `npm install`
2. Start dev server: `npm run dev`
3. Start editing code
   - Your changes will be auto-applied and the site will update as you make changes
   - Sometimes manually refreshing the page can be helpful
   - If you are getting weird behavior, try restarting the dev server

### Deployment and Publishing

Our site is hosted by Cloudflare on their [Pages](https://pages.cloudflare.com/) platform, which is directly connected to our GitHub repo. The deployment structure is as follows:

- `main` branch: The primary codebase, deployed on push to `https://scstem.org`
- `staging` branch: The WIP staging codebase, deployed on push to `https://staging.scstem.org` (SC2 Google account required, not indexed/searchable)
- `*` branch: Any feature branch you are working on, deployed on push to `https://*.scstem-org.pages.dev` (SC2 Google account required, not indexed/searchable)

Note that we are only to run 100 deployments a month across all branches. A deployment is fired on a push/merge to any branch, so push in batches when possible.

## Project Structure

This project is fairly large and there are a lot of directories supporting our site. If you already feel comfortable with [Docusaurus](https://docusaurus.io/), feel free to skip ahead to [Development](#development).

### Page Content

These directories contain Markdown (`.md`) and/or React Typescript (`.tsx`) files that contain the content that actually makes up a page. Some of these sections require special formatting, while others allow for nearly complete creative freedom.

#### `./wiki`

This is a ["docs" page](https://docusaurus.io/docs/docs-introduction). This means it has an auto-generated sidebar based on the structure of the contents and is used to make easily readable guides or reference material. Docs pages are useful for conveying lots of information in a tight space and would be great for things like:

- A history of SC2 or a team
- Brand guidelines
- Non-profit forms and materials
- etc.

Note that docs pages support (and commonly require) additional metadata called frontmatter. You can read more [here](https://docusaurus.io/docs/markdown-features#front-matter), but simply following the example of other docs type pages should get you most of the way there.

#### `./src/pages`

Here you will find the flexibility mentioned above, where Markdown and React Typescript files can be used to create very simple or extremely custom pages. This type of content is probably the most complex, so it is best to just dive right in.

A general overview can be found [here](https://docusaurus.io/docs/creating-pages).

### Images

There are two ways to handle graphic assets: Optimized and unoptimized (static). In general, we should be moving to almost always using optimized assets. This improves load times (especially on mobile devices and slow connections) and handles special cases like lazy loading. In situations where a special type of image is needed or there are compatibility issues with the optimized approach, static assets can be used.

#### Optimized (IdealImage)

Image asset optimization is performed by [Docusaurus's IdealImage plugin](https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-ideal-image). Most of the configuration has already been handled, but there are a few "gotchas" when working with IdealImage.

1. Images _should_ be placed in the `./src/idealimage/` directory. This is not a hard requirement, but it does ensure the images are not unnecessarily included in the build output and keeps things organized.
2. TypeScript and IdealImage do not get along very well. To use and import an IdealImage component:

```tsx
// ...

import IdealImage from "@theme/IdealImage";

// ...

<IdealImage img={require(...)}/>

// ...
```

3. Unlike a regular `<img />` tag, IdealImage must use the `img={}` prop with a `require()` statement containing the path to the image source.
4. IdealImage does not support SVGs or GIFs, but will pass them through as unoptimized images (although this can sometimes result in styles being applied incorrectly).
5. On the note of styles, styling an IdealImage component does require some trial and error and behaves differently in dev mode vs. a the built site. See the SponsorCard component (and associated CSS) for some examples.

#### Static

Vector graphics, video files, and other special cases can be handled by placing them in the `./static/` directory, which is served from the site's root. If you need to serve a compressed image format (such as .jpg), compress + convert to a .webp file first using [Squoosh](https://squoosh.app/).

Typical Squoosh settings:

- Format: `webp`
- Effort: `6`
- Quality: `75`
- Adjust settings as-needed for specific use case

```html
<img src="/img/drill-bits.webp" />
```

More information on serving static assets can be found [here](https://docusaurus.io/docs/static-assets).

### Styles

The site's theme and styling are somewhat convoluted as they are handled in three different levels of priority or inheritance.

1. [Mantine](https://mantine.dev/): Mantine is the UI framework of choice for the site. It is configured in `./src/components/util/mantine.tsx` and is the source for most of the styles of the following two levels.
2. [Tailwind CSS](https://tailwindcss.com/): Tailwind is a CSS toolkit that essentially eliminates the need for writing `.css` files. Using their extensive array of classes, Tailwind auto-generates only the classes needed to handle the styling for the site.
3. [Docusaurus Infima](https://docusaurus.io/docs/styling-layout#global-styles): Docusaurus has a few preset CSS variables to handle things like theme colors, dark/light mode, and fonts. These variables are all set from Mantine's generated CSS and shouldn't really need touched.

Brand colors are defined in `./src/styles.ts`, which is imported by Mantine and Tailwind to expose `brand-*` colors to both frameworks' styles. Additionally, both frameworks have mechanisms for checking whether the site is in dark mode or light mode. For Mantine, this is simply a [color scheme hook](https://mantine.dev/hooks/use-color-scheme/) and a `dark:` prefix for Tailwind classes. This makes creating thematic components very simple:

```tsx
<div className="dark:text-yellow text-blue">I am yellow when dark, and blue when light.</div>

<Button ... color="yellow">I am a Mantine button</Button>
```

In certain situations, the abstraction of Mantine and Tailwind simply cannot handle low-level tweaks that are sometimes necessary. At this point, customizing the `./src/styles/globals.css` file, or adding your own custom CSS for a component is a completely legitimate solution.

### Supporting Code

When creating pages, it can be helpful to abstract some parts of commonly reused code. In our site, this abstraction comes in the form of Components and Layouts.

_Note that the `./src/layouts` and `./src/components` directories are not special and are purely for logical organization._

#### `./src/components`

Components can be as much or as little as you want them to be. In its most simple form, a component is an HTML element. In its most complex form, a component can be many elements along with JavaScript logic, custom styles, and more.

Because of this complexity, its very difficult to explain how to work with components. The best place to start might be a React tutorial or two, especially those that focus on Typescript and Functional components.

#### `./src/layouts`

A layout is really just a component, but intended to be used within a page to wrap elements or content. These shouldn't really need to be changed too often, but it is good to become familiar with the concept. You can see them in action on almost every `.tsx` page, so feel free to take a look!

#### `./functions`

Our site is hosted on Cloudflare using their platform. This offers us many benefits including extremely fast load-times, free hosting, and rapid development/preview. It also allows us to leverage their [Workers](https://workers.cloudflare.com/) serverless backend code, which gets auto-deployed from the `./functions` directory.

Feel free to poke around and read up on [Workers](https://developers.cloudflare.com/workers/) and [Pages Functions](https://developers.cloudflare.com/pages/platform/functions/), but like React Components, this is an area that is somewhat out of scope for this readme.
