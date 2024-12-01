// Функция для анимации элементов при прокрутке
function handleScrollAnimation() {
    const elements = document.querySelectorAll('.about-content, .service-card, .contact-card, .hero, h2, .contact-info, .why-choose-us , .why-choose-us-card');
    
    elements.forEach(element => {
        const position = element.getBoundingClientRect();
        
        // Показываем элемент, когда он находится в пределах видимой области
        if(position.top < window.innerHeight - 100) {
            element.classList.add('visible');
        }
    });
}

// Функция для проверки авторизации
function checkAuth() {
    const isAuthenticated = false; // Здесь будет проверка авторизации
    const profileIcon = document.querySelector('.profile-icon');
    const authButtons = document.querySelectorAll('.login-btn, .register-btn');
    
    if (isAuthenticated) {
        profileIcon.style.display = 'block';
        authButtons.forEach(button => button.style.display = 'none');
    } else {
        profileIcon.style.display = 'none';
        authButtons.forEach(button => button.style.display = 'block');
    }
}

// Обработчик клика по иконке профиля
document.querySelector('.profile-icon').addEventListener('click', function() {
    const menu = this.querySelector('.profile-menu');
    menu.classList.toggle('active');
});

// Закрываем меню при клике вне его
document.addEventListener('click', function(event) {
    if (!event.target.closest('.profile-icon')) {
        document.querySelector('.profile-menu').classList.remove('active');
    }
});

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Проверяем авторизацию
    checkAuth();
    
    // Запускаем первичную проверку анимации
    handleScrollAnimation();

    // Функционал чата
    const chatButton = document.querySelector('.chat-button');
    const chatContainer = document.querySelector('.chat-container');
    const closeChat = document.querySelector('.close-chat');
    const sendMessage = document.querySelector('.send-message');
    const messageInput = document.querySelector('.chat-input textarea');
    const messagesContainer = document.querySelector('.chat-messages');
    const quickReplies = document.querySelectorAll('.quick-reply-btn');

    // Ответы бота на часто задаваемые вопросы
    const botResponses = {
        'Как долго вы на рынке?': 'Мы успешно работаем на рынке уже более 5 лет, предоставляя качественные услуги нашим клиентам.',
        'Сколько стоят услуги?': 'Стоимость наших услуг зависит от конкретного проекта. Базовая консультация - от 5000 рублей. Для получения точной стоимости, пожалуйста, свяжитесь с нашими менеджерами.',
        'Какие гарантии вы предоставляете?': 'Мы предоставляем гарантию качества на все наши услуги. Работаем по договору, предоставляем полную отчетность и гарантируем конфиденциальность.',
        'Как начать сотрудничество?': 'Для начала сотрудничества вы можете оставить заявку на сайте или связаться с нами по телефону. Наш менеджер свяжется с вами в течение рабочего дня для обсуждения деталей.'
    };

    // Открытие/закрытие чата
    chatButton.addEventListener('click', () => {
        chatContainer.classList.toggle('active');
    });

    closeChat.addEventListener('click', () => {
        chatContainer.classList.remove('active');
    });

    // Обработка быстрых ответов
    quickReplies.forEach(button => {
        button.addEventListener('click', () => {
            const question = button.dataset.question;
            
            // Добавляем вопрос пользователя
            const userMessageDiv = document.createElement('div');
            userMessageDiv.className = 'message user';
            userMessageDiv.innerHTML = `
                <div class="message-content">${question}</div>
            `;
            messagesContainer.appendChild(userMessageDiv);

            // Отмечаем кнопку как использованную
            button.classList.add('used');
            
            // Добавляем ответ бота
            setTimeout(() => {
                const botMessageDiv = document.createElement('div');
                botMessageDiv.className = 'message bot';
                botMessageDiv.innerHTML = `
                    <div class="message-content">${botResponses[question]}</div>
                `;
                messagesContainer.appendChild(botMessageDiv);
                messagesContainer.scrollTop = messagesContainer.scrollHeight;
            }, 500);

            // Прокручиваем к последнему сообщению
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        });
    });

    // Отправка сообщения
    function sendUserMessage() {
        const message = messageInput.value.trim();
        if (message) {
            // Добавляем сообщение пользователя
            const userMessageDiv = document.createElement('div');
            userMessageDiv.className = 'message user';
            userMessageDiv.innerHTML = `
                <div class="message-content">${message}</div>
            `;
            messagesContainer.appendChild(userMessageDiv);

            // Очищаем поле ввода
            messageInput.value = '';

            // Прокручиваем к последнему сообщению
            messagesContainer.scrollTop = messagesContainer.scrollHeight;

            // Ответ бота
            setTimeout(() => {
                const botMessageDiv = document.createElement('div');
                botMessageDiv.className = 'message bot';
                botMessageDiv.innerHTML = `
                    <div class="message-content">Спасибо за ваш вопрос! Для получения более подробной информации, пожалуйста, выберите один из предложенных вопросов выше или свяжитесь с нашими менеджерами по телефону.</div>
                `;
                messagesContainer.appendChild(botMessageDiv);
                messagesContainer.scrollTop = messagesContainer.scrollHeight;
            }, 1000);
        }
    }

    // Обработчики отправки сообщения
    sendMessage.addEventListener('click', sendUserMessage);
    
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendUserMessage();
        }
    });
});

// Слушаем событие прокрутки
window.addEventListener('scroll', handleScrollAnimation);
