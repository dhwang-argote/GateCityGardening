# Vapi.ai API Call Website

A modern single-page website that sends API requests to the Vapi.ai API. Features a beautiful UI with a button that sends a POST request to the Vapi.ai /call endpoint.

## Features

- 🎨 Modern, responsive design with gradient backgrounds
- 🔘 Interactive button with loading states
- 🔗 Vapi.ai API integration
- ✅ Success/error status indicators
- 📱 Mobile-friendly responsive layout
- 🔄 Loading spinner during API requests
- 📄 Response display with error handling

## Setup Instructions

1. **Configure API Key**: Open `script.js` and add your Vapi.ai API key to the `headers` object in the `VAPI_CONFIG` constant.

2. **Customize Request Data**: Modify the `requestData` object in the `sendVapiCall()` method to match your Vapi.ai API call requirements.

3. **Open the Website**: Simply open `index.html` in your web browser.

## File Structure

```
├── index.html          # Main HTML structure
├── styles.css          # CSS styling and animations
├── script.js           # JavaScript for Vapi.ai API integration
└── README.md           # This file
```

## API Configuration

The website is configured to work with the Vapi.ai API. You can modify the configuration in `script.js`:

```javascript
const VAPI_CONFIG = {
    apiUrl: 'https://api.vapi.ai/call',
    headers: {
        'Content-Type': 'application/json',
        // Add any necessary authorization headers here
        // 'Authorization': 'Bearer YOUR_VAPI_API_KEY'
    }
};
```

## Default Request Payload

By default, the API call sends this data structure:

```javascript
{
  "assistantId": "4444",
  "phoneNumberId": "111",
  "customers": [],
  "customer": {
    "number": "111"
  }
}
```

## Browser Compatibility

This website works in all modern browsers that support:
- ES6+ JavaScript features
- CSS Grid and Flexbox
- Fetch API

## Security Note

Remember to keep your API keys secure and never commit them to version control. Consider using environment variables or a backend proxy for production deployments.