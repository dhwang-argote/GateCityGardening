// Vapi.ai API configuration
const VAPI_CONFIG = {
    apiUrl: 'https://api.vapi.ai/call',
    headers: {
        'Content-Type': 'application/json',
        // Replace YOUR_VAPI_API_KEY with your actual Vapi.ai API key
        'Authorization': 'Bearer bd3219c1-a8da-4ff7-84b0-76718db88c3f'
    }
};

class VapiIntegration {
    constructor() {
        this.button = document.getElementById('webhookButton');
        this.status = document.getElementById('status');
        this.response = document.getElementById('response');
        this.spinner = this.button.querySelector('.spinner');
        this.buttonText = this.button.querySelector('.button-text');
        
        this.init();
    }
    
    init() {
        this.button.addEventListener('click', () => this.handleApiRequest());
    }
    
    async handleApiRequest() {
        this.setLoading(true);
        this.hideStatus();
        this.hideResponse();
        
        try {
            const result = await this.sendVapiCall();
            this.showSuccess('API request sent successfully!');
            // this.showResponse(result);
        } catch (error) {
            this.showError(`API request failed: ${error.message}`);
            console.error('Vapi.ai API Error:', error);
        } finally {
            this.setLoading(false);
        }
    }
    
    async sendVapiCall() {
        const requestData = {
            "assistantId": "7b3ada39-9984-4b62-a9b2-7cca82871e34",
            "phoneNumberId": "0dbcde3d-4fc6-4a56-b4b3-9a7bde3caad0",
            "customer": {
                "number": "+13365013505"
            }
        };

        const response = await fetch(VAPI_CONFIG.apiUrl, {
            method: 'POST',
            headers: VAPI_CONFIG.headers,
            body: JSON.stringify(requestData)
        });

        const responseText = await response.text();

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${responseText || response.statusText}`);
        }

        try {
            // If responseText is empty, return a success message.
            if (!responseText) {
                return { message: 'API call triggered successfully' };
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
            this.buttonText.textContent = 'Trigger Call';
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
    new VapiIntegration();
});
