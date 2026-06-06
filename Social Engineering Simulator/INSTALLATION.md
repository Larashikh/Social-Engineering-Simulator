# 🚀 Installation & Setup Guide

## System Requirements

- Modern web browser (Chrome, Firefox, Safari, Edge)
- No server or special software needed for basic use
- Optional: Python or Node.js for local development server

## ⚡ Quick Start (Fastest Way)

### Method 1: Direct File Opening (Windows/Mac/Linux)

1. **Locate the project folder**
   ```
   Social Engineering Simulator/
   └── index.html
   ```

2. **Open index.html directly**
   - Double-click `index.html`
   - Or right-click → Open with → Your Browser
   - Website opens in your default browser

3. **Start using the simulator!**

### Method 2: Using Python (Recommended for Development)

#### Windows:
```cmd
# Open Command Prompt in project folder
cd "path\to\Social Engineering Simulator"

# Python 3
python -m http.server 8000

# Or Python 2
python -m SimpleHTTPServer 8000

# Visit: http://localhost:8000
```

#### Mac/Linux:
```bash
# Open Terminal in project folder
cd /path/to/Social\ Engineering\ Simulator

# Python 3
python3 -m http.server 8000

# Or Python 2
python -m SimpleHTTPServer 8000

# Visit: http://localhost:8000
```

### Method 3: Using Node.js

```bash
# Install serve globally (one-time setup)
npm install -g serve

# Navigate to project folder
cd "path/to/Social Engineering Simulator"

# Start server
serve

# Visit the URL shown (usually http://localhost:5000)
```

### Method 4: Using VS Code Live Server

1. Install "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"
4. Browser opens automatically at `http://localhost:5500`

## 📋 Project Structure After Installation

```
Social Engineering Simulator/
│
├── 📄 index.html                  (Home page)
├── 📄 README.md                   (Project info)
├── 📄 DEVELOPER_GUIDE.md          (For developers)
│
├── 📁 css/
│   ├── style.css                  (Main styles)
│   └── responsive.css             (Mobile responsive)
│
├── 📁 js/
│   ├── language.js                (Translations)
│   ├── api.js                     (Backend API)
│   └── app.js                     (Main logic)
│
├── 📁 pages/
│   ├── simulation.html            (Name input)
│   ├── scenario.html              (Quiz page)
│   ├── result.html                (Results)
│   ├── alerts.html                (Scam alerts)
│   └── about.html                 (About page)
│
└── 📁 assets/
    ├── images/                    (Image folder)
    └── icons/                     (Icon folder)
```

## 🔧 Customization After Installation

### Change Site Colors

Open `css/style.css`, find this section:

```css
:root {
  --primary-color: #667eea;        ← Change this
  --secondary-color: #764ba2;      ← Change this
  /* More colors below... */
}
```

Replace with your colors.

### Add More Languages

Open `js/language.js`, add to `translations` object:

```javascript
translations = {
  en: { /* English translations */ },
  ar: { /* Arabic translations */ },
  'fr': { /* Add French! */
    'nav.home': 'Accueil',
    'nav.alerts': 'Alertes',
    // ... add all translations
  }
}
```

### Modify Scenarios

Open `js/api.js`, find `getMockScenario()` function:

```javascript
getMockScenario(scenarioNumber = 1) {
  const scenarios = [
    {
      id: 1,
      type: 'email',
      title: 'Your Custom Title',
      // ... edit here
    }
  ]
}
```

## 🧪 Testing After Installation

### Test Checklist

Use this checklist to verify everything works:

```
Navigation:
☐ All menu links work
☐ Language toggle works
☐ Back buttons work

Home Page:
☐ Hero section displays
☐ Features cards visible
☐ "Start Simulation" button works

Simulation:
☐ Name input accepts text
☐ Form validates input
☐ Start button begins simulation
☐ Can navigate scenarios

Scenarios:
☐ Scenario loads correctly
☐ Answer buttons clickable
☐ Feedback displays
☐ Progress bar updates
☐ Score increases on correct answer

Results:
☐ Final score shows
☐ Awareness level displays
☐ Improvement areas listed

Language:
☐ English translations show
☐ Arabic translations show
☐ Direction changes (LTR/RTL)
☐ All content translates

Responsive:
☐ Mobile (375px width)
☐ Tablet (768px width)
☐ Desktop (1024px width)
☐ Large screen (1400px+ width)
```

### Browser Testing

Test in these browsers:

- ✅ Google Chrome (latest)
- ✅ Mozilla Firefox (latest)
- ✅ Safari (if on Mac)
- ✅ Microsoft Edge (latest)
- ✅ Mobile Chrome (on phone)
- ✅ Mobile Safari (on iPhone)

## 🐛 Troubleshooting

### Issue: "Page not found" error

**Solution:**
- Make sure you're in the project folder
- Check file paths in HTML files
- Use a local server instead of direct file opening

### Issue: Styling looks broken

**Solution:**
- Clear browser cache (Ctrl+Shift+Delete)
- Refresh page (Ctrl+F5)
- Check CSS files are in correct folders
- Ensure paths are relative: `../css/style.css`

### Issue: Scripts not working

**Solution:**
- Check browser console for errors (F12)
- Verify JavaScript files exist
- Check for typos in file names
- Ensure all script tags have correct paths
- Check file permissions

### Issue: Language not changing

**Solution:**
- Check language.js is loaded
- Try clearing localStorage
- Refresh the page
- Open browser console to check for errors

### Issue: Responsive design not working

**Solution:**
- Add viewport meta tag (already in HTML)
- Check media queries in responsive.css
- Test with browser DevTools device mode
- Clear cache and reload

### Issue: Form validation not working

**Solution:**
- Check browser console for JavaScript errors
- Verify input IDs match JavaScript references
- Ensure app.js is loaded
- Test in a different browser

## 💻 Development Server Setup

### For Windows Users

**Using Python (Easiest):**
```batch
@echo off
cd /d "Your\Path\To\Social Engineering Simulator"
python -m http.server 8000
echo Open: http://localhost:8000
pause
```

Save as `start-server.bat` and double-click to start.

### For Mac/Linux Users

**Create a shell script:**
```bash
#!/bin/bash
cd "Your/Path/To/Social Engineering Simulator"
python3 -m http.server 8000
echo "Open: http://localhost:8000"
```

Save as `start-server.sh` and run:
```bash
chmod +x start-server.sh
./start-server.sh
```

## 📦 Backend Integration (Optional)

To connect to a real backend:

1. **Set API URL in `js/api.js`:**
```javascript
const API = new APIManager('http://your-server.com/api');
```

2. **Implement these Flask endpoints:**
```python
@app.route('/api/scenario')
def get_scenario():
    # Return scenario data

@app.route('/api/answer', methods=['POST'])
def submit_answer():
    # Process answer and return feedback

@app.route('/api/score/<user_id>')
def get_score(user_id):
    # Return user score

@app.route('/api/leaderboard')
def get_leaderboard():
    # Return leaderboard data
```

3. **Mock data will be replaced automatically**

## 🔐 Security Considerations

After installation, consider:

- ✅ No sensitive data is stored locally
- ✅ Session data clears on browser close
- ✅ Use HTTPS in production
- ✅ Validate all inputs on backend
- ✅ Set CORS headers appropriately
- ✅ Never store passwords in localStorage

## 📚 Next Steps

1. **Read the README.md** for feature overview
2. **Check DEVELOPER_GUIDE.md** for customization
3. **Explore the code** to understand structure
4. **Test all pages** using checklist above
5. **Customize as needed** for your institution
6. **Integrate backend** when ready
7. **Deploy to server** for production use

## 🎓 For Educators

### Classroom Setup

1. **Share with students:**
   - Email project file
   - Or upload to shared drive
   - Or use GitHub for version control

2. **No installation needed:**
   - Students just open in browser
   - Works on school computers
   - Works on personal laptops
   - Works on tablets/phones

3. **Classroom activities:**
   - Have students complete simulations
   - Discuss results as a class
   - Create leaderboard competitions
   - Modify scenarios for lessons

### Customization for Classes

- Add school/institution name to header
- Create custom scenarios based on your curriculum
- Modify awareness levels for your standards
- Add institution-specific threat scenarios
- Create classes/groups for tracking

## 📞 Getting Help

If you encounter issues:

1. **Check the console:**
   - Press F12 to open Developer Tools
   - Go to Console tab
   - Look for red error messages

2. **Review files:**
   - Check file paths
   - Verify CSS/JS is included
   - Check HTML structure

3. **Try different browser:**
   - Issue might be browser-specific
   - Try another browser to isolate problem

4. **Check network:**
   - Ensure internet connection (if using remote server)
   - Check firewall settings
   - Verify proxy settings

## ✅ Installation Complete!

If you see:
- ✅ Website loads in browser
- ✅ Navigation menu works
- ✅ Language toggle works
- ✅ Can start simulation

**Your installation is successful!** 🎉

Start exploring the simulator and enjoy your cybersecurity awareness training!

---

**Questions?** Check README.md and DEVELOPER_GUIDE.md for more detailed information.

**Happy learning! 🛡️**
