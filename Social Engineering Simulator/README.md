# Social Engineering Simulator 🛡️

> An interactive cybersecurity awareness platform designed to help users recognize and defend against social engineering attacks.

## 📋 Project Overview

Social Engineering Simulator is an educational web application that provides realistic simulations of common social engineering attacks including:

- **Phishing Emails** - Fake bank verification and credential theft attempts
- **SMS Scams** - Fake delivery and urgent action messages
- **Social Media Scams** - Account deletion threats and verification requests
- **Fake Websites** - Fraudulent sites impersonating legitimate companies
- **USB Baiting** - Malicious devices left in public places

Users face 5 random scenarios and receive detailed feedback on their responses, with a final assessment of their cybersecurity awareness level.

## 🎯 Features

✅ **Interactive Simulations** - Real-world inspired social engineering scenarios  
✅ **Instant Feedback** - Detailed explanations and security tips after each scenario  
✅ **Progress Tracking** - Score system and awareness level assessment  
✅ **Multi-language Support** - Full English and Arabic support with RTL layout  
✅ **Responsive Design** - Works perfectly on mobile, tablet, and desktop  
✅ **No Dependencies** - Pure HTML5, CSS3, and Vanilla JavaScript  
✅ **Engaging UI** - Modern design with smooth animations and transitions  

## 📁 Project Structure

```
social-engineering-simulator/
├── index.html                 # Home page
├── css/
│   ├── style.css             # Main stylesheet
│   └── responsive.css        # Media queries & responsive design
├── js/
│   ├── language.js           # i18n Language manager
│   ├── api.js                # API & Backend integration
│   └── app.js                # Main application logic
├── pages/
│   ├── simulation.html        # Name input page
│   ├── scenario.html         # Scenario & quiz page
│   ├── result.html           # Results & score page
│   ├── alerts.html           # Scam alerts information
│   └── about.html            # About project page
└── assets/
    ├── images/               # Project images
    └── icons/                # Icon assets
```

## 🚀 Getting Started

### Installation

1. Clone or download the project
2. No build process or dependencies needed!
3. Simply open `index.html` in your browser

```bash
# Start a local server (optional, for development)
python -m http.server 8000
# or
npx serve
```

### Using the Application

1. **Home Page** - Learn about the simulator and click "Start Simulation"
2. **Alerts Page** - Review latest scam alerts and warning signs
3. **Simulation** - Enter your name to begin
4. **Scenarios** - Face 5 random social engineering scenarios
5. **Results** - See your score and cybersecurity awareness level
6. **About** - Learn more about the project

## 🌐 Bilingual Support (English & Arabic)

The simulator fully supports both languages:

- Click the 🌐 icon in the navigation to toggle language
- Automatically switches between LTR (English) and RTL (Arabic)
- Uses system language detection (can be manually overridden)
- All content translates dynamically

### Adding More Languages

Edit `js/language.js` to add new translations:

```javascript
'ar': {
  'nav.home': 'الرئيسية',
  // Add more translations...
}
```

## 🎨 Design Features

### Color Palette
- **Primary**: #667eea (Purple Blue)
- **Secondary**: #764ba2 (Deep Purple)
- **Success**: #48bb78 (Green)
- **Danger**: #f56565 (Red)
- **Warning**: #ecc94b (Yellow)

### Typography
- **Headers**: Poppins (English), Cairo (Arabic)
- **Body**: Poppins (English), Cairo (Arabic)
- Clean, modern design with excellent readability

### Responsive Design
- **Mobile**: 320px - 480px
- **Tablet**: 481px - 768px
- **Desktop**: 769px - 1024px
- **Large Screens**: 1025px+
- Touch-friendly buttons and inputs

## 📊 Scoring System

- **Accuracy**: Percentage of correct answers (0-100%)
- **Awareness Levels**:
  - 0-20%: Beginner 🟢
  - 20-40%: Developing 🟡
  - 40-60%: Intermediate 🟠
  - 60-80%: Advanced 🔵
  - 80-100%: Expert 🟣

## 🔗 Backend Integration

The app is designed to work with a Flask backend. Currently uses mock data for development.

### Expected API Endpoints

```
GET  /api/scenario?scenario=1        # Get scenario data
POST /api/answer                     # Submit answer
GET  /api/score/{userId}             # Get user score
GET  /api/leaderboard                # Get leaderboard
POST /api/session                    # Save session
```

### Mock Data Integration

The application includes mock data for offline development. To integrate with real backend:

1. Update `API.baseURL` in `js/api.js`
2. Implement Flask endpoints matching the expected structure
3. The app will automatically use real data instead of mock

## 🎓 Educational Value

This simulator helps users:
- Recognize phishing and social engineering attempts
- Understand attacker motivations and tactics
- Learn proper security procedures
- Build critical thinking in security decisions
- Develop awareness of current threat landscape

## 🛠️ Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Flexbox, Grid, animations, variables
- **Vanilla JavaScript** - No frameworks or libraries
- **Fetch API** - Backend communication
- **LocalStorage** - User preferences persistence

## 💡 Code Quality

- ✅ Clean, commented, and well-organized code
- ✅ Easy to modify and extend
- ✅ Suitable for educational purposes
- ✅ Best practices for web development
- ✅ Responsive and mobile-first approach
- ✅ Accessibility considerations

## 📱 Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers
- ✅ Tablets

## 🔒 Security Notes

This is an educational simulator. The scenarios are realistic but fictional. Never:
- Use this for actual phishing or social engineering
- Deploy malicious content
- Violate terms of service of any platform

## 📝 Customization

### Changing Colors

Edit CSS variables in `css/style.css`:

```css
:root {
  --primary-color: #667eea;
  --secondary-color: #764ba2;
  /* Modify as needed */
}
```

### Adding New Scenarios

Edit scenarios in `js/api.js` `getMockScenario()` method:

```javascript
{
  id: 6,
  type: 'email',
  title: 'Your Custom Scenario',
  description: '...',
  content: '...',
  // Add scenario details
}
```

### Modifying Questions

Edit answer options in scenario objects:

```javascript
answers: [
  { id: 1, text: 'Option 1', correct: false },
  { id: 2, text: 'Option 2', correct: true },
]
```

## 📚 Files Description

### CSS Files
- **style.css** (500+ lines)
  - Global styles and design system
  - Component styles (buttons, cards, forms)
  - Animations and transitions
  - CSS variables for consistency

- **responsive.css** (400+ lines)
  - Mobile-first responsive design
  - Media queries for all screen sizes
  - Touch device optimizations
  - Accessibility features

### JavaScript Files
- **language.js** (200+ lines)
  - i18n language manager
  - Translation system
  - RTL/LTR handling
  - Language toggle functionality

- **api.js** (300+ lines)
  - Backend API communication
  - Fetch wrapper with error handling
  - Mock data for development
  - Request/response management

- **app.js** (400+ lines)
  - Main application logic
  - Page initialization
  - Event handling
  - Scenario management
  - Scoring system
  - Results rendering

## 🎯 Learning Outcomes

Students completing this project will understand:
- Modern web development best practices
- Responsive design principles
- JavaScript event handling and DOM manipulation
- REST API integration
- Internationalization (i18n) implementation
- CSS Grid and Flexbox layouts
- User experience design

## 📄 License

This project is educational and free to use and modify for learning purposes.

## 👨‍💻 Author Notes

This simulator was built as an educational project to teach cybersecurity awareness through interactive learning. The code is clean, well-commented, and suitable for both beginners and intermediate developers.

### Key Development Decisions

1. **No Frameworks** - Used vanilla JavaScript for maximum learning value
2. **CSS Variables** - For easy customization and maintenance
3. **Mobile-First** - Designed for smallest screens first
4. **i18n System** - Complete bilingual support from the start
5. **Mock APIs** - Works offline while designed for backend integration

## 🐛 Known Limitations

- Currently uses mock data instead of real backend
- No user database integration yet
- No persistence across sessions (local data only)
- Static leaderboard data

## 🚀 Future Enhancements

- [ ] Real backend integration with Flask
- [ ] User authentication system
- [ ] Persistent leaderboard
- [ ] More scenario variety
- [ ] Video tutorials
- [ ] Dark mode theme
- [ ] Mobile app version
- [ ] API documentation
- [ ] Admin panel for content management

## 📞 Support

For questions or issues:
1. Check the About page
2. Review the code comments
3. Test in different browsers
4. Ensure JavaScript is enabled
5. Clear browser cache if needed

## 🙏 Credits

Built with ❤️ by cybersecurity students passionate about making the digital world safer.

---

**Start your cybersecurity awareness journey today! 🛡️**
