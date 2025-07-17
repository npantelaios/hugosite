const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { JSDOM } = require('jsdom');

describe('setTheme', () => {
  let window, document, body, setTheme;

  beforeEach(() => {
    const dom = new JSDOM(`<!doctype html><html><body class="colorscheme-auto"><button id="dark-mode-toggle"></button></body></html>`, {
      url: "http://localhost"
    });
    window = dom.window;
    document = window.document;
    body = document.body;
    if (!window.matchMedia) {
      window.matchMedia = () => ({
        matches: false,
        addListener: () => {},
        removeListener: () => {}
      });
    }
    global.window = window;
    global.document = document;
    global.localStorage = window.localStorage;
    global.matchMedia = window.matchMedia;
    const scriptPath = path.resolve(__dirname, '../assets/js/dark-mode.js');
    const scriptCode = fs.readFileSync(scriptPath, 'utf8');
    vm.createContext(window);
    vm.runInContext(scriptCode, window);
    setTheme = window.setTheme;
  });

  afterEach(() => {
    delete global.window;
    delete global.document;
    delete global.localStorage;
    delete global.matchMedia;
    delete global.setTheme;
  });

  test('setTheme("dark") updates localStorage and classes', () => {
    setTheme('dark');
    expect(localStorage.getItem('colorscheme')).toBe('dark');
    expect(body.classList.contains('colorscheme-dark')).toBe(true);
    expect(body.classList.contains('colorscheme-light')).toBe(false);
    expect(body.classList.contains('colorscheme-auto')).toBe(false);
  });

  test('setTheme("light") updates localStorage and classes', () => {
    setTheme('light');
    expect(localStorage.getItem('colorscheme')).toBe('light');
    expect(body.classList.contains('colorscheme-light')).toBe(true);
    expect(body.classList.contains('colorscheme-dark')).toBe(false);
    expect(body.classList.contains('colorscheme-auto')).toBe(false);
  });
});
