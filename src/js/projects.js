/* ==========================================
   DATA ANALYST PROJECTS SHOWCASE
   ========================================== */

export const projectsData = [
  {
    id: 'proj-nadanusantara',
    title: 'NadaNusantara: Platform Multimedia Interaktif Alat Musik Tradisional',
    category: 'dashboard',
    categoryLabel: 'Interactive Web & Multimedia',
    image: './images/project_nadanusantara.png',
    summary: 'Website multimedia interaktif pengenalan instrumen musik tradisional nusantara melalui audio sampler, gelombang suara, teks sejarah, dan kuis edukatif.',
    description: 'Platform multimedia edukasi berbasis web yang dirancang untuk melestarikan dan memperkenalkan kekayaan instrumen musik tradisional Nusantara (Gamelan, Angklung, Sasando, dll). Menghadirkan audio soundwave player interaktif, pemutaran suara sampel alat musik, modul eksplorasi instrumen per daerah, serta kuis interaktif penguji wawasan budaya Indonesia.',
    features: [
      'Katalog Eksplorasi Alat Musik Tradisional Multi-Daerah Indonesia',
      'Interactive Audio Player & Real-Time Soundwave Waveform Visualizer',
      'Kuis Interaktif Budaya Nusantara dengan Sistem Skoring Edukatif',
      'Antarmuka Responsif & Pengalaman Pengguna Berbasis Multimedia'
    ],
    tech: ['JavaScript', 'HTML5 Audio', 'CSS3 Glassmorphism', 'Web Multimedia', 'Interactive Quiz'],
    demoUrl: 'https://github.com/Sofyanarf/NadaNusantara',
    githubUrl: 'https://github.com/Sofyanarf/NadaNusantara'
  },
  {
    id: 'proj-pathora',
    title: 'Path’Ora: Platform Kesiapan Kerja & Rekomendasi Jalur Karir Otomatis',
    category: 'ml',
    categoryLabel: 'Capstone Data Science & AI',
    image: './images/project5.png',
    summary: 'Platform kesiapan kerja end-to-end yang menyajikan Dashboard Strategis analitik talenta dan sistem rekomendasi jalur karir otomatis berbasis Machine Learning.',
    description: 'Proyek Capstone CC26-PSU344 (Coding Camp powered by DBS Foundation & Dicoding). Berperan sebagai Data Scientist dalam Exploratory Data Analysis (EDA), perancangan Dashboard Visualisasi Streamlit, penyusunan Data Dictionary, serta integrasi pipeline analitik kesiapan kerja dan rekomendasi karir.',
    features: [
      'Sistem Rekomendasi Jalur Karir Otomatis berbasis Profil & Matriks Keahlian',
      'Dashboard Eksekutif Strategis Kesiapan Kerja (Live Streamlit Dashboard)',
      'Analisis Kesenjangan Keterampilan Tenaga Kerja (Talent Gap Analysis: Demand vs Supply)',
      'Arsitektur Data Pipeline End-to-End: Data Ingestion, EDA, Feature Engineering & Model Serving'
    ],
    tech: ['Python', 'Machine Learning', 'Scikit-Learn', 'Pandas', 'Streamlit', 'Data Pipeline', 'Data Visualization'],
    demoUrl: 'https://pathoradashboard.streamlit.app/',
    githubUrl: 'https://github.com/MuchsinHJ/PathOra'
  },
  {
    id: 'proj-mpti-washqueue',
    title: 'Sistem Manajemen Antrian Cucian Mobil & Motor Berbasis Website',
    category: 'dashboard',
    categoryLabel: 'Project Management & Web',
    image: './images/project6.png',
    summary: 'Pengembangan platform sistem antrian kendaraan real-time dan dashboard operasional berbasis website dengan peran sebagai Project Manager pada matakuliah MPTI.',
    description: 'Memimpin tim pengembang sebagai Project Manager dalam matakuliah Manajemen Proyek Teknologi Informasi (MPTI) di UAD. Mengorkestrasi seluruh siklus SDLC: scoping kebutuhan sistem, penyusunan WBS & timeline sprint Agile/Scrum, alokasi sumber daya, koordinasi lintas fungsi developer & UI/UX, pengujian QA, hingga deployment sistem pemantauan antrian slot cucian kendaraan secara real-time.',
    features: [
      'Peran Project Manager: Sprint Planning, Resource Allocation, Risk Management & QA',
      'Sistem Antrian Tiket Digital Real-Time untuk Kendaraan Mobil dan Sepeda Motor',
      'Visualisasi Status Bay Pencucian (Active, Waiting, Ready) & Estimasi Waktu Tunggu Otomatis',
      'Dashboard Analitik Operasional Harian: Volume Cucian, Rata-rata Durasi Layanan & Pendapatan'
    ],
    tech: ['Project Management', 'Agile / Scrum', 'Web System', 'Database MySQL', 'Operational Dashboard', 'System Architecture'],
    demoUrl: 'https://github.com/Sofyanarf/CarWash-Queue-System',
    githubUrl: 'https://github.com/Sofyanarf/CarWash-Queue-System'
  }
];

export function initProjects() {
  const container = document.getElementById('projects-container');
  const filterBtns = document.querySelectorAll('#projects-filter .filter-btn');
  const searchInput = document.getElementById('projects-search');

  if (!container) return;

  renderProjects(projectsData);

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      filterAndRenderProjects(filter, searchInput ? searchInput.value : '');
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const activeFilterBtn = document.querySelector('#projects-filter .filter-btn.active');
      const activeFilter = activeFilterBtn ? activeFilterBtn.getAttribute('data-filter') : 'all';
      filterAndRenderProjects(activeFilter, e.target.value);
    });
  }

  initProjectModal();
}

function filterAndRenderProjects(category, searchQuery) {
  const query = searchQuery.toLowerCase().trim();
  const filtered = projectsData.filter(project => {
    const matchesCategory = category === 'all' || project.category === category;
    const matchesSearch = project.title.toLowerCase().includes(query) || 
                          project.tech.some(t => t.toLowerCase().includes(query)) ||
                          project.summary.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });

  renderProjects(filtered);
}

function renderProjects(projects) {
  const container = document.getElementById('projects-container');
  if (!container) return;

  if (projects.length === 0) {
    container.innerHTML = `
      <div class="no-results glass-card" style="grid-column: 1/-1; padding: 2.5rem; text-align: center;">
        <i class="fa-solid fa-folder-open" style="font-size: 2.5rem; color: var(--text-muted); margin-bottom: 1rem;"></i>
        <p>Tidak ada proyek data yang sesuai dengan kriteria pencarian Anda.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = projects.map(project => `
    <div class="project-card glass-card" data-id="${project.id}">
      <div class="project-content">
        <div class="project-card-header">
          <span class="project-badge-cat">${project.categoryLabel}</span>
          <div class="project-quick-links">
            <a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="icon-link" title="Repository GitHub">
              <i class="fa-brands fa-github"></i>
            </a>
            ${project.demoUrl && project.demoUrl !== project.githubUrl ? `
              <a href="${project.demoUrl}" target="_blank" rel="noopener noreferrer" class="icon-link" title="Live Demo">
                <i class="fa-solid fa-arrow-up-right-from-square"></i>
              </a>
            ` : ''}
          </div>
        </div>
        <h3 class="project-title">${project.title}</h3>
        <p class="project-desc">${project.summary}</p>
        <div class="project-tech-tags">
          ${project.tech.map(t => `<span class="tech-tag">${t}</span>`).join('')}
        </div>
        <div class="project-card-footer">
          <button class="btn btn-sm btn-primary view-project-btn" data-id="${project.id}">
            <i class="fa-solid fa-eye"></i> Detail Proyek
          </button>
          <a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-outline">
            <i class="fa-brands fa-github"></i> Repository
          </a>
        </div>
      </div>
    </div>
  `).join('');

  document.querySelectorAll('.view-project-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const projId = btn.getAttribute('data-id');
      openProjectModal(projId);
    });
  });
}

function initProjectModal() {
  const modal = document.getElementById('project-modal');
  const closeBtn = document.getElementById('modal-close-btn');

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('open');
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('open');
      }
    });
  }
}

export function openProjectModal(id) {
  const modal = document.getElementById('project-modal');
  const content = document.getElementById('modal-project-content');
  const project = projectsData.find(p => p.id === id);

  if (!project || !modal || !content) return;

  content.innerHTML = `
    <div style="margin-bottom: 1.5rem; padding-bottom: 1.25rem; border-bottom: 1px solid var(--card-border);">
      <span style="font-size: 0.8rem; font-family: var(--font-code); color: var(--accent-primary); text-transform: uppercase;">${project.categoryLabel}</span>
      <h2 style="font-size: 1.8rem; margin-top: 0.3rem;">${project.title}</h2>
    </div>

    <div style="margin-bottom: 1.5rem;">
      <h4 style="margin-bottom: 0.5rem; font-size: 1.1rem;">Metodologi & Ringkasan Proyek</h4>
      <p style="font-size: 0.95rem; color: var(--text-secondary); line-height: 1.6;">${project.description}</p>
    </div>

    <div style="margin-bottom: 1.5rem;">
      <h4 style="margin-bottom: 0.75rem; font-size: 1.1rem;">Hasil & Fitur Analitik Utama</h4>
      <ul style="display: flex; flex-direction: column; gap: 0.5rem;">
        ${project.features.map(f => `<li style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.9rem;"><i class="fa-solid fa-circle-check" style="color: var(--accent-emerald);"></i> ${f}</li>`).join('')}
      </ul>
    </div>

    <div style="margin-bottom: 2rem;">
      <h4 style="margin-bottom: 0.75rem; font-size: 1.1rem;">Tech Stack & Analytics Tools</h4>
      <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
        ${project.tech.map(t => `<span class="tech-tag" style="padding: 0.3rem 0.75rem; font-size: 0.85rem;">${t}</span>`).join('')}
      </div>
    </div>

    <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
      ${project.demoUrl && project.demoUrl !== project.githubUrl ? `
        <a href="${project.demoUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-glow">
          <i class="fa-solid fa-arrow-up-right-from-square"></i> Buka Live Demo Streamlit
        </a>
      ` : ''}
      <a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn ${project.demoUrl && project.demoUrl !== project.githubUrl ? 'btn-secondary' : 'btn-primary btn-glow'}">
        <i class="fa-brands fa-github"></i> Lihat Repository GitHub & Notebook
      </a>
    </div>
  `;

  modal.classList.add('open');
}
