
// ===== MENÚ MÓVIL =====
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');

menuToggle.addEventListener('click', () => {
  nav.classList.toggle('open');
  menuToggle.textContent = nav.classList.contains('open') ? '✕' : '☰';
});

document.querySelectorAll('.nav a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuToggle.textContent = '☰';
  });
});

// ===== MODAL DE RESERVAS =====
const modal = document.getElementById('bookingModal');
const modalClose = document.getElementById('modalClose');
const bookingForm = document.getElementById('bookingForm');
const successMessage = document.getElementById('successMessage');
const successText = document.getElementById('successText');
const successClose = document.getElementById('successClose');
const serviceSelect = document.getElementById('service');
const dateInput = document.getElementById('date');

function openModal(service = '') {
  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');

  if (service) {
    serviceSelect.value = service;
  }

  setTimeout(() => {
    document.getElementById('name').focus();
  }, 300);
}

function closeModal() {
  modal.classList.remove('active');
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');

  setTimeout(() => {
    bookingForm.style.display = 'flex';
    successMessage.classList.remove('active');
    bookingForm.reset();
  }, 300);
}

document.querySelectorAll('.open-booking').forEach(button => {
  button.addEventListener('click', () => {
    openModal(button.dataset.service || '');
  });
});

modalClose.addEventListener('click', closeModal);
successClose.addEventListener('click', closeModal);

modal.addEventListener('click', event => {
  if (event.target === modal) closeModal();
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && modal.classList.contains('active')) {
    closeModal();
  }
});

// ===== FECHA MÍNIMA: HOY =====
const today = new Date();
const localDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
  .toISOString()
  .split('T')[0];

dateInput.min = localDate;

// ===== ENVÍO DEL FORMULARIO =====
bookingForm.addEventListener('submit', event => {
  event.preventDefault();

  const name = document.getElementById('name').value.trim();
  const service = serviceSelect.value;
  const date = dateInput.value;
  const time = document.getElementById('time').value;

  if (!name || !service || !date || !time) {
    alert('Por favor, completa todos los campos obligatorios.');
    return;
  }

  const formattedDate = new Date(`${date}T12:00:00`).toLocaleDateString('es-SV', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  successText.textContent =
    `Gracias, ${name}. Tu solicitud para ${service} ha sido recibida para el ${formattedDate} a las ${time}. Te contactaremos para confirmar tu cita.`;

  bookingForm.style.display = 'none';
  successMessage.classList.add('active');
});

// ===== ANIMACIONES AL HACER SCROLL =====
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12
});

revealElements.forEach(element => revealObserver.observe(element));

// ===== BOTÓN VOLVER ARRIBA =====
const scrollTop = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
  scrollTop.classList.toggle('show', window.scrollY > 500);
});

scrollTop.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});