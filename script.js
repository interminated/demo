document.addEventListener('DOMContentLoaded', () => {

    /* ── Каскадное появление элементов ── */
    const elements = document.querySelectorAll('.hidden-el');

    setTimeout(() => {
        elements.forEach((el, i) => {
            setTimeout(() => {
                el.classList.add('show-el');
            }, i * 160);
        });
    }, 200);

    /* ── Галерея фотографий ── */
    const galleryImages = document.querySelectorAll('.gallery-img');
    const thumbnails = document.querySelectorAll('.thumb');
    const dots = document.querySelectorAll('.dot');
    let currentIndex = 0;
    let autoPlayInterval;

    function showImage(index) {
        // Убираем активный класс у всех
        galleryImages.forEach(img => img.classList.remove('active'));
        thumbnails.forEach(thumb => thumb.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        // Добавляем активный класс нужным элементам
        galleryImages[index].classList.add('active');
        thumbnails[index].classList.add('active');
        dots[index].classList.add('active');

        currentIndex = index;
    }

    function nextImage() {
        const nextIndex = (currentIndex + 1) % galleryImages.length;
        showImage(nextIndex);
    }

    // Клик по миниатюрам
    thumbnails.forEach((thumb, index) => {
        thumb.addEventListener('click', () => {
            showImage(index);
            resetAutoPlay();
        });
    });

    // Клик по точкам-индикаторам
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showImage(index);
            resetAutoPlay();
        });
    });

    // Автопрокрутка
    function startAutoPlay() {
        autoPlayInterval = setInterval(nextImage, 4000);
    }

    function resetAutoPlay() {
        clearInterval(autoPlayInterval);
        startAutoPlay();
    }

    // Запуск автопрокрутки после появления галереи
    setTimeout(() => {
        startAutoPlay();
    }, 1500);

    // Остановка автопрокрутки при наведении
    const galleryBlock = document.querySelector('.gallery-block');
    galleryBlock.addEventListener('mouseenter', () => {
        clearInterval(autoPlayInterval);
    });

    galleryBlock.addEventListener('mouseleave', () => {
        startAutoPlay();
    });

    /* ── Параллакс-эффект для галереи (только десктоп) ── */
    if (window.matchMedia('(min-width: 901px)').matches) {
        const container = document.querySelector('.container');

        container.addEventListener('mousemove', (e) => {
            const xRatio = (e.clientX / window.innerWidth  - 0.5) * 2;
            const yRatio = (e.clientY / window.innerHeight - 0.5) * 2;

            galleryBlock.style.transform =
                `translate(${xRatio * 8}px, ${yRatio * 8}px)`;
        });

        container.addEventListener('mouseleave', () => {
            galleryBlock.style.transition = 'transform 0.6s ease';
            galleryBlock.style.transform  = 'translate(0, 0)';
            setTimeout(() => { galleryBlock.style.transition = ''; }, 600);
        });
    }

    /* ── Лёгкий параллакс для фоновых линий ── */
    const lines = document.querySelectorAll('.line');
    window.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5);
        lines.forEach((line, i) => {
            const shift = x * (8 + i * 5);
            line.style.transform = `translateX(${shift}px)`;
        });
    });

});