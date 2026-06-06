# 📖 Social Engineering Simulator - Developer Guide

## Quick Start Guide

### 1. Opening the Application

Simply open `index.html` in your web browser:

```bash
# Option 1: Direct file opening
Double-click index.html

# Option 2: Using Python (recommended for development)
python -m http.server 8000
# Then visit: http://localhost:8000

# Option 3: Using Node.js
npx serve
```

## 🎮 Testing the Application

### Test Scenarios

1. **Home Page** (`index.html`)
   - ✅ Click "Start Simulation" button
   - ✅ Verify hero animations
   - ✅ Check language toggle

2. **Simulation Page** (`pages/simulation.html`)
   - ✅ Enter your name and start
   - ✅ Test form validation
   - ✅ Keyboard Enter support

3. **Scenario Page** (`pages/scenario.html`)
   - ✅ Verify scenario loads
   - ✅ Click answer options
   - ✅ View feedback and explanations
   - ✅ Progress bar updates
   - ✅ Navigate through all 5 scenarios

4. **Results Page** (`pages/result.html`)
   - ✅ Check score calculation
   - ✅ Verify awareness level display
   - ✅ Review improvement suggestions

5. **Alerts Page** (`pages/alerts.html`)
   - ✅ Browse scam alerts
   - ✅ Review security tips

6. **About Page** (`pages/about.html`)
   - ✅ Read project information

### Language Testing

1. Click the 🌐 button in navigation
2. Page should switch between English and Arabic
3. Direction should change (LTR ↔ RTL)
4. All text should translate properly
5. Layout should adjust for RTL

## 🔧 Development & Customization

### Modifying Colors

Edit `css/style.css`:

```css
:root {
  --primary-color: #667eea;    /* Change primary color */
  --secondary-color: #764ba2;  /* Change secondary color */
  /* ... more colors ... */
}
```

### Adding New Translation

Edit `js/language.js`:

```javascript
this.translations = {
  en: {
    'my.new.key': 'English text',
  },
  ar: {
    'my.new.key': 'النص العربي',
  }
}
```

Use in HTML:
```html
<element data-i18n="my.new.key">fallback text</element>
```

### Adding New Scenarios

Edit `js/api.js` in `getMockScenario()`:

```javascript
{
  id: 6,
  type: 'email',
  title: 'New Scenario Title',
  description: 'Scenario description',
  content: 'Full content/message',
  sender: 'sender@example.com',
  answers: [
    { id: 1, text: 'Answer 1', correct: false },
    { id: 2, text: 'Answer 2', correct: true }
  ],
  explanation: 'Why this is correct...',
  redFlags: ['Red flag 1', 'Red flag 2']
}
```

### Changing Fonts

Edit `css/style.css`:

```css
@import url('https://fonts.googleapis.com/css2?family=YourFont:wght@300;400;700&display=swap');

body {
  font-family: 'YourFont', sans-serif;
}
```

## 📊 Understanding the Code Flow

### Page Load Flow

```
1. User opens index.html
   ↓
2. HTML loads with i18n data-attributes
   ↓
3. language.js initializes (loads saved language preference)
   ↓
4. app.js initializes and detects current page
   ↓
5. Appropriate page-specific initialization runs
   ↓
6. Page is ready for interaction
```

### Simulation Flow

```
1. User enters name → simulation.html
   ↓
2. Data saved to sessionStorage
   ↓
3. Redirects to scenario.html
   ↓
4. app.js loads scenario from API (mock data)
   ↓
5. User selects answer
   ↓
6. Feedback is shown
   ↓
7. Next button appears
   ↓
8. Repeat for all 5 scenarios
   ↓
9. Final result saved
   ↓
10. Redirect to result.html
```

### Data Storage

- **sessionStorage**: Temporary data for current simulation
  - `userName`
  - `userScore`
  - `currentScenario`
  - `userAnswers` (JSON)

- **localStorage**: Persistent user preferences
  - `language` (en/ar)

## 🐛 Debugging Tips

### Enable Console Logging

Add to `js/app.js`:
```javascript
console.log('Current Page:', window.location.pathname);
console.log('User Name:', this.userName);
console.log('Score:', this.userScore);
```

### Check Session Data

In browser console:
```javascript
// View all session storage
console.log(sessionStorage);

// View specific data
console.log(sessionStorage.getItem('userName'));
console.log(JSON.parse(sessionStorage.getItem('userAnswers')));
```

### Test API Calls

In `js/api.js`, the `request()` method logs errors. Check console for:
- Network errors
- Timeout errors
- JSON parse errors

### Test Translations

In browser console:
```javascript
i18n.t('nav.home')  // Get translation
i18n.setLanguage('ar')  // Change language
i18n.getCurrentLanguage()  // Check current language
```

