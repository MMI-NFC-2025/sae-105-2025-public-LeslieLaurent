// Carrousel photo galerie (Apropos.html)
document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.photo-carousel .carousel-track');
    const photos = document.querySelectorAll('.photo-carousel .carousel-photo');
    const prevBtn = document.querySelector('.photo-carousel .carousel-btn.prev');
    const nextBtn = document.querySelector('.photo-carousel .carousel-btn.next');
    const dots = document.querySelectorAll('.carousel-dots .dot');
    let current = 0;
    function updatePhotoCarousel() {
        photos.forEach((photo, i) => {
            photo.classList.toggle('active', i === current);
        });
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === current);
        });
    }
    if (prevBtn && nextBtn && photos.length > 0) {
        prevBtn.addEventListener('click', () => {
            current = (current - 1 + photos.length) % photos.length;
            updatePhotoCarousel();
        });
        nextBtn.addEventListener('click', () => {
            current = (current + 1) % photos.length;
            updatePhotoCarousel();
        });
        dots.forEach((dot, i) => {
            dot.addEventListener('click', () => {
                current = i;
                updatePhotoCarousel();
            });
        });
        updatePhotoCarousel();
    }
});
// FAQ accordion déroulante
document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', function() {
        const item = btn.closest('.faq-item');
        const answer = item.querySelector('.faq-answer');
        const icon = btn.querySelector('.faq-icon');
        const isOpen = item.classList.contains('open');
        document.querySelectorAll('.faq-item.open').forEach(openItem => {
            if (openItem !== item) {
                openItem.classList.remove('open');
                openItem.querySelector('.faq-answer').style.maxHeight = null;
                openItem.querySelector('.faq-icon').textContent = '+';
            }
        });
        if (!isOpen) {
            item.classList.add('open');
            answer.style.maxHeight = answer.scrollHeight + 'px';
            icon.textContent = '-';
        } else {
            item.classList.remove('open');
            answer.style.maxHeight = null;
            icon.textContent = '+';
        }
    });
});
// Carrousel tarifs dédié à info.html
if (document.querySelector('.tarif-carousel-track')) {
    const track = document.querySelector('.tarif-carousel-track');
    const cards = document.querySelectorAll('.tarif-card');
    const prevBtn = document.querySelector('.tarif-carousel-btn.prev');
    const nextBtn = document.querySelector('.tarif-carousel-btn.next');
    let current = 0;
    function updateTarifCarousel() {
        cards.forEach((card, i) => {
            card.classList.toggle('active', i === current);
            card.style.display = (i === current) ? 'block' : 'none';
        });
    }
    if (prevBtn && nextBtn && cards.length > 0) {
        prevBtn.addEventListener('click', () => {
            current = (current - 1 + cards.length) % cards.length;
            updateTarifCarousel();
        });
        nextBtn.addEventListener('click', () => {
            current = (current + 1) % cards.length;
            updateTarifCarousel();
        });
        updateTarifCarousel();
    }
}
// Carrousel tarifs sur info.html
if (document.querySelector('.tarifs-section .carousel-track')) {
    const track = document.querySelector('.carousel-track');
    const cards = document.querySelectorAll('.tarif-card');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    let current = 0;
    function updateCarousel() {
        cards.forEach((card, i) => {
            card.classList.toggle('active', i === current);
            card.style.display = (i === current) ? 'block' : 'none';
        });
    }
    if (prevBtn && nextBtn && cards.length > 0) {
        prevBtn.addEventListener('click', () => {
            current = (current - 1 + cards.length) % cards.length;
            updateCarousel();
        });
        nextBtn.addEventListener('click', () => {
            current = (current + 1) % cards.length;
            updateCarousel();
        });
        updateCarousel();
    }
}
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

