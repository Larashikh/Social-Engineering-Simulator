// ============================================
// Social Engineering Simulator - Main Application
// ============================================

class SimulationApp {
  constructor() {
    this.currentScenario = null;
    this.currentScenarioNumber = 1;
    this.userScore = 0;
    this.totalScenarios = 5;
    this.pointsPerScenario = 2;
    this.userName = '';
    this.userAnswers = [];
    this.isAnswered = false;
    
    this.init();
  }
  
  /**
   * Initialize the application
   */
  init() {
    this.setupEventListeners();
    this.loadCurrentPage();
  }
  
  /**
   * Setup all event listeners
   */
  setupEventListeners() {
    // Language toggle
    const langToggle = document.getElementById('langToggle');
    if (langToggle) {
      langToggle.addEventListener('click', () => i18n.toggleLanguage());
    }
    
    // Navigation links
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', (e) => this.handleNavigation(e));
    });
    
    // Listen for language changes
    window.addEventListener('languageChanged', () => {
      this.updatePageLayout();
    });
  }
  
  /**
   * Load current page based on URL or hash
   */
  loadCurrentPage() {
    const path = window.location.pathname;
    const page = path.split('/').pop() || 'index.html';
    
    // Initialize page-specific functionality
    if (page === 'index.html' || page === '') {
      this.initHomePage();
    } else if (page === 'simulation.html') {
      this.initSimulationPage();
    } else if (page === 'scenario.html') {
      this.initScenarioPage();
    } else if (page === 'feedback.html') {
      this.initFeedbackPage();
    } else if (page === 'result.html') {
      this.initResultPage();
    } else if (page === 'alerts.html') {
      this.initAlertsPage();
    } else if (page === 'about.html') {
      this.initAboutPage();
    }
  }
  
  /**
   * Initialize Home Page
   */
  initHomePage() {
    const startBtn = document.getElementById('startSimulationBtn');
    if (startBtn) {
      startBtn.addEventListener('click', () => {
        window.location.href = './pages/simulation.html';
      });
    }
  }
  
  /**
   * Initialize Simulation (Name Input) Page
   */
  initSimulationPage() {
    const nameInput = document.getElementById('nameInput');
    const startBtn = document.getElementById('startBtn');
    
    const updateStartButton = () => {
      if (!nameInput || !startBtn) return;
      const value = nameInput.value.trim();
      const isValid = value.length >= 2;
      startBtn.disabled = !isValid;
    };

    if (startBtn) {
      startBtn.addEventListener('click', () => this.startSimulation(nameInput));
    }
    
    if (nameInput) {
      nameInput.addEventListener('input', updateStartButton);
      nameInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          this.startSimulation(nameInput);
        }
      });
      nameInput.focus();
      updateStartButton();
    }
  }
  
  /**
   * Start the simulation
   */
  startSimulation(nameInput) {
    const name = nameInput.value.trim();
    
    // Validation
    if (!name) {
      this.showAlert('validation.nameRequired', 'danger');
      return;
    }
    
    if (name.length < 2) {
      this.showAlert('validation.nameTooShort', 'danger');
      return;
    }
    
    if (name.length > 50) {
      this.showAlert('validation.nameTooLong', 'danger');
      return;
    }
    
    // Save user name and score
    this.userName = name;
    this.userScore = 0;
    this.currentScenarioNumber = 1;
    this.userAnswers = [];
    
    // Generate a fresh scenario pool and save session data
    const scenarioPool = API.generateScenarioPool(this.totalScenarios);
    
    sessionStorage.setItem('userName', name);
    sessionStorage.setItem('userScore', '0');
    sessionStorage.setItem('currentScenario', '1');
    sessionStorage.setItem('userAnswers', JSON.stringify([]));
    sessionStorage.setItem('scenarioPool', JSON.stringify(scenarioPool));
    sessionStorage.setItem('simulationComplete', 'false');
    
    // Redirect to scenario page
    window.location.href = './scenario.html';
  }
  
  /**
   * Initialize Scenario Page
   */
  initScenarioPage() {
    // Retrieve user data from session
    this.userName = sessionStorage.getItem('userName') || 'User';
    this.userScore = parseInt(sessionStorage.getItem('userScore')) || 0;
    this.userAnswers = JSON.parse(sessionStorage.getItem('userAnswers') || '[]');
    this.currentScenarioNumber = parseInt(sessionStorage.getItem('currentScenario')) || 1;
    
    this.ensureScenarioPool();
    this.preventBackNavigation();
    this.restrictNavToHome();
    this.loadScenario();
    this.setupScenarioEvents();
  }

  /**
   * Initialize feedback page after scenario answer
   */
  initFeedbackPage() {
    this.userName = sessionStorage.getItem('userName') || 'User';
    this.userScore = parseInt(sessionStorage.getItem('userScore')) || 0;
    this.userAnswers = JSON.parse(sessionStorage.getItem('userAnswers') || '[]');
    this.currentScenarioNumber = parseInt(sessionStorage.getItem('currentScenario')) || 1;

    this.preventBackNavigation();
    this.restrictNavToHome();
    this.renderFeedbackPage();
  }

  /**
   * Render feedback page content
   */
  renderFeedbackPage() {
    const feedbackContainer = document.getElementById('feedbackContainer');
    if (!feedbackContainer) return;

    const feedbackData = JSON.parse(sessionStorage.getItem('feedbackData') || '{}');
    if (!feedbackData || typeof feedbackData.isCorrect !== 'boolean') {
      window.location.href = './scenario.html';
      return;
    }

    const headerClass = feedbackData.isCorrect ? 'correct' : 'incorrect';
    const titleText = feedbackData.isCorrect ? i18n.t('feedback.greatJob') : i18n.t('feedback.notQuiteRight');
    const subtitleText = feedbackData.isCorrect ? i18n.t('feedback.correctThreat') : i18n.t('feedback.learnScenario');
    const categoryText = feedbackData.category || i18n.t('feedback.generalScam');
    const shouldKnowText = feedbackData.shouldKnow || feedbackData.explanation || '';
    const redFlags = Array.isArray(feedbackData.redFlags) ? feedbackData.redFlags : [];
    const iconChar = feedbackData.isCorrect ? '✓' : '✕';
    const iconClass = feedbackData.isCorrect ? 'correct' : 'incorrect';

    const redFlagsHtml = redFlags.length
      ? `<ul class="feedback-list">${redFlags.map(flag => `<li>${flag}</li>`).join('')}</ul>`
      : `<p>${i18n.t('feedback.noRedFlags')}</p>`;

    const isLastScenario = this.currentScenarioNumber >= this.totalScenarios;
    const nextButtonLabel = isLastScenario ? i18n.t('feedback.viewFinalResults') : i18n.t('feedback.nextScenario');

    feedbackContainer.innerHTML = `
      <div class="feedback-hero ${headerClass}">
        <div class="feedback-icon ${iconClass}">
          <span class="feedback-icon-outer">
            <span class="feedback-icon-inner">${iconChar}</span>
          </span>
        </div>
        <div class="feedback-hero-copy">
          <h1>${titleText}</h1>
          <p>${subtitleText}</p>
        </div>
      </div>
      <div class="feedback-board">
        <div class="feedback-note">
          <h4>${i18n.t('feedback.whatYouShouldKnow')}</h4>
          <p>${shouldKnowText}</p>
        </div>
        <div class="feedback-section feedback-flags">
          <h4>${i18n.t('feedback.redFlagsDetected')}</h4>
          ${redFlagsHtml}
        </div>
        <p class="feedback-category">${i18n.t('feedback.category')}: ${categoryText}</p>
        <div class="feedback-actions">
          <button class="btn btn-primary btn-full" id="nextScenarioBtn">${nextButtonLabel}</button>
        </div>
      </div>
    `;

    document.getElementById('nextScenarioBtn').addEventListener('click', () => {
      if (isLastScenario) {
        window.location.href = './result.html';
      } else {
        const nextNumber = this.currentScenarioNumber + 1;
        sessionStorage.setItem('currentScenario', nextNumber);
        window.location.href = './scenario.html';
      }
    });
  }
  
  /**
   * Load scenario data
   */
  async loadScenario() {
    try {
      this.showLoading();
      this.currentScenario = await API.getScenario(this.currentScenarioNumber);
      this.renderScenario();
      this.hideLoading();
    } catch (error) {
      console.error('Error loading scenario:', error);
      this.showAlert('error.loadingError', 'danger');
    }
  }

  /**
   * Ensure a scenario pool exists for the current session
   */
  ensureScenarioPool() {
    const poolJson = sessionStorage.getItem('scenarioPool');
    let pool = null;
    try {
      pool = poolJson ? JSON.parse(poolJson) : null;
    } catch (error) {
      pool = null;
    }

    if (!Array.isArray(pool) || pool.length !== this.totalScenarios) {
      const newPool = API.generateScenarioPool(this.totalScenarios);
      sessionStorage.setItem('scenarioPool', JSON.stringify(newPool));
    }
  }
  
  /**
   * Render scenario on the page
   */
  renderScenario() {
    // Update scenario title
    const titleEl = document.getElementById('scenarioTitle');
    if (titleEl) {
      titleEl.textContent = i18n.t('scenario.title', {
        number: this.currentScenarioNumber
      });
    }
    
    // Update score
    const scoreEl = document.getElementById('scenarioScore');
    if (scoreEl) {
      scoreEl.textContent = i18n.t('scenario.score', {
        current: this.userScore,
        total: this.totalScenarios * this.pointsPerScenario
      });
    }
    
    // Update progress bar
    const progressFill = document.getElementById('progressFill');
    if (progressFill) {
      const progress = (this.currentScenarioNumber / this.totalScenarios) * 100;
      progressFill.style.width = progress + '%';
    }
    
    // Render scenario content
    const contentEl = document.getElementById('scenarioContent');
    if (contentEl && this.currentScenario) {
      const typeIcons = {
        email: '📧',
        sms: '📱',
        social_media: '💬',
        linkedin: '💼',
        website: '🌐'
      };
      const scenarioIcon = typeIcons[this.currentScenario.type] || '💡';
      const scenarioTypeLabel = i18n.t(`scenario.${this.currentScenario.type}`) || this.currentScenario.type;

      const isCongratsCard = this.currentScenario.layout === 'congrats';
      const isSocialCard = this.currentScenario.type === 'social_media';
      const isWebsiteCard = this.currentScenario.type === 'website';
      const isEmailCard = this.currentScenario.type === 'email';
      const headerLabel = isCongratsCard
        ? i18n.t('scenario.congratulations')
        : isEmailCard
          ? i18n.t('scenario.inbox')
          : this.currentScenario.sender || scenarioTypeLabel;

      contentEl.innerHTML = `
        ${isCongratsCard ? `
          <div class="scenario-congrats-card card mb-lg">
            <div class="congrats-hero">
              <div class="congrats-icon">🎁</div>
              <h2>${i18n.t('scenario.congratulations')} ✨</h2>
            </div>
            <div class="congrats-body">
              <p>${this.currentScenario.content}</p>
              <div class="congrats-timer">
                <span>05:00</span>
                <small>${i18n.t('scenario.timeRemaining')}</small>
              </div>
              <div class="congrats-form">
                <input type="text" placeholder="${i18n.t('simulation.namePlaceholder')}" readonly />
                <input type="email" placeholder="${i18n.t('simulation.namePlaceholder')}" readonly />
                <input type="tel" placeholder="${i18n.t('simulation.namePlaceholder')}" readonly />
              </div>
              <button class="btn btn-primary btn-full congrats-cta" disabled>${i18n.t('scenario.claimPrize')}</button>
              <p class="congrats-note">${i18n.t('scenario.congratsNote')}</p>
            </div>
          </div>
        ` : isWebsiteCard ? `
          <div class="scenario-website-card card mb-lg">
            <div class="website-bar">
              <div class="website-bar-left">
                <span class="website-dot"></span>
                <span class="website-dot"></span>
                <span class="website-dot"></span>
              </div>
              <div class="website-address">${i18n.t('scenario.notSecure')}  ${this.currentScenario.sender}</div>
            </div>
            <div class="website-content">
              <div class="website-icon">🔒</div>
              <h3>${i18n.t('scenario.welcomeBank')}</h3>
              <form class="website-form">
                <label>${i18n.t('scenario.usernameOrEmail')}</label>
                <input type="text" placeholder="${i18n.t('scenario.usernameOrEmail')}" readonly />
                <label>${i18n.t('scenario.password')}</label>
                <input type="password" placeholder="${i18n.t('scenario.password')}" readonly />
                <button class="website-submit" disabled>${i18n.t('scenario.signIn')}</button>
              </form>
              <p class="website-footnote">${i18n.t('scenario.terms')}</p>
            </div>
          </div>
        ` : this.currentScenario.type === 'sms' ? `
          <div class="scenario-card card mb-lg sms-card">
            <div class="scenario-card-top">
              <div class="scenario-card-label">
                <span class="icon-circle primary small">${scenarioIcon}</span>
                <span>${headerLabel}</span>
              </div>
              <button type="button" class="icon-btn" aria-label="More">•••</button>
            </div>
            <div class="scenario-message sms-message">
              <div class="sms-header">
                <span class="sms-icon">📩</span>
                <div>
                  <strong>${this.currentScenario.title}</strong>
                  <p class="text-gray small">${i18n.t('scenario.sms')} · ${i18n.t('scenario.justNow')}</p>
                </div>
              </div>
              <div class="sms-bubble">
                <p style="white-space: pre-wrap; margin: 0;">${this.currentScenario.content}</p>
              </div>
            </div>
          </div>
        ` : this.currentScenario.type === 'linkedin' ? `
          <div class="scenario-card card mb-lg linkedin-card">
            <div class="scenario-card-top">
              <div class="scenario-card-label">
                <span class="icon-circle primary small">${scenarioIcon}</span>
                <span>${headerLabel}</span>
              </div>
              <button type="button" class="icon-btn" aria-label="More">•••</button>
            </div>
            <div class="scenario-message linkedin-message">
              <div class="linkedin-header">
                <div>
                  <strong>${this.currentScenario.title}</strong>
                  <p class="text-gray small">${this.currentScenario.sender || 'LinkedIn'} · ${i18n.t('scenario.invitation')}</p>
                </div>
              </div>
              <div class="linkedin-bubble">
                <p style="white-space: pre-wrap; margin: 0;">${this.currentScenario.content}</p>
              </div>
            </div>
          </div>
        ` : isSocialCard ? `
          <div class="scenario-card social_media card mb-lg">
            <div class="scenario-card-top">
              <div class="scenario-card-label">
                <span class="icon-circle primary small">${scenarioIcon}</span>
                <span>${headerLabel}</span>
              </div>
              <button type="button" class="icon-btn" aria-label="More">•••</button>
            </div>
            <div class="scenario-message social-media-message">
              <div class="social-message-header">
                <div class="social-avatar">${scenarioIcon}</div>
                <div>
                  <strong>${this.currentScenario.title}</strong>
                  <p class="text-gray small">${i18n.t('scenario.sentYouMessage')} · ${i18n.t('scenario.justNow')}</p>
                </div>
              </div>
              <div class="social-bubble">
                <p style="white-space: pre-wrap; margin: 0;">${this.currentScenario.content}</p>
              </div>
              <div class="social-actions">
                <button type="button" class="social-action">${i18n.t('scenario.like')}</button>
                <button type="button" class="social-action">${i18n.t('scenario.reply')}</button>
                <button type="button" class="social-action">${i18n.t('scenario.share')}</button>
              </div>
            </div>
          </div>
        ` : `
          <div class="scenario-card card mb-lg email-card">
            <div class="scenario-card-top">
              <div class="scenario-card-label">
                <span class="icon-circle primary small">${scenarioIcon}</span>
                <span>${headerLabel}</span>
              </div>
              <div class="scenario-card-actions">
                <button type="button" class="icon-btn" aria-label="${i18n.t('scenario.archive')}">📥</button>
                <button type="button" class="icon-btn" aria-label="${i18n.t('scenario.delete')}">🗑️</button>
              </div>
            </div>
            <div class="scenario-message email-message">
              <div class="email-header">
                <div class="email-icon">${scenarioIcon}</div>
                <div>
                  <h4>${this.currentScenario.title}</h4>
                  <p class="text-gray small">${i18n.t('scenario.from')}: ${this.currentScenario.sender || 'Unknown'} · ${i18n.t('scenario.justNow')}</p>
                </div>
                <button class="icon-btn" type="button" aria-label="${i18n.t('scenario.star')}">★</button>
              </div>
              <div class="email-body">
                <p style="white-space: pre-wrap; margin: 0;">${this.currentScenario.content}</p>
              </div>
            </div>
          </div>
        `}
        
        <div class="options-section mb-lg">
          <h5>${i18n.t('scenario.whatWould')}</h5>
          <div class="options-container" id="optionsContainer"></div>
        </div>
        
        <div id="feedbackSection" class="hidden"></div>
      `;
      
      // Render answer options
      this.renderAnswerOptions();
    }
  }
  
  /**
   * Render answer options
   */
  renderAnswerOptions() {
    const container = document.getElementById('optionsContainer');
    if (!container || !this.currentScenario) return;
    
    container.innerHTML = '';
    
    const optionCount = this.currentScenario.answers.length;
    this.currentScenario.answers.forEach((answer, index) => {
      const btn = document.createElement('button');
      const optionStyle = this.getOptionStyle(index, optionCount);
      btn.className = `option-btn ${optionStyle}`;
      btn.innerHTML = `
        <span class="option-number">${index + 1}.</span>
        <span>${answer.text}</span>
      `;
      btn.addEventListener('click', () => this.handleAnswerSelect(answer, btn));
      container.appendChild(btn);
    });
  }

  /**
   * Choose the answer button style for each option
   */
  getOptionStyle(index, totalOptions) {
    if (totalOptions === 2) {
      return index === 1 ? 'option-style-black' : 'option-style-white';
    }

    const palette = [
      'option-style-white',
      'option-style-black',
      'option-style-yellow'
    ];

    return palette[index % palette.length];
  }
  
  /**
   * Handle answer selection
   */
  async handleAnswerSelect(answer, btnElement) {
    if (this.isAnswered) return;
    
    this.isAnswered = true;
    
    // Mark all buttons as disabled
    document.querySelectorAll('.option-btn').forEach(btn => {
      btn.disabled = true;
      btn.classList.add('disabled');
    });
    
    // Mark selected button
    btnElement.classList.add('selected');
    
    try {
      // Submit answer to backend
      const feedback = await API.submitAnswer(this.currentScenario.id, answer.id);
      
      // Determine if correct
      const isCorrect = answer.correct;
      
      // Update score
      if (isCorrect) {
        this.userScore += this.pointsPerScenario;
        btnElement.classList.add('correct');
      } else {
        btnElement.classList.add('incorrect');
      }
      
      // Save answer
      this.userAnswers.push({
        scenario: this.currentScenarioNumber,
        answer: answer.text,
        correct: isCorrect,
        points: isCorrect ? this.pointsPerScenario : 0
      });
      
      // Save score to session
      sessionStorage.setItem('userScore', this.userScore);
      sessionStorage.setItem('userAnswers', JSON.stringify(this.userAnswers));

      // Save feedback preview and go to separate feedback page
      const feedbackData = {
        scenarioNumber: this.currentScenarioNumber,
        scenarioId: this.currentScenario.id,
        isCorrect,
        title: isCorrect ? i18n.t('feedback.greatJob') : i18n.t('feedback.notQuiteRight'),
        subtitle: isCorrect ? i18n.t('feedback.correctThreat') : i18n.t('feedback.learnScenario'),
        explanation: this.currentScenario.explanation,
        shouldKnow: this.currentScenario.shouldKnow || this.currentScenario.explanation,
        redFlags: this.currentScenario.redFlags || [],
        category: this.currentScenario.category || this.currentScenario.type,
        selectedAnswer: answer.text
      };
      sessionStorage.setItem('feedbackData', JSON.stringify(feedbackData));
      window.location.href = './feedback.html';
    } catch (error) {
      console.error('Error submitting answer:', error);
      this.showAlert('error.serverError', 'danger');
    }
  }
  
  /**
   * Show feedback after answer
   */
  showFeedback(isCorrect, feedback) {
    const feedbackSection = document.getElementById('feedbackSection');
    if (!feedbackSection) return;
    
    feedbackSection.classList.remove('hidden');
    
    const feedbackClass = isCorrect ? 'success' : 'danger';
    const feedbackTitle = isCorrect ? i18n.t('feedback.correct') : i18n.t('feedback.incorrect');
    
    feedbackSection.innerHTML = `
      <div class="alert alert-${feedbackClass} mb-lg">
        <h5>${feedbackTitle}</h5>
      </div>
      
      <div class="card mb-lg">
        <h6>${i18n.t('feedback.explanation')}</h6>
        <p>${this.currentScenario.explanation}</p>
        
        ${this.currentScenario.redFlags ? `
          <h6 class="mt-lg">${i18n.t('feedback.tips')}</h6>
          <ul style="margin-left: 20px; color: var(--text-gray);">
            ${this.currentScenario.redFlags.map(flag => `<li>${flag}</li>`).join('')}
          </ul>
        ` : ''}
      </div>
      
      <div id="nextSection"></div>
    `;
    
    // Add next/result button
    this.addNavigationButton();
  }
  
  /**
   * Add navigation button after feedback
   */
  addNavigationButton() {
    const nextSection = document.getElementById('nextSection');
    if (!nextSection) return;
    
    if (this.currentScenarioNumber < this.totalScenarios) {
      const btn = document.createElement('button');
      btn.className = 'btn btn-primary btn-full';
      btn.textContent = i18n.t('scenario.next');
      btn.addEventListener('click', () => this.nextScenario());
      nextSection.appendChild(btn);
    } else {
      const btn = document.createElement('button');
      btn.className = 'btn btn-success btn-full';
      btn.textContent = i18n.t('result.viewResults');
      btn.addEventListener('click', () => this.goToResults());
      nextSection.appendChild(btn);
    }
  }
  
  /**
   * Go to next scenario
   */
  nextScenario() {
    if (this.currentScenarioNumber < this.totalScenarios) {
      this.currentScenarioNumber++;
      sessionStorage.setItem('currentScenario', this.currentScenarioNumber);
      this.isAnswered = false;
      this.loadScenario();
    }
  }
  
  /**
   * Go to results page
   */
  goToResults() {
    // Save final data
    sessionStorage.setItem('simulationComplete', 'true');
    window.location.href = './result.html';
  }
  
  /**
   * Initialize Result Page
   */
  initResultPage() {
    this.userName = sessionStorage.getItem('userName') || 'User';
    this.userScore = parseInt(sessionStorage.getItem('userScore')) || 0;
    this.userAnswers = JSON.parse(sessionStorage.getItem('userAnswers') || '[]');
    
    this.renderResults();
  }
  
  /**
   * Render results
   */
  renderResults() {
    const totalPoints = this.totalScenarios * this.pointsPerScenario;
    const accuracy = (this.userScore / totalPoints) * 100;
    const awarenessLevel = this.getAwarenessLevel(accuracy);
    const awarenessClass = this.getAwarenessLevelClass(accuracy);
    const correctCount = Math.round(this.userScore / this.pointsPerScenario);
    const scorePercentage = Number.isFinite(accuracy) ? accuracy.toFixed(0) : '0';
    
    const resultsContainer = document.getElementById('resultsContainer');
    if (!resultsContainer) return;
    
    resultsContainer.innerHTML = `
      <div class="results-hero text-center mb-2xl">
        <div class="results-icon results-icon-emoji">
          <span class="emoji-silver" aria-hidden="true">🏆</span>
        </div>
        <h1>${i18n.t('result.wellDone', { name: this.userName })}</h1>
        <p class="results-subtitle">${i18n.t('result.completed')}</p>
      </div>
      
      <div class="results-card card mb-2xl">
        <div class="results-score-circle">
          <span class="score-main">${this.userScore}</span>
          <span class="score-unit">/${totalPoints}</span>
        </div>
        <h3>${i18n.t('result.title')}</h3>
        <p>${i18n.t('result.correctlyIdentified', { count: correctCount, total: this.totalScenarios })}</p>
        <div class="grid grid-3 mt-2xl">
          <div class="stat-card score-box accuracy-box text-center">
            <span class="stat-value">${scorePercentage}%</span>
            <p>${i18n.t('result.accuracy')}</p>
          </div>
          <div class="stat-card score-box awareness-box text-center">
            <span class="awareness-pill ${awarenessClass}">${awarenessLevel}</span>
            <p>${i18n.t('result.awareness')}</p>
          </div>
          <div class="stat-card score-box scenarios-box text-center">
            <span class="stat-value">${this.totalScenarios}</span>
            <p>${i18n.t('result.scenarios')}</p>
          </div>
        </div>
      </div>
      
      <div class="grid grid-2 mb-2xl gap-xl">
        <div class="card result-summary-card">
          <div class="summary-title">
            <span class="summary-icon summary-icon-strengths">✓</span>
            ${i18n.t('result.strengths')}
          </div>
          <ul id="strengthsList" class="summary-list summary-list-strengths"></ul>
        </div>
        <div class="card result-summary-card">
          <div class="summary-title">
            <span class="summary-icon summary-icon-improve">↗</span>
            ${i18n.t('result.improve')}
          </div>
          <ul id="improvementAreas" class="summary-list summary-list-improve"></ul>
        </div>
      </div>
      
      <div class="card recommendations-card mb-2xl">
        <div class="recommendations-title">
          <span class="icon-circle warning">!</span>
          <h4>${i18n.t('result.securityRecommendations')}</h4>
        </div>
        <ol class="recommendations-list">
          <li>${i18n.t('result.recommendation1')}</li>
          <li>${i18n.t('result.recommendation2')}</li>
          <li>${i18n.t('result.recommendation3')}</li>
          <li>${i18n.t('result.recommendation4')}</li>
          <li>${i18n.t('result.recommendation5')}</li>
        </ol>
      </div>
      
      <div class="flex gap-md result-actions">
        <button class="btn btn-dark" onclick="window.location.href='./simulation.html'">
          ${i18n.t('result.restart')}
        </button>
        <button class="btn btn-light" onclick="window.location.href='../index.html'">
          <span class="home-icon"></span>
          ${i18n.t('result.back')}
        </button>
      </div>
    `;
    
    this.renderResultLists();
  }
  
  /**
   * Get awareness level based on accuracy
   */
  getAwarenessLevel(accuracy) {
    if (accuracy >= 80) return i18n.t('result.expert');
    if (accuracy >= 60) return i18n.t('result.advanced');
    if (accuracy >= 40) return i18n.t('result.intermediate');
    if (accuracy >= 20) return i18n.t('result.developing');
    return i18n.t('result.beginner');
  }

  getAwarenessLevelClass(accuracy) {
    if (accuracy >= 80) return 'expert';
    if (accuracy >= 60) return 'advanced';
    if (accuracy >= 40) return 'intermediate';
    if (accuracy >= 20) return 'developing';
    return 'beginner';
  }
  
  /**
   * Render improvement areas
   */
  renderResultLists() {
    const correctAnswers = this.userAnswers.filter(a => a.correct);
    const incorrectAnswers = this.userAnswers.filter(a => !a.correct);
    const strengthsList = document.getElementById('strengthsList');
    const improvementList = document.getElementById('improvementAreas');

    if (strengthsList) {
      strengthsList.innerHTML = correctAnswers.length
        ? correctAnswers.map(answer => `<li>${answer.answer}</li>`).join('')
        : `<li>${i18n.t('result.reviewScenario')}</li>`;
    }

    if (improvementList) {
      improvementList.innerHTML = incorrectAnswers.length
        ? incorrectAnswers.map(answer => `<li>${answer.answer}</li>`).join('')
        : `<li>${i18n.t('result.greatJobNoImprovement')}</li>`;
    }
  }
  
  /**
   * Initialize Alerts Page
   */
  initAlertsPage() {
    // Alerts page doesn't need special initialization
    // Content is loaded from HTML
  }
  
  /**
   * Initialize About Page
   */
  initAboutPage() {
    // About page doesn't need special initialization
  }
  
  /**
   * Setup scenario events
   */
  setupScenarioEvents() {
    // Any additional event setup for scenario page
  }

  /**
   * Clear simulation progress when leaving mid-session
   */
  clearSimulationProgress() {
    sessionStorage.removeItem('scenarioPool');
    sessionStorage.removeItem('currentScenario');
    sessionStorage.removeItem('userScore');
    sessionStorage.removeItem('userAnswers');
    sessionStorage.removeItem('feedbackData');
    sessionStorage.removeItem('simulationComplete');
  }

  /**
   * Return true when a simulation session is in progress
   */
  isSimulationActive() {
    const pool = sessionStorage.getItem('scenarioPool');
    const complete = sessionStorage.getItem('simulationComplete') === 'true';
    return pool && !complete;
  }

  /**
   * Prevent back navigation during scenario/feedback flow
   */
  preventBackNavigation() {
    window.history.pushState(null, null, window.location.href);
    window.addEventListener('popstate', () => {
      window.history.pushState(null, null, window.location.href);
    });
  }

  /**
   * Show only home link in navigation during active simulation
   */
  restrictNavToHome() {
    document.querySelectorAll('.nav-links li').forEach((item, index) => {
      if (index === 0) {
        item.style.display = 'list-item';
      } else {
        item.style.display = 'none';
      }
    });
  }

  /**
   * Handle navigation
   */
  handleNavigation(e) {
    const href = e.currentTarget.getAttribute('href');
    if (!href || href === '#') {
      e.preventDefault();
      return;
    }

    if (this.isSimulationActive() && href.includes('index.html')) {
      e.preventDefault();
      this.clearSimulationProgress();
      window.location.href = href;
      return;
    }

    if (this.isSimulationActive() && !href.includes('result.html')) {
      e.preventDefault();
      this.clearSimulationProgress();
      window.location.href = href;
      return;
    }

    e.preventDefault();
    window.location.href = href;
  }
  
  /**
   * Update page layout after language change
   */
  updatePageLayout() {
    // Re-render current page content if needed
    const path = window.location.pathname;
    
    if (path.includes('scenario.html')) {
      this.renderScenario();
    } else if (path.includes('feedback.html')) {
      this.renderFeedbackPage();
    } else if (path.includes('result.html')) {
      this.renderResults();
    }
  }
  
  /**
   * Show alert message
   */
  showAlert(messageKey, type = 'info') {
    const message = i18n.t(messageKey);
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.textContent = message;
    
    // Find or create alerts container
    let alertContainer = document.getElementById('alertsContainer');
    if (!alertContainer) {
      alertContainer = document.createElement('div');
      alertContainer.id = 'alertsContainer';
      alertContainer.style.position = 'fixed';
      alertContainer.style.top = '100px';
      alertContainer.style.right = '20px';
      alertContainer.style.zIndex = '1000';
      alertContainer.style.maxWidth = '300px';
      document.body.appendChild(alertContainer);
    }
    
    alertContainer.appendChild(alertDiv);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
      alertDiv.remove();
    }, 5000);
  }
  
  /**
   * Show loading spinner
   */
  showLoading() {
    let loader = document.getElementById('loadingSpinner');
    if (!loader) {
      loader = document.createElement('div');
      loader.id = 'loadingSpinner';
      loader.className = 'spinner';
      loader.style.position = 'fixed';
      loader.style.top = '50%';
      loader.style.left = '50%';
      loader.style.transform = 'translate(-50%, -50%)';
      loader.style.zIndex = '9999';
      document.body.appendChild(loader);
    }
    loader.classList.remove('hidden');
  }
  
  /**
   * Hide loading spinner
   */
  hideLoading() {
    const loader = document.getElementById('loadingSpinner');
    if (loader) {
      loader.classList.add('hidden');
    }
  }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.app = new SimulationApp();
});
