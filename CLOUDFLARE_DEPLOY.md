# Deploy to Cloudflare Pages

## Method 1: Deploy via Dashboard (Easiest - No CLI needed)

### Step 1: Go to Cloudflare Pages Dashboard
1. Visit: https://dash.cloudflare.com/
2. Sign in or create a free account
3. Click "Workers & Pages" in the left sidebar
4. Click "Create application"
5. Click "Pages" tab
6. Click "Upload assets"

### Step 2: Upload Your Build
1. Click "Select from computer"
2. Navigate to: `/Users/dylan/Desktop/gf-birthday-2025/dist`
3. Select all files and folders in the `dist` directory
4. Or zip the dist folder and upload the zip file

### Step 3: Configure
1. Project name: `katelyn-birthday` (or your choice)
2. Production branch: `main`
3. Click "Save and Deploy"

### Step 4: Get Your URL
- Your site will be live at: `https://katelyn-birthday.pages.dev`
- Or configure a custom domain

---

## Method 2: Deploy via Wrangler CLI

### Step 1: Login to Cloudflare
```bash
npx wrangler login
```
This will open your browser for authentication.

### Step 2: Deploy
```bash
cd /Users/dylan/Desktop/gf-birthday-2025
npx wrangler pages deploy dist --project-name=katelyn-birthday
```

### Step 3: Your Site is Live!
Wrangler will give you a URL like:
```
https://katelyn-birthday.pages.dev
```

---

## Method 3: Connect GitHub Repository (Automatic Deployments)

### Step 1: Push to GitHub (Already Done!)
✅ Your code is already at: https://github.com/Skarath13/gf25bday.git

### Step 2: Connect Repository to Cloudflare Pages
1. Go to https://dash.cloudflare.com/
2. Click "Workers & Pages"
3. Click "Create application"
4. Click "Pages" tab
5. Click "Connect to Git"
6. Select your repository: `Skarath13/gf25bday`
7. Configure build settings:
   - **Framework preset**: Vite
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Root directory**: `/` (leave blank)
8. Click "Save and Deploy"

### Step 3: Automatic Deployments
- Every push to `main` branch will auto-deploy
- Preview deployments for pull requests
- Rollback to previous versions easily

---

## Build Settings for Cloudflare Pages

```yaml
Framework: Vite
Build command: npm run build
Build output directory: dist
Node version: 18 or higher
Install command: npm install
Environment variables: None needed
```

---

## Custom Domain (Optional)

### After deployment, add custom domain:
1. Go to your project in Cloudflare Pages
2. Click "Custom domains"
3. Click "Set up a custom domain"
4. Enter your domain (e.g., `katelynbirthday.com`)
5. Follow DNS instructions
6. SSL is automatic and free!

---

## Quick Deploy Commands

### Already Built:
Your production build is ready in the `dist` folder.

### Rebuild if needed:
```bash
npm run build
```

### Deploy (after login):
```bash
npx wrangler pages deploy dist --project-name=katelyn-birthday
```

### Or drag and drop:
Just drag the entire `dist` folder to the Cloudflare Pages upload page!

---

## Expected URLs

### Default Cloudflare URL:
- `https://katelyn-birthday.pages.dev`
- Or: `https://[your-project-name].pages.dev`

### With GitHub integration:
- Production: `https://[project-name].pages.dev`
- Preview: `https://[commit-hash].[project-name].pages.dev`

---

## Benefits of Cloudflare Pages

✅ **Free Forever** - No credit card needed
✅ **Unlimited bandwidth** - No traffic limits
✅ **Global CDN** - Fast worldwide
✅ **Auto HTTPS** - SSL included
✅ **Instant cache invalidation** - Updates are instant
✅ **Preview deployments** - Test before going live
✅ **Web Analytics** - Free built-in analytics

---

## Performance

Your birthday dashboard will load incredibly fast on Cloudflare's global network:
- 🌍 Served from 300+ cities worldwide
- ⚡ Sub-second load times globally
- 📱 Perfect for iPhone Safari
- 🚀 99.99% uptime

---

## Deployment Checklist

- [✅] Project built successfully (`dist` folder created)
- [✅] Code pushed to GitHub
- [ ] Cloudflare account created (if needed)
- [ ] Site deployed
- [ ] URL received
- [ ] Tested on iPhone Safari
- [ ] Shared link with Katelyn! 🎂

---

## Troubleshooting

### "Build failed"
- Run `npm run build` locally first to test
- Check Node.js version (need 18+)
- Clear cache and retry

### "Site not updating"
- Clear browser cache
- Use incognito mode
- Wait 1-2 minutes for global CDN propagation

### "Can't login to Wrangler"
- Try method 1 (dashboard upload) instead
- Or use GitHub integration

---

## Support

- Cloudflare Docs: https://developers.cloudflare.com/pages
- Dashboard: https://dash.cloudflare.com
- Community: https://community.cloudflare.com

---

**Ready to deploy!** 🚀

Choose your method above and get Katelyn's birthday dashboard live in minutes!
