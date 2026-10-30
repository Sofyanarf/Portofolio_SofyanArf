/* ==========================================
   TESTIMONIALS SLIDER COMPONENT
   ========================================== */

export function initTestimonials() {
  const cards = document.querySelectorAll('.testimonial-card');
  const dots = document.querySelectorAll('.slider-dots .dot');
  const prevBtn = document.getElementById('testimonial-prev');
  const nextBtn = document.getElementById('testimonial-next');

  if (cards.length === 0) return;

  let currentIndex = 0;
  let autoTimer = null;

  function showSlide(index) {
    if (index < 0) index = cards.length - 1;
    if (index >= cards.length) index = 0;

    currentIndex = index;

    cards.forEach((card, i) => {
      card.classList.toggle('active', i === currentIndex);
    });

    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentIndex);
    });
  }

  function startAutoSlide() {
    stopAutoSlide();
    autoTimer = setInterval(() => {
      showSlide(currentIndex + 1);
    }, 5000);
  }

  function stopAutoSlide() {
    if (autoTimer) clearInterval(autoTimer);
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      showSlide(currentIndex - 1);
      startAutoSlide();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      showSlide(currentIndex + 1);
      startAutoSlide();
    });
  }

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const index = parseInt(dot.getAttribute('data-index'));
      showSlide(index);
      startAutoSlide();
    });
  });

  // Pause on hover
  const sliderWrapper = document.querySelector('.testimonial-slider-wrapper');
  if (sliderWrapper) {
    sliderWrapper.addEventListener('mouseenter', stopAutoSlide);
    sliderWrapper.addEventListener('mouseleave', startAutoSlide);
  }

  startAutoSlide();
}
