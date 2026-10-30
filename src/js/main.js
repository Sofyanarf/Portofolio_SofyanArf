/* ==========================================
   MAIN APPLICATION ENTRY POINT
   ========================================== */

import { initTheme } from './theme.js';
import { initI18n } from './i18n.js';
import { initNavigation } from './navigation.js';
import { initHero } from './hero.js';
import { initSkills } from './skills.js';
import { initProjects } from './projects.js';
import { initTerminal } from './terminal.js';
import { initResume } from './resume.js';
import { initContact } from './contact.js';

document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 Portofolio Template initialized cleanly!');

  initTheme();
  initI18n();
  initNavigation();
  initHero();
  initSkills();
  initProjects();
  initTerminal();
  initResume();
  initContact();
});
