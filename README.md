# jfguan.github.io

Personal website built with React featuring habit tracking and personal projects.

## Local Development

```bash
npm install
npm start
```

## Deployment

This project uses GitHub Pages with React Router for client-side routing. React apps require additional steps for deployment:

### Setup (one-time)

1. Add `homepage` to `package.json`:
   ```json
   {
     "homepage": "https://jfguan.github.io"
   }
   ```

2. Install gh-pages:
   ```bash
   npm install --save-dev gh-pages
   ```

3. Add deploy scripts to `package.json`:
   ```json
   {
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d build"
     }
   }
   ```

4. Configure GitHub Pages in repository Settings:
   - Set Source to `gh-pages` branch
   - Set Folder to `/ (root)`

### Deploy

```bash
npm run deploy
```

Then copy `build/index.html` to `build/404.html` and redeploy for React Router to work on nested routes.

**Why?** GitHub Pages serves static files and doesn't understand React Router. By placing `index.html` at `404.html`, GitHub Pages serves it for all 404 errors, allowing React to handle routing client-side.
