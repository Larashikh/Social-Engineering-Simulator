// ============================================
// Social Engineering Simulator - Language Manager
// ============================================

class LanguageManager {
  constructor() {
    this.currentLanguage = localStorage.getItem('language') || 'en';
    this.translations = {
      en: {
        // Navigation
        'nav.simulator': 'Social Engineering Simulator',
        'nav.home': 'Home',
        'nav.alerts': 'Alerts',
        'nav.leaderboard': 'Leaderboard',
        'nav.about': 'About Us',
        'nav.language': 'عربي',
        
        // Home Page
        'home.title': 'Train Yourself Against Social Engineering Attacks',
        'home.subtitle': 'Experience interactive cybersecurity simulations designed to protect you from phishing, scams, and manipulation attacks.',
        'home.start': 'Start Simulation',
        'home.heroBtnTooltip': "You'll face 5 random scenarios designed to test your awareness",
        
        // Alerts Page
        'alerts.title': 'Latest Scam Alerts',
        'alerts.subtitle': 'Stay informed about the newest threats',
        'alerts.phishing': 'Fake Bank Verification Email',
        'alerts.phishing.desc': 'Phishing emails claiming urgent account verification',
        'alerts.sms': 'Fake Delivery SMS',
        'alerts.sms.desc': 'Scammers impersonating delivery services',
        'alerts.instagram': 'Instagram Account Scam',
        'alerts.instagram.desc': 'Fake messages threatening account deletion',
        'alerts.website': 'Fake Website',
        'alerts.website.desc': 'Fraudulent websites impersonating legitimate companies',
        'alerts.topScores': 'Top awareness scores',
        'alerts.redFlags': 'Red Flags:',
        'alerts.redFlags1': 'Suspicious links, urgent tone, requests for credentials',
        'alerts.redFlags2': 'Shortened URLs, unexpected messages, urgency',
        'alerts.redFlags3': 'Account deletion threats, verification links, time pressure',
        'alerts.redFlags4': 'URL typos, poor design, payment requests',
        'alerts.tipsTitle': 'How to Protect Yourself',
        'alerts.tip1Title': 'Verify Before Clicking',
        'alerts.tip1Text': 'Always verify links and sender information through official channels before taking action.',
        'alerts.tip2Title': 'Enable 2FA',
        'alerts.tip2Text': 'Use two-factor authentication on all important accounts for added security.',
        'alerts.tip3Title': 'Stay Updated',
        'alerts.tip3Text': 'Keep your software and systems updated with the latest security patches.',
        'alerts.tip4Title': 'Report Scams',
        'alerts.tip4Text': 'Report suspicious emails, messages, and websites to relevant authorities.',
        'alerts.tip5Title': 'Trust Your Instinct',
        'alerts.tip5Text': 'If something feels wrong, take a moment to verify before responding.',
        'alerts.tip6Title': 'Never Share Credentials',
        'alerts.tip6Text': 'Legitimate organizations never ask for passwords via email or message.',
        'alerts.ctaTitle': 'Test Your Knowledge',
        'alerts.ctaText': 'Now that you know the warning signs, test your ability to recognize these scams in real-world scenarios.',
        'alerts.ctaButton': 'Start Simulation',
        
        // Begin Simulation Page
        'simulation.title': 'Begin Your Journey',
        'simulation.subtitle': 'Enter your name to start the cybersecurity awareness simulation',
        'simulation.name': 'Your Name',
        'simulation.namePlaceholder': 'Enter your name',
        'simulation.startBtn': 'Start Simulation',
        'simulation.hint': "You'll face 5 random scenarios designed to test your awareness",
        'simulation.back': '← Back to home',
        
        // Simulation Page
        'scenario.title': 'Scenario {{number}} of 5',
        'scenario.score': 'Score: {{current}}/{{total}}',
        'scenario.sender': 'Sender',
        'scenario.inbox': 'Inbox',
        'scenario.email': 'Email',
        'scenario.sms': 'SMS Message',
        'scenario.social_media': 'Social Media',
        'scenario.linkedin': 'LinkedIn',
        'scenario.website': 'Website',
        'scenario.message': 'Message',
        'scenario.whatWould': 'What would you do?',
        'scenario.openLink': 'Open Link / Attachment',
        'scenario.verifyOfficial': 'Verify Through Official Channel',
        'scenario.deleteReport': 'Delete & Report as Spam',
        'scenario.reportScam': 'Report as Scam',
        'scenario.ignore': 'Ignore and Delete',
        'scenario.next': 'Next Scenario',
        'scenario.submit': 'Submit Answer',
        'scenario.congratulations': 'Congratulations!',
        'scenario.timeRemaining': 'Time remaining to claim',
        'scenario.congratsNote': '* By claiming you agree to receive promotional emails and calls.',
        'scenario.notSecure': 'Not Secure',
        'scenario.welcomeBank': 'Welcome to Bank of America Online Banking',
        'scenario.usernameOrEmail': 'Username or Email',
        'scenario.password': 'Password',
        'scenario.signIn': 'Sign In',
        'scenario.terms': 'By signing in, you agree to our Terms of Service',
        'scenario.sentYouMessage': 'Sent you a message',
        'scenario.justNow': 'Just now',
        'scenario.like': 'Like',
        'scenario.reply': 'Reply',
        'scenario.share': 'Share',
        'scenario.from': 'From',
        'scenario.invitation': 'Invitation',
        'scenario.archive': 'Archive',
        'scenario.delete': 'Delete',
        'scenario.star': 'Star',
        'scenario.claimPrize': 'CLAIM YOUR PRIZE NOW!',
        
        // Feedback
        'feedback.correct': 'Correct! 🎉',
        'feedback.incorrect': 'Incorrect. Try again.',
        'feedback.explanation': 'Explanation',
        'feedback.tips': 'Protection Tips',
        'feedback.greatJob': 'Great Job!',
        'feedback.notQuiteRight': 'Not Quite Right',
        'feedback.correctThreat': 'You correctly identified the threat',
        'feedback.learnScenario': "Let's learn from this scenario",
        'feedback.whatYouShouldKnow': 'What You Should Know:',
        'feedback.redFlagsDetected': 'Red Flags Detected:',
        'feedback.category': 'Category',
        'feedback.noRedFlags': 'No red flags identified.',
        'feedback.nextScenario': 'Next Scenario',
        'feedback.viewFinalResults': 'View Final Results',
        'feedback.generalScam': 'General Scam',
        'feedback.completedSimulation': 'You have completed the cybersecurity awareness simulation',
        
        // Results Page
        'result.title': 'Your Score',
        'result.accuracy': 'Accuracy',
        'result.awareness': 'Awareness Level',
        'result.scenarios': 'Scenarios Completed',
        'result.points': 'Points',
        'result.strengths': 'Strengths',
        'result.improve': 'Areas to Improve',
        'result.beginner': 'Beginner',
        'result.developing': 'Developing',
        'result.intermediate': 'Intermediate',
        'result.advanced': 'Advanced',
        'result.expert': 'Expert',
        'result.restart': 'Restart Simulation',
        'result.back': '← Back to home',
        'result.wellDone': 'Well Done, {{name}}',
        'result.completed': 'You have completed the cybersecurity awareness simulation',
        'result.correctlyIdentified': 'You correctly identified {{count}} out of {{total}} threats',
        'result.securityRecommendations': 'Security Recommendations',
        'result.reviewScenario': 'Review each scenario carefully to identify scams.',
        'result.greatJobNoImprovement': 'Great job! No areas identified for improvement.',
        'result.viewResults': 'View Results',
        'result.recommendation1': 'Always verify sender email addresses carefully before clicking links.',
        'result.recommendation2': 'Never share passwords or sensitive information through email or chat.',
        'result.recommendation3': 'Use official company websites by typing URLs directly, not through links.',
        'result.recommendation4': 'Enable two-factor authentication on all your important accounts.',
        'result.recommendation5': 'When in doubt, contact the organization through official channels.',
        'result.home': 'Home',
        
        // About Page
        'about.title': 'About This Project',
        'about.content': 'Social Engineering Simulator is an educational platform designed to help individuals recognize and defend against social engineering attacks through realistic simulations and interactive learning.',
        'about.madeBy': 'Developed by cybersecurity students passionate about making the digital world safer.',
        'about.copyright': '© 2026 Social Engineering Simulator',
        'about.whatIs': 'What is Social Engineering Simulator?',
        'about.whatIsText': 'Social Engineering Simulator is an educational platform designed to help individuals recognize and defend against social engineering attacks through realistic simulations and interactive learning. It provides a safe environment to practice identifying phishing emails, SMS scams, fake websites, and other common attack vectors.',
        'about.interactive': '🎯 Interactive Simulations',
        'about.interactiveText': 'Face realistic social engineering scenarios in a safe, controlled environment. Each scenario is designed to test your awareness and decision-making skills.',
        'about.feedback': '📊 Detailed Feedback',
        'about.feedbackText': 'After each scenario, receive comprehensive explanations of the attack, why your choice was correct or incorrect, and practical tips for protection.',
        'about.progress': '📈 Progress Tracking',
        'about.progressText': 'Monitor your cybersecurity awareness level with detailed scoring and an awareness assessment that helps you identify areas for improvement.',
        'about.realWorld': '🛡️ Real-World Threats',
        'about.realWorldText': 'Learn about the current threat landscape including phishing, SMS scams, fake websites, baiting attacks, and pretexting techniques used by attackers.',
        'about.projectInfo': 'Project Information',
        'about.techStack': 'Technology Stack',
        'about.techStackText': 'Built with modern web technologies:',
        'about.techList1': 'HTML5 for semantic markup',
        'about.techList2': 'CSS3 with Flexbox and Grid for responsive design',
        'about.techList3': 'Vanilla JavaScript for interactive functionality',
        'about.techList4': 'Fetch API for backend integration',
        'about.objectives': 'Objectives',
        'about.objectivesText': 'This project aims to:',
        'about.objectiveList1': 'Increase awareness of social engineering threats',
        'about.objectiveList2': 'Provide interactive cybersecurity training',
        'about.objectiveList3': 'Build critical thinking in security decisions',
        'about.objectiveList4': 'Create an engaging learning experience',
        'about.team': '👥 Who We Are',
        'about.teamText': 'Developed by cybersecurity students passionate about making the digital world safer. We believe that awareness and education are the first lines of defense against cyber threats.',
        'about.frontend': 'Frontend Development',
        'about.frontendText': 'UI/UX Design & HTML/CSS/JavaScript',
        'about.backend': 'Backend Development',
        'about.backendText': 'API Development & Data Management',
        'about.contentCreation': 'Content Creation',
        'about.contentCreationText': 'Scenario Design & Security Research',
        'about.ready': 'Ready to Get Started?',
        'about.step1': 'Read Alerts',
        'about.step1Text': 'Check out the latest scam alerts page to learn about current threats.',
        'about.step2': 'Start Simulation',
        'about.step2Text': 'Begin the interactive simulation to test your security knowledge.',
        'about.step3': 'Improve Skills',
        'about.step3Text': 'Review feedback and improve your cybersecurity awareness level.',
        'about.questions': 'Questions or Feedback?',
        'about.questionsText': "We'd love to hear from you. Feel free to reach out with any questions, suggestions, or feedback about the simulator.",
        'about.email': 'Email:',
        'about.github': 'GitHub:',
        'about.madeWith': 'Made with ❤️ by cybersecurity students',
        'nav.start': 'Start Simulation',
        'page.title.home': 'Social Engineering Simulator',
        'page.title.simulation': 'Begin Simulation - Social Engineering Simulator',
        'page.title.scenario': 'Scenario - Social Engineering Simulator',
        'page.title.feedback': 'Scenario Feedback - Social Engineering Simulator',
        'page.title.alerts': 'Latest Scam Alerts - Social Engineering Simulator',
        'page.title.about': 'About - Social Engineering Simulator',
        'page.title.result': 'Results - Social Engineering Simulator',
        
        // Alerts Page Details
        'alert1.title': 'Mandatory Password Update Required',
        'alert1.type': 'Phishing Email',
        'alert1.content': 'Our IT department requires all employees to update their passwords due to a security breach. Please click this link and enter your current password followed by your new password:\n\nhttp://company-portal-login.net/reset\n\nThis must be completed by end of day.',
        'alert1.sender': 'From: it.support@company-internal.com',
        
        'alert2.title': 'FedEx Delivery Attempt',
        'alert2.type': 'SMS Scam',
        'alert2.content': 'FedEx: We attempted delivery but no one was home. Reschedule at: fedex-resch.com Your package will return to sender in 24hrs.',
        
        'alert3.title': 'Instagram Account Warning',
        'alert3.type': 'Social Media Scam',
        'alert3.content': 'Instagram: Your account has suspicious activity. Verify your identity now or your account will be deleted.',
        
        // Red Flags & Tips
        'redFlags': 'Red Flags',
        'redFlagsContent': [
          'Urgent action requested',
          'Suspicious sender email',
          'Links that don\'t match official domains',
          'Requests for personal information',
          'Grammar and spelling errors'
        ],
        'protectionTips': 'How to Protect Yourself',
        'protectionTipsContent': [
          'Verify through official channels before clicking links',
          'Check sender email addresses carefully',
          'Enable two-factor authentication',
          'Keep software updated',
          'Report suspicious messages'
        ],
        
        // Validation Messages
        'validation.nameRequired': 'Please enter your name',
        'validation.nameTooShort': 'Name must be at least 2 characters',
        'validation.nameTooLong': 'Name must be less than 50 characters',
        
        // Loading States
        'loading.loadingScenario': 'Loading scenario...',
        'loading.submitting': 'Submitting answer...',
        'loading.loading': 'Loading...',
        
        // Leaderboard
        'leaderboard.title': 'Leaderboard',
        'leaderboard.rank': 'Rank',
        'leaderboard.name': 'Name',
        'leaderboard.score': 'Score',
        'leaderboard.level': 'Level',
        
        // Errors
        'error.serverError': 'Server error. Please try again.',
        'error.networkError': 'Network error. Please check your connection.',
        'error.loadingError': 'Error loading scenario. Please try again.',
      },
      ar: {
        // Navigation
        'nav.simulator': 'محاكي الهندسة الاجتماعية',
        'nav.home': 'الرئيسية',
        'nav.alerts': 'التنبيهات',
        'nav.leaderboard': 'لوحة المتصدرين',
        'nav.about': 'عن المشروع',
        'nav.language': 'English',
        
        // Home Page
        'home.title': 'تدرب على دفاع نفسك ضد هجمات الهندسة الاجتماعية',
        'home.subtitle': 'جرب محاكاة تفاعلية للأمن السيبراني مصممة لحمايتك من التصيد والغش والهجمات التلاعبية.',
        'home.start': 'بدء المحاكاة',
        'home.heroBtnTooltip': 'ستواجه 5 سيناريوهات عشوائية مصممة لاختبار وعيك',
        
        // Alerts Page
        'alerts.title': 'آخر تنبيهات الاحتيال',
        'alerts.subtitle': 'ابق مطلعاً على أحدث التهديدات',
        'alerts.phishing': 'بريد تحقق مزيف من البنك',
        'alerts.phishing.desc': 'رسائل تصيد الاحتيال تدعي تحقق حساب عاجل',
        'alerts.sms': 'رسالة نصية توصيل مزيفة',
        'alerts.sms.desc': 'محتالون يتنكرون كخدمات توصيل',
        'alerts.instagram': 'غش حساب إنستجرام',
        'alerts.instagram.desc': 'رسائل مزيفة تهدد بحذف الحساب',
        'alerts.website': 'موقع ويب مزيف',
        'alerts.website.desc': 'مواقع احتيالية تحاكي الشركات الشرعية',
        'alerts.topScores': 'أعلى درجات الوعي',
        'alerts.redFlags': 'علامات التحذير:',
        'alerts.redFlags1': 'روابط مشبوهة، لهجة عاجلة، طلبات للحصول على بيانات الحساب',
        'alerts.redFlags2': 'روابط مختصرة، رسائل غير متوقعة، ضغوط زمنية',
        'alerts.redFlags3': 'تهديدات بحذف الحساب، روابط تحقق، ضغوط زمنية',
        'alerts.redFlags4': 'أخطاء في عنوان الموقع، تصميم ضعيف، طلبات دفع',
        'alerts.tipsTitle': 'كيف تحمي نفسك',
        'alerts.tip1Title': 'تحقق قبل النقر',
        'alerts.tip1Text': 'تحقق دائمًا من الروابط ومعلومات المرسل عبر القنوات الرسمية قبل اتخاذ أي إجراء.',
        'alerts.tip2Title': 'فعّل المصادقة الثنائية',
        'alerts.tip2Text': 'استخدم المصادقة الثنائية على جميع الحسابات المهمة لإضافة طبقة حماية إضافية.',
        'alerts.tip3Title': 'ابقَ محدثًا',
        'alerts.tip3Text': 'حافظ على تحديث برامجك وأنظمتك بأحدث تصحيحات الأمان.',
        'alerts.tip4Title': 'الإبلاغ عن الاحتيال',
        'alerts.tip4Text': 'أبلغ عن الرسائل والبريد الإلكتروني والمواقع المشبوهة إلى الجهات المختصة.',
        'alerts.tip5Title': 'ثق بغرائزك',
        'alerts.tip5Text': 'إذا شعرت أن شيئًا ما ليس على ما يرام، خذ دقيقة للتحقق قبل الرد.',
        'alerts.tip6Title': 'لا تشارك بيانات الدخول',
        'alerts.tip6Text': 'المؤسسات الشرعية لا تطلب كلمات المرور عبر البريد الإلكتروني أو الرسائل.',
        'alerts.ctaTitle': 'اختبر معلوماتك',
        'alerts.ctaText': 'الآن وقد تعرفت على علامات التحذير، اختبر قدرتك على识别 (التعرف على) هذه الاحتيالات في سيناريوهات واقعية.',
        'alerts.ctaButton': 'ابدأ المحاكاة',
        
        // Begin Simulation Page
        'simulation.title': 'ابدأ رحلتك',
        'simulation.subtitle': 'أدخل اسمك لبدء محاكاة التوعية الأمنية السيبرانية',
        'simulation.name': 'اسمك',
        'simulation.namePlaceholder': 'أدخل اسمك',
        'simulation.startBtn': 'بدء المحاكاة',
        'simulation.hint': 'ستواجه 5 سيناريوهات عشوائية مصممة لاختبار وعيك',
        'simulation.back': '← العودة إلى الرئيسية',
        
        // Simulation Page
        'scenario.title': 'السيناريو {{number}} من 5',
        'scenario.score': 'النقاط: {{current}}/{{total}}',
        'scenario.sender': 'المرسل',
        'scenario.inbox': 'صندوق الوارد',
        'scenario.email': 'بريد إلكتروني',
        'scenario.sms': 'رسالة نصية',
        'scenario.social_media': 'وسائل التواصل الاجتماعي',
        'scenario.linkedin': 'لينكدإن',
        'scenario.website': 'موقع ويب',
        'scenario.message': 'الرسالة',
        'scenario.whatWould': 'ماذا ستفعل؟',
        'scenario.openLink': 'فتح الرابط / المرفق',
        'scenario.verifyOfficial': 'التحقق من القناة الرسمية',
        'scenario.deleteReport': 'حذف والإبلاغ كرسالة غير مرغوب',
        'scenario.reportScam': 'الإبلاغ كاحتيال',
        'scenario.ignore': 'تجاهل وحذف',
        'scenario.next': 'السيناريو التالي',
        'scenario.submit': 'إرسال الإجابة',
        'scenario.congratulations': 'تهانينا!',
        'scenario.timeRemaining': 'الوقت المتبقي للاستلام',
        'scenario.congratsNote': '* بالموافقة على المطالبة، فإنك توافق على استلام رسائل بريد إلكتروني ورسائل هاتفية ترويجية.',
        'scenario.notSecure': 'غير آمن',
        'scenario.welcomeBank': 'مرحبًا بك في الخدمات المصرفية عبر الإنترنت لبنك أوف أمريكا',
        'scenario.usernameOrEmail': 'اسم المستخدم أو البريد الإلكتروني',
        'scenario.password': 'كلمة المرور',
        'scenario.signIn': 'تسجيل الدخول',
        'scenario.terms': 'بالتسجيل، أنت توافق على شروط الخدمة',
        'scenario.sentYouMessage': 'أرسل لك رسالة',
        'scenario.justNow': 'الآن فقط',
        'scenario.like': 'إعجاب',
        'scenario.reply': 'رد',
        'scenario.share': 'مشاركة',
        'scenario.from': 'من',
        'scenario.invitation': 'دعوة',
        'scenario.archive': 'أرشفة',
        'scenario.delete': 'حذف',
        'scenario.star': 'نجمة',
        'scenario.claimPrize': 'احصل على جائزتك الآن!',
        
        // Feedback
        'feedback.correct': 'صحيح! 🎉',
        'feedback.incorrect': 'غير صحيح. حاول مرة أخرى.',
        'feedback.explanation': 'الشرح',
        'feedback.tips': 'نصائح الحماية',
        'feedback.greatJob': 'أحسنت!',
        'feedback.notQuiteRight': 'ليس صحيحًا تمامًا',
        'feedback.correctThreat': 'لقد تحديت التهديد بشكل صحيح',
        'feedback.learnScenario': 'لنتعلّم من هذا السيناريو',
        'feedback.whatYouShouldKnow': 'ماذا يجب أن تعرف:',
        'feedback.redFlagsDetected': 'العناصر التحذيرية المكتشفة:',
        'feedback.category': 'الفئة',
        'feedback.noRedFlags': 'لم يتم اكتشاف أي علامات تحذيرية.',
        'feedback.nextScenario': 'السيناريو التالي',
        'feedback.viewFinalResults': 'عرض النتائج النهائية',
        'feedback.generalScam': 'احتيال عام',
        'feedback.completedSimulation': 'لقد أكملت محاكاة الوعي الأمني السيبراني',
        
        // Results Page
        'result.title': 'نتيجتك',
        'result.accuracy': 'الدقة',
        'result.awareness': 'مستوى الوعي',
        'result.scenarios': 'السيناريوهات المكتملة',
        'result.points': 'النقاط',
        'result.strengths': 'نقاط القوة',
        'result.improve': 'مجالات التحسين',
        'result.beginner': 'مبتدئ',
        'result.developing': 'نامٍ',
        'result.intermediate': 'متوسط',
        'result.advanced': 'متقدم',
        'result.expert': 'خبير',
        'result.restart': 'إعادة تشغيل المحاكاة',
        'result.back': '← العودة إلى الرئيسية',
        'result.wellDone': 'أحسنت، {{name}}',
        'result.completed': 'لقد أكملت محاكاة الوعي الأمني السيبراني',
        'result.correctlyIdentified': 'لقد تحديت {{count}} من أصل {{total}} تهديدًا بشكل صحيح',
        'result.securityRecommendations': 'توصيات الأمان',
        'result.reviewScenario': 'راجع كل سيناريو بعناية لتحديد الاحتيال.',
        'result.greatJobNoImprovement': 'عمل رائع! لا توجد مجالات للتحسين.',
        'result.viewResults': 'عرض النتائج',
        'result.recommendation1': 'تحقق دائمًا من عناوين البريد الإلكتروني المرسلة قبل النقر على الروابط.',
        'result.recommendation2': 'لا تشارك كلمات المرور أو المعلومات الحساسة عبر البريد الإلكتروني أو الدردشة.',
        'result.recommendation3': 'استخدم مواقع الشركات الرسمية عن طريق كتابة عنوان الموقع مباشرةً بدلًا من الروابط.',
        'result.recommendation4': 'فعّل المصادقة الثنائية على جميع الحسابات المهمة.',
        'result.recommendation5': 'عند الشك، تواصل مع المؤسسة عبر القنوات الرسمية فقط.',
        'result.home': 'الرئيسية',
        
        // About Page
        'about.title': 'عن المشروع',
        'about.content': 'محاكي الهندسة الاجتماعية هو منصة تعليمية مصممة لمساعدة الأفراد على التعرف على دفاعهم ضد هجمات الهندسة الاجتماعية من خلال محاكاة واقعية وتعلم تفاعلي.',
        'about.madeBy': 'تم تطويره بواسطة طلاب الأمن السيبراني المتحمسين لجعل العالم الرقمي أكثر أماناً.',
        'about.copyright': '© 2026 محاكي الهندسة الاجتماعية',
        'about.whatIs': 'ما هو محاكي الهندسة الاجتماعية؟',
        'about.whatIsText': 'محاكي الهندسة الاجتماعية هو منصة تعليمية مصممة لمساعدة الأفراد على التعرف على الدفاع ضد هجمات الهندسة الاجتماعية من خلال محاكاة واقعية وتعلم تفاعلي. ويوفر بيئة آمنة للتدرب على识别 (التعرف على) رسائل التصيد الاحتيالي ورسائل SMS الاحتيالية والمواقع الوهمية والتهديدات الشائعة الأخرى.',
        'about.interactive': '🎯 المحاكاة التفاعلية',
        'about.interactiveText': 'واجه سيناريوهات واقعية للهندسة الاجتماعية في بيئة آمنة ومراقبة. تم تصميم كل سيناريو لاختبار وعيك وقدراتك على اتخاذ القرار.',
        'about.feedback': '📊 التغذية الراجعة التفصيلية',
        'about.feedbackText': 'بعد كل سيناريو، واحصل على شرح شامل للهجوم، ولماذا كان اختيارك صحيحًا أو خاطئًا، بالإضافة إلى نصائح عملية للحماية.',
        'about.progress': '📈 متابعة التقدم',
        'about.progressText': 'راقب مستوى وعيك بالأمن السيبراني من خلال نقاط تفصيلية وتقييم وعي يساعدك على تحديد مجالات التحسين.',
        'about.realWorld': '🛡️ التهديدات الواقعية',
        'about.realWorldText': 'تعرف على المشهد الحالي للتهديدات، بما في ذلك التصيد الاحتيالي، ورسائل SMS الاحتيالية، والمواقع الوهمية، وهجمات الإغراء، وتقنيات التمثيل المزيف المستخدمة من قبل المهاجمين.',
        'about.projectInfo': 'معلومات المشروع',
        'about.techStack': 'مكدس التكنولوجيا',
        'about.techStackText': 'تم بناؤه باستخدام تقنيات الويب الحديثة:',
        'about.techList1': 'HTML5 للتنظيم الدلالي',
        'about.techList2': 'CSS3 مع Flexbox و Grid للتصميم المتجاوب',
        'about.techList3': 'JavaScript النقي للوظائف التفاعلية',
        'about.techList4': 'Fetch API للتكامل مع الواجهة الخلفية',
        'about.objectives': 'الأهداف',
        'about.objectivesText': 'يهدف هذا المشروع إلى:',
        'about.objectiveList1': 'زيادة الوعي بتهديدات الهندسة الاجتماعية',
        'about.objectiveList2': 'توفير تدريب تفاعلي على الأمن السيبراني',
        'about.objectiveList3': 'بناء التفكير النقدي في قرارات الأمان',
        'about.objectiveList4': 'خلق تجربة تعليمية جذابة',
        'about.team': '👥 من نحن',
        'about.teamText': 'تم تطويره بواسطة طلاب الأمن السيبراني المتحمسين لجعل العالم الرقمي أكثر أمانًا. نحن نؤمن أن الوعي والتعليم هما خط الدفاع الأول ضد التهديدات السيبرانية.',
        'about.frontend': 'تطوير الواجهة',
        'about.frontendText': 'تصميم واجهات المستخدم & HTML/CSS/JavaScript',
        'about.backend': 'تطوير الواجهة الخلفية',
        'about.backendText': 'تطوير APIs وإدارة البيانات',
        'about.contentCreation': 'إعداد المحتوى',
        'about.contentCreationText': 'تصميم السيناريوهات وبحوث الأمان',
        'about.ready': 'هل أنت مستعد للبدء؟',
        'about.step1': 'اقرأ التنبيهات',
        'about.step1Text': 'اطلع على أحدث صفحة تنبيهات الاحتيال لمعرفة التهديدات الحالية.',
        'about.step2': 'ابدأ المحاكاة',
        'about.step2Text': 'ابدأ المحاكاة التفاعلية لاختبار معرفتك الأمنية.',
        'about.step3': 'طور مهاراتك',
        'about.step3Text': 'راجع التعليقات لتحسين مستوى وعيك بالأمن السيبراني.',
        'about.questions': 'أسئلة أو ملاحظات؟',
        'about.questionsText': 'نحب أن نسمع منك. لا تتردد في التواصل معنا بأي أسئلة أو اقتراحات أو ملاحظات حول المحاكي.',
        'about.email': 'البريد الإلكتروني:',
        'about.github': 'GitHub:',
        'about.madeWith': 'تم التطوير بـ ❤️ بواسطة طلاب الأمن السيبراني',
        'page.title.home': 'محاكي الهندسة الاجتماعية',
        'page.title.simulation': 'ابدأ المحاكاة - محاكي الهندسة الاجتماعية',
        'page.title.scenario': 'السيناريو - محاكي الهندسة الاجتماعية',
        'page.title.feedback': 'ملاحظات السيناريو - محاكي الهندسة الاجتماعية',
        'page.title.alerts': 'آخر تنبيهات الاحتيال - محاكي الهندسة الاجتماعية',
        'page.title.about': 'عن المشروع - محاكي الهندسة الاجتماعية',
        'page.title.result': 'النتائج - محاكي الهندسة الاجتماعية',
        
        // Leaderboard
        'leaderboard.title': 'لوحة المتصدرين',
        'leaderboard.rank': 'الترتيب',
        'leaderboard.name': 'الاسم',
        'leaderboard.score': 'النقاط',
        'leaderboard.level': 'المستوى',
      }
    };
    
    this.init();
  }
  
