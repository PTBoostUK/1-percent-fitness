# Admin Dashboard Setup Guide

This guide will help you set up the Supabase-powered admin dashboard for your website.

## Prerequisites

1. A Supabase account (sign up at [supabase.com](https://supabase.com))
2. An OpenAI API key (for AI content editing - get one at [platform.openai.com](https://platform.openai.com))
3. Node.js and pnpm installed

## Setup Steps

### 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Wait for the project to be fully provisioned

### 2. Set Up the Database Schema

1. In your Supabase dashboard, go to the SQL Editor
2. Copy and paste the contents of `supabase-schema.sql` into the editor
3. Run the SQL script to create all necessary tables and insert default data

### 3. Configure Environment Variables

1. In your Supabase project, go to Settings > API
2. Copy your Project URL and anon/public key
3. Create a `.env.local` file in the root of your project:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
OPENAI_API_KEY=your_openai_api_key
```

**To get your OpenAI API key:**
1. Go to [platform.openai.com](https://platform.openai.com)
2. Sign in or create an account
3. Go to "API Keys" in your account settings
4. Click "Create new secret key"
5. Copy the key and add it to your `.env.local` file

**Important:** Never commit your `.env.local` file to version control. It contains sensitive keys.

### 4. Create an Admin User

1. In Supabase, go to Authentication > Users
2. Click "Add User" and create a new user with:
   - Email: your admin email
   - Password: a secure password
   - Auto Confirm User: enabled

### 5. Install Dependencies

```bash
pnpm install
```

### 6. Run the Development Server

```bash
pnpm dev
```

### 7. Access the Admin Dashboard

1. Navigate to `http://localhost:3000/admin/login`
2. Log in with the credentials you created in step 4
3. You'll be redirected to the admin dashboard at `/admin`

## Features

### Content Management

- **Hero Section**: Edit tagline, title, subtitle, button text, background image, and stats
- **About Section**: Edit all about content including features, stats, certifications, and images
- **Services Section**: Add, edit, or remove services
- **Testimonials Section**: Add, edit, or remove testimonials
- **Theme Settings**: Customize primary color, secondary color, body font, and heading font

### AI Content Editing

- **AI-Powered Editing**: Click the "AI" button next to any text field to open the AI Content Editor
- **Quick Actions**: Use preset actions like "More Engaging", "Make Shorter", "Add Energy", or "More Professional"
- **Custom Instructions**: Provide your own instructions for how you want the content edited
- **Preview Before Applying**: Review AI-generated content before applying it to your website
- Available on all text fields across Hero, About, Services, and Testimonials sections

### Image Management

- Upload images directly from the admin dashboard
- Replace existing images in any section
- Images are stored as base64 (for production, consider using Supabase Storage)

## Database Structure

The CMS uses the following tables:

- `hero_content` - Hero section content
- `about_content` - About section content
- `services_content` - Services section header content
- `services` - Individual service items
- `testimonials_content` - Testimonials section header content
- `testimonials` - Individual testimonial items
- `theme_settings` - Global theme settings

## Security

- Row Level Security (RLS) is enabled on all tables
- Public read access is allowed for all content tables
- Only authenticated users can write/update content
- Admin authentication is handled through Supabase Auth

## Production Considerations

1. **Image Storage**: For production, implement Supabase Storage for image uploads instead of base64
2. **Environment Variables**: Ensure environment variables are set in your hosting platform
3. **Database Backups**: Set up regular backups in Supabase
4. **Rate Limiting**: Consider adding rate limiting to API routes
5. **Error Handling**: Monitor errors in production and set up error tracking

## Troubleshooting

### Can't log in to admin dashboard
- Verify the user exists in Supabase Authentication
- Check that the user email is confirmed
- Ensure environment variables are correctly set

### Content not loading
- Check that the database schema was created correctly
- Verify RLS policies are set up properly
- Check browser console for errors

### Changes not saving
- Verify you're authenticated (check user state in admin dashboard)
- Check Supabase logs for any errors
- Ensure RLS policies allow authenticated writes

## Support

For issues or questions, check the Supabase documentation or contact support.