## 📱 Testing Responsive Design

Use browser DevTools to test different screen sizes:

1. **Mobile (375px)**
   - Single column layout
   - Large touch targets
   - Hamburger menu-ready

2. **Tablet (768px)**
   - 2-column grid
   - Larger fonts
   - Optimized spacing

3. **Desktop (1024px+)**
   - Full multi-column layout
   - All features visible
   - Hover effects enabled

4. **Touch Device Mode**
   - Test without hover effects
   - Check button sizes (min 48px)
   - Verify text readability

## 🎨 CSS Organization

### File Structure

**style.css** organized as:
1. CSS Variables (colors, spacing, etc.)
2. Reset & Base Styles
3. Typography
4. Buttons & Forms
5. Layout Components
6. Animations
7. Utility Classes

**responsive.css** organized as:
1. Mobile (320-480px)
2. Tablet (481-768px)
3. Desktop (769-1024px)
4. Large Screens (1025px+)
5. Special Cases (landscape, touch, print)

## 🔄 Workflow Examples

### Add a New Feature

1. Add HTML markup to relevant page
2. Add CSS styling to `style.css` (or `responsive.css`)
3. Add JavaScript logic to `js/app.js`
4. Add translations to `js/language.js`
5. Test in multiple languages and screen sizes

### Fix a Bug

1. Identify the page/component affected
2. Check browser console for errors
3. Review relevant code file
4. Add debugging logs if needed
5. Test the fix across browsers/devices
6. Verify related functionality still works

### Performance Optimization

Current optimizations:
- ✅ CSS variables for reusable values
- ✅ Efficient event delegation
- ✅ No unnecessary DOM manipulation
- ✅ Lazy loading not needed (small project)
- ✅ Minimal external resources

## 📚 File Reference

### index.html (Main Page)
- Home page with hero section
- Features showcase
- How it works section
- Call-to-action buttons

### pages/simulation.html
- User name input
- Form validation
- Start button

### pages/scenario.html
- Dynamic scenario rendering
- Answer options
- Feedback display
- Progress tracking

### pages/result.html
- Score calculation
- Awareness level
- Improvement areas
- Restart option

### pages/alerts.html
- Scam alerts display
- Red flag information
- Security tips

### pages/about.html
- Project information
- Technology stack
- Team info
- Getting started guide

### css/style.css
- All component styles
- Color definitions
- Typography
- Animations

### css/responsive.css
- Mobile optimizations
- Tablet optimizations
- Desktop optimizations
- Special cases

### js/language.js
- i18n System
- Translation management
- Language switching
- RTL/LTR handling

### js/api.js
- Backend communication
- Mock data
- Request handling
- Error management

### js/app.js
- Main application logic
- Page initialization
- Event handling
- Simulation management
- Results rendering

## ✅ Quality Checklist

Before deploying, verify:

- [ ] All pages load without errors
- [ ] Navigation works between pages
- [ ] Language toggle works correctly
- [ ] All 5 scenarios display properly
- [ ] Scoring system calculates correctly
- [ ] Responsive design works on mobile/tablet/desktop
- [ ] No console errors
- [ ] All translations display correctly
- [ ] Form validation works
- [ ] Animations are smooth
- [ ] Links navigate correctly
- [ ] Browser back button works
- [ ] Session data persists correctly

## 🚀 Deployment Checklist

Before going live:

1. **Test thoroughly**
   - All browsers (Chrome, Firefox, Safari, Edge)
   - All screen sizes (mobile, tablet, desktop)
   - Both languages

2. **Optimize**
   - Minify CSS and JavaScript (optional)
   - Compress images
   - Clean up console logs

3. **Security**
   - No sensitive data in localStorage
   - Validate all user inputs
   - Use HTTPS in production
   - Set appropriate CORS headers

4. **Performance**
   - Check page load time
   - Monitor network requests
   - Test on slow connections
   - Verify animations smooth

5. **Accessibility**
   - Test keyboard navigation
   - Verify color contrast
   - Check alt text on images
   - Test with screen readers

## 📝 Notes for Developers

### Code Style
- Use camelCase for variables and functions
- Use PascalCase for classes
- Add comments for complex logic
- Keep functions small and focused
- Use meaningful variable names

### Best Practices
- Check for console errors regularly
- Test after each change
- Comment your code
- Keep files organized
- Use version control

### Future Improvements
- [ ] Add real backend integration
- [ ] Implement user authentication
- [ ] Add database persistence
- [ ] Create admin panel
- [ ] Add more scenarios
- [ ] Video tutorials
- [ ] Dark mode support
- [ ] PWA support

---

Happy coding! 🚀
