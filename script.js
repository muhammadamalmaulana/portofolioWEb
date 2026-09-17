/**
 * Muhammad Amal Maulana - Portfolio JavaScript
 * Interactive functionality: theme toggle, smooth scroll, project modal, form handling
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initMobileMenu();
  initScrollEffects();
  initScrollTop();
});

/* ==========================================================================
   THEME TOGGLE (Dark / Light Mode)
   ========================================================================== */
function initThemeToggle() {
  const themeToggle = document.getElementById('themeToggle');
  const body = document.body;

  // Retrieve saved preference or default to dark mode
  const savedTheme = localStorage.getItem('mam-portfolio-theme') || 'dark';
  if (savedTheme === 'light') {
    body.classList.remove('dark-mode');
    body.classList.add('light-mode');
  } else {
    body.classList.remove('light-mode');
    body.classList.add('dark-mode');
  }

  themeToggle.addEventListener('click', () => {
    if (body.classList.contains('light-mode')) {
      body.classList.remove('light-mode');
      body.classList.add('dark-mode');
      localStorage.setItem('mam-portfolio-theme', 'dark');
    } else {
      body.classList.remove('dark-mode');
      body.classList.add('light-mode');
      localStorage.setItem('mam-portfolio-theme', 'light');
    }
  });
}

/* ==========================================================================
   MOBILE MENU TOGGLE
   ========================================================================== */
function initMobileMenu() {
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  mobileToggle.addEventListener('click', () => {
    navMenu.classList.toggle('mobile-open');
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('mobile-open');
    });
  });
}

/* ==========================================================================
   SCROLL EFFECTS: Active Nav Links & Header Shadow
   ========================================================================== */
function initScrollEffects() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const header = document.getElementById('header');

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    // Header backdrop effect on scroll
    if (scrollY > 50) {
      header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
    } else {
      header.style.boxShadow = 'none';
    }

    // Active Section Link Highlight
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });
}

/* ==========================================================================
   SCROLL TO TOP BUTTON
   ========================================================================== */
function initScrollTop() {
  const scrollTopBtn = document.getElementById('scrollTopBtn');

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 350) {
      scrollTopBtn.style.opacity = '1';
      scrollTopBtn.style.pointerEvents = 'auto';
    } else {
      scrollTopBtn.style.opacity = '0.7';
    }
  });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ==========================================================================
   PROJECT MODAL DETAILS
   ========================================================================== */
const projectData = {
  project1: {
    title: 'Project 1 - Website',
    tag: 'Website',
    tagClass: 'tag-website',
    image: 'assets/project1.png',
    desc: 'Website profil modern dan responsif yang dibuat menggunakan HTML5 semantik, CSS3 murni dengan flexbox/grid, dan Vanilla JavaScript. Desain disesuaikan untuk menampilkan portofolio pribadi secara profesional, clean, dan cepat dimuat.',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design']
  },
  project2: {
    title: 'Project 2 - Sistem Web',
    tag: 'Sistem',
    tagClass: 'tag-sistem',
    image: 'assets/project2.png',
    desc: 'Aplikasi sistem informasi berbasis web yang memanfaatkan PHP untuk logika backend dan MySQL sebagai basis data relasional. Dilengkapi dengan panel kontrol (dashboard), visualisasi data grafik, serta manajemen data CRUD lengkap.',
    tech: ['PHP', 'MySQL', 'JavaScript', 'Chart.js', 'Bootstrap']
  },
  project3: {
    title: 'Project 3 - UI/UX',
    tag: 'UI/UX',
    tagClass: 'tag-uiux',
    image: 'assets/project3.png',
    desc: 'Perancangan antarmuka pengguna (UI) dan pengalaman pengguna (UX) untuk aplikasi mobile modern menggunakan Figma. Menggunakan tema dark mode futuristik dengan palet warna ungu neon yang ergonomis dan elegan.',
    tech: ['Figma', 'UI Design', 'UX Wireframing', 'Prototyping', 'Design System']
  }
};

function openProjectModal(projectId) {
  const project = projectData[projectId];
  if (!project) return;

  const modal = document.getElementById('projectModal');
  const modalTag = document.getElementById('modalTag');
  const modalTitle = document.getElementById('modalTitle');
  const modalImage = document.getElementById('modalImage');
  const modalDesc = document.getElementById('modalDesc');
  const modalTech = document.getElementById('modalTech');

  modalTag.textContent = project.tag;
  modalTag.className = `modal-tag ${project.tagClass}`;
  modalTitle.textContent = project.title;
  modalImage.src = project.image;
  modalDesc.textContent = project.desc;

  // Build tech badges
  modalTech.innerHTML = project.tech.map(t => `<span class="tech-badge">${t}</span>`).join('');

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
  const modal = document.getElementById('projectModal');
  modal.classList.remove('active');
  document.body.style.overflow = 'auto';
}

function closeProjectModalOnOverlay(event) {
  if (event.target.id === 'projectModal') {
    closeProjectModal();
  }
}

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeProjectModal();
  }
});

/* ==========================================================================
   CONTACT FORM SUBMISSION
   ========================================================================== */
function handleFormSubmit(event) {
  event.preventDefault();

  const name = document.getElementById('senderName').value.trim();
  const email = document.getElementById('senderEmail').value.trim();
  const message = document.getElementById('senderMessage').value.trim();

  if (!name || !email || !message) {
    showToast('Harap isi semua kolom formulir!');
    return;
  }

  // Show success toast
  showToast(`Terima kasih ${name}, pesan Anda berhasil dikirim!`);

  // Reset form
  document.getElementById('contactForm').reset();
}

function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}
