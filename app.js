/**
 * MONTERRA B.V. - MODERN PROFESSIONAL REDESIGN
 * Interactive application logic & UX enhancements
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initProjectsFilter();
  initProjectModal();
  initCalculator();
  initContactForm();
});

/* ==========================================================================
   NAVIGATION & SCROLL
   ========================================================================== */
function initNavigation() {
  const header = document.querySelector('.site-header');
  const mobileToggle = document.querySelector('.mobile-menu-btn');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  // Scroll effect on header
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Active link highlighting
    let currentId = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 120;
      const height = sec.offsetHeight;
      if (window.scrollY >= top && window.scrollY < top + height) {
        currentId = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  });

  // Mobile menu toggle
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const isOpen = navMenu.classList.contains('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when clicking link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
      });
    });
  }
}

/* ==========================================================================
   RECENT PROJECTS DATA & FILTER
   All content & imagery strictly from monterrabv.nl
   ========================================================================== */
const projectData = [
  {
    id: 'project-1', category: 'begeleiding', title: 'Projectbegeleiding bij torenbouw',
    tag: 'Projectbegeleiding • Planning & toezicht',
    shortDesc: 'Coördinatie en toezicht bij werkzaamheden op een moderne bouwlocatie.',
    fullDesc: 'Monterra ondersteunt de uitvoering met zorgvuldige planning, afstemming en toezicht op locatie. Zo verlopen werkzaamheden veilig en volgens afspraak.',
    image: 'assets/monterra-torenbouw.jpg', imageFallback: 'assets/monterra-torenbouw.jpg',
    specs: { toepassing: 'Bouwlocaties en openbare buitenruimte', dienst: 'Planning, afstemming en toezicht', duurzaamheid: 'Zorgvuldige uitvoering en lange levensduur' }
  },
  {
    id: 'project-2', category: 'speelruimte', title: 'Speelplaats met houten speeltoestellen',
    tag: 'Speeltoestellen • Montage',
    shortDesc: 'Een uitnodigende speelplaats met houten toestellen en een veilige, zachte ondergrond.',
    fullDesc: 'Montage van speelvoorzieningen op een schoolplein, met aandacht voor een prettige indeling, veilige plaatsing en een nette afwerking.',
    image: 'assets/monterra-speelplaats.jpg', imageFallback: 'assets/monterra-speelplaats.jpg',
    specs: { toepassing: 'Schoolplein en speelplaats', dienst: 'Montage en controle', duurzaamheid: 'Duurzame materialen voor dagelijks gebruik' }
  },
  {
    id: 'project-3', category: 'sport', title: 'Sport- en speeltoestellen in de buitenruimte',
    tag: 'Sport & bewegen • Montage',
    shortDesc: 'Montage van sport- en speelvoorzieningen voor actief gebruik buiten.',
    fullDesc: 'Een sportieve buitenruimte met klim- en beweegtoestellen en een omheind speelveld. De voorzieningen zijn zorgvuldig gemonteerd voor veilig gebruik.',
    image: 'assets/monterra-sportpark.jpg', imageFallback: 'assets/monterra-sportpark.jpg',
    specs: { toepassing: 'Sport- en speelterrein', dienst: 'Montage en oplevering', duurzaamheid: 'Stevige constructies voor intensief gebruik' }
  },
  {
    id: 'project-4', category: 'sport', title: 'Ronde trampolineomheining',
    tag: 'Sport & bewegen • Veiligheid',
    shortDesc: 'Een stevige ronde omheining rondom een trampoline op een speelterrein.',
    fullDesc: 'Monterra plaatste een ronde omheining die de trampoline duidelijk afbakent en bijdraagt aan een veilige speelomgeving.',
    image: 'assets/monterra-trampoline.jpg', imageFallback: 'assets/monterra-trampoline.jpg',
    specs: { toepassing: 'Openbare speelplaats', dienst: 'Montage en veiligheidscontrole', duurzaamheid: 'Weerbestendige materialen' }
  },
  {
    id: 'project-5', category: 'sport', title: 'Voetbalveld met nieuwe omheining',
    tag: 'Sport & bewegen • Montage',
    shortDesc: 'Montage van een omheining rondom een voetbal- en speelveld.',
    fullDesc: 'Een nieuw hekwerk begrenst het voetbalveld en houdt de speelruimte overzichtelijk. De panelen zijn stevig geplaatst en zorgvuldig afgewerkt.',
    image: 'assets/monterra-voetbalveld.jpg', imageFallback: 'assets/monterra-voetbalveld.jpg',
    specs: { toepassing: 'Schoolplein en sportveld', dienst: 'Montage en controle van hekwerk', duurzaamheid: 'Sterke onderdelen voor langdurig gebruik' }
  }
];

function initProjectsFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   PROJECT MODAL / LIGHTBOX
   ========================================================================== */
function initProjectModal() {
  const modal = document.getElementById('projectModal');
  const closeBtn = document.querySelector('.modal-close-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (!modal) return;

  projectCards.forEach(card => {
    card.addEventListener('click', () => {
      const pid = card.getAttribute('data-project-id');
      const item = projectData.find(p => p.id === pid);
      if (!item) return;

      document.getElementById('modalProjectImg').src = item.image;
      document.getElementById('modalProjectImg').alt = item.title;
      document.getElementById('modalProjectTag').textContent = item.tag;
      document.getElementById('modalProjectTitle').textContent = item.title;
      document.getElementById('modalProjectDesc').textContent = item.fullDesc;

      document.getElementById('modalSpecApp').textContent = item.specs.toepassing;
      document.getElementById('modalSpecService').textContent = item.specs.dienst;
      document.getElementById('modalSpecSustainability').textContent = item.specs.duurzaamheid;

      const rawLink = document.getElementById('modalRawImageLink');
      if (rawLink) {
        rawLink.href = item.rawImage;
      }

      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   INTERACTIVE INQUIRY & CALCULATOR
   ========================================================================== */
function initCalculator() {
  const serviceInputs = document.querySelectorAll('input[name="calc_service"]');
  const productInputs = document.querySelectorAll('input[name="calc_product"]');
  const summaryEl = document.getElementById('calcSummaryText');
  const actionBtn = document.getElementById('calcActionBtn');

  function updateSummary() {
    const selectedService = document.querySelector('input[name="calc_service"]:checked')?.value || 'Montage & Installatie';
    const selectedProducts = Array.from(document.querySelectorAll('input[name="calc_product"]:checked')).map(cb => cb.value);

    const productString = selectedProducts.length > 0 
      ? selectedProducts.join(', ') 
      : 'Speeltoestellen & Straatmeubilair';

    if (summaryEl) {
      summaryEl.textContent = `Aanvraag: ${selectedService} voor ${productString}. Monterra denkt graag met u mee!`;
    }

    if (actionBtn) {
      actionBtn.href = 'offerte.html';
      actionBtn.target = '_blank';
      actionBtn.rel = 'noopener noreferrer';
    }
  }

  serviceInputs.forEach(input => input.addEventListener('change', updateSummary));
  productInputs.forEach(input => input.addEventListener('change', updateSummary));

  updateSummary();
}

/* ==========================================================================
   CONTACT FORM & TOAST
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const toast = document.getElementById('toastNotice');
  const toastClose = toast?.querySelector('.toast-close-btn');

  toastClose?.addEventListener('click', () => toast.classList.remove('show'));

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (toast) {
      toast.querySelector('.toast-text').innerHTML = '<strong>Bedankt voor uw bericht!</strong><br>Wij bekijken uw aanvraag en nemen zo spoedig mogelijk contact met u op.';
      toast.classList.add('show');
    }
    form.reset();
  });
}
