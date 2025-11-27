// Дополнения к основному скрипту для работы навигации

document.addEventListener('DOMContentLoaded', function() {
    // Мобильное меню
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileNavClose = document.querySelector('.mobile-nav-close');
    const mobileNavOverlay = document.querySelector('.mobile-nav-overlay');
    
    // Открытие мобильного меню
    mobileMenuBtn.addEventListener('click', function() {
        mobileNav.classList.add('active');
        mobileNavOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    // Закрытие мобильного меню
    function closeMobileMenu() {
        mobileNav.classList.remove('active');
        mobileNavOverlay.classList.remove('active');
        document.body.style.overflow = '';
        
        // Закрываем все подменю
        document.querySelectorAll('.mobile-submenu').forEach(submenu => {
            submenu.classList.remove('active');
        });
        document.querySelectorAll('.has-submenu').forEach(item => {
            item.classList.remove('active');
        });
    }
    
    mobileNavClose.addEventListener('click', closeMobileMenu);
    mobileNavOverlay.addEventListener('click', closeMobileMenu);
    
    // Подменю в мобильной навигации
    const mobileSubmenuItems = document.querySelectorAll('.has-submenu');
    
    mobileSubmenuItems.forEach(item => {
        const link = item.querySelector('.mobile-nav-link');
        
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const submenu = item.querySelector('.mobile-submenu');
            
            // Закрываем другие подменю
            mobileSubmenuItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.mobile-submenu').classList.remove('active');
                }
            });
            
            // Переключаем текущее подменю
            item.classList.toggle('active');
            submenu.classList.toggle('active');
        });
    });
    
    // Активное состояние для навигационных ссылок
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Убираем активный класс у всех ссылок
            navLinks.forEach(l => l.classList.remove('active'));
            // Добавляем активный класс к текущей ссылке
            this.classList.add('active');
        });
    });
    
    // Закрытие выпадающих меню при клике вне их
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.nav-item')) {
            document.querySelectorAll('.dropdown-menu').forEach(menu => {
                menu.style.opacity = '0';
                menu.style.visibility = 'hidden';
            });
        }
    });
    
    // Плавное появление выпадающих меню
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        const dropdown = item.querySelector('.dropdown-menu');
        
        if (dropdown) {
            item.addEventListener('mouseenter', function() {
                dropdown.style.opacity = '1';
                dropdown.style.visibility = 'visible';
                dropdown.style.transform = 'translateX(-50%) translateY(0)';
            });
            
            item.addEventListener('mouseleave', function() {
                dropdown.style.opacity = '0';
                dropdown.style.visibility = 'hidden';
                dropdown.style.transform = 'translateX(-50%) translateY(-10px)';
            });
        }
    });
    
    // Поиск в реальном времени (заглушка)
    const searchInput = document.querySelector('.search-bar input');
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        if (searchTerm.length > 2) {
            // Здесь будет логика поиска
            console.log('Поиск:', searchTerm);
        }
    });
    
    // Обработка отправки формы поиска
    const searchForm = document.querySelector('.search-bar');
    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const searchTerm = searchInput.value.trim();
        if (searchTerm) {
            alert(`Поиск: ${searchTerm}`);
            // Здесь будет редирект на страницу поиска
        }
    });
    
    // Добавляем класс для активной страницы
    function setActivePage() {
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href && currentPath.includes(href.replace('/', ''))) {
                link.classList.add('active');
            }
        });
    }
    
    setActivePage();
    
    // Показать/скрыть поиск на мобильных устройствах
    function initMobileSearch() {
        const searchBar = document.querySelector('.search-bar');
        const searchBtn = document.querySelector('.search-btn');
        
        if (window.innerWidth <= 768) {
            searchBar.classList.add('mobile-search');
            searchBtn.addEventListener('click', function() {
                searchBar.classList.toggle('active');
            });
        }
    }
    
    initMobileSearch();
    window.addEventListener('resize', initMobileSearch);
});

// Добавляем стили для мобильного поиска
const mobileSearchStyles = `
@media (max-width: 768px) {
    .search-bar.mobile-search {
        position: relative;
    }
    
    .search-bar.mobile-search input {
        display: none;
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        z-index: 1000;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    }
    
    .search-bar.mobile-search.active input {
        display: block;
    }
    
    .search-bar.mobile-search .search-btn {
        border-radius: 8px;
    }
}
`;

// Добавляем стили в документ
const styleSheet = document.createElement('style');
styleSheet.textContent = mobileSearchStyles;
document.head.appendChild(styleSheet);