  /**
   * Initialize language settings
   */
  init() {
    this.setLanguage(this.currentLanguage);
  }
  
  /**
   * Set the current language
   * @param {string} lang - Language code ('en' or 'ar')
   */
  setLanguage(lang) {
    if (!this.translations[lang]) {
      console.warn(`Language '${lang}' not found. Using English.`);
      lang = 'en';
    }
    
    this.currentLanguage = lang;
    localStorage.setItem('language', lang);
    
    // Update document direction and language attribute
    const htmlElement = document.documentElement;
    htmlElement.lang = lang;
    htmlElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    
    // Update body class
    document.body.classList.remove('ar', 'en');
    document.body.classList.add(lang);
    
    // Update all translations on the page
    this.updatePageTranslations();
    this.updateDocumentTitle();
    
    // Dispatch custom event
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: { language: lang } }));
  }

  /**
   * Update the browser tab title based on current page
   */
  updateDocumentTitle() {
    const path = window.location.pathname;
    const page = path.split('/').pop() || 'index.html';
    const titleMap = {
      'index.html': 'page.title.home',
      'simulation.html': 'page.title.simulation',
      'scenario.html': 'page.title.scenario',
      'feedback.html': 'page.title.feedback',
      'alerts.html': 'page.title.alerts',
      'about.html': 'page.title.about',
      'result.html': 'page.title.result'
    };

    const key = titleMap[page] || 'page.title.home';
    document.title = this.t(key);
  }
  
  /**
   * Get translation for a key
   * @param {string} key - Translation key
   * @param {object} replacements - Key-value pairs for replacement
   * @returns {string} Translated text
   */
  t(key, replacements = {}) {
    let text = this.translations[this.currentLanguage][key] || key;
    
    // Replace placeholders
    Object.keys(replacements).forEach(placeholder => {
      text = text.replace(`{{${placeholder}}}`, replacements[placeholder]);
    });
    
    return text;
  }
  
  /**
   * Update all translations on the page
   */
  updatePageTranslations() {
    // Update data-i18n attributes
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      const replacements = {};
      
      // Check for replacements in data attributes
      Array.from(element.attributes).forEach(attr => {
        if (attr.name.startsWith('data-i18n-')) {
          const placeholder = attr.name.replace('data-i18n-', '');
          replacements[placeholder] = attr.value;
        }
      });
      
      if (element.tagName === 'INPUT' && element.type === 'text') {
        element.placeholder = this.t(key, replacements);
      } else if (element.tagName === 'INPUT' && element.type === 'button') {
        element.value = this.t(key, replacements);
      } else {
        element.textContent = this.t(key, replacements);
      }
    });
    
    // Update data-i18n-html for HTML content
    document.querySelectorAll('[data-i18n-html]').forEach(element => {
      const key = element.getAttribute('data-i18n-html');
      const replacements = {};
      
      Array.from(element.attributes).forEach(attr => {
        if (attr.name.startsWith('data-i18n-')) {
          const placeholder = attr.name.replace('data-i18n-', '');
          replacements[placeholder] = attr.value;
        }
      });
      
      element.innerHTML = this.t(key, replacements);
    });
  }
  
  /**
   * Toggle between English and Arabic
   */
  toggleLanguage() {
    const newLang = this.currentLanguage === 'en' ? 'ar' : 'en';
    this.setLanguage(newLang);
  }
  
  /**
   * Get current language
   * @returns {string} Current language code
   */
  getCurrentLanguage() {
    return this.currentLanguage;
  }
}

// Create global instance
const i18n = new LanguageManager();
