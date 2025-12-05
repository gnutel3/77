// script.js - для интерактивности

document.addEventListener('DOMContentLoaded', function() {
    // Установка текущего года в футере
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    // Плавная прокрутка к разделам при клике на пункты меню
    const menuLinks = document.querySelectorAll('.menu a[href^="#"]');
    
    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Скрываем меню на мобильных устройствах
                const menu = document.querySelector('.menu');
                if (menu.classList.contains('active')) {
                    menu.classList.remove('active');
                }
                
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Бургер-меню для мобильных устройств
    const burgerMenu = document.querySelector('.burger-menu');
    const menu = document.querySelector('.menu');
    
    if (burgerMenu) {
        burgerMenu.addEventListener('click', function() {
            menu.classList.toggle('active');
        });
    }
    
    // Валидация формы обратной связи
    const feedbackForm = document.getElementById('feedbackForm');
    
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Сброс предыдущих ошибок
            clearErrors();
            
            // Получение значений полей
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            let isValid = true;
            
            // Валидация имени
            if (name === '') {
                showError('nameError', 'Пожалуйста, введите ваше имя');
                isValid = false;
            }
            
            // Валидация email
            if (email === '') {
                showError('emailError', 'Пожалуйста, введите ваш email');
                isValid = false;
            } else if (!validateEmail(email)) {
                showError('emailError', 'Пожалуйста, введите корректный email (с символом @)');
                isValid = false;
            }
            
            // Валидация сообщения
            if (message === '') {
                showError('messageError', 'Пожалуйста, введите ваше сообщение');
                isValid = false;
            }
            
            // Если форма валидна, отправляем
            if (isValid) {
                // Здесь обычно отправка данных на сервер
                // Для демонстрации просто покажем сообщение об успехе
                showFormMessage('Ваше сообщение успешно отправлено! Мы свяжемся с вами в ближайшее время.', 'success');
                feedbackForm.reset();
                
                // Скрываем сообщение через 5 секунд
                setTimeout(() => {
                    document.getElementById('formMessage').textContent = '';
                    document.getElementById('formMessage').className = 'form-message';
                }, 5000);
            }
        });
    }
    
    // Функция валидации email
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Функция показа ошибки
    function showError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        errorElement.textContent = message;
    }
    
    // Функция очистки ошибок
    function clearErrors() {
        const errorElements = document.querySelectorAll('.error-message');
        errorElements.forEach(element => {
            element.textContent = '';
        });
        
        const formMessage = document.getElementById('formMessage');
        formMessage.textContent = '';
        formMessage.className = 'form-message';
    }
    
    // Функция показа сообщения формы
    function showFormMessage(message, type) {
        const formMessage = document.getElementById('formMessage');
        formMessage.textContent = message;
        formMessage.className = `form-message ${type}`;
    }
    
    // Анимация при скролле
    const animatedElements = document.querySelectorAll('.product-card, .about-content');
    
    function checkScroll() {
        animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Изначально скрываем элементы для анимации
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.5s, transform 0.5s';
    });
    
    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Проверяем при загрузке
});
