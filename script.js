/* ==========================================
   1. МОБИЛЬНОЕ МЕНЮ
   ========================================== */
document.addEventListener('DOMContentLoaded', () => {
    const burger = document.getElementById('burger');
    const nav = document.getElementById('main-nav');
    const overlay = document.getElementById('navOverlay');
    const links = nav.querySelectorAll('a');

    function openMenu() {
        burger.classList.add('active');
        nav.classList.add('open');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // блокируем прокрутку страницы
    }

    function closeMenu() {
        burger.classList.remove('active');
        nav.classList.remove('open');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Клик по бургеру
    burger.addEventListener('click', () => {
        if (nav.classList.contains('open')) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    // Клик по любой ссылке — закрываем
    links.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Клик по затемнению — закрываем
    overlay.addEventListener('click', closeMenu);

    // Escape закрывает меню
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeMenu();
    });

    // Если экран стал большим — сбрасываем состояние
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            closeMenu();
        }
    });
});


/* ==========================================
   2. ФОРМА ОБРАТНОЙ СВЯЗИ (без перезагрузки)
   ========================================== */
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    const successMsg = document.getElementById('form-success');

    form.addEventListener('submit', (e) => {
        e.preventDefault(); // отменяем перезагрузку

        // Собираем данные
        const data = {
            name: form.querySelector('input[name="name"]').value.trim(),
            phone: form.querySelector('input[name="phone"]').value.trim(),
            email: form.querySelector('input[name="email"]').value.trim(),
            services: [],
            message: form.querySelector('textarea[name="message"]').value.trim()
        };

        // Собираем все выбранные услуги
        form.querySelectorAll('input[name="services"]:checked').forEach(cb => {
            data.services.push(cb.value);
        });

        // Валидация: имя, телефон и хотя бы одна услуга
        if (!data.name) {
            alert('Пожалуйста, укажите ваше имя.');
            return;
        }
        if (!data.phone) {
            alert('Пожалуйста, укажите номер телефона.');
            return;
        }
        if (data.services.length === 0) {
            alert('Пожалуйста, выберите хотя бы одну услугу.');
            return;
        }

        // Здесь можно отправить данные на сервер через fetch():
        // fetch('/api/send', { method: 'POST', body: JSON.stringify(data) })
        // Но для учебной работы просто имитируем отправку:
        console.log('Отправлено:', data);

        // Показываем сообщение об успехе
        const servicesText = data.services.join(', ');
        successMsg.style.display = 'block';
        successMsg.textContent = `✅ ${data.name}, спасибо! Ваша заявка принята. Услуги: ${servicesText}. Мы свяжемся с вами в течение часа.`;

        // Очищаем форму
        form.reset();

        // Прячем сообщение через 7 секунд
        setTimeout(() => {
            successMsg.style.display = 'none';
        }, 7000);
    });
});


/* ==========================================
   3. Плавный переход hero → rgb-pc при прокрутке
   ========================================== */
document.addEventListener('DOMContentLoaded', () => {
    const hero = document.querySelector('.hero');
    const heroRgb = document.querySelector('.hero-bg-rgb');

    if (!hero || !heroRgb) return;

    function updateHeroRgb() {
        const heroH = hero.offsetHeight;
        const scrolled = window.scrollY;
        const start = heroH * 0.4;
        const end = heroH * 0.95;
        let progress = (scrolled - start) / (end - start);
        progress = Math.max(0, Math.min(1, progress));
        heroRgb.style.opacity = progress;
    }

    window.addEventListener('scroll', updateHeroRgb);
    window.addEventListener('resize', updateHeroRgb);
    updateHeroRgb();
});


/* ==========================================
   4. Автосмена фоток в hero
   ========================================== */
document.addEventListener('DOMContentLoaded', () => {
    const heroSlides = document.querySelectorAll('.hero-bg-slide');
    if (!heroSlides.length) return;

    let heroCurrent = 0;
    setInterval(() => {
        heroSlides[heroCurrent].classList.remove('active');
        heroCurrent = (heroCurrent + 1) % heroSlides.length;
        heroSlides[heroCurrent].classList.add('active');
    }, 6000);
});