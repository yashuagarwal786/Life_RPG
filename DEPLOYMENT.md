# Vercel Deployment Guide for Life RPG

## Prerequisites
- GitHub repository linked (✅ Done - https://github.com/yashuagarwal786/Life_RPG.git)
- Vercel account (sign up at vercel.com if needed)
- Supabase project with environment variables

## Step 1: Prepare Environment Variables

Copy your Supabase credentials. You'll need:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

These should already be in your `.env.local` file.

## Step 2: Deploy on Vercel

1. Go to https://vercel.com/dashboard
2. Click "Add New..." → "Project"
3. Click "Import Git Repository"
4. Search and select "Life_RPG" from your GitHub account
5. Click "Import"

## Step 3: Configure Environment Variables

In the "Environment Variables" section, add:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

You can find these in your Supabase project settings.

## Step 4: Deploy

1. Click "Deploy"
2. Wait for the build to complete (usually 2-3 minutes)
3. Your app will be live at `https://your-project.vercel.app`

## Step 5: Update Supabase Redirect URLs (Important!)

After deployment:
1. Go to Supabase Dashboard → Authentication → URL Configuration
2. Add your Vercel domain to "Redirect URLs":
   - `https://your-project.vercel.app/auth/callback`
   - `https://your-project.vercel.app/`

## Features Deployed

✅ Landing page
✅ Authentication (login/signup - implement pages)
✅ Dashboard with character stats
✅ Quest management system
✅ Shop with cosmetic items
✅ Inventory system
✅ Character attributes tracking

## Automatic Deployments

Every time you push to the `main` branch on GitHub, Vercel will:
1. Automatically build your project
2. Run tests
3. Deploy to production if successful

## Troubleshooting

### Build Fails
- Check environment variables are set correctly
- Ensure Node.js version is 18+ in project settings

### Authentication Issues
- Verify Supabase redirect URLs are configured
- Check that NEXT_PUBLIC_SUPABASE_URL and ANON_KEY are correct

### Database Issues
- Verify Supabase migrations have run
- Check that your database has the required tables

## Dashboard Access

- Production: https://your-project.vercel.app/dashboard
- Preview deployments: Auto-generated for each PR

## Next Steps

1. Test the deployment
2. Create auth pages (signup/login)
3. Add password reset functionality
4. Set up custom domain (optional)
5. Enable analytics in Vercel dashboard
