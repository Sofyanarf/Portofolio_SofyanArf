/* ==========================================
   CLI TERMINAL EASTER EGG ENGINE
   ========================================== */

import { openProjectModal } from './projects.js';
import { openResumeModal } from './resume.js';
import { applyTheme } from './theme.js';

export function initTerminal() {
  const modal = document.getElementById('terminal-modal');
  const triggerBtn = document.getElementById('terminal-trigger');
  const closeBtn = document.getElementById('term-close');
  const input = document.getElementById('terminal-input');
  const output = document.getElementById('terminal-output');

  if (!modal || !input) return;

  if (triggerBtn) {
    triggerBtn.addEventListener('click', () => toggleTerminal(true));
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', () => toggleTerminal(false));
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) toggleTerminal(false);
  });

  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      const isOpen = modal.classList.contains('open');
      toggleTerminal(!isOpen);
    }
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const command = input.value.trim();
      if (command) {
        processCommand(command);
        input.value = '';
      }
    }
  });

  function toggleTerminal(show) {
    if (show) {
      modal.classList.add('open');
      setTimeout(() => input.focus(), 100);
    } else {
      modal.classList.remove('open');
    }
  }

  function printLine(text, type = '') {
    const line = document.createElement('div');
    line.className = `term-line ${type}`;
    line.innerHTML = text;
    output.appendChild(line);
    output.scrollTop = output.scrollHeight;
  }

  function processCommand(cmdStr) {
    printLine(`<span class="term-prompt">sofyan@uad-portfolio:~$</span> ${escapeHTML(cmdStr)}`);

    const parts = cmdStr.toLowerCase().split(' ');
    const cmd = parts[0];
    const args = parts.slice(1);

    switch (cmd) {
      case 'help':
        printLine(`Daftar Perintah CLI Terseedia:`);
        printLine(`  <span class="term-highlight">about</span>     - Menampilkan profil Sofyan Arifin (Mahasiswa UAD)`);
        printLine(`  <span class="term-highlight">skills</span>    - Menampilkan ringkasan Data Analytics tools`);
        printLine(`  <span class="term-highlight">projects</span>  - Menampilkan daftar proyek analisis data`);
        printLine(`  <span class="term-highlight">contact</span>   - Menampilkan kontak & email UAD`);
        printLine(`  <span class="term-highlight">resume</span>    - Membuka modal Resume CV Sofyan Arifin`);
        printLine(`  <span class="term-highlight">theme</span>     - Mengubah tema (dark / light)`);
        printLine(`  <span class="term-highlight">sudo hire</span> - [Bonus] Rekrut / Ajak Kolaborasi Sofyan Arifin!`);
        printLine(`  <span class="term-highlight">date</span>      - Menampilkan tanggal & waktu server`);
        printLine(`  <span class="term-highlight">clear</span>     - Membersihkan layar terminal`);
        break;

      case 'about':
        printLine(`<strong>Muhammad Sofyan Arifin</strong> - Mahasiswa S1 Teknik Informatika UAD (2023 - Sekarang, Semester 7).`);
        printLine(`Pendidikan: Lulusan SMA (2020) &rarr; Melanjutkan S1 Teknik Informatika UAD.`);
        printLine(`Pengalaman Industri: 2 Tahun di PT Astra Daihatsu Motor sebagai Operator Produksi Painting (2021-2023).`);
        printLine(`Manajemen Proyek: Project Manager Proyek Sistem Antrian Cucian Mobil & Motor Berbasis Web (MPTI).`);
        printLine(`Program Khusus: Alumni Dicoding x DBS Foundation (Data Scientist Learning Path) & Developer Capstone 'Path’Ora'.`);
        printLine(`Fokus Keahlian: Data Analysis, Business Intelligence, Python Machine Learning, SQL & Project Management.`);
        break;

      case 'skills':
        printLine(`<strong>Daftar Keahlian & Tech Stack:</strong>`);
        printLine(`• Pemrograman & Web: Python, C++, JavaScript, HTML & CSS`);
        printLine(`• Database: MySQL, PostgreSQL`);
        printLine(`• Visualisasi & Analisis: Tableau, Excel, Matplotlib`);
        printLine(`• Tools & Workflow: GitHub, VS Code`);
        break;

      case 'projects':
        printLine(`<strong>Daftar Proyek:</strong>`);
        printLine(`1. <span class="term-highlight">NadaNusantara</span>: Platform Multimedia Interaktif Musik Tradisional (github.com/Sofyanarf/NadaNusantara)`);
        printLine(`2. <span class="term-highlight">Path’Ora</span>: Platform Kesiapan Kerja & Rekomendasi Karir (github.com/MuchsinHJ/PathOra | Demo: pathoradashboard.streamlit.app)`);
        printLine(`3. <span class="term-highlight">Sistem Antrian Cucian Mobil & Motor</span>: Project Manager Sistem Web & Dashboard Operasional (MPTI UAD)`);
        break;

      case 'contact':
        printLine(`<strong>Kontak Resmi Muhammad Sofyan Arifin:</strong>`);
        printLine(`Email: muhamadsofyanarifin310@gmail.com`);
        printLine(`GitHub: <a href="https://github.com/Sofyanarf" target="_blank" class="term-highlight">github.com/Sofyanarf</a>`);
        printLine(`LinkedIn: <a href="https://www.linkedin.com/in/muhammad-sofyan-arifin" target="_blank" class="term-highlight">linkedin.com/in/muhammad-sofyan-arifin</a>`);
        printLine(`Instagram: <a href="https://www.instagram.com/sofyanarf_?dlrf=MW83NWdxMDJocWd1NA%3D%3D&utm_source=qr" target="_blank" class="term-highlight">@sofyanarf_</a>`);
        printLine(`Kampus: Universitas Ahmad Dahlan (UAD), Yogyakarta`);
        break;

      case 'resume':
      case 'cv':
        printLine(`Membuka modal Resume CV Sofyan Arifin...`, 'term-success');
        openResumeModal();
        toggleTerminal(false);
        break;

      case 'theme':
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const target = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(target);
        printLine(`Tema berhasil diubah ke mode: <strong>${target}</strong>`, 'term-success');
        break;

      case 'sudo':
        if (args.join(' ') === 'hire') {
          printLine(`🎉 TERIMA KASIH! Akses kolaborasi diberikan. Silakan gulir ke formulir kontak untuk menghubungi Muhammad Sofyan Arifin!`, 'term-success');
          document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
          toggleTerminal(false);
        } else {
          printLine(`Permission denied: pengguna bukan root. Coba 'sudo hire'`, 'term-error');
        }
        break;

      case 'date':
        printLine(`Current System Time: ${new Date().toLocaleString('id-ID')}`);
        break;

      case 'clear':
        output.innerHTML = '';
        break;

      default:
        printLine(`Perintah tidak dikenali: '${escapeHTML(cmdStr)}'. Ketik <span class="term-highlight">'help'</span> untuk panduan.`, 'term-error');
    }
  }

  function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
      tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
  }
}
