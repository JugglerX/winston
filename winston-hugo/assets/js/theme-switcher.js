const root = document.documentElement;
const themeBtns = document.querySelectorAll('.theme-switcher > button');

themeBtns.forEach(btn => {
  btn.addEventListener('click', handleThemeUpdate);
});

function handleThemeUpdate(e) {
  var themeName = e.target.value;

  var styleSheets = document.querySelectorAll('[data-theme]');
  styleSheets.forEach(match => {
    match.parentNode.removeChild(match);
  });

  if (themeName === 'reset') {
    localStorage.removeItem('theme');
    console.log('test');
  } else {
    addCss(themeName);
    localStorage.setItem('theme', themeName);
  }

  // root.style.setProperty('--background-color', '#B3E5FC');
  // root.style.setProperty('--bg-text', '#37474F');
}

function addCss(themeName) {
  var head = document.head;
  var link = document.createElement('link');

  link.dataset.theme = themeName;
  link.type = 'text/css';
  link.rel = 'stylesheet';
  link.href = `/css/${themeName}.css`;

  head.appendChild(link);
}

const savedTheme = localStorage.getItem('theme');
addCss(savedTheme);
