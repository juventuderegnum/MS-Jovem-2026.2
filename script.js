/**
 * JUVENTUDE MISSIONÁRIA - REGNUM CHRISTI VALE DO PARAÍBA
 * Landing Page Interaction & Countdown Engine
 */

document.addEventListener('DOMContentLoaded', () => {

  // --- 1. CONFIGURATION & STATE (HARDENED: no localStorage override) ---
  const OFFICIAL_WHATSAPP_URL = "https://chat.whatsapp.com/DfE3dr3tBDCEJdUlRHkjya";
  const targetEventDate = new Date('2026-10-10T08:00:00');
  const eventName = "Missão Nossa Senhora Aparecida";
  const whatsappGroupUrl = OFFICIAL_WHATSAPP_URL;

  // Security: purge any poisoned localStorage keys from previous versions (one-time cleanup, no read-back)
  try {
    localStorage.removeItem('missoes_whatsapp_url');
    localStorage.removeItem('missoes_target_date');
    localStorage.removeItem('missoes_event_name');
  } catch (e) { /* storage may be blocked */ }

  // --- 2. DOM ELEMENTS ---
  const elDays = document.getElementById('days');
  const elHours = document.getElementById('hours');
  const elMinutes = document.getElementById('minutes');
  const elSeconds = document.getElementById('seconds');
  const elCountdownEventName = document.getElementById('countdownEventName');
  const elCurrentYear = document.getElementById('currentYear');

  // WhatsApp Buttons
  const btnWhatsappTop = document.getElementById('btnWhatsappTop');
  const btnWhatsappMain = document.getElementById('btnWhatsappMain');
  const btnWhatsappBottom = document.getElementById('btnWhatsappBottom');
  const btnHeaderCta = document.getElementById('btnHeaderCta');
  const btnPopupWhatsapp = document.getElementById('btnPopupWhatsapp');
  const btnFaqSupport = document.getElementById('btnFaqSupport');

  // Scroll Indicator & Bottom Popup
  const scrollIndicatorBtn = document.getElementById('scrollIndicatorBtn');
  const bottomPopupCard = document.getElementById('bottomPopupCard');
  const btnClosePopup = document.getElementById('btnClosePopup');
  let isPopupDismissed = false;

  // Toast Container
  const toastContainer = document.getElementById('toastContainer');

  // --- 3. INITIALIZE STATE ---
  if (elCurrentYear) elCurrentYear.textContent = new Date().getFullYear();
  updateEventDetailsUI();

  // --- 4. COUNTDOWN TIMER ---
  let countdownInterval = null;

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetEventDate.getTime() - now;

    if (distance <= 0) {
      if (elDays) elDays.textContent = '00';
      if (elHours) elHours.textContent = '00';
      if (elMinutes) elMinutes.textContent = '00';
      if (elSeconds) elSeconds.textContent = '00';
      if (countdownInterval) clearInterval(countdownInterval);
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (elDays) elDays.textContent = String(days).padStart(2, '0');
    if (elHours) elHours.textContent = String(hours).padStart(2, '0');
    if (elMinutes) elMinutes.textContent = String(minutes).padStart(2, '0');
    if (elSeconds) elSeconds.textContent = String(seconds).padStart(2, '0');
  }

  updateCountdown();
  countdownInterval = setInterval(updateCountdown, 1000);

  function updateEventDetailsUI() {
    if (elCountdownEventName) elCountdownEventName.textContent = eventName;
    const whatsappButtons = [btnWhatsappTop, btnWhatsappMain, btnWhatsappBottom, btnHeaderCta, btnPopupWhatsapp];
    whatsappButtons.forEach(btn => {
      if (btn) btn.href = whatsappGroupUrl;
    });
  }

  // --- 5. OPTIMIZED SCROLL INDICATOR & POPUP ENGINE (THROTTLED WITH RAF) ---
  let isTicking = false;

  function handleScroll() {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const fullHeight = document.documentElement.scrollHeight;
    const isNearBottom = (scrollPosition + windowHeight) >= (fullHeight - 300);

    if (scrollIndicatorBtn) {
      if (scrollPosition > 80) {
        scrollIndicatorBtn.classList.add('scrolled');
      } else {
        scrollIndicatorBtn.classList.remove('scrolled');
      }

      if (isNearBottom) {
        scrollIndicatorBtn.classList.add('at-bottom');
        scrollIndicatorBtn.setAttribute('title', 'Voltar ao topo');
      } else {
        scrollIndicatorBtn.classList.remove('at-bottom');
        scrollIndicatorBtn.setAttribute('title', 'Continuar lendo');
      }
    }

    if (isNearBottom && !isPopupDismissed && bottomPopupCard) {
      bottomPopupCard.classList.add('active');
    }

    isTicking = false;
  }

  window.addEventListener('scroll', () => {
    if (!isTicking) {
      window.requestAnimationFrame(handleScroll);
      isTicking = true;
    }
  }, { passive: true });

  if (scrollIndicatorBtn) {
    scrollIndicatorBtn.addEventListener('click', () => {
      if (scrollIndicatorBtn.classList.contains('at-bottom')) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        window.scrollBy({ top: window.innerHeight * 0.7, behavior: 'smooth' });
      }
    });
  }

  if (btnClosePopup) {
    btnClosePopup.addEventListener('click', () => {
      if (bottomPopupCard) bottomPopupCard.classList.remove('active');
      isPopupDismissed = true;
    });
  }

  // --- 6. ACCORDION / FAQ ---
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const isActive = item.classList.contains('active');

      document.querySelectorAll('.accordion-item').forEach(i => {
        i.classList.remove('active');
        const h = i.querySelector('.accordion-header');
        if (h) h.setAttribute('aria-expanded', 'false');
      });

      if (!isActive) {
        item.classList.add('active');
        header.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // --- 7. SINGLE QUOTE CAROUSEL ENGINE WITH TRANSLATION ---
  const quoteCarouselCard = document.getElementById('quoteCarouselCard');
  const quoteCarouselText = document.getElementById('quoteCarouselText');
  const quoteCarouselRef = document.getElementById('quoteCarouselRef');
  const btnTranslateQuote = document.getElementById('btnTranslateQuote');
  const translateBtnLabel = document.getElementById('translateBtnLabel');
  const btnNextQuote = document.getElementById('btnNextQuote');
  const nextBtnLabel = document.getElementById('nextBtnLabel');
  const dot0 = document.getElementById('dot0');
  const dot1 = document.getElementById('dot1');

  if (quoteCarouselCard && quoteCarouselText) {
    const quotesList = [
      {
        latin: "«Christus vivit. Christus vocat. Christus mittit.»",
        pt: "«Cristo vive. Cristo chama. Cristo envia.»",
        latinRef: "",
        ptRef: "",
        hasTranslation: true,
        nextLabel: "Próxima"
      },
      {
        latin: "«Vinde e vede.»",
        pt: "«Vinde e vede.»",
        latinRef: "São João 1, 39",
        ptRef: "São João 1, 39",
        hasTranslation: false,
        nextLabel: "Voltar"
      }
    ];

    let currentIndex = 0;
    let isTranslated = false;

    function renderQuote() {
      quoteCarouselText.style.opacity = '0';
      if (quoteCarouselRef) quoteCarouselRef.style.opacity = '0';

      setTimeout(() => {
        const q = quotesList[currentIndex];

        if (isTranslated && q.hasTranslation) {
          quoteCarouselText.textContent = q.pt;
          if (quoteCarouselRef) {
            quoteCarouselRef.textContent = q.ptRef;
            quoteCarouselRef.style.display = q.ptRef ? 'block' : 'none';
          }
          if (translateBtnLabel) translateBtnLabel.textContent = "Ver em Latim";
        } else {
          quoteCarouselText.textContent = q.latin;
          if (quoteCarouselRef) {
            quoteCarouselRef.textContent = q.latinRef;
            quoteCarouselRef.style.display = q.latinRef ? 'block' : 'none';
          }
          if (translateBtnLabel) translateBtnLabel.textContent = "Traduzir";
        }

        if (btnTranslateQuote) {
          btnTranslateQuote.style.display = q.hasTranslation ? 'inline-flex' : 'none';
        }

        if (nextBtnLabel) {
          nextBtnLabel.textContent = q.nextLabel;
        }

        if (dot0 && dot1) {
          dot0.classList.toggle('active', currentIndex === 0);
          dot1.classList.toggle('active', currentIndex === 1);
        }

        quoteCarouselText.style.opacity = '1';
        if (quoteCarouselRef) quoteCarouselRef.style.opacity = '1';
      }, 150);
    }

    if (btnTranslateQuote) {
      btnTranslateQuote.addEventListener('click', (e) => {
        e.stopPropagation();
        isTranslated = !isTranslated;
        renderQuote();
      });
    }

    function nextQuote() {
      currentIndex = (currentIndex + 1) % quotesList.length;
      isTranslated = false;
      renderQuote();
    }

    function prevQuote() {
      currentIndex = (currentIndex - 1 + quotesList.length) % quotesList.length;
      isTranslated = false;
      renderQuote();
    }

    if (btnNextQuote) {
      btnNextQuote.addEventListener('click', (e) => {
        e.stopPropagation();
        nextQuote();
      });
    }

    // Touch Swipe Gesture Support (Arrastar para esquerda = Próxima, Arrastar para direita = Voltar)
    let touchStartX = 0;
    let touchStartY = 0;

    quoteCarouselCard.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });

    quoteCarouselCard.addEventListener('touchend', (e) => {
      const touchEndX = e.changedTouches[0].screenX;
      const touchEndY = e.changedTouches[0].screenY;
      const deltaX = touchEndX - touchStartX;
      const deltaY = touchEndY - touchStartY;

      if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX < 0) {
          nextQuote();
        } else {
          prevQuote();
        }
      }
    }, { passive: true });

    quoteCarouselCard.addEventListener('click', (e) => {
      if (e.target.closest('#btnTranslateQuote') || e.target.closest('#btnNextQuote')) return;
      nextQuote();
    });

    quoteCarouselCard.addEventListener('keydown', (e) => {
      if (e.target === quoteCarouselCard && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        nextQuote();
      }
    });

    renderQuote();
  }

  // --- 8. TOAST NOTIFICATION UTILITY ---
  function showToast(message) {
    if (!toastContainer) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  // --- 9. INTERACTIVE INFINITE PHOTO CAROUSEL CONTROLLER ---
  const carouselContainer = document.getElementById('carouselContainer');
  const carouselTrack = document.getElementById('carouselTrack');
  const btnCarouselPlayPause = document.getElementById('btnCarouselPlayPause');

  if (carouselContainer && carouselTrack) {
    let isUserPaused = false;
    let isDragging = false;
    let dragStartX = 0;
    let dragStartOffset = 0;
    let currentOffset = 0;
    let setWidth = 0;
    let lastTime = 0;
    const speed = 34; // pixels por segundo (rolagem suave e natural)

    const items = Array.from(carouselTrack.querySelectorAll('.carousel-slide-item'));

    function measureDimensions() {
      const totalWidth = carouselTrack.scrollWidth;
      setWidth = totalWidth / 3;
      if (currentOffset === 0 && setWidth > 0) {
        currentOffset = -setWidth;
        carouselTrack.style.transform = `translate3d(${currentOffset}px, 0, 0)`;
      }
    }

    // Inicializa medidas quando imagens carregarem
    measureDimensions();
    window.addEventListener('resize', measureDimensions);
    window.addEventListener('load', measureDimensions);

    function normalizeOffset(offset) {
      if (!setWidth || setWidth <= 0) return offset;
      while (offset > -setWidth / 3) {
        offset -= setWidth;
      }
      while (offset < -2.2 * setWidth) {
        offset += setWidth;
      }
      return offset;
    }

    // Animação Criativa: Spotlight dinâmico na foto central em foco
    function updateSpotlight() {
      if (!items.length) return;
      const containerRect = carouselContainer.getBoundingClientRect();
      const centerX = containerRect.left + containerRect.width / 2;
      let closestItem = null;
      let minDistance = Infinity;

      items.forEach((item) => {
        const rect = item.getBoundingClientRect();
        if (rect.right > containerRect.left && rect.left < containerRect.right) {
          const itemCenterX = rect.left + rect.width / 2;
          const dist = Math.abs(centerX - itemCenterX);
          if (dist < minDistance) {
            minDistance = dist;
            closestItem = item;
          }
        }
      });

      items.forEach((item) => {
        if (item === closestItem) {
          item.classList.add('is-spotlight');
        } else {
          item.classList.remove('is-spotlight');
        }
      });
    }

    // Loop contínuo RAF que retoma EXATAMENTE na foto onde foi pausado
    function animationLoop(timestamp) {
      if (!lastTime) lastTime = timestamp;
      const delta = (timestamp - lastTime) / 1000;
      lastTime = timestamp;

      if (!isUserPaused && !isDragging && setWidth > 0) {
        currentOffset -= speed * delta;
        currentOffset = normalizeOffset(currentOffset);
        carouselTrack.style.transform = `translate3d(${currentOffset}px, 0, 0)`;
      }

      updateSpotlight();
      requestAnimationFrame(animationLoop);
    }
    requestAnimationFrame(animationLoop);

    function updatePlayPauseUI() {
      if (!btnCarouselPlayPause) return;
      const iconPause = btnCarouselPlayPause.querySelector('.icon-pause');
      const iconPlay = btnCarouselPlayPause.querySelector('.icon-play');

      if (isUserPaused) {
        btnCarouselPlayPause.classList.add('active-pause');
        btnCarouselPlayPause.setAttribute('title', 'Continuar rolagem automática');
        btnCarouselPlayPause.setAttribute('aria-label', 'Continuar rolagem automática');
        if (iconPause) iconPause.style.display = 'none';
        if (iconPlay) iconPlay.style.display = 'block';
      } else {
        btnCarouselPlayPause.classList.remove('active-pause');
        btnCarouselPlayPause.setAttribute('title', 'Pausar rolagem automática');
        btnCarouselPlayPause.setAttribute('aria-label', 'Pausar rolagem automática');
        if (iconPause) iconPause.style.display = 'block';
        if (iconPlay) iconPlay.style.display = 'none';
      }
    }

    function pauseByTouchOrDrag() {
      if (!isUserPaused) {
        isUserPaused = true;
        updatePlayPauseUI();
      }
    }

    if (btnCarouselPlayPause) {
      btnCarouselPlayPause.addEventListener('click', () => {
        isUserPaused = !isUserPaused;
        lastTime = 0; // reset delta timestamp para não dar pulo
        updatePlayPauseUI();
      });
    }

    // Mouse Drag support
    let dragDistance = 0;
    carouselTrack.addEventListener('mousedown', (e) => {
      isDragging = true;
      dragStartX = e.pageX;
      dragDistance = 0;
      dragStartOffset = currentOffset;
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      const currentX = e.pageX;
      const walk = currentX - dragStartX;
      dragDistance = Math.abs(walk);
      if (dragDistance > 4) {
        pauseByTouchOrDrag();
      }
      const rawOffset = dragStartOffset + walk;
      currentOffset = normalizeOffset(rawOffset);
      if (currentOffset !== rawOffset) {
        dragStartOffset += (currentOffset - rawOffset);
      }
      carouselTrack.style.transform = `translate3d(${currentOffset}px, 0, 0)`;
      updateSpotlight();
    });

    window.addEventListener('mouseup', () => {
      if (!isDragging) return;
      isDragging = false;
      lastTime = 0;
    });

    // Touch support for mobile (deslize com dedo com preservação de ponto exato)
    let touchStartX = 0;
    let touchDistance = 0;
    carouselTrack.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].pageX;
      touchDistance = 0;
      dragStartOffset = currentOffset;
    }, { passive: true });

    carouselTrack.addEventListener('touchmove', (e) => {
      const currentX = e.touches[0].pageX;
      const walk = currentX - touchStartX;
      touchDistance = Math.abs(walk);
      if (touchDistance > 4) {
        pauseByTouchOrDrag();
      }
      const rawOffset = dragStartOffset + walk;
      currentOffset = normalizeOffset(rawOffset);
      if (currentOffset !== rawOffset) {
        dragStartOffset += (currentOffset - rawOffset);
      }
      carouselTrack.style.transform = `translate3d(${currentOffset}px, 0, 0)`;
      updateSpotlight();
    }, { passive: true });

    carouselTrack.addEventListener('touchend', () => {
      lastTime = 0;
    }, { passive: true });

    // --- 10. LIGHTBOX CONTROLLER (ZOOM / AMPLIAR FOTO AO CLICAR) ---
    const photoLightboxModal = document.getElementById('photoLightboxModal');
    const lightboxBackdrop = document.getElementById('lightboxBackdrop');
    const btnLightboxClose = document.getElementById('btnLightboxClose');
    const btnLightboxPrev = document.getElementById('btnLightboxPrev');
    const btnLightboxNext = document.getElementById('btnLightboxNext');
    const lightboxMainImage = document.getElementById('lightboxMainImage');
    const lightboxCaptionText = document.getElementById('lightboxCaptionText');

    const photoList = [
      { src: 'assets/carrossel/missao-01.webp', caption: 'Acolhimento sincero e a alegria contagiante da missão' },
      { src: 'assets/carrossel/missao-02.webp', caption: 'Evangelização nas ruas, levando a esperança de porta em porta' },
      { src: 'assets/carrossel/missao-03.webp', caption: 'Juventude reunida: testemunho vivo de fraternidade e fé' },
      { src: 'assets/carrossel/missao-04.webp', caption: 'Fraternidade e comunhão na partilha da mesa missionária' },
      { src: 'assets/carrossel/missao-05.webp', caption: 'Amor em gestos concretos no cuidado e carinho com as crianças' },
      { src: 'assets/carrossel/missao-06.webp', caption: 'Santa Missa e adoração: o coração de toda a nossa missão' },
      { src: 'assets/carrossel/missao-07.webp', caption: 'Serviço voluntário, escuta atenta e dedicação ao próximo' },
      { src: 'assets/carrossel/missao-08.webp', caption: 'O abraço que acolhe: bênção, afeto e escuta nos lares visitados' },
      { src: 'assets/carrossel/missao-09.webp', caption: 'A caminho da missão: unidade e entusiasmo no envio apostólico' },
      { src: 'assets/carrossel/missao-10.webp', caption: 'Momentos de oração pessoal e encontro íntimo com Deus' },
      { src: 'assets/carrossel/missao-11.webp', caption: 'O Santo Terço: devoção mariana fortalecendo nossos passos' },
      { src: 'assets/carrossel/missao-12.webp', caption: 'Bênção dos lares, levando a paz de Cristo às famílias' },
      { src: 'assets/carrossel/missao-13.webp', caption: 'Alegria jovem em ação, transformando corações com o Evangelho' },
      { src: 'assets/carrossel/missao-14.webp', caption: 'Vínculos fraternos que unem missionários e comunidade' },
      { src: 'assets/carrossel/missao-15.webp', caption: 'Jovens missionários: corações ardentes e pés a caminho' },
      { src: 'assets/carrossel/missao-16.webp', caption: 'Silêncio, oração e entrega confiante nas mãos do Senhor' },
      { src: 'assets/carrossel/missao-17.webp', caption: 'Fraternidade e amizades verdadeiras que duram para a vida inteira' }
    ];

    let currentPhotoIndex = 0;

    function openLightbox(index) {
      if (!photoLightboxModal || !lightboxMainImage) return;
      currentPhotoIndex = (index + photoList.length) % photoList.length;
      const photo = photoList[currentPhotoIndex];
      lightboxMainImage.src = photo.src;
      lightboxMainImage.alt = photo.caption;
      if (lightboxCaptionText) {
        lightboxCaptionText.textContent = photo.caption;
      }
      photoLightboxModal.classList.add('active');
      photoLightboxModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';

      // Pausa a rolagem enquanto a foto está ampliada
      pauseByTouchOrDrag();
    }

    function closeLightbox() {
      if (!photoLightboxModal) return;
      photoLightboxModal.classList.remove('active');
      photoLightboxModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    function showPrevPhoto() {
      openLightbox(currentPhotoIndex - 1);
    }

    function showNextPhoto() {
      openLightbox(currentPhotoIndex + 1);
    }

    if (photoLightboxModal) {
      if (btnLightboxClose) btnLightboxClose.addEventListener('click', closeLightbox);
      if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);
      if (btnLightboxPrev) btnLightboxPrev.addEventListener('click', showPrevPhoto);
      if (btnLightboxNext) btnLightboxNext.addEventListener('click', showNextPhoto);

      window.addEventListener('keydown', (e) => {
        if (!photoLightboxModal.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') showPrevPhoto();
        if (e.key === 'ArrowRight') showNextPhoto();
      });
    }

    // Clique em qualquer card do carrossel para ampliar
    items.forEach((item, idx) => {
      item.addEventListener('click', () => {
        if (dragDistance > 6 || touchDistance > 6) return;
        const photoIndex = idx % 17;
        openLightbox(photoIndex);
      });
    });
  }

});
