// Minimalist Photography Carousel Controller
(function () {
  window.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById('carousel-track');
    if (!track) return;

    const slides = Array.from(track.querySelectorAll('.carousel-slide'));
    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');
    const dotsContainer = document.getElementById('carousel-dots');
    const captionTitle = document.getElementById('caption-title');
    const captionLink = document.getElementById('caption-link');
    const counterEl = document.getElementById('carousel-counter');

    let currentIndex = 0;
    const totalSlides = slides.length;

    // Create pagination dots
    slides.forEach((_, idx) => {
      const dot = document.createElement('button');
      dot.className = `carousel-dot ${idx === 0 ? 'active' : ''}`;
      dot.setAttribute('aria-label', `Go to photo ${idx + 1}`);
      dot.addEventListener('click', () => goToSlide(idx));
      dotsContainer.appendChild(dot);
    });

    const dots = Array.from(dotsContainer.querySelectorAll('.carousel-dot'));

    function updateCarousel() {
      // Shift slide track
      track.style.transform = `translateX(-${currentIndex * 100}%)`;

      // Update active dot
      dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentIndex);
      });

      // Update slide accessibility
      slides.forEach((slide, idx) => {
        slide.setAttribute('aria-hidden', idx !== currentIndex);
      });

      // Update caption metadata
      const activeSlide = slides[currentIndex];
      if (activeSlide) {
        const title = activeSlide.getAttribute('data-title') || '';
        const url = activeSlide.getAttribute('data-url') || '#';
        if (captionTitle) captionTitle.textContent = title;
        if (captionLink) captionLink.setAttribute('href', url);
        if (counterEl) counterEl.textContent = `${currentIndex + 1} / ${totalSlides}`;
      }
    }

    function goToSlide(index) {
      if (index < 0) {
        currentIndex = totalSlides - 1;
      } else if (index >= totalSlides) {
        currentIndex = 0;
      } else {
        currentIndex = index;
      }
      updateCarousel();
    }

    if (prevBtn) prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));

    // Keyboard navigation when user is focused on the carousel
    const carouselSection = document.getElementById('photography');
    if (carouselSection) {
      carouselSection.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
          goToSlide(currentIndex - 1);
        } else if (e.key === 'ArrowRight') {
          goToSlide(currentIndex + 1);
        }
      });
    }

    // Touch swipe support for mobile devices
    let touchStartX = 0;
    let touchEndX = 0;

    track.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });

    function handleSwipe() {
      const swipeDistance = touchEndX - touchStartX;
      if (Math.abs(swipeDistance) > 40) {
        if (swipeDistance < 0) {
          goToSlide(currentIndex + 1); // Swiped left -> Next
        } else {
          goToSlide(currentIndex - 1); // Swiped right -> Prev
        }
      }
    }

    // Initialize state
    updateCarousel();
  });
})();
