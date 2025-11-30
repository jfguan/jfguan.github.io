# jfguan.github.io

Personal website built with React featuring habit tracking and personal projects.

## Local Development

```bash
npm install
npm start
```

## Deployment

This project uses GitHub Pages with React Router for client-side routing. The deployment process requires a special configuration:

1. Follow the [Create React App deployment guide](https://create-react-app.dev/docs/deployment/#github-pages)
2. After deploying to the `gh-pages` branch, create a `404.html` file that contains the same content as `index.html`

### Why the 404.html workaround?

GitHub Pages serves static files and doesn't know about React Router's routes. When users access a nested route (e.g., `/resolutions/account`), GitHub Pages looks for a physical file at that path. Since it doesn't exist, it returns a 404.

By placing an `index.html` copy at `404.html`, GitHub Pages redirects all 404 errors to this file. The HTML includes a script that parses the originally-requested URL from the referrer and passes it to React Router, allowing the app to load the correct component.

This is a standard workaround for SPAs (Single Page Applications) on static hosting.
