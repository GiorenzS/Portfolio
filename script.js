document.addEventListener('DOMContentLoaded', function() {
    
    const themeToggle = document.getElementById('themeToggle');
    const themeToggleDesktop = document.getElementById('themeToggleDesktop');
    const body = document.body;

    function toggleTheme() {
        body.classList.toggle('light');
        const isLight = body.classList.contains('light');
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
    }

    if (localStorage.getItem('theme') === 'light') {
        body.classList.add('light');
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleTheme();
        });
    }
    
    if (themeToggleDesktop) {
        themeToggleDesktop.addEventListener('click', toggleTheme);
    }

    const menu = document.querySelector('.menu');
    const centerNav = document.querySelector('.center');
    const right = document.querySelector('.right');
    const menuOverlay = document.querySelector('.menu-overlay');

    const originalIcon = right ? right.innerHTML : '';

    if (menu && centerNav && menuOverlay) {
        menu.addEventListener('click', (e) => {
            e.stopPropagation();
            centerNav.classList.toggle('active');
            menuOverlay.classList.toggle('active');
            
            if (right) {
                if (centerNav.classList.contains('active')) {
                    centerNav.appendChild(right);
                    right.classList.add('in-dropdown');
                    right.innerHTML = '<a href="#" class="theme-link">Change Theme</a>';
                    const themeLink = right.querySelector('.theme-link');
                    if (themeLink) {
                        themeLink.addEventListener('click', (e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            toggleTheme();
                        });
                    }
                } else {
                    const nav = document.querySelector('nav');
                    nav.appendChild(right);
                    right.classList.remove('in-dropdown');
                    right.innerHTML = originalIcon;
                    const restoredToggle = right.querySelector('#themeToggle');
                    if (restoredToggle) {
                        restoredToggle.addEventListener('click', (e) => {
                            e.stopPropagation();
                            toggleTheme();
                        });
                    }
                }
            }
        });

        menuOverlay.addEventListener('click', closeMenu);
        document.querySelectorAll('.center a').forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        function closeMenu() {
            centerNav.classList.remove('active');
            menuOverlay.classList.remove('active');
            if (right && right.parentElement === centerNav) {
                const nav = document.querySelector('nav');
                nav.appendChild(right);
                right.classList.remove('in-dropdown');
                right.innerHTML = originalIcon;
                const restoredToggle = right.querySelector('#themeToggle');
                if (restoredToggle) {
                    restoredToggle.addEventListener('click', (e) => {
                        e.stopPropagation();
                        toggleTheme();
                    });
                }
            }
        }
    }

        document.querySelectorAll('.skill-category').forEach(card => {
            card.addEventListener('click', (e) => {
                
                card.classList.toggle('active');
            });
        });
});