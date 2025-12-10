document.addEventListener('DOMContentLoaded', function() {
    
    const menuBtn = document.querySelector('.header_menu-btn');
    const menu = document.querySelector('.header_menu');
    
    console.log('Menu button:', menuBtn);
    console.log('Menu:', menu);
    
    if (!menuBtn || !menu) {
        console.error('Menu elements not found!');
        return;
    }
    
    let isMenuOpen = false;

    function openMenu() {
        isMenuOpen = true;
        menuBtn.setAttribute('aria-expanded', 'true');
        menu.removeAttribute('hidden');
        menu.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden'; 
    }

    function closeMenu() {
        isMenuOpen = false;
        menuBtn.setAttribute('aria-expanded', 'false');
        menu.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        
        setTimeout(() => {
            if (!isMenuOpen) {
                menu.setAttribute('hidden', '');
            }
        }, 300);
    }

    menuBtn.addEventListener('click', () => {
        if (isMenuOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isMenuOpen) {
            closeMenu();
        }
    });

    const menuLinks = menu.querySelectorAll('a');
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMenu();
        });
    });

});


