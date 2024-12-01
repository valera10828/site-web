// Функция боксов
function toggleBox(element) {
    const activeBoxes = document.querySelectorAll('.box-1.active');
    activeBoxes.forEach(box => box.classList.remove('active'));
    element.classList.toggle('active');
}

function navigateBoxes(direction) {
    const boxes = Array.from(document.querySelectorAll('.box-1'));
    const activeIndex = boxes.findIndex(box => box.classList.contains('active'));

    if (activeIndex !== -1) {
        boxes[activeIndex].classList.remove('active');
    }

    const newIndex = (direction === 'next' ? activeIndex + 1 : activeIndex - 1 + boxes.length) % boxes.length;
    boxes[newIndex].classList.add('active');
}

//Функция Галереи
const panels = document.querySelectorAll('.panel-gallery');

panels.forEach((panel) => {
    panel.addEventListener('click', () => {
      removeActiveClass();
      panel.classList.add('active-1');
    })
})

function removeActiveClass() {
    panels.forEach((panel) => {
        panel.classList.remove('active-1');
    })
}

// Функция видео перелистывания
function playVideo(videoSource) {
    const videoElement = document.getElementById('video-1');
    const effectElement = document.querySelector('.effect');

    effectElement.classList.add('fade-out');

    videoElement.src = videoSource;

    setTimeout(() => effectElement.classList.remove('fade-out'), 1000);
}
const quotes = [
    "Жизнь — это путешествие, а не пункт назначения.",
    "Море — это символ бесконечности и свободы.",
    "Туман — это символ неизвестности и загадки.",
    "Кошка — это символ независимости и грации.",
    "Счастье — это выбор, а не обстоятельство.",
    "Любовь — это действие, а не чувство.",
    "Дружба — это путешествие, а не пункт назначения.",
    "Семья — это символ любви и поддержки."
];

function getRandomQuote() {
    return quotes[Math.floor(Math.random() * quotes.length)];
}

const quoteElements = document.querySelectorAll('.quote');
quoteElements.forEach(quoteElement => {
    quoteElement.textContent = getRandomQuote();
});

const videoCache = {};
const effectElement = document.querySelector('.effect');
function preloadVideos(videos) {
    videos.forEach((video) => {
        const videoElement = document.createElement('video');
        videoElement.src = `/Проект%20гусаков%20и%20горелов/видео/${video}`;
        videoElement.preload = 'auto';
        videoCache[video] = videoElement;
    });
}
preloadVideos(['wimen-grass.mp4', 'sea-2.mp4', 'fog.mp4', 'cat.mp4']);