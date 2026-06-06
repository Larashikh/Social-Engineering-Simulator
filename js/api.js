// ============================================
// Social Engineering Simulator - API Manager
// ============================================

class APIManager {
  constructor(baseURL = 'http://localhost:5000/api') {
    this.baseURL = baseURL;
    this.timeout = 10000; // 10 seconds timeout
  }
  
  /**
   * Make HTTP request
   * @param {string} endpoint - API endpoint
   * @param {string} method - HTTP method
   * @param {object} data - Request body data
   * @returns {Promise} Response data
   */
  async request(endpoint, method = 'GET', data = null) {
    const url = `${this.baseURL}${endpoint}`;
    
    const options = {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    };
    
    if (data) {
      options.body = JSON.stringify(data);
    }
    
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.timeout);
      
      options.signal = controller.signal;
      
      const response = await fetch(url, options);
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return await response.json();
      } else {
        return await response.text();
      }
    } catch (error) {
      if (error.name === 'AbortError') {
        throw new Error('Request timeout. Please try again.');
      }
      throw error;
    }
  }
  
  /**
   * GET request
   */
  async get(endpoint) {
    return this.request(endpoint, 'GET');
  }
  
  /**
   * POST request
   */
  async post(endpoint, data) {
    return this.request(endpoint, 'POST', data);
  }
  
  /**
   * PUT request
   */
  async put(endpoint, data) {
    return this.request(endpoint, 'PUT', data);
  }
  
  /**
   * DELETE request
   */
  async delete(endpoint) {
    return this.request(endpoint, 'DELETE');
  }
  
  // ============ Scenario Endpoints ============
  
  /**
   * Get a new scenario
   * @param {number} scenarioNumber - Scenario number (1-5)
   * @returns {Promise} Scenario data
   */
  async getScenario(scenarioNumber = 1) {
    // If a scenario pool exists in sessionStorage (selected IDs), map the requested scenario index to the actual scenario id
    try {
      const poolJson = sessionStorage.getItem('scenarioPool');
      if (poolJson) {
        const pool = JSON.parse(poolJson);
        const mappedId = pool[scenarioNumber - 1];
        if (mappedId) {
          return this.getMockScenarioById(mappedId);
        }
      }

      const response = await this.get(`/scenario?scenario=${scenarioNumber}`);
      return response;
    } catch (error) {
      console.error('Error fetching scenario:', error);
      const poolJson = sessionStorage.getItem('scenarioPool');
      if (poolJson) {
        const pool = JSON.parse(poolJson);
        const mappedId = pool[scenarioNumber - 1];
        if (mappedId) return this.getMockScenarioById(mappedId);
      }
      return this.getMockScenario(scenarioNumber);
    }
  }

  /**
   * Submit answer for a scenario
   * @param {number} scenarioId - Scenario ID
   * @param {string} answer - Selected answer
   * @returns {Promise} Feedback data
   */
  async submitAnswer(scenarioId, answer) {
    try {
      const response = await this.post('/answer', {
        scenario_id: scenarioId,
        answer: answer
      });
      return response;
    } catch (error) {
      console.error('Error submitting answer:', error);
      return this.getMockFeedback(answer);
    }
  }
  
  /**
   * Get user score
   * @param {string} userId - User ID
   * @returns {Promise} Score data
   */
  async getScore(userId) {
    try {
      const response = await this.get(`/score/${userId}`);
      return response;
    } catch (error) {
      console.error('Error fetching score:', error);
      return this.getMockScore();
    }
  }
  
  /**
   * Get leaderboard
   * @returns {Promise} Leaderboard data
   */
  async getLeaderboard() {
    try {
      const response = await this.get('/leaderboard');
      return response;
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      return this.getMockLeaderboard();
    }
  }
  
  /**
   * Save user session
   * @param {object} userData - User data
   * @returns {Promise} Response data
   */
  async saveSession(userData) {
    try {
      const response = await this.post('/session', userData);
      return response;
    } catch (error) {
      console.error('Error saving session:', error);
      return { success: true, userId: userData.name };
    }
  }
  
  // ============ Mock Data (for offline development) ============
  
  /**
   * Get mock scenario data
   */
  getMockScenario(scenarioNumber = 1) {
    // Fallback when no mapping provided; return scenario by index (1-based)
    const scenarios = this.mockScenarios || [];
    return scenarios.find(s => s.id === scenarioNumber) || scenarios[scenarioNumber - 1] || scenarios[0];
  }

  /**
   * Get mock scenario by id from the internal list
   */
  getMockScenarioById(id) {
    const scenarios = this.mockScenarios || [];
    return scenarios.find(s => s.id === id) || scenarios[0];
  }

  /**
   * Generate a random scenario pool from available mock scenarios
   */
  generateScenarioPool(count = 5) {
    const scenarios = this.mockScenarios || [];
    const availableIds = scenarios.map(s => s.id);
    return this.shuffleArray(availableIds).slice(0, count);
  }

  /**
   * Shuffle an array using Fisher-Yates
   */
  shuffleArray(array) {
    const cloned = [...array];
    for (let i = cloned.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cloned[i], cloned[j]] = [cloned[j], cloned[i]];
    }
    return cloned;
  }

  /**
   * Get mock feedback
   */
  getMockFeedback(answer) {
    return {
      correct: Math.random() > 0.5,
      explanation: 'This is a phishing attempt. Be careful with unsolicited emails asking for credentials.',
      score_gained: 1,
      tips: [
        'Always verify through official channels',
        'Check sender email carefully',
        'Never click suspicious links'
      ]
    };
  }
  
  /**
   * Get mock score
   */
  getMockScore() {
    return {
      user_id: 'user123',
      total_scenarios: 5,
      correct_answers: 3,
      accuracy: 60,
      awareness_level: 'Developing',
      timestamp: new Date().toISOString()
    };
  }
  
  /**
   * Get mock leaderboard
   */
  getMockLeaderboard() {
    return [
      { rank: 1, name: 'Sara', level: 'High', score: 9 },
      { rank: 2, name: 'Ahmad', level: 'High', score: 8 },
      { rank: 3, name: 'Layla', level: 'High', score: 8 },
      { rank: 4, name: 'Omar', level: 'Medium', score: 7 },
      { rank: 5, name: 'Fatima', level: 'Medium', score: 7 }
    ];
  }
}

  // Internal mock scenarios pool (20 sample items)
  const mockScenarios = [
    { id: 1, type: 'email', title: 'Mandatory Password Update Required', description: 'You receive an email from it.support@company-internal.com', content: 'Our IT department requires all employees to update their passwords due to a security breach. Please click this link and enter your current password followed by your new password:\n\nhttp://company-portal-login.net/reset\n\nThis must be completed by end of day.', sender: 'it.support@company-internal.com', answers: [ { id: 1, text: 'Open the link and update password', correct: false }, { id: 2, text: 'Contact IT directly to verify', correct: true }, { id: 3, text: 'Report as spam', correct: false } ], explanation: 'This is a phishing email. Real IT departments never ask for passwords via email. Always verify through official channels.', redFlags: ['Suspicious link', 'Urgent tone', 'Request for credentials'], tips: ['Never click links in unsolicited emails', 'Contact IT directly', 'Check sender email carefully'] },
    { id: 2, type: 'sms', title: 'FedEx Delivery Attempt', description: 'You receive an SMS message from FedEx', content: 'FedEx: We attempted delivery but no one was home. Reschedule at: fedex-resch.com Your package will return to sender in 24hrs.', sender: 'FedEx', answers: [ { id: 1, text: 'Click the link and reschedule', correct: false }, { id: 2, text: 'Verify through official channel', correct: true }, { id: 3, text: 'Delete and report as spam', correct: true } ], explanation: 'This is a fake delivery scam. Scammers create urgency to trick you into clicking malicious links.', redFlags: ['Suspicious URL', 'Urgent deadline', 'Unexpected delivery attempt'], tips: ['Use official delivery apps or websites', 'Avoid clicking unknown links', 'Verify with the delivery company directly'] },
    { id: 3, type: 'social_media', title: 'Instagram Account Warning', description: 'You receive a message on Instagram', content: 'Your account has been detected suspicious activity. Please verify your identity now or your account will be deleted within 24 hours.', sender: 'Instagram', answers: [ { id: 1, text: 'Click to verify identity', correct: false }, { id: 2, text: 'Go to instagram.com and check', correct: true }, { id: 3, text: 'Ignore the message', correct: false } ], explanation: 'Instagram never asks for verification via messages. Always access official apps directly, never through message links.', redFlags: ['Threat of account deletion', 'Message from account', 'Verification link'], tips: ['Open official app directly', 'Check account settings', 'Report suspicious messages'] },
    { id: 4, type: 'email', title: 'Inheritance Claim Notification', description: 'You receive an email about unclaimed inheritance', content: 'You have been identified as a beneficiary of an unclaimed inheritance. To claim your funds, please verify your identity by providing bank account details.', sender: 'legal-inheritance@trustfund.com', answers: [ { id: 1, text: 'Provide bank details', correct: false }, { id: 2, text: 'Delete and ignore', correct: true }, { id: 3, text: 'Click verify button', correct: false } ], explanation: 'This is a classic advance-fee scam. No legitimate organization asks for bank details via email.', redFlags: ['Unsolicited money offer', 'Request for personal information', 'Suspicious sender'], tips: ['Delete unsolicited money offers', 'Never share bank details', 'Be skeptical of good news'] },
    { id: 5, type: 'email', title: 'USB Device Found', description: 'You find a USB device in your office parking lot labeled "Salary Information"', content: 'A USB device has been found containing company data. Your name is written on it. Please plug it in to verify its contents.', sender: 'Unknown', answers: [ { id: 1, text: 'Plug it into your computer', correct: false }, { id: 2, text: 'Report to IT security', correct: true }, { id: 3, text: 'Open on a public computer', correct: false } ], explanation: 'USB baiting is a real attack. Never plug unknown devices into your computer. Report to IT security.', redFlags: ['Unknown origin', 'Too convenient', 'Sensitive label'], tips: ['Never plug in unknown devices', 'Report to IT', 'Use security scanning'] },
    { id: 6, type: 'email', title: 'Google Account Verification', description: 'Email from accounts-noreply@google.com', content: 'We noticed unusual sign-in attempts. Click to verify your account: http://google-secure-login.xyz', sender: 'accounts-noreply@google.com', answers: [ { id: 1, text: 'Click the link to verify', correct: false }, { id: 2, text: 'Open Google directly and check security', correct: true }, { id: 3, text: 'Reply asking for more info', correct: false } ], explanation: 'Google will not ask for verification via suspicious links. Check via official site.', redFlags: ['Suspicious domain', 'Security warning', 'Link to unknown site'], tips: ['Use official website', 'Enable 2FA', 'Check recent devices'] },
    { id: 7, type: 'sms', title: 'Bank OTP Request', description: 'SMS asking for OTP', content: 'Bank: Your OTP is 123456. Do not share this with anyone. If you did not request, reply STOP.', sender: 'YourBank', answers: [ { id: 1, text: 'Share OTP to confirm', correct: false }, { id: 2, text: 'Ignore and contact bank', correct: true }, { id: 3, text: 'Click contained link', correct: false } ], explanation: 'Banks never ask to send OTPs back. OTP sharing is a red flag.', redFlags: ['Requests OTP', 'Unsolicited message'], tips: ['Never share OTPs', 'Contact bank via official channels'] },
    { id: 8, type: 'linkedin', title: 'Connection Request with Job Offer', description: 'Message on LinkedIn', content: 'Hiring manager: We offer you a remote role. Click to view contract: http://hire-now.co', sender: 'Recruiter', answers: [ { id: 1, text: 'Click and sign contract', correct: false }, { id: 2, text: 'Verify recruiter profile and company site', correct: true }, { id: 3, text: 'Provide personal details', correct: false } ], explanation: 'Recruitment scams often request personal info or push outside platforms.', redFlags: ['External link', 'Too good to be true', 'Pressure'], tips: ['Check LinkedIn profile', 'Verify company website'] },
    { id: 9, type: 'email', title: 'Fake Microsoft Office Invoice', description: 'Unrecognized invoice email', content: 'Invoice attached for Office subscription. Click to view and pay: http://ms-office-payments.com', sender: 'billing@office.com', answers: [ { id: 1, text: 'Open attachment and pay', correct: false }, { id: 2, text: 'Verify subscription status in account', correct: true }, { id: 3, text: 'Forward to colleague', correct: false } ], explanation: 'Invoice scams attempt to get payments. Verify account status directly.', redFlags: ['Attachment', 'Payment link', 'Unknown sender'], tips: ['Check subscriptions', 'Don\'t open attachments'] },
    { id: 10, type: 'email', title: 'CEO Fraud Request', description: 'Email from a senior exec asking for urgent transfer', content: 'From: ceo@company.com. Please transfer funds urgently to vendor account 12345.', sender: 'ceo@company.com', answers: [ { id: 1, text: 'Transfer immediately', correct: false }, { id: 2, text: 'Confirm via call', correct: true }, { id: 3, text: 'Ignore', correct: false } ], explanation: 'CEO fraud involves impersonating executives to request transfers. Always verify via a secondary channel.', redFlags: ['Urgent transfer', 'Unusual request', 'Impersonation'], tips: ['Call to confirm', 'Finance procedures'] },
    { id: 11, type: 'sms', title: 'Verification Code Scam', description: 'SMS asking to verify', content: 'Verify your account here: verify-it.now', sender: 'Service', answers: [ { id: 1, text: 'Enter code on site', correct: false }, { id: 2, text: 'Ignore and check account', correct: true }, { id: 3, text: 'Forward to friend', correct: false } ], explanation: 'Verification code sites are often phishing portals.', redFlags: ['External verify link', 'Unexpected request'], tips: ['Check account directly'] },
    { id: 12, type: 'email', title: 'Free Gift Card Survey', description: 'Email offering gift card for survey', content: 'Complete survey and claim $100 gift card: http://gift-survey.net', sender: 'promo@offers.com', answers: [ { id: 1, text: 'Complete survey and provide card details', correct: false }, { id: 2, text: 'Ignore offer', correct: true }, { id: 3, text: 'Share with friends', correct: false } ], explanation: 'Promotional scams collect payment or personal info. Legit surveys rarely ask sensitive data.', redFlags: ['Too good to be true', 'External link'], tips: ['Ignore suspicious promotions'] },
    { id: 13, type: 'email', title: 'Account Suspension Notice (Google)', description: 'Email from accounts@google.com claiming suspension', content: 'Your account will be suspended. Click to verify: google-security.xyz', sender: 'accounts@google.com', answers: [ { id: 1, text: 'Click link to verify', correct: false }, { id: 2, text: 'Login through official Google site', correct: true }, { id: 3, text: 'Reply to the email', correct: false } ], explanation: 'Suspension threats are used to coerce users to click malicious links.', redFlags: ['Threat', 'Suspicious domain'], tips: ['Use official login'] },
    { id: 14, type: 'social_media', title: 'WhatsApp Verification', description: 'Message asking for code', content: 'Enter this code to activate: 987654', sender: 'WhatsApp', answers: [ { id: 1, text: 'Enter code into site', correct: false }, { id: 2, text: 'Ignore if unexpected', correct: true }, { id: 3, text: 'Share code', correct: false } ], explanation: 'Sharing verification codes can allow account takeover.', redFlags: ['Verification code request', 'Unexpected message'], tips: ['Never share codes'] },
    { id: 15, type: 'website', title: 'Welcome to Bank of America Online Banking', description: 'Fake Bank of America login page', content: 'This site asks for your Bank of America credentials on a non-secure page.', sender: 'secure-bankofamerica-login.com', answers: [ { id: 1, text: 'Enter login credentials', correct: false }, { id: 2, text: 'Close & report site', correct: true } ], explanation: 'Fake banking login pages capture credentials. Always use the official bank website or mobile app.', redFlags: ['Non-secure page', 'Lookalike domain', 'Login form'], tips: ['Do not enter credentials', 'Report suspicious login pages'] },
    { id: 16, type: 'email', title: 'Subscription Renewal (Spotify)', description: 'Payment failed notice', content: 'Your Spotify payment failed. Update payment here: spotify-pay.net', sender: 'support@spotify.com', answers: [ { id: 1, text: 'Update payment via link', correct: false }, { id: 2, text: 'Check account settings on Spotify', correct: true }, { id: 3, text: 'Ignore for now', correct: false } ], explanation: 'Payment phishing tempts users to enter card details.', redFlags: ['Payment link', 'Unexpected invoice'], tips: ['Check account directly'] },
    { id: 17, type: 'linkedin', title: 'Job Interview Link', description: 'LinkedIn message with video call link', content: 'Interview scheduled. Join: interview-now.me', sender: 'Recruiter', answers: [ { id: 1, text: 'Join link immediately', correct: false }, { id: 2, text: 'Confirm via recruiter profile', correct: true }, { id: 3, text: 'Share link', correct: false } ], explanation: 'Interview scams can harvest info or install malware.', redFlags: ['External meeting link', 'Unverified recruiter'], tips: ['Verify recruiter and company'] },
    { id: 18, type: 'sms', title: 'Subscription Confirmation', description: 'SMS for unknown subscription', content: 'Confirm subscription: subscribe-now.co', sender: 'Service', category: 'Subscription Scam', shouldKnow: 'Subscription services send billing issues to your email and app, not SMS with links. Always log in directly through the official app or website to check account status.', answers: [ { id: 1, text: 'Confirm subscription', correct: false }, { id: 2, text: 'Ignore and unsubscribe', correct: true }, { id: 3, text: 'Reply YES', correct: false } ], explanation: 'Subscription traps can lead to charges or spam.', redFlags: ['Unknown subscription', 'Confirm link'], tips: ['Don\'t confirm unknown subscriptions'] },
    { id: 19, type: 'email', title: 'Tax Refund Notification', description: 'You are eligible for a refund', content: 'Claim your tax refund by providing SSN and bank details: http://irs-refund-claim.net', sender: 'refunds@irs-treasury.org', answers: [ { id: 1, text: 'Provide SSN and bank details', correct: false }, { id: 2, text: 'Verify with official tax website', correct: true }, { id: 3, text: 'Ignore', correct: false } ], explanation: 'Tax refund scams request sensitive info. Use official government portals.', redFlags: ['Requests SSN', 'Suspicious domain'], tips: ['Use official tax sites'] },
    { id: 20, type: 'social_media', title: 'Telegram Message from a Friend', description: 'A Telegram contact asks for urgent help with a payment.', content: 'Hey, I need to send money to a vendor but my card is blocked. Can you transfer 500 SAR to this account and I will pay you back tonight? Account: 123456789. Reply quickly please.', sender: 'Telegram Contact', answers: [ { id: 1, text: 'Send the money immediately', correct: false }, { id: 2, text: 'Call the friend using another app to verify', correct: true }, { id: 3, text: 'Share your bank details for convenience', correct: false } ], explanation: 'Telegram impersonation scams often pressure you to send money quickly. Always verify the request through another channel before doing any transfer.', redFlags: ['Urgent money request', 'Payment demand via chat', 'Pressure to act immediately'], tips: ['Verify with the friend directly', 'Do not send money without confirmation', 'Use trusted channels for financial help'] }
  ];

APIManager.prototype.mockScenarios = mockScenarios;

// Create global API instance
const API = new APIManager();
2