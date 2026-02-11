# EmailJS Setup Instructions

Your contact form is ready! Follow these steps to connect it to your Gmail account (customsites21@gmail.com):

## Step 1: Create EmailJS Account

1. Go to **https://www.emailjs.com/**
2. Click **"Sign Up"** (free account - 200 emails/month)
3. Sign up with your email

## Step 2: Add Email Service

1. In EmailJS dashboard, go to **"Email Services"**
2. Click **"Add New Service"**
3. Choose **"Gmail"**
4. Click **"Connect Account"** and sign in with **customsites21@gmail.com**
5. Copy your **Service ID** (looks like: `service_abc1234`)

## Step 3: Create Email Template

1. Go to **"Email Templates"**
2. Click **"Create New Template"**
3. Use this template:

```
Subject: New Contact Form Submission from {{from_name}}

From: {{from_name}}
Email: {{from_email}}

Message:
{{message}}

---
Sent from CustomSites contact form
```

4. Copy your **Template ID** (looks like: `template_abc1234`)

## Step 4: Get Public Key

1. Go to **"Account"** → **"General"**
2. Find your **Public Key** (looks like: `abcDefGHi-jk12345`)

## Step 5: Update Your Code

Open `app/routes/home.tsx` and replace these placeholders (around line 35):

```typescript
const SERVICE_ID = "YOUR_SERVICE_ID"; // Replace with your Service ID
const TEMPLATE_ID = "YOUR_TEMPLATE_ID"; // Replace with your Template ID
const PUBLIC_KEY = "YOUR_PUBLIC_KEY"; // Replace with your Public Key
```

With your actual values:

```typescript
const SERVICE_ID = "service_abc1234"; // Your actual Service ID
const TEMPLATE_ID = "template_abc1234"; // Your actual Template ID
const PUBLIC_KEY = "abcDefGHi-jk12345"; // Your actual Public Key
```

## Step 6: Test It!

1. Rebuild: `npm run build`
2. Start server: `npm start`
3. Fill out the contact form
4. Check **customsites21@gmail.com** inbox for the email!

## Notes:

- Emails will come from EmailJS but include all form details
- Free tier: 200 emails/month (plenty to start)
- No credit card required for free tier
- Upgrade to paid if you need more emails

## Troubleshooting:

If emails don't arrive:
- Check Gmail spam folder
- Verify Service ID, Template ID, and Public Key are correct
- Make sure Gmail account is connected in EmailJS dashboard
- Check browser console for error messages
