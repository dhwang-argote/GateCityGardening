# Make.com Webhook Integration Website

A modern single-page website that integrates with Make.com webhooks. Features a beautiful UI with a button that sends webhook requests to your Make.com scenario when pressed.

## Features

- 🎨 Modern, responsive design with gradient backgrounds
- 🔘 Interactive button with loading states
- 🔗 Make.com webhook integration
- ✅ Success/error status indicators
- 📱 Mobile-friendly responsive layout
- 🔄 Loading spinner during webhook requests
- 📄 Response display with error handling
- 🕒 Automatic timestamp inclusion

## Setup Instructions

1. **Configure Webhook URL**: Open `script.js` and replace `YOUR_MAKE_WEBHOOK_URL_HERE` with your actual Make.com webhook URL.

2. **Customize Request Data**: Modify the `requestData` object in the `sendMakeWebhook()` method to match your Make.com scenario requirements:
   - Update the data fields your scenario expects
   - Add any custom headers if needed
   - Modify the payload structure as required

3. **Open the Website**: Simply open `index.html` in your web browser.

## File Structure

```
├── index.html          # Main HTML structure
├── styles.css          # CSS styling and animations
├── script.js           # JavaScript for Make.com webhook integration
└── README.md           # This file
```

## Webhook Configuration

The website is configured to work with Make.com webhooks. You can modify the configuration in `script.js`:

```javascript
const MAKE_CONFIG = {
    webhookUrl: 'YOUR_MAKE_WEBHOOK_URL_HERE',  // Replace with your webhook URL
    headers: {
        'Content-Type': 'application/json',
        // Add other headers as needed
    }
};
```

## Default Request Payload

By default, the webhook sends this data structure:

```javascript
{
    timestamp: "2024-01-01T12:00:00.000Z",
    message: "Hello from Make.com webhook integration!",
    source: "website"
}
```

## Available Utility Functions

The `MakeWebhookUtils` class provides additional methods for common webhook operations:

- `sendCustomWebhook(webhookUrl, data, headers)` - Send custom data to any webhook
- `sendWithTimestamp(webhookUrl, customData)` - Send data with automatic timestamp
- `sendUserData(webhookUrl, userData)` - Send user data with metadata

## Make.com Scenario Setup

1. Create a new scenario in Make.com
2. Add a "Webhook" trigger as the first module
3. Copy the webhook URL from the trigger
4. Paste the URL into the `MAKE_CONFIG.webhookUrl` in `script.js`
5. Configure your scenario to process the incoming data

## Browser Compatibility

This website works in all modern browsers that support:
- ES6+ JavaScript features
- CSS Grid and Flexbox
- Fetch API

## Security Note

Remember to keep your webhook URLs secure and never commit them to version control. Consider using environment variables or a backend proxy for production deployments.
