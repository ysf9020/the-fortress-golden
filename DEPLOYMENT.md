# Deployment Guide

## Prerequisites
- Node.js 18 or higher
- GitHub account
- Netlify account

## Step 1: Push Project to GitHub

1. Initialize a Git repository in your project folder:
   ```bash
   git init
   ```

2. Add all files to the repository:
   ```bash
   git add .
   ```

3. Commit your changes:
   ```bash
   git commit -m "Initial commit"
   ```

4. Create a new repository on GitHub.

5. Add the remote repository:
   ```bash
   git remote add origin https://github.com/your-username/the-fortress-golden.git
   ```

6. Push your code to GitHub:
   ```bash
   git push -u origin main
   ```

## Step 2: Connect to Netlify

1. Log in to your Netlify account.

2. Click "New site from Git".

3. Select GitHub as the Git provider.

4. Authorize Netlify to access your GitHub account.

5. Select the repository you just pushed.

6. Configure the build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`

7. Add environment variables:
   - `ADMIN_PASSWORD`: `fortress2025` (or your preferred password)
   - `NETLIFY_SITE_ID`: (will be provided by Netlify)

8. Click "Deploy site".

## Step 3: Set up CI/CD

1. In your GitHub repository, go to Settings > Secrets and variables > Actions.

2. Add the following repository secrets:
   - `NETLIFY_AUTH_TOKEN`: Get this from your Netlify account under User settings > Applications > Personal access tokens.
   - `NETLIFY_SITE_ID`: Get this from your Netlify site settings > General > Site information > Site ID.
   - `ADMIN_PASSWORD`: Use the same password you set in Netlify environment variables.

3. The GitHub Actions workflow in `.github/workflows/deploy.yml` will automatically trigger on pushes to the main branch.

## Step 4: Verify Deployment

1. Check that your site has been successfully deployed by visiting the URL provided by Netlify.

2. Test the following functionality:
   - All pages load correctly
   - Form submission works
   - Admin panel is protected by password
   - Email delivery after status changes (if configured)

## Environment Variables

For local development, create a `.env` file in the root of your project:

```
ADMIN_PASSWORD=fortress2025
```

This file should not be committed to Git and is already included in `.gitignore`.

## Troubleshooting

If you encounter any issues during deployment:

1. Check the deployment logs in Netlify for any error messages.
2. Verify that all environment variables are correctly set.
3. Ensure your code builds locally with `npm run build`.
4. Check the GitHub Actions logs for any CI/CD issues.
