/* ==========================================
   SKILLS & TOOLS DATA
   ========================================== */

export const categoryLabels = {
  programming: 'Programming & Web',
  database: 'Database',
  bi: 'Visualisasi & BI',
  tools: 'Tools & Workflow'
};

export const skillsData = [
  // Pemrograman & Web
  { name: 'Python', category: 'programming', icon: 'fa-brands fa-python' },
  { name: 'C++', category: 'programming', icon: 'fa-solid fa-code' },
  { name: 'JavaScript', category: 'programming', icon: 'fa-brands fa-js' },
  { name: 'HTML & CSS', category: 'programming', icon: 'fa-brands fa-html5' },

  // Database
  { name: 'MySQL', category: 'database', icon: 'fa-solid fa-database' },
  { name: 'PostgreSQL', category: 'database', icon: 'fa-solid fa-server' },

  // BI & Visualisasi
  { name: 'Tableau', category: 'bi', icon: 'fa-solid fa-chart-column' },
  { name: 'Excel', category: 'bi', icon: 'fa-solid fa-file-excel' },
  { name: 'Matplotlib', category: 'bi', icon: 'fa-solid fa-chart-line' },

  // Tools & Workflow
  { name: 'GitHub', category: 'tools', icon: 'fa-brands fa-github' },
  { name: 'VS Code', category: 'tools', icon: 'fa-solid fa-laptop-code' }
];

export function initSkills() {
  const container = document.getElementById('skills-container');
  const filterBtns = document.querySelectorAll('#skills-filter .filter-btn');
  const searchInput = document.getElementById('skills-search');

  if (!container) return;

  renderSkills(skillsData);

  // Filter Buttons Handler
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      filterAndRenderSkills(filter, searchInput ? searchInput.value : '');
    });
  });

  // Search Input Handler
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const activeFilterBtn = document.querySelector('#skills-filter .filter-btn.active');
      const activeFilter = activeFilterBtn ? activeFilterBtn.getAttribute('data-filter') : 'all';
      filterAndRenderSkills(activeFilter, e.target.value);
    });
  }
}

function filterAndRenderSkills(category, searchQuery) {
  const query = searchQuery.toLowerCase().trim();
  const cleanQuery = query.replace(/[^a-z0-9]/g, '');

  const filtered = skillsData.filter(skill => {
    const matchesCategory = category === 'all' || skill.category === category;
    const nameLower = skill.name.toLowerCase();
    const cleanName = nameLower.replace(/[^a-z0-9]/g, '');
    const catLabel = (categoryLabels[skill.category] || skill.category).toLowerCase();

    const matchesSearch = !query ||
      nameLower.includes(query) ||
      cleanName.includes(cleanQuery) ||
      skill.category.toLowerCase().includes(query) ||
      catLabel.includes(query);

    return matchesCategory && matchesSearch;
  });

  renderSkills(filtered);
}

function renderSkills(skills) {
  const container = document.getElementById('skills-container');
  if (!container) return;

  if (skills.length === 0) {
    container.innerHTML = `
      <div class="no-results glass-card" style="grid-column: 1/-1; padding: 2.5rem; text-align: center;">
        <i class="fa-solid fa-magnifying-glass-minus" style="font-size: 2.5rem; color: var(--text-muted); margin-bottom: 1rem;"></i>
        <p>Tidak ada keahlian yang cocok dengan kata kunci pencarian Anda.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = skills.map(skill => `
    <div class="skill-card glass-card" data-category="${skill.category}">
      <div class="skill-header">
        <div class="skill-icon-box">
          <i class="${skill.icon}"></i>
        </div>
        <div class="skill-info">
          <h3>${skill.name}</h3>
          <span class="skill-category-tag">${categoryLabels[skill.category] || skill.category}</span>
        </div>
      </div>
    </div>
  `).join('');
}
