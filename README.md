# scstem.org

Welcome to the public repo for our website and web-apps! There is a lot to unpack, so lets dive in!

## Project Setup

This project is fairly large and there are a lot of directories supporting our site. If you already feel comfortable with [Docusaurus](https://docusaurus.io/), feel free to skip ahead to [Development](#development)

### Page Content

These directories contain Markdown (`.md`) and/or React Typescript (`.tsx`) files that contain the content that actually makes up a page. Some of these sections require special formatting, while others allow for nearly complete creative freedom.

#### `./sponsors`, `./resources`, `./wiki`

These are ["docs" pages](https://docusaurus.io/docs/docs-introduction). This means they have an auto-generated sidebar based on the structure of the pages and are used to make easily readable guides or reference material. These sections are useful for conveying lots of information in a tight space and would be great for things like:

- A history of SC2 or a team
- "How to support us with AmazonSmile"
- Brand guidelines
- Non-profit forms and materials
- etc.

Note that docs pages support (and commonly require) additional metadata called frontmatter. You can read more [here](https://docusaurus.io/docs/markdown-features#front-matter), but simply following the example of other docs type pages should get you most of the way there.

#### `./blog`

This section may be removed before release, but it is what it sounds like... a blog area. Someday a blog could be great to catalog our activities and events since this type of content gets auto-organized and tagged.

You can find out more about blog pages [here](https://docusaurus.io/docs/blog).

#### `./src/pages`

Here you will find the flexibility mentioned above, where Markdown and React Typescript files can be used to create very simple or extremely custom pages. This type of content is probably the most complex, so it is best to just dive right in.

A general overview can be found [here](https://docusaurus.io/docs/creating-pages).

### Assets

Static assets like image or vector graphics can be placed in the `./static/[svg | img]` directories. These are simply uploaded directly to the webserver as-is and can be referenced in code like:

```html
<img src="/img/drill-bits.webp" />
```

More information can be found [here](https://docusaurus.io/docs/static-assets).

### Supporting Code

When creating pages, it can be helpful to abstract some parts of commonly reused code. In our site, this abstraction comes in the form of Components and Layouts.

_Note that the `./src/layouts` and `./src/components` directories are not special and are purely for logical organization._

#### `./src/components`

Components can be as much or as little as you want them to be. In its most simple form, a component is an HTML element. In its most complex form, a component can be many elements along with JavaScript logic, custom styles, and more.

Because of this complexity, its very difficult to explain how to work with components. The best place to start might be a React tutorial or two, especially those that focus on Typescript and Functional components.

#### `./src/layouts`

A layout is really just a component, but intended to be used within a page to wrap elements or content. These shouldn't really need to be changed too often, but it is good to become familiar with the concept. You can see them in action on almost every `.tsx` page, so feel free to take a look!

#### `./src/css`

In short, you should never need to touch this file unless it is to change some color/theme vars. Since this project makes use of [Tailwind CSS](https://tailwindcss.com/), all our styling is done inline, rather that writing our own classes and selectors. These inline styles are compiled at built time and auto-inserted into `custom.css`.

#### `./functions`

Our site is hosted on Cloudflare using their [Pages](https://pages.cloudflare.com/) platform. This offers us many benefits including extremely fast load-times, free hosting, and rapid development/preview. It also allows us to leverage their [Workers](https://workers.cloudflare.com/) serverless backend code, which gets auto-deployed from the `./functions` directory.

Feel free to poke around and read up on [Workers](https://developers.cloudflare.com/workers/) and [Pages Functions](https://developers.cloudflare.com/pages/platform/functions/), but like React Components, this is an area that is somewhat out of scope for this readme.

## Development

This readme assumes _some_ familiarity with VSCode, NodeJS, and Git.

### Requirements

- VSCode
- Git (If you prefer a GUI, [GitKraken](https://www.gitkraken.com/) is great)
- NodeJS v16.16.0 or greater
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
