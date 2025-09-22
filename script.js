// Make.com webhook configuration
const MAKE_CONFIG = {
    // You'll need to replace this with your actual Make.com webhook URL
    webhookUrl: 'https://hook.us2.make.com/o939cnx6hld9eme9x13zkcvuh9mkp7yx',
    // Optional: Add any default headers or authentication if needed
    headers: {
        'Content-Type': 'application/json',
        // Add other headers as needed for your Make.com webhook
    }
};

class MakeIntegration {
    constructor() {
        this.button = document.getElementById('webhookButton');
        this.status = document.getElementById('status');
        this.response = document.getElementById('response');
        this.spinner = this.button.querySelector('.spinner');
        this.buttonText = this.button.querySelector('.button-text');
        
        this.init();
    }
    
    init() {
        this.button.addEventListener('click', () => this.handleWebhookRequest());
    }
    
    async handleWebhookRequest() {
        // Validate webhook URL
        if (MAKE_CONFIG.webhookUrl === 'YOUR_MAKE_WEBHOOK_URL_HERE') {
            this.showError('Please configure your Make.com webhook URL in script.js');
            return;
        }
        
        this.setLoading(true);
        this.hideStatus();
        this.hideResponse();
        
        try {
            const result = await this.sendMakeWebhook();
            this.showSuccess('Webhook request sent successfully!');
            this.showResponse(result);
        } catch (error) {
            this.showError(`Webhook request failed: ${error.message}`);
            console.error('Make.com Webhook Error:', error);
        } finally {
            this.setLoading(false);
        }
    }
    
    async sendMakeWebhook() {
        const requestData = [
            {
                "message": {
                    "type": "tool-calls",
                    "toolCalls": [
                        {
                            "type": "function",
                            "function": {
                                "name": "Hwang",
                                "arguments": {
                                    "Trigger": "Triggered"
                                }
                            }
                        }
                    ]
                }
            }
        ];

        const response = await fetch(MAKE_CONFIG.webhookUrl, {
            method: 'POST',
            headers: MAKE_CONFIG.headers,
            body: JSON.stringify(requestData)
        });

        const responseText = await response.text();

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${responseText || response.statusText}`);
        }

        try {
            // If responseText is empty, return a success message.
            if (!responseText) {
                return { message: 'Webhook triggered successfully' };
            }
            return JSON.parse(responseText);
        } catch (error) {
            return { message: responseText };
        }
    }
    
    setLoading(loading) {
        if (loading) {
            this.button.disabled = true;
            this.buttonText.textContent = 'Sending...';
            this.spinner.classList.remove('hidden');
        } else {
            this.button.disabled = false;
            this.buttonText.textContent = 'Send API Request';
            this.spinner.classList.add('hidden');
        }
    }
    
    showSuccess(message) {
        this.status.textContent = message;
        this.status.className = 'status success';
        this.status.classList.remove('hidden');
    }
    
    showError(message) {
        this.status.textContent = message;
        this.status.className = 'status error';
        this.status.classList.remove('hidden');
    }
    
    hideStatus() {
        this.status.classList.add('hidden');
    }
    
    showResponse(data) {
        this.response.textContent = JSON.stringify(data, null, 2);
        this.response.classList.remove('hidden');
    }
    
    hideResponse() {
        this.response.classList.add('hidden');
    }
}

// Initialize the application when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new MakeIntegration();
});

// Additional utility functions for Make.com webhook operations
class MakeWebhookUtils {
    static async sendCustomWebhook(webhookUrl, data, headers = {}) {
        const defaultHeaders = {
            'Content-Type': 'application/json',
            ...headers
        };

        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: defaultHeaders,
            body: JSON.stringify(data)
        });

        const responseText = await response.text();

        if (!response.ok) {
            throw new Error(`Webhook request failed: ${responseText || response.statusText}`);
        }

        try {
            if (!responseText) {
                return { message: 'Webhook triggered successfully' };
            }
            return JSON.parse(responseText);
        } catch {
            return { message: responseText };
        }
    }
    
    static async sendWithTimestamp(webhookUrl, customData = {}) {
        const data = {
            timestamp: new Date().toISOString(),
            ...customData
        };
        
        return this.sendCustomWebhook(webhookUrl, data);
    }
    
    static async sendUserData(webhookUrl, userData) {
        const data = {
            timestamp: new Date().toISOString(),
            user: userData,
            source: 'website'
        };
        
        return this.sendCustomWebhook(webhookUrl, data);
    }
}