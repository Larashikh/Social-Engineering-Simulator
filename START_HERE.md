# 🚀 QUICK START GUIDE

## ⚡ 30 Second Setup

### Option 1: Direct Opening (Fastest)
```
1. Double-click index.html
2. Website opens in your browser
3. Click "Start Simulation"
4. Done! 🎉
```

### Option 2: Using Python
```bash
cd "path/to/Social Engineering Simulator"
python -m http.server 8000
# Then visit: http://localhost:8000
```

### Option 3: VS Code
```
1. Open index.html in VS Code
2. Right-click → "Open with Live Server"
3. Browser opens automatically
4. Done! 🎉
```

---

## 📋 What to Do First

### 1. **Explore the Site** (2 minutes)
- Visit [index.html](./index.html) to see the home page
- Check out features and descriptions
- Read the "How It Works" section

### 2. **Try a Simulation** (5 minutes)
- Click "Start Simulation"
- Enter your name
- Answer 5 scenarios
- See your results

### 3. **Browse Features** (2 minutes)
- Visit [Alerts page](./pages/alerts.html) to see scam warnings
- Check [About page](./pages/about.html) for project info
- Click 🌐 to toggle between English/Arabic

### 4. **Read Documentation** (Optional)
- [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md) - Complete overview
- [README.md](./README.md) - Features and details
- [FILE_INDEX.md](./FILE_INDEX.md) - Navigate all files

---

## 🎯 What Each Page Does

| Page | What it Does | Location |
|------|-------------|----------|
| Home | Features & overview | [index.html](./index.html) |
| Simulation | Enter your name | [pages/simulation.html](./pages/simulation.html) |
| Scenario | Answer questions | [pages/scenario.html](./pages/scenario.html) |
| Results | See your score | [pages/result.html](./pages/result.html) |
| Alerts | Learn about scams | [pages/alerts.html](./pages/alerts.html) |
| About | Project information | [pages/about.html](./pages/about.html) |

---

## 🌍 Language Support

Click the 🌐 button in the top-right to toggle:
- 🇺🇸 English (Left-to-Right)
- 🇸🇦 Arabic (Right-to-Left)

All content translates instantly!

---

## ✨ Features Included

- ✅ 5 interactive scenarios
- ✅ Real-time scoring
- ✅ Instant feedback
- ✅ Awareness level assessment
- ✅ Bilingual support (EN/AR)
- ✅ Mobile responsive
- ✅ Smooth animations
- ✅ No signup needed

---

## 🔧 Customization (Advanced)

### Change Colors
Edit `css/style.css`:
```css
:root {
  --primary-color: #667eea;     ← Change this
  --secondary-color: #764ba2;   ← Change this
}
```

### Change Scenarios
Edit `js/api.js`:
```javascript
getMockScenario(scenarioNumber = 1) {
  const scenarios = [
    { /* Edit scenario data here */ }
  ]
}
```

### Add Language
Edit `js/language.js` and add to translations object.

---

## 📱 Browser Support

Works on:
- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers
- ✅ Tablets

---

## 📚 Documentation Map

Need help? Check these files:

| Need | Check This |
|------|------------|
| Setup Instructions | [INSTALLATION.md](./INSTALLATION.md) |
| Project Overview | [README.md](./README.md) |
| File Navigation | [FILE_INDEX.md](./FILE_INDEX.md) |
| Customization | [DEVELOPER_GUIDE.md](./DEVELOPER_GUIDE.md) |
| Add Languages | [INTERNATIONALIZATION.md](./INTERNATIONALIZATION.md) |
| Backend Setup | [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) |
| Complete Summary | [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md) |

---

## ❓ Common Questions

### Q: Do I need to install anything?
A: No! Just open `index.html` in a browser.

### Q: Will it work offline?
A: Yes! Everything works without internet.

### Q: Can I use it on my phone?
A: Yes! It's fully responsive for mobile.

### Q: How do I change the theme?
A: Edit the CSS variables in `css/style.css`

### Q: Can I add more scenarios?
A: Yes! Modify the scenarios in `js/api.js`

### Q: How do I add another language?
A: Add translations to `js/language.js`

### Q: Can I connect to a real backend?
A: Yes! See `API_DOCUMENTATION.md`

---

## 🎯 What to Try

1. **Start a Simulation** - Complete 5 scenarios
2. **Toggle Language** - Try English and Arabic
3. **Check Alerts** - Learn about scam warning signs
4. **Read About** - Understand the project
5. **Check Mobile** - Open on your phone
6. **Try Dark Theme** - Adapt for your needs

---

## 💡 Pro Tips

1. Try answering incorrectly to see explanations
2. Review the red flags for each scenario
3. Check how the page layout changes in Arabic
4. Test on different screen sizes (F12 → Device Mode)
5. Open browser console (F12) to see technical details

---

## 🚀 Next Steps

- ✅ **Now**: Explore the simulator
- 📚 **Later**: Read the documentation
- 🎨 **Eventually**: Customize to your needs
- 🔧 **Advanced**: Integrate with a backend

---

## 📞 Need More Help?

1. Check the relevant documentation file
2. Look at code comments in JavaScript files
3. Open browser console (F12) for errors
4. Review INSTALLATION.md troubleshooting section

---

## ✅ You're All Set!

Everything is ready to use. No installation, no setup required!

**Just open `index.html` and start learning!** 🛡️

---

**Status**: ✅ Complete & Ready  
**Version**: 1.0  
**Last Updated**: January 2024

🎉 **Enjoy your cybersecurity awareness training!** 🎉