// Programme page filtering
if (document.querySelector('.programme-page')) {
    let currentDay = 'dimanche';
    let currentGenre = 'tous';
    let currentScene = 'toutes';

    // Date filter buttons
    const dateBtns = document.querySelectorAll('.date-btn');
    dateBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            dateBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const btnText = btn.textContent.toLowerCase();
            if (btnText.includes('dimanche')) {
                currentDay = 'dimanche';
            } else if (btnText.includes('lundi')) {
                currentDay = 'lundi';
            } else if (btnText.includes('mardi')) {
                currentDay = 'mardi';
            } else if (btnText.includes('mercredi')) {
                currentDay = 'mercredi';
            }
            
            filterEvents();
        });
    });

    // Genre filter dropdown
    const genreSelect = document.querySelectorAll('.filter-dropdown')[0];
    if (genreSelect) {
        genreSelect.addEventListener('change', (e) => {
            const value = e.target.value.toLowerCase();
            if (value.includes('tous')) {
                currentGenre = 'tous';
            } else {
                currentGenre = value;
            }
            filterEvents();
        });
    }

    // Scene filter dropdown
    const sceneSelect = document.querySelectorAll('.filter-dropdown')[1];
    if (sceneSelect) {
        sceneSelect.addEventListener('change', (e) => {
            const value = e.target.value.toLowerCase();
            if (value.includes('toutes')) {
                currentScene = 'toutes';
            } else if (value.includes('principale')) {
                currentScene = 'principale';
            } else if (value.includes('acoustique')) {
                currentScene = 'acoustique';
            } else if (value.includes('club')) {
                currentScene = 'club';
            } else if (value.includes('alternative')) {
                currentScene = 'alternative';
            }
            filterEvents();
        });
    }

    // Favorite buttons
    document.querySelectorAll('.favorite-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            btn.classList.toggle('active');
        });
    });

    function filterEvents() {
        // Show/hide time slots by day
        const timeSlots = document.querySelectorAll('.time-slot');
        timeSlots.forEach(slot => {
            const slotDay = slot.getAttribute('data-day');
            if (slotDay === currentDay) {
                slot.style.display = 'block';
            } else {
                slot.style.display = 'none';
            }
        });

        // Filter event cards by genre and scene
        const eventCards = document.querySelectorAll('.event-card');
        eventCards.forEach(card => {
            const cardGenre = card.getAttribute('data-genre');
            const cardScene = card.getAttribute('data-scene');
            const parentSlot = card.closest('.time-slot');
            const parentDay = parentSlot.getAttribute('data-day');

            let showCard = true;

            // Check day
            if (parentDay !== currentDay) {
                showCard = false;
            }

            // Check genre
            if (currentGenre !== 'tous' && cardGenre !== currentGenre) {
                showCard = false;
            }

            // Check scene
            if (currentScene !== 'toutes' && cardScene !== currentScene) {
                showCard = false;
            }

            card.style.display = showCard ? 'flex' : 'none';
        });

        // Hide time slots that have no visible cards
        timeSlots.forEach(slot => {
            if (slot.getAttribute('data-day') === currentDay) {
                const visibleCards = slot.querySelectorAll('.event-card[style*="display: flex"], .event-card:not([style*="display: none"])');
                const allCards = slot.querySelectorAll('.event-card');
                const hasVisibleCards = Array.from(allCards).some(card => card.style.display !== 'none');
                
                if (!hasVisibleCards) {
                    slot.style.display = 'none';
                } else {
                    slot.style.display = 'block';
                }
            }
        });
    }

    // Initialize
    filterEvents();
}

// Artistes page - Search and Filter functionality
if (document.querySelector('.artistes-page')) {
    const searchInput = document.querySelector('.search-input');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const artistCards = document.querySelectorAll('.artist-card');
    
    let currentFilter = 'tous';

    // Filter button functionality
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.getAttribute('data-filter');
            filterArtists();
        });
    });

    // Search functionality
    if (searchInput) {
        searchInput.addEventListener('input', () => {
            filterArtists();
        });
    }

    function filterArtists() {
        const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';

        artistCards.forEach(card => {
            const artistName = card.querySelector('.artist-name').textContent.toLowerCase();
            const cardDate = card.getAttribute('data-date');

            let showCard = true;

            // Check search term
            if (searchTerm && !artistName.includes(searchTerm)) {
                showCard = false;
            }

            // Check date filter
            if (currentFilter !== 'tous' && !cardDate.includes(currentFilter)) {
                showCard = false;
            }

            card.style.display = showCard ? 'flex' : 'none';
        });
    }

    // Favorite button toggle
    document.querySelectorAll('.favorite-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            btn.classList.toggle('active');
        });
    });

    // Card click -> detail page
    artistCards.forEach(card => {
        card.addEventListener('click', () => {
            const slug = card.dataset.artist || card.querySelector('.artist-name').textContent.trim().toLowerCase().replace(/\s+/g, '-');
            window.location.href = `Artistes-Details.html?artist=${encodeURIComponent(slug)}`;
        });
    });
}

