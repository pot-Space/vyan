'use strint';

// Одиночный слайдер
function sliderSingle() {
  const stagesSlider = document.querySelector('[data-slider="#stages-slider"]');
  const slides = stagesSlider.querySelector('.slides');
  const slide = stagesSlider.querySelectorAll('.slide');
  const prevButton = stagesSlider.querySelector('.prev');
  const nextButton = stagesSlider.querySelector('.next');
  const dotsContainer = stagesSlider.querySelector('.dots');

  let currentIndex = 0;
  const totalSlides = slide.length;

  // Создание точек для каждого слайда
  slide.forEach((currentSlide, index) => {
    const dot = document.createElement('button');
    dot.classList.add('dot');
    if (index === 0) dot.classList.add('active'); // Активная точка для первого слайда
    dot.addEventListener('click', () => goToSlide(index)); // Переключение слайда при клике на точку
    dotsContainer.appendChild(dot);
  });

  const dots = stagesSlider.querySelectorAll('.dot');

  function updateSlider() {
    const offset = -currentIndex * slides.offsetWidth; // Ширина одного слайда
    // const offset = -currentIndex * (slides.offsetWidth / 3);
    slides.style.transform = `translateX(${offset}px)`;

    // Обновляем активную точку
    dots.forEach(dot => dot.classList.remove('active'));
    dots[currentIndex].classList.add('active');
  }

  nextButton.addEventListener('click', () => {
    if ((currentIndex + 2) === totalSlides) nextButton.setAttribute('disabled', true);
    prevButton.removeAttribute('disabled');

    currentIndex = (currentIndex + 1) % totalSlides;
    updateSlider();
  });

  prevButton.addEventListener('click', () => {
    if ((currentIndex - 1) === 0) prevButton.setAttribute('disabled', true);
    nextButton.removeAttribute('disabled');

    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateSlider();
  });

  function goToSlide(index) {
    prevButton.removeAttribute('disabled');
    nextButton.removeAttribute('disabled');
    if ((index + 1) === totalSlides) nextButton.setAttribute('disabled', true);
    if (index === 0) prevButton.setAttribute('disabled', true);

    currentIndex = index;
    updateSlider();
  }
}
sliderSingle();

// Множественный слайдер
function sliderMulti() {
  const membersSlider = document.querySelector('[data-slider="#members-slider"]'),
    slides = membersSlider.querySelector('.slides');
  let slide = membersSlider.querySelectorAll('.slide'),
    slidesToShow = 3;
  const prevButton = membersSlider.querySelector('.prev'),
    nextButton = membersSlider.querySelector('.next'),
    counter = membersSlider.querySelector('.counter'),
    counterCurrent = counter.querySelector('.current'),
    counterTotal = counter.querySelector('.total');

  for (let i = 0; i < slidesToShow; i++) {
    slides.appendChild(slide[i].cloneNode(true));
  }
  slide = membersSlider.querySelectorAll('.slide');


  let currentIndex = 0;
  let isTransitioning = false;
  const totalSlides = 6; // Слайды без копий
  const totalSlidesWithCopies = slide.length;

  function updateSlider(transition = true) {
    const screenWidth = window.innerWidth;

    if (screenWidth <= 768) slidesToShow = 1;

    const offset = -currentIndex * (100 / slidesToShow);
    if (transition) {
      slides.style.transition = 'transform 0.3s ease-in-out';
    } else {
      slides.style.transition = 'none';
    }

    slides.style.transform = `translateX(${offset}%)`;
    updateCounter();
  }

  function updateCounter() {
    let displayIndex = currentIndex + 1;

    if (currentIndex >= totalSlides) displayIndex = 1;
    counterCurrent.textContent = displayIndex;
    counterTotal.textContent = totalSlides;
  }

  nextButton.addEventListener('click', () => {
    if (isTransitioning) return;
    isTransitioning = true;
    currentIndex++;
    updateSlider();

    if (currentIndex === totalSlidesWithCopies - 3) {
      setTimeout(() => {
        currentIndex = 0;
        updateSlider(false);
        isTransitioning = false;
      }, 500);
    } else {
      setTimeout(() => isTransitioning = false, 100);
    }
  });

  prevButton.addEventListener('click', () => {
    if (isTransitioning) return;
    isTransitioning = true;
    currentIndex--;
    updateSlider();

    if (currentIndex < 0) {
      setTimeout(() => {
        currentIndex = totalSlides - 1;
        updateSlider(false);
        isTransitioning = false;
      }, 500);
    } else {
      setTimeout(() => isTransitioning = false, 500);
    }
  });

  window.addEventListener('resize', updateSlider);
  updateSlider();
}
sliderMulti();