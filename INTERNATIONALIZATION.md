# 🌍 Internationalization (i18n) Documentation

## Overview

The Social Engineering Simulator has full bilingual support for English and Arabic, with proper RTL (Right-to-Left) layout support for Arabic.

## Current Languages Supported

- 🇺🇸 **English** (en) - LTR (Left-to-Right)
- 🇸🇦 **Arabic** (ar) - RTL (Right-to-Left)

## How the i18n System Works

### 1. Language Manager (`js/language.js`)

```javascript
class LanguageManager {
  // Manages all translations
  // Handles language switching
  // Manages RTL/LTR layout
}

// Global instance
const i18n = new LanguageManager();
```

### 2. Translation Keys

Each translatable text has a key in format: `module.key`

Examples:
- `nav.home` - Home navigation link
- `home.title` - Home page title
- `scenario.title` - Scenario title

### 3. Using Translations in HTML

#### Method 1: Text Content (Most Common)

```html
<h1 data-i18n="home.title">Train Yourself...</h1>
```

#### Method 2: Placeholder Text

```html
<input type="text" data-i18n="simulation.namePlaceholder" placeholder="Enter your name">
```

#### Method 3: Button Values

```html
<button type="button" value="Start" data-i18n="home.start"></button>
```

#### Method 4: HTML Content

```html
<div data-i18n-html="about.content">Fallback content...</div>
```

#### Method 5: With Replacements

```html
<h4 data-i18n="scenario.title" data-i18n-number="1">Scenario 1 of 5</h4>
```

JavaScript will replace `{{number}}` with the attribute value.

### 4. Using Translations in JavaScript

```javascript
// Get a translation
const text = i18n.t('nav.home');
// Returns: "Home" (in English) or "الرئيسية" (in Arabic)

// Get translation with replacements
const text = i18n.t('scenario.title', {
  number: 2
});
// Returns: "Scenario 2 of 5" or "السيناريو 2 من 5"
```

## Adding New Translations

### Step 1: Add to English

Open `js/language.js`, find the English translations:

```javascript
translations = {
  en: {
    'my.new.key': 'English text here',
    // ... more translations
  }
}
```

### Step 2: Add to Arabic

In the same file, add to Arabic translations:

```javascript
translations = {
  ar: {
    'my.new.key': 'النص العربي هنا',
    // ... more translations
  }
}
```

### Step 3: Use in HTML

```html
<h4 data-i18n="my.new.key">Fallback text</h4>
```

## Translation Key Naming Convention

Keys are organized by section:

```
nav.          → Navigation items
home.         → Home page
simulation.   → Simulation start page
scenario.     → Scenario page
result.       → Results page
alerts.       → Alerts page
about.        → About page
feedback.     → Feedback messages
validation.   → Form validation
loading.      → Loading states
error.        → Error messages
leaderboard.  → Leaderboard
```

## Current Translation Keys

### Navigation
```
nav.home              → Home
nav.alerts            → Alerts
nav.leaderboard       → Leaderboard
nav.about             → About Us
nav.language          → Toggle language button
```

### Home Page
```
home.title            → Main title
home.subtitle         → Subtitle
home.start            → Start button
home.heroBtnTooltip   → Button tooltip
```

### Alerts Page
```
alerts.title          → Page title
alerts.subtitle       → Page subtitle
alerts.phishing       → Phishing title
alerts.phishing.desc  → Phishing description
alerts.sms            → SMS title
alerts.sms.desc       → SMS description
alerts.instagram      → Instagram title
alerts.instagram.desc → Instagram description
alerts.website        → Website title
alerts.website.desc   → Website description
```

### Simulation Page
```
simulation.title      → Page title
simulation.subtitle   → Page subtitle
simulation.name       → Name label
simulation.namePlaceholder → Input placeholder
simulation.startBtn   → Start button
simulation.hint       → Hint text
simulation.back       → Back button
```

### Scenario Page
```
scenario.title        → Scenario title with number
scenario.score        → Current score display
scenario.inbox        → Inbox label
scenario.email        → Email type
scenario.sms          → SMS type
scenario.website      → Website type
scenario.message      → Message label
scenario.whatWould    → "What would you do?" prompt
scenario.openLink     → Answer option
scenario.verifyOfficial → Answer option
scenario.deleteReport → Answer option
scenario.reportScam   → Answer option
scenario.ignore       → Answer option
scenario.next         → Next button
scenario.submit       → Submit button
```

### Results Page
```
result.title          → Page title
result.accuracy       → Accuracy label
result.awareness      → Awareness level label
result.scenarios      → Scenarios completed label
result.strengths      → Strengths section
result.improve        → Areas to improve section
result.beginner       → Beginner level
result.developing     → Developing level
result.intermediate   → Intermediate level
result.advanced       → Advanced level
result.expert         → Expert level
result.restart        → Restart button
result.back           → Back button
```

### Feedback
```
feedback.correct      → Correct answer message
feedback.incorrect    → Incorrect answer message
feedback.explanation  → Explanation label
feedback.tips         → Tips label
```

### Messages
```
validation.nameRequired    → Name required message
validation.nameTooShort    → Name too short message
validation.nameTooLong     → Name too long message
loading.loadingScenario    → Loading message
loading.submitting         → Submitting message
loading.loading            → Generic loading
error.serverError          → Server error message
error.networkError         → Network error message
error.loadingError         → Loading error message
```

### About & Footer
```
about.title           → About page title
about.content         → About content
about.madeBy          → Made by message
about.copyright       → Copyright text
```

## Language Switching

### Automatic Detection

On first visit, the system detects user's browser language:
```javascript
const defaultLanguage = navigator.language.split('-')[0];
```

### Manual Switching

User can toggle language by clicking 🌐 button:

```javascript
i18n.toggleLanguage();
// Switches between 'en' and 'ar'
```

### Programmatic Switching

```javascript
i18n.setLanguage('ar');  // Switch to Arabic
i18n.setLanguage('en');  // Switch to English
```

### Getting Current Language

```javascript
const current = i18n.getCurrentLanguage();
// Returns: 'en' or 'ar'
```

## RTL/LTR Handling

### Automatic Layout Adjustment

When language changes, the system:

1. **Updates HTML direction:**
```html
<!-- English -->
<html lang="en" dir="ltr">

<!-- Arabic -->
<html lang="ar" dir="rtl">
```

2. **Adds body class:**
```html
<!-- English -->
<body class="en">

<!-- Arabic -->
<body class="ar">
```

3. **CSS handles RTL:**
```css
body.ar {
  direction: rtl;
  text-align: right;
}

body.en {
  direction: ltr;
  text-align: left;
}
```

### CSS Flexbox & Grid

The system uses flexible layouts that automatically adjust:

```css
.flex {
  display: flex;
  /* Works for both LTR and RTL */
}

.grid {
  display: grid;
  /* Works for both LTR and RTL */
}

/* Specific adjustments if needed */
body.ar .nav-links {
  /* RTL specific styles */
}
```

## Adding a New Language

### Example: Adding French (fr)

#### Step 1: Add to language.js

```javascript
this.translations = {
  en: { /* ... */ },
  ar: { /* ... */ },
  fr: {
    'nav.home': 'Accueil',
    'nav.alerts': 'Alertes',
    'home.title': 'Formez-vous contre les attaques...',
    // Add all 100+ translations
  }
}
```

#### Step 2: Update Language Toggle

Modify the nav button behavior to cycle through languages:

```javascript
const languages = ['en', 'ar', 'fr'];
const current = i18n.getCurrentLanguage();
const nextIndex = (languages.indexOf(current) + 1) % languages.length;
i18n.setLanguage(languages[nextIndex]);
```

Or show a dropdown:

```html
<select id="languageSelect">
  <option value="en">English</option>
  <option value="ar">العربية</option>
  <option value="fr">Français</option>
</select>
```

#### Step 3: Handle RTL (if needed)

```javascript
// In setLanguage() method
const rtlLanguages = ['ar', 'he']; // Hebrew also RTL
htmlElement.dir = rtlLanguages.includes(lang) ? 'rtl' : 'ltr';
```

## Fonts for Different Languages

### Current Setup

```css
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Cairo:wght@300;400;500;600;700&display=swap');

body.en {
  font-family: 'Poppins', sans-serif;
}

body.ar {
  font-family: 'Cairo', 'Poppins', sans-serif;
}
```

### For Other Languages

Add appropriate Google Fonts:

```css
/* For French, Spanish, German, etc. */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap');

/* For Chinese */
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;700&display=swap');

/* For Japanese */
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&display=swap');
```

## Handling Plurals & Gender

Currently handled with simple replacement:

```javascript
i18n.t('scenario.score', {
  current: 3,
  total: 5
});
// "Score: 3/5"
```

For complex pluralization, extend the language manager:

```javascript
// Add plural helper
pluralize(key, count, replacements = {}) {
  if (count === 1) {
    const singularKey = key + '.singular';
    return this.t(singularKey, replacements);
  } else {
    const pluralKey = key + '.plural';
    return this.t(pluralKey, replacements);
  }
}
```

## Translation Quality Checklist

When adding a new language:

- [ ] All 100+ keys translated
- [ ] No HTML tags in translations
- [ ] Proper punctuation for each language
- [ ] Consistent terminology
- [ ] Professional tone
- [ ] RTL/LTR tested if applicable
- [ ] Font supports characters
- [ ] No truncation in UI
- [ ] Numbers formatted correctly
- [ ] Dates formatted correctly

## Performance Notes

- Translations loaded on first load
- No API calls for translations
- Fast switching between languages
- Minimal DOM updates
- Efficient string replacement

## Browser Compatibility

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 11+
- ✅ Edge 79+
- ✅ Mobile browsers

## Event Handling

When language changes, custom event is fired:

```javascript
window.addEventListener('languageChanged', (event) => {
  console.log('Language changed to:', event.detail.language);
  // Do custom handling if needed
});
```

## Persistence

Selected language is saved to localStorage:

```javascript
localStorage.setItem('language', 'ar');
// Will use saved language on next visit
```

## Best Practices

1. **Keep keys consistent**
   - Use same key for same text
   - Group related keys together

2. **Use descriptive keys**
   - `nav.home` not `text1`
   - `error.nameRequired` not `err123`

3. **Avoid HTML in translations**
   - Use `data-i18n-html` for formatted content
   - Or add markup separately

4. **Test translations**
   - Switch languages frequently
   - Check for text overflow
   - Verify RTL layout

5. **Keep translations updated**
   - Update all languages together
   - Don't leave partial translations
   - Maintain terminology glossary

## Troubleshooting

### Translations Not Showing

```javascript
// Check if key exists
console.log(i18n.translations[i18n.currentLanguage]['my.key']);

// Check current language
console.log(i18n.getCurrentLanguage());

// Check if element has data-i18n
console.log(document.querySelectorAll('[data-i18n]'));
```

### RTL Not Working

```javascript
// Check HTML direction
console.log(document.documentElement.dir);

// Check body class
console.log(document.body.classList);

// Force RTL
document.documentElement.dir = 'rtl';
document.body.classList.add('ar');
```

### Language Not Persisting

```javascript
// Check localStorage
console.log(localStorage.getItem('language'));

// Manually save
localStorage.setItem('language', 'ar');
```

---

For more details, see the code comments in `js/language.js` and usage examples throughout the HTML pages.

Happy translating! 🌍