// Artiste detail page population
if (document.querySelector('.artist-detail-page')) {
    const params = new URLSearchParams(window.location.search);
    const slug = params.get('artist') || 'sofia-isella';

    const artistsData = {
        'sofia-isella': {
            name: 'Sofia Isella',
            badge: 'En vedette',
            date: 'Dimanche 20 Déc 2026',
            time: '21:00',
            scene: 'Scène Principale',
            genres: ['Electro-Pop', 'Indie', 'Synthwave'],
            description: "Voix magnétique et synthés vifs, Sofia mélange pulsations électro et mélodies dream-pop pour des sets immersifs.",
            hero: 'assets/Media-image/sofiaIsella/SofiaIsella.jpg',
            stats: ['127K', '3.2M', '45'],
            gallery: [
                'assets/Media-image/sofiaIsella/sofia1.jpg',
                'assets/Media-image/sofiaIsella/SofiaIsella.jpg',
                'assets/Media-image/sofiaIsella/sofia3.jpg',
                'assets/Media-image/sofiaIsella/sofia4.jpg',
                'assets/Media-image/sofiaIsella/sofia5.jpg',
                'assets/Media-image/sofiaIsella/isela 2.jpg'
            ]
        },
        'arctic-monkeys': {
            name: 'Arctic Monkeys',
            badge: 'Headliner',
            date: 'Dimanche 20 Déc 2026',
            time: '22:30',
            scene: 'Scène Principale',
            genres: ['Rock', 'Indie', 'Garage'],
            description: "Riffs incisifs et groove imparable, les Monkeys livrent un set nocturne taillé pour le live.",
            hero: '/assets/Media-image/HomePage/ArticMonkeys.jpg',
            stats: ['2.1M', '18M', '120'],
            gallery: ['/assets/Media-image/HomePage/ArticMonkeys.jpg', '/assets/Media-image/HomePage/ArticMonkeys.jpg', '/assets/Media-image/HomePage/ArticMonkeys.jpg', '/assets/Media-image/HomePage/ArticMonkeys.jpg']
        },
        'billie-eilish': {
            name: 'Billie Eilish',
            badge: 'En vedette',
            date: 'Lundi 21 Déc 2026',
            time: '20:00',
            scene: 'Scène Acoustique',
            genres: ['Alt-Pop', 'Indie', 'Électronique'],
            description: "Intimiste et puissante, Billie tisse des paysages sonores minimalistes et émouvants.",
            hero: '/assets/Media-image/HomePage/BillieEillish.jpg',
            stats: ['3.8M', '25M', '98'],
            gallery: ['/assets/Media-image/HomePage/BillieEillish.jpg', '/assets/Media-image/HomePage/BillieEillish.jpg', '/assets/Media-image/HomePage/BillieEillish.jpg', '/assets/Media-image/HomePage/BillieEillish.jpg']
        },
        'dua-lipa': {
            name: 'Dua Lipa',
            badge: 'En vedette',
            date: 'Lundi 21 Déc 2026',
            time: '19:00',
            scene: 'Scène Principale',
            genres: ['Pop', 'Dance', 'Disco'],
            description: "Hymnes pop et basslines disco, Dua enflamme la scène avec une énergie solaire.",
            hero: '/assets/Media-image/HomePage/DuaLipa.jpg',
            stats: ['4.5M', '30M', '110'],
            gallery: ['/assets/Media-image/HomePage/DuaLipa.jpg', '/assets/Media-image/HomePage/DuaLipa.jpg', '/assets/Media-image/HomePage/DuaLipa.jpg', '/assets/Media-image/HomePage/DuaLipa.jpg']
        },
        'lennon-stella': {
            name: 'Lennon Stella',
            badge: 'En vedette',
            date: 'Mardi 22 Déc 2026',
            time: '21:00',
            scene: 'Scène Principale',
            genres: ['Indie Pop', 'Dream', 'Electro'],
            description: "Textures éthérées et refrains lumineux, Lennon signe des live élégants et sensibles.",
            hero: '/assets/Media-image/HomePage/LennonStella.jpg',
            stats: ['890K', '9.4M', '76'],
            gallery: ['/assets/Media-image/HomePage/LennonStella.jpg', '/assets/Media-image/HomePage/LennonStella.jpg', '/assets/Media-image/HomePage/LennonStella.jpg', '/assets/Media-image/HomePage/LennonStella.jpg']
        },
        'ricci': {
            name: 'Ricci',
            badge: 'Live Act',
            date: 'Mardi 22 Déc 2026',
            time: '19:30',
            scene: 'Scène Rock',
            genres: ['Rock', 'Alt', 'Indie'],
            description: "Guitares abrasives et envolées mélodiques, Ricci propose un set raw et généreux.",
            hero: '/assets/Media-image/HomePage/Ricci.jpg',
            stats: ['430K', '4.1M', '52'],
            gallery: ['/assets/Media-image/HomePage/Ricci.jpg', '/assets/Media-image/HomePage/Ricci.jpg', '/assets/Media-image/HomePage/Ricci.jpg', '/assets/Media-image/HomePage/Ricci.jpg']
        },
        'mc-voltage': {
            name: 'MC Voltage',
            badge: 'Showcase',
            date: 'Mardi 22 Déc 2026',
            time: '18:00',
            scene: 'Scène Urbaine',
            genres: ['Hip-Hop', 'Trap', 'Électro'],
            description: "Flow tranchant et beats percutants, Voltage dynamite la foule avec un show sans temps mort.",
            hero: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200&auto=format&fit=crop&q=80',
            stats: ['510K', '6.7M', '61'],
            gallery: ['https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=900&auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=900&auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=900&auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=900&auto=format&fit=crop&q=80']
        },
        'mia-lyss': {
            name: 'Mia Lyss',
            badge: 'Découverte',
            date: 'Mercredi 23 Déc 2026',
            time: '15:30',
            scene: 'Scène Acoustique',
            genres: ['Acoustique', 'Indie Folk', 'Pop'],
            description: "Mia livre des ballades lumineuses portées par une voix douce et des arrangements minimalistes.",
            hero: '/assets/Media-image/HomePage/MiaLyss.jpg',
            stats: ['210K', '1.9M', '34'],
            gallery: ['/assets/Media-image/HomePage/MiaLyss.jpg', '/assets/Media-image/HomePage/MiaLyss.jpg', '/assets/Media-image/HomePage/MiaLyss.jpg', '/assets/Media-image/HomePage/MiaLyss.jpg']
        }
    };

    const data = artistsData[slug] || artistsData['sofia-isella'];

    const heroSection = document.querySelector('.hero-section');
    const badgeEl = document.querySelector('.badge');
    const nameEl = document.querySelector('.artist-name');
    const infoItems = document.querySelectorAll('.artist-info .info-text');
    const locationText = document.querySelector('.location-text');
    const genresWrap = document.querySelector('.genres');
    const descEl = document.querySelector('.artist-description');
    const statNumbers = document.querySelectorAll('.stat-number');
    const galleryImages = document.querySelectorAll('.gallery-image');
    const socialLinks = document.querySelectorAll('.social-btn');
    const backBtn = document.querySelector('.back-btn');

    if (heroSection) {
        heroSection.style.backgroundImage = `url(${data.hero})`;
    }
    if (badgeEl) {
        badgeEl.textContent = data.badge || '';
        badgeEl.style.display = data.badge ? 'inline-flex' : 'none';
    }
    if (nameEl) nameEl.textContent = data.name;
    if (infoItems[0]) infoItems[0].textContent = data.date;
    if (infoItems[1]) infoItems[1].textContent = data.time;
    if (locationText) locationText.textContent = data.scene;
    if (genresWrap) {
        genresWrap.innerHTML = '';
        data.genres.forEach(g => {
            const span = document.createElement('span');
            span.className = 'genre-tag';
            span.textContent = g;
            genresWrap.appendChild(span);
        });
    }
    if (descEl) descEl.textContent = data.description;
    if (statNumbers.length >= 3) {
        statNumbers[0].textContent = data.stats[0];
        statNumbers[1].textContent = data.stats[1];
        statNumbers[2].textContent = data.stats[2];
    }
    // Populate gallery carousel dynamically
    const carouselTrackEl = document.querySelector('.carousel-track');
    if (carouselTrackEl && data.gallery && data.gallery.length) {
        carouselTrackEl.innerHTML = '';
        data.gallery.forEach((src, idx) => {
            const img = document.createElement('img');
            img.className = 'gallery-image';
            img.src = src;
            img.alt = `${data.name} - Galerie ${idx + 1}`;
            carouselTrackEl.appendChild(img);
        });
    } else if (galleryImages.length) {
        galleryImages.forEach((img, idx) => {
            img.src = data.gallery[idx % data.gallery.length];
            img.alt = `${data.name} - Galerie ${idx + 1}`;
        });
    }
    if (socialLinks.length) {
        socialLinks.forEach(link => {
            link.href = '#';
        });
    }
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            window.history.length > 1 ? window.history.back() : window.location.assign('Artistes.html');
        });
    }

    // Carrousel galerie (supporte plusieurs carrousels indépendants)
        document.querySelectorAll('.gallery-carousel').forEach(carousel => {
            const track = carousel.querySelector('.carousel-track');
            const prevBtn = carousel.querySelector('.carousel-prev');
            const nextBtn = carousel.querySelector('.carousel-next');
            const images = carousel.querySelectorAll('.carousel-track .gallery-image');
            if (track && prevBtn && nextBtn && images.length > 0) {
                let currentIndex = 0;
                // Initialisation : active sur la première image
                images.forEach((img, i) => img.classList.toggle('active', i === 0));
                function updateCarousel() {
                    images.forEach((img, i) => img.classList.toggle('active', i === currentIndex));
                    const imageWidth = images[0].offsetWidth + 10; // width + gap
                    track.style.transform = `translateX(${-currentIndex * imageWidth}px)`;
                }
                prevBtn.addEventListener('click', () => {
                    currentIndex = (currentIndex - 1 + images.length) % images.length;
                    updateCarousel();
                });
                nextBtn.addEventListener('click', () => {
                    currentIndex = (currentIndex + 1) % images.length;
                    updateCarousel();
                });
                updateCarousel();
            }
        });
}



