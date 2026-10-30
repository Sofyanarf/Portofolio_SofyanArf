/* ==========================================
   INTERACTIVE RESUME / CV MODAL & PRINT ENGINE
   ========================================== */

export function initResume() {
  const modal = document.getElementById('cv-modal');
  const triggerBtn = document.getElementById('open-cv-modal');
  const downloadBtn = document.getElementById('btn-download-resume');
  const closeBtn = document.getElementById('cv-modal-close-btn');
  const printBtn = document.getElementById('btn-print-cv');
  const body = document.getElementById('resume-printable-area');

  if (!modal || !body) return;

  renderCVContent(body);

  if (triggerBtn) triggerBtn.addEventListener('click', () => openResumeModal());
  if (downloadBtn) downloadBtn.addEventListener('click', () => openResumeModal());

  if (closeBtn) {
    closeBtn.addEventListener('click', () => modal.classList.remove('open'));
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('open');
  });

  if (printBtn) {
    printBtn.addEventListener('click', () => {
      printCVDocument();
    });
  }
}

export function openResumeModal() {
  const modal = document.getElementById('cv-modal');
  if (modal) modal.classList.add('open');
}

/**
 * High-fidelity CV print and PDF download engine
 * Uses an isolated hidden iframe with dedicated A4 styles to ensure
 * complete rendering across all pages without browser clipping or blank sheets.
 */
function printCVDocument() {
  const printableArea = document.getElementById('resume-printable-area');
  if (!printableArea) {
    window.print();
    return;
  }

  // Remove previous iframe if present
  const prevFrame = document.getElementById('cv-print-iframe');
  if (prevFrame) prevFrame.remove();

  // Create clean isolated iframe
  const printFrame = document.createElement('iframe');
  printFrame.id = 'cv-print-iframe';
  printFrame.style.position = 'fixed';
  printFrame.style.right = '0';
  printFrame.style.bottom = '0';
  printFrame.style.width = '0';
  printFrame.style.height = '0';
  printFrame.style.border = '0';
  printFrame.style.visibility = 'hidden';
  document.body.appendChild(printFrame);

  const frameDoc = printFrame.contentWindow.document;
  const contentHtml = printableArea.innerHTML;

  frameDoc.open();
  frameDoc.write(`
    <!DOCTYPE html>
    <html lang="id">
    <head>
      <meta charset="UTF-8">
      <title>Curriculum Vitae - Muhammad Sofyan Arifin</title>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500;600&display=swap" rel="stylesheet">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
      <style>
        @page {
          size: A4 portrait;
          margin: 12mm 15mm;
        }
        *, *::before, *::after {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
        html, body {
          background: #ffffff !important;
          color: #1e293b !important;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          font-size: 9.5pt;
          line-height: 1.5;
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
        }
        .cv-paper {
          display: flex;
          flex-direction: column;
          gap: 1.1rem;
          width: 100%;
          max-width: 100%;
        }
        .cv-header-block {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          border-bottom: 2px solid #0d9488;
          padding-bottom: 0.85rem;
          gap: 1.5rem;
        }
        .cv-name h1 {
          font-size: 1.75rem;
          font-weight: 700;
          color: #0f172a;
          letter-spacing: -0.5px;
          line-height: 1.2;
          margin-bottom: 0.2rem;
        }
        .cv-role {
          font-size: 0.95rem;
          font-weight: 600;
          color: #0d9488;
          margin-bottom: 0.2rem;
        }
        .cv-sub {
          font-size: 0.82rem;
          color: #64748b;
        }
        .cv-contact-info {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 0.3rem;
          font-size: 0.82rem;
          white-space: nowrap;
        }
        .cv-contact-item {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          color: #334155;
        }
        .cv-contact-item i {
          color: #0d9488;
          font-size: 0.85rem;
          width: 14px;
          text-align: center;
        }
        .cv-contact-item a {
          color: #334155;
          text-decoration: none;
        }
        .cv-section {
          display: flex;
          flex-direction: column;
          gap: 0.45rem;
          page-break-inside: avoid;
        }
        .cv-section-title {
          font-size: 0.95rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.75px;
          color: #0f172a;
          border-bottom: 1.5px solid #e2e8f0;
          padding-bottom: 0.3rem;
          display: flex;
          align-items: center;
          gap: 0.45rem;
        }
        .cv-section-title::before {
          content: "";
          display: inline-block;
          width: 6px;
          height: 6px;
          background-color: #0d9488;
          border-radius: 50%;
        }
        .cv-desc {
          font-size: 0.85rem;
          line-height: 1.55;
          color: #334155;
          text-align: justify;
        }
        .cv-item {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
          page-break-inside: avoid;
          margin-bottom: 0.25rem;
        }
        .cv-item-header {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        .cv-item-title {
          font-size: 0.9rem;
          font-weight: 700;
          color: #0f172a;
        }
        .cv-item-date {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.78rem;
          font-weight: 600;
          color: #64748b;
          white-space: nowrap;
        }
        .cv-item-sub {
          font-size: 0.82rem;
          font-weight: 600;
          color: #0d9488;
        }
        .cv-item-sub a {
          color: #0d9488;
          text-decoration: none;
        }
        .cv-list {
          font-size: 0.83rem;
          line-height: 1.5;
          color: #334155;
          padding-left: 1.15rem;
          margin-top: 0.2rem;
        }
        .cv-list li {
          margin-bottom: 0.2rem;
        }
        .cv-cert-list {
          font-size: 0.84rem;
          line-height: 1.65;
          color: #334155;
        }
        .cv-skills-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.65rem;
          margin-top: 0.2rem;
        }
        .cv-skill-cat {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 4px;
          padding: 0.45rem 0.65rem;
        }
        .cv-skill-cat strong {
          display: block;
          font-size: 0.8rem;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 0.15rem;
        }
        .cv-skill-cat span {
          font-size: 0.8rem;
          color: #475569;
        }
      </style>
    </head>
    <body>
      ${contentHtml}
    </body>
    </html>
  `);
  frameDoc.close();

  setTimeout(() => {
    try {
      printFrame.contentWindow.focus();
      printFrame.contentWindow.print();
    } catch {
      window.print();
    }
  }, 400);
}

