/**
 * JUVENTUDE MISSIONÁRIA - REGNUM CHRISTI VALE DO PARAÍBA
 * Landing Page Interaction & Countdown Engine
 */

document.addEventListener('DOMContentLoaded', () => {

  // --- 1. CONFIGURATION & STATE ---
  const DEFAULT_EVENT_NAME = "Missão Nossa Senhora Aparecida (SJC • 10 a 12 de Outubro de 2026)";
  const defaultDate = new Date('2026-10-10T08:00:00');

  const targetEventDate = localStorage.getItem('missoes_target_date') 
    ? new Date(localStorage.getItem('missoes_target_date')) 
    : defaultDate;

  const eventName = localStorage.getItem('missoes_event_name') || "Missão Nossa Senhora Aparecida";
  const whatsappGroupUrl = localStorage.getItem('missoes_whatsapp_url') || "https://chat.whatsapp.com/D5Y6qvgEklg86qRzC8jn02";

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
    if (btnWhatsappTop) btnWhatsappTop.href = whatsappGroupUrl;
    if (btnWhatsappMain) btnWhatsappMain.href = whatsappGroupUrl;
    if (btnWhatsappBottom) btnWhatsappBottom.href = whatsappGroupUrl;
    if (btnHeaderCta) btnHeaderCta.href = whatsappGroupUrl;
    if (btnPopupWhatsapp) btnPopupWhatsapp.href = whatsappGroupUrl;
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

  // --- 7. LATIN QUOTE INTERACTIVE TOGGLE ---
  const latinQuoteCard = document.getElementById('latinQuoteCard');
  const latinQuoteText = document.getElementById('latinQuoteText');
  const latinQuoteRef = document.getElementById('latinQuoteRef');
  const latinHintText = document.getElementById('latinHintText');

  if (latinQuoteCard && latinQuoteText) {
    let isTranslated = false;
    const textLatin = "«Christus vivit. Christus vocat. Christus mittit.»";
    const textPt = "«Cristo vive. Cristo chama. Cristo envia.»";

    function toggleLatinTranslation() {
      isTranslated = !isTranslated;
      latinQuoteText.style.opacity = '0';

      setTimeout(() => {
        if (isTranslated) {
          latinQuoteText.textContent = textPt;
          if (latinQuoteRef) latinQuoteRef.textContent = "Lema Vocacional (Tradução)";
          if (latinHintText) latinHintText.textContent = "Ver em latim";
        } else {
          latinQuoteText.textContent = textLatin;
          if (latinQuoteRef) latinQuoteRef.textContent = "Lema Vocacional Missionário";
          if (latinHintText) latinHintText.textContent = "Clique para traduzir";
        }
        latinQuoteText.style.opacity = '1';
      }, 150);
    }

    latinQuoteCard.addEventListener('click', toggleLatinTranslation);
    latinQuoteCard.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleLatinTranslation();
      }
    });
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

});
