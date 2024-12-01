document.addEventListener('DOMContentLoaded', function() {
    const burgerMenu = document.querySelector('.burger-menu');
    const menuItems = document.querySelector('.menu-items');
    const swiper = document.querySelector('.swiper').swiper;

    burgerMenu.addEventListener('click', function() {
        this.classList.toggle('active');
        menuItems.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!burgerMenu.contains(event.target) && !menuItems.contains(event.target)) {
            burgerMenu.classList.remove('active');
            menuItems.classList.remove('active');
        }
    });

    // Section navigation buttons
    document.querySelectorAll('.section-btn').forEach((button, index) => {
        button.addEventListener('click', function() {
            swiper.slideTo(index);
            burgerMenu.classList.remove('active');
            menuItems.classList.remove('active');
        });
    });
});