function renderCVContent(container) {
  container.innerHTML = `
    <div class="cv-paper">
      <!-- HEADER BLOCK -->
      <div class="cv-header-block">
        <div class="cv-name">
          <h1>Muhammad Sofyan Arifin</h1>
          <p class="cv-role">Data Analyst & Business Intelligence Specialist</p>
          <p class="cv-sub">Mahasiswa S1 Teknik Informatika (Semester 7) – Universitas Ahmad Dahlan, Yogyakarta</p>
        </div>
        <div class="cv-contact-info">
          <div class="cv-contact-item">
            <i class="fa-solid fa-envelope"></i>
            <a href="mailto:muhamadsofyanarifin310@gmail.com">muhamadsofyanarifin310@gmail.com</a>
          </div>
          <div class="cv-contact-item">
            <i class="fa-brands fa-github"></i>
            <a href="https://github.com/Sofyanarf" target="_blank" rel="noopener noreferrer">github.com/Sofyanarf</a>
          </div>
          <div class="cv-contact-item">
            <i class="fa-brands fa-linkedin"></i>
            <a href="https://www.linkedin.com/in/muhammad-sofyan-arifin" target="_blank" rel="noopener noreferrer">linkedin.com/in/muhammad-sofyan-arifin</a>
          </div>
          <div class="cv-contact-item">
            <i class="fa-solid fa-location-dot"></i>
            <span>Yogyakarta, Indonesia</span>
          </div>
        </div>
      </div>

      <!-- RINGKASAN PROFIL -->
      <div class="cv-section">
        <h3 class="cv-section-title">Ringkasan Profil</h3>
        <p class="cv-desc">
          Mahasiswa S1 Teknik Informatika Universitas Ahmad Dahlan (UAD) angkatan 2023 (Semester 7). Memiliki pengalaman kepemimpinan sebagai Project Manager pada proyek pengembangan sistem antrian berbasis web (MPTI), rekam jejak kerja profesional selama 2 tahun di PT Astra Daihatsu Motor (Departemen Painting, 2021–2023), serta lulusan program beasiswa Dicoding x DBS Foundation (Data Scientist Learning Path) dengan menyelesaikan Capstone Project <em>Path’Ora</em>. Memadukan kemampuan tata kelola proyek (Agile/Scrum) dengan keahlian teknis pembersihan data (Data Wrangling), analisis statistik & Machine Learning dengan Python (Pandas, Scikit-Learn), kueri relasional SQL kompleks, serta visualisasi data interaktif (Tableau, Excel).
        </p>
      </div>

      <!-- PENGALAMAN KERJA & MANAJEMEN PROYEK -->
      <div class="cv-section">
        <h3 class="cv-section-title">Pengalaman Kerja & Manajemen Proyek</h3>
        
        <div class="cv-item">
          <div class="cv-item-header">
            <span class="cv-item-title">Project Manager – Sistem Antrian Cucian Kendaraan Berbasis Web</span>
            <span class="cv-item-date">2024</span>
          </div>
          <p class="cv-item-sub">Proyek Matakuliah MPTI – Universitas Ahmad Dahlan</p>
          <ul class="cv-list">
            <li>Memimpin tim pengembang dalam siklus SDLC proyek pengembangan sistem antrian digital cucian kendaraan roda dua dan roda empat berbasis website.</li>
            <li>Mengelola ruang lingkup proyek (Project Scope Management), penyusunan WBS, timeline sprint, alokasi sumber daya, dan manajemen risiko.</li>
            <li>Mengkoordinasikan perancangan arsitektur antrian real-time, manajemen slot pencucian kendaraan, dan dashboard metrik operasional harian.</li>
            <li>Melakukan supervisi Quality Assurance (QA) serta memastikan deliverable sistem selesai tepat waktu dan sesuai spesifikasi pengguna.</li>
          </ul>
        </div>

        <div class="cv-item">
          <div class="cv-item-header">
            <span class="cv-item-title">Operator Produksi – Departemen Painting</span>
            <span class="cv-item-date">2021 – 2023 (2 Tahun)</span>
          </div>
          <p class="cv-item-sub">PT Astra Daihatsu Motor (Astra Group)</p>
          <ul class="cv-list">
            <li>Menjalankan proses produksi dan pengawasan mutu pengecatan bodi kendaraan dengan standar ketat Astra (Zero Defect).</li>
            <li>Melakukan inspeksi visual, pemantauan parameter proses kerja, serta pencatatan dan monitoring data cacat (defect rate) harian.</li>
            <li>Menerapkan budaya kerja Kaizen (Continuous Improvement), metodologi 5S, dan standar keselamatan kerja (K3) manufaktur otomotif.</li>
            <li>Membangun ketelitian operasional dan kedisiplinan pencatatan data akurat yang menjadi fondasi kuat dalam analisis data.</li>
          </ul>
        </div>
      </div>

      <!-- PENDIDIKAN FORMAL & PROGRAM KHUSUS -->
      <div class="cv-section">
        <h3 class="cv-section-title">Pendidikan Formal & Program Khusus</h3>
        
        <div class="cv-item">
          <div class="cv-item-header">
            <span class="cv-item-title">S1 Teknik Informatika – Universitas Ahmad Dahlan (UAD)</span>
            <span class="cv-item-date">2023 – Sekarang (Semester 7)</span>
          </div>
          <p class="cv-item-sub">Yogyakarta, Indonesia</p>
          <ul class="cv-list">
            <li>Fokus Peminatan: Data Science, Advanced Database Systems, Machine Learning, & Data Visualization.</li>
            <li>Aktif dalam pengerjaan riset pemodelan peramalan data, visualisasi KPI bisnis, dan manajemen proyek perangkat lunak (MPTI).</li>
          </ul>
        </div>

        <div class="cv-item">
          <div class="cv-item-header">
            <span class="cv-item-title">Dicoding x DBS Foundation – Data Scientist Learning Path</span>
            <span class="cv-item-date">2024 (Semester 6)</span>
          </div>
          <p class="cv-item-sub">Program Akselerasi Talenta Data Science Nasional</p>
          <ul class="cv-list">
            <li>Terpilih dalam program beasiswa intensif kolaborasi DBS Foundation dan Dicoding Indonesia.</li>
            <li>Menyelesaikan kurikulum komprehensif: Pemrograman Python untuk Data Science, Data Wrangling, Exploratory Data Analysis (EDA), dan Pemodelan Machine Learning.</li>
            <li><strong>Capstone Project (Data Scientist):</strong> Mengembangkan <em>Path’Ora</em> – Platform End-to-End Kesiapan Kerja dengan fitur Dashboard Strategis dan Rekomendasi Jalur Karir Otomatis.</li>
          </ul>
        </div>

        <div class="cv-item">
          <div class="cv-item-header">
            <span class="cv-item-title">Sekolah Menengah Atas (SMA)</span>
            <span class="cv-item-date">Lulus 2020</span>
          </div>
          <p class="cv-item-sub">Pendidikan Menengah Atas</p>
          <ul class="cv-list">
            <li>Menyelesaikan pendidikan SMA pada tahun 2020 dengan minat kuat di bidang sains dan teknologi sebelum memulai pengalaman kerja profesional selama 2 tahun di industri manufaktur otomotif.</li>
          </ul>
        </div>
      </div>

      <!-- PENGALAMAN PROYEK DATA & RISET -->
      <div class="cv-section">
        <h3 class="cv-section-title">Pengalaman Proyek Data & Riset</h3>
        
        <div class="cv-item">
          <div class="cv-item-header">
            <span class="cv-item-title">Path’Ora – Platform Kesiapan Kerja & Rekomendasi Karir Otomatis</span>
            <span class="cv-item-date">2024</span>
          </div>
          <p class="cv-item-sub">Capstone Project CC26-PSU344 – Dicoding x DBS Foundation (Role: Data Scientist) | <a href="https://github.com/MuchsinHJ/PathOra" target="_blank" rel="noopener noreferrer">github.com/MuchsinHJ/PathOra</a></p>
          <ul class="cv-list">
            <li>Merancang arsitektur pipeline data end-to-end dari data ingestion, preprocessing profil talenta, hingga model serving.</li>
            <li>Membangun model Machine Learning untuk sistem rekomendasi jalur karir otomatis berbasis skill gap dan profil kandidat.</li>
            <li>Merancang Dashboard Strategis (Talent Readiness & Skills Intelligence) untuk pemetaan supply-demand kompetensi kerja industri.</li>
          </ul>
        </div>

        <div class="cv-item">
          <div class="cv-item-header">
            <span class="cv-item-title">NadaNusantara – Platform Multimedia Interaktif Musik Tradisional</span>
            <span class="cv-item-date">2026</span>
          </div>
          <p class="cv-item-sub">Interactive Multimedia Web Application | <a href="https://github.com/Sofyanarf/NadaNusantara" target="_blank" rel="noopener noreferrer">github.com/Sofyanarf/NadaNusantara</a></p>
          <ul class="cv-list">
            <li>Mengembangkan aplikasi web multimedia interaktif untuk eksplorasi dan pelestarian instrumen musik tradisional Nusantara.</li>
            <li>Mengintegrasikan pemutar audio sampel instrumen (Gamelan, Sasando, Angklung), visualizer gelombang suara, dan modul kuis budaya interaktif.</li>
          </ul>
        </div>
      </div>

      <!-- SERTIFIKASI & LISENSI -->
      <div class="cv-section">
        <h3 class="cv-section-title">Sertifikasi & Lisensi</h3>
        <div class="cv-cert-list">
          <div>• <strong>Dicoding x DBS Foundation:</strong> Data Scientist Learning Path Graduate (2024)</div>
          <div>• <strong>Dicoding Indonesia:</strong> Data Analysis with Python & SQL Specialization (2024)</div>
        </div>
      </div>

      <!-- RINGKASAN KEAHLIAN TEKNIS -->
      <div class="cv-section">
        <h3 class="cv-section-title">Ringkasan Keahlian Teknis</h3>
        <div class="cv-skills-grid">
          <div class="cv-skill-cat">
            <strong>Programming & Web</strong>
            <span>Python, C++, JavaScript, HTML & CSS</span>
          </div>
          <div class="cv-skill-cat">
            <strong>Database</strong>
            <span>MySQL, PostgreSQL</span>
          </div>
          <div class="cv-skill-cat">
            <strong>Visualisasi & Analytics</strong>
            <span>Tableau, Excel, Matplotlib</span>
          </div>
          <div class="cv-skill-cat">
            <strong>Tools & Workflow</strong>
            <span>GitHub, VS Code</span>
          </div>
        </div>
      </div>
    </div>
  `;
}
