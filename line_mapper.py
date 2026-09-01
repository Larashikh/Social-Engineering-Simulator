import pathlib
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

root = pathlib.Path(__file__).parent
files = [
    'index.html',
    'pages/simulation.html',
    'pages/scenario.html',
    'pages/feedback.html',
    'pages/result.html',
    'pages/alerts.html',
    'js/app.js',
    'js/api.js',
    'js/language.js',
    'css/style.css',
    'css/responsive.css'
]
patterns = [
    r'<nav>',
    r'<section',
    r'<script src',
    r'data-i18n',
    r'id="',
    r'class="',
    r'href="',
    r'<button',
    r'<input',
    r'<form',
    r'constructor\(',
    r'init\(',
    r'startSimulation',
    r'loadCurrentPage',
    r'loadScenario',
    r'renderScenario',
    r'submitAnswer',
    r'preventBackNavigation',
    r'restrictNavToHome',
    r'getScenario',
    r'request\(',
    r'post\(',
    r'toggleLanguage',
    r'translations',
    r'setLanguage',
    r't\(',
    r'updatePageTranslations',
    r'renderResults',
    r'renderResultLists',
    r'getAwarenessLevel',
    r'getAwarenessLevelClass',
]

for rel in files:
    path = root / rel
    print('---', rel, '---')
    if not path.exists():
        print('MISSING', path)
        continue
    with path.open('r', encoding='utf-8') as f:
        for num, line in enumerate(f, 1):
            if any(re.search(p, line) for p in patterns):
                print(f'{num}: {line.rstrip()}')
    print()
