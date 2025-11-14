# EmailJS Template Setup Guide

This guide will help you set up a beautifully styled email template in EmailJS for receiving inquiry notifications.

## Quick Setup

1. Go to your EmailJS dashboard → Email Templates
2. Open your template (or create a new one)
3. Click on the "Content" tab
4. Click "Edit Content" button
5. Switch to HTML mode (if available) or paste the HTML below
6. Update the subject line
7. Save the template

## Email Subject

```
New Inquiry: {{title}}
```

Or a simpler version:
```
New Contact Form Submission from {{name}}
```

## HTML Template Content

Copy and paste this HTML into your EmailJS template content editor:

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; background-color: #0a0a0a;">
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #0a0a0a;">
        <tr>
            <td align="center" style="padding: 40px 20px;">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="max-width: 600px; background-color: #18181b; border-radius: 16px; overflow: hidden; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5);">
                    
                    <!-- Header -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); padding: 40px 30px; text-align: center;">
                            <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">
                                New Inquiry Received
                            </h1>
                            <p style="margin: 10px 0 0 0; color: rgba(255, 255, 255, 0.9); font-size: 14px; font-weight: 500;">
                                Someone is ready to transform their fitness journey
                            </p>
                        </td>
                    </tr>

                    <!-- Content -->
                    <tr>
                        <td style="padding: 40px 30px;">
                            <p style="margin: 0 0 24px 0; color: #f4f4f5; font-size: 16px; line-height: 1.6;">
                                Hi there,
                            </p>
                            
                            <p style="margin: 0 0 24px 0; color: #a1a1aa; font-size: 16px; line-height: 1.6;">
                                You've received a new inquiry from your website. Here are the details:
                            </p>

                            <!-- Info Card -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #27272a; border-radius: 12px; border: 1px solid #3f3f46; margin: 24px 0;">
                                <tr>
                                    <td style="padding: 24px;">
                                        <!-- Name -->
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                            <tr>
                                                <td style="padding-bottom: 16px; border-bottom: 1px solid #3f3f46;">
                                                    <p style="margin: 0 0 6px 0; color: #71717a; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
                                                        Name
                                                    </p>
                                                    <p style="margin: 0; color: #f4f4f5; font-size: 18px; font-weight: 600;">
                                                        {{name}}
                                                    </p>
                                                </td>
                                            </tr>
                                        </table>

                                        <!-- Email -->
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                            <tr>
                                                <td style="padding: 16px 0; border-bottom: 1px solid #3f3f46;">
                                                    <p style="margin: 0 0 6px 0; color: #71717a; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
                                                        Email Address
                                                    </p>
                                                    <p style="margin: 0; color: #a1a1aa; font-size: 16px;">
                                                        <a href="mailto:{{email}}" style="color: #818cf8; text-decoration: none; font-weight: 500;">{{email}}</a>
                                                    </p>
                                                </td>
                                            </tr>
                                        </table>

                                        <!-- Goal -->
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                            <tr>
                                                <td style="padding: 16px 0; border-bottom: 1px solid #3f3f46;">
                                                    <p style="margin: 0 0 6px 0; color: #71717a; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
                                                        Fitness Goal
                                                    </p>
                                                    <p style="margin: 0; color: #f4f4f5; font-size: 16px; font-weight: 500;">
                                                        {{goal}}
                                                    </p>
                                                </td>
                                            </tr>
                                        </table>

                                        <!-- Message -->
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                            <tr>
                                                <td style="padding-top: 16px;">
                                                    <p style="margin: 0 0 6px 0; color: #71717a; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
                                                        Message
                                                    </p>
                                                    <p style="margin: 0; color: #a1a1aa; font-size: 16px; line-height: 1.6; white-space: pre-wrap;">
                                                        {{message}}
                                                    </p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>

                            <!-- Call to Action Button -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                    <td align="center" style="padding: 24px 0;">
                                        <a href="mailto:{{email}}?subject=Re: {{title}}" style="display: inline-block; background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 14px 0 rgba(99, 102, 241, 0.4);">
                                            Reply to {{name}}
                                        </a>
                                    </td>
                                </tr>
                            </table>

                            <!-- Footer Note -->
                            <p style="margin: 24px 0 0 0; color: #71717a; font-size: 14px; line-height: 1.6; text-align: center;">
                                This inquiry was submitted through your website contact form.<br>
                                Please respond within 24 hours for the best client experience.
                            </p>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #09090b; padding: 24px 30px; text-align: center; border-top: 1px solid #27272a;">
                            <p style="margin: 0; color: #52525b; font-size: 12px; line-height: 1.5;">
                                This is an automated notification email from your website.
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
```

## Template Variables Used

The template uses these variables that are automatically sent from your API:

- `{{name}}` - The sender's name
- `{{email}}` - The sender's email address
- `{{goal}}` - The fitness goal they specified
- `{{message}}` - The full message content
- `{{title}}` - The inquiry title (goal or message preview)

## Email Settings Configuration

In the EmailJS template settings (right sidebar):

1. **To Email**: Set to your admin email (e.g., `alexanderbonnici214@gmail.com`)
2. **From Email**: Use your default email address
3. **Reply To**: Set to `{{email}}` so replies go directly to the client
4. **From Name**: Your business name (e.g., "Jake Turner Fitness")

## Testing

1. Use the "Test It" button in EmailJS to send a test email
2. Make sure all variables are displaying correctly
3. Test the "Reply" button to ensure it opens the correct email

## Customization Tips

### Change Colors
- Primary gradient: Change `#6366f1` and `#8b5cf6` to your brand colors
- Background: Change `#18181b` to match your theme
- Text colors: Adjust `#f4f4f5` (main text) and `#a1a1aa` (secondary text)

### Add Logo
Add this before the header section:
```html
<tr>
    <td align="center" style="padding: 30px 30px 0 30px;">
        <img src="YOUR_LOGO_URL" alt="Your Logo" style="max-width: 150px; height: auto;">
    </td>
</tr>
```

### Simplify for Better Compatibility
If some email clients don't render the gradient well, replace the header background with:
```html
style="background-color: #6366f1; padding: 40px 30px; text-align: center;"
```

## Troubleshooting

- **Variables not showing**: Make sure the variable names match exactly (case-sensitive)
- **Styling issues**: Some email clients strip certain CSS. The template uses inline styles for maximum compatibility
- **Images not loading**: Use absolute URLs for any images you add

