# scstem.org

## Project Setup

1. Install NodeJS. Check `.nvmrc` for the version used by this project.
2. Run `npm install` in the project root to install the necessary dependencies.
3. If using VSCode, install the reccomended extensions.

## Development

1. Run `npm run dev` to start NextJS dev server.
2. Browse to `http://localhost:3000` to view the site.

### Adding a new page

> [!NOTE]  
> Learn more about NextJS App Router [here](https://nextjs.org/docs/app).

1. Go to `src/app` and create a new directory for the page.
   - For example, if you want to create a page at `scstem.org/hello-world`, you'd create a folder named `hello-world` in the `src/app` directory.
2. Add `page.tsx` to your new directory with the following code (suggested: Replace `PageName` with the name of your page):
   - Note: Anything returned from your page's default function is wrapped by `src/app/layout.tsx`. That file adds things like the navigation bar, footer, etc.

```ts

export const metadata: Metadata = {
  title: "My New Page",
  description:
    "This is my new page",
  // ... other metadata fields
};

export default function PageName(): JSX.Element {
  return <div>Hello World!</div>;
}
```
