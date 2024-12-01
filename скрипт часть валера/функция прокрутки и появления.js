document.addEventListener('DOMContentLoaded', () => {
    const animItems = document.querySelectorAll('._anim-item');

    if (animItems.length > 0) {
        // Первая проверка видимости и активация анимации
        function activateAnimation() {
            animItems.forEach(animItem => {
                const animItemHeight = animItem.offsetHeight;
                const animItemOffset = offset(animItem).top;
                const animStart = 1;

                let animItemPoint = window.innerHeight - animItemHeight / animStart;
                if (animItemHeight > window.innerHeight) {
                    animItemPoint = window.innerHeight - window.innerHeight / animStart;
                }

                if ((window.pageYOffset > animItemOffset - animItemPoint) &&
                    (window.pageYOffset < animItemOffset + animItemHeight)) {
                    animItem.classList.add('_active');
                } else {
                    if (!animItem.classList.contains('_anim-no-hide')) {
                        animItem.classList.remove('_active');
                    }
                }
            });
        }

        // Используем Intersection Observer, если он доступен
        if ('IntersectionObserver' in window) {
            let observerOptions = { threshold: 0.2 };
            let observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('_active');
                    } else {
                        if (!entry.target.classList.contains('_anim-no-hide')) {
                            entry.target.classList.remove('_active');
                        }
                    }
                });
            }, observerOptions);

            animItems.forEach(item => observer.observe(item));
        } else {
            window.addEventListener('scroll', activateAnimation);
            window.addEventListener('load', activateAnimation);
            activateAnimation();
        }
    }

    // Функция вычисления позиции относительно верха страницы
    function offset(el) {
        const rect = el.getBoundingClientRect();
        return {
            top: rect.top + window.pageYOffset,
            left: rect.left + window.pageXOffset
        };
    }
});