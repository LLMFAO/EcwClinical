# Deployment Guide

## GitHub Setup

1. **Create a new repository on GitHub**
2. **Initialize and push your code:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Medical Interface Application"
   git branch -M main
   git remote add origin https://github.com/yourusername/medical-interface.git
   git push -u origin main
   ```

## Netlify Deployment Options

### Option 1: Direct GitHub Integration (Recommended)

1. **Connect to Netlify:**
   - Go to [netlify.com](https://netlify.com) and sign up/login
   - Click "New site from Git"
   - Choose "GitHub" and authorize Netlify
   - Select your repository

2. **Configure Build Settings:**
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node.js version: `20` (automatically detected from netlify.toml)

3. **Deploy:**
   - Click "Deploy site"
   - Your site will be available at a generated URL (e.g., `https://amazing-app-123456.netlify.app`)

### Option 2: Manual Deployment

1. **Build locally:**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify:**
   - Go to [netlify.com](https://netlify.com)
   - Drag and drop the `dist` folder to the deploy area

### Option 3: Netlify CLI

1. **Install Netlify CLI:**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login and deploy:**
   ```bash
   netlify login
   netlify deploy --prod --dir=dist
   ```

## Environment Variables

If your application requires environment variables:

1. **In Netlify Dashboard:**
   - Go to Site settings → Environment variables
   - Add your variables (e.g., API keys, database URLs)

2. **For GitHub Actions:**
   - Go to your GitHub repository
   - Settings → Secrets and variables → Actions
   - Add `NETLIFY_AUTH_TOKEN` and `NETLIFY_SITE_ID` secrets

## Custom Domain (Optional)

1. **In Netlify Dashboard:**
   - Go to Site settings → Domain management
   - Add custom domain
   - Follow DNS configuration instructions

## Continuous Deployment

The GitHub Actions workflow will automatically:
- Build your application on every push to main branch
- Deploy to Netlify using your configured tokens
- Run quality checks and tests

## Troubleshooting

### Build Failures
- Check Node.js version (should be 20)
- Verify all dependencies are in package.json
- Check build logs in Netlify dashboard

### Routing Issues
- The `netlify.toml` file handles SPA routing
- All routes redirect to `index.html` for client-side routing

### Static Assets
- Assets in `attached_assets/` are automatically included in the build
- Use proper import paths in your components

## Performance Optimization

The built application includes:
- Minified JavaScript and CSS
- Optimized images and assets
- Gzip compression (handled by Netlify)
- CDN distribution (handled by Netlify)

## Security

- Environment variables are securely handled by Netlify
- HTTPS is automatically enabled
- No sensitive data is exposed in the client bundle