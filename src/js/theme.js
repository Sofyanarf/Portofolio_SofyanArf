/* ==========================================
   THEME TOGGLE SYSTEM (DARK / LIGHT MODE)
   ========================================== */

export function initTheme() {
  const themeBtn = document.getElementById('theme-toggle');
  
  // Check localStorage or system preference
  const savedTheme = localStorage.getItem('pref-theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'dark'); // Default dark
  applyTheme(initialTheme);

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const targetTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(targetTheme);
    });
  }
}

export function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('pref-theme', theme);
}
