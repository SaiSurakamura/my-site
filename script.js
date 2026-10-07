/* ==========================================
   1. МОБИЛЬНОЕ МЕНЮ (бургер)
   ========================================== */
document.addEventListener('DOMContentLoaded', () => {
    const burger = document.getElementById('burger');
    const nav = document.getElementById('main-nav');
    const navLinks = nav.querySelectorAll('a');

    // Открытие / закрытие по клику на бургер
    burger.addEventListener('click', () => {
        burger.classList.toggle('active');
        nav.classList.toggle('open');
    });

    // Закрывать меню при клике на любую ссылку
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            burger.classList.remove('active');
            nav.classList.remove('open');
        });
    });

    // Закрытие при клике вне меню
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && !burger.contains(e.target)) {
            burger.classList.remove('active');
            nav.classList.remove('open');
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
            name: form.querySelector('input[type="text"]').value.trim(),
            phone: form.querySelector('input[type="tel"]').value.trim(),
            email: form.querySelector('input[type="email"]').value.trim(),
            service: form.querySelector('select').value,
            message: form.querySelector('textarea').value.trim()
        };

        // Простая валидация
        if (!data.name || !data.phone || !data.service) {
            alert('Пожалуйста, заполните имя, телефон и выберите услугу.');
            return;
        }


        console.log('Отправлено:', data);

        // Показываем сообщение об успехе
        successMsg.style.display = 'block';
        successMsg.textContent = '✅ Заявка отправлена! Мы свяжемся с вами в течение часа.';

        // Очищаем форму
        form.reset();

        // Прячем сообщение через 5 секунд
        setTimeout(() => {
            successMsg.style.display = 'none';
        }, 5000);
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