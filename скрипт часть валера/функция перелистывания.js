document.addEventListener('DOMContentLoaded', () => {
    if (typeof Swiper === 'undefined') {
        console.error('Swiper не загружен');
        return;
    }

    // Получаем элементы прогресс-индикатора
    const progressDots = document.querySelectorAll('.progress-dot');

    // Инициализация Swiper
    const swiper = new Swiper('.swiper', {
        direction: 'vertical',
        mousewheel: true,
        speed: 800,
        parallax: true,
        on: {
            slideChange: function () {
                updateProgressDots(this.activeIndex);

                // Параллакс эффект
                const slides = document.querySelectorAll('.swiper-slide');
                slides.forEach(slide => {
                    const bg = slide.querySelector('.slide-bg');
                    if (bg) {
                        if (slide.classList.contains('swiper-slide-active')) {
                            bg.style.transform = 'scale(1)';
                        } else {
                            bg.style.transform = 'scale(1.2)';
                        }
                    }
                });
            }
        }
    });

    // Инициализация первого индикатора
    updateProgressDots(0);

    // Добавление обработчика кликов для точек прогресса
    progressDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            swiper.slideTo(index);
        });
    });

    function updateProgressDots(activeIndex) {
        progressDots.forEach((dot, index) => {
            if (index < activeIndex) {
                dot.classList.add('filled');
                dot.classList.remove('active');
            } else if (index === activeIndex) {
                dot.classList.add('active');
                dot.classList.remove('filled');
            } else {
                dot.classList.remove('filled', 'active');
            }
        });
    }
});