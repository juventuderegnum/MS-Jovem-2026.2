/**
 * JUVENTUDE MISSIONÁRIA - REGNUM CHRISTI VALE DO PARAÍBA
 * Minimalist Landing Page Logic & Interaction Engine
 */

document.addEventListener('DOMContentLoaded', () => {

  // --- 1. DEFAULTS & CONFIGURATION ---
  const DEFAULT_EVENT_NAME = "Missão Nossa Senhora Aparecida (SJC • 10 a 12 de Outubro de 2026)";
  const defaultDate = new Date('2026-10-10T08:00:00');

  let targetEventDate = localStorage.getItem('missoes_target_date') 
    ? new Date(localStorage.getItem('missoes_target_date')) 
    : defaultDate;

  let eventName = localStorage.getItem('missoes_event_name') || "Missão Nossa Senhora Aparecida";
  let whatsappGroupUrl = localStorage.getItem('missoes_whatsapp_url') || "https://chat.whatsapp.com/D5Y6qvgEklg86qRzC8jn02";

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

  // Modals & Forms
  const interestModal = document.getElementById('interestModal');
  const btnOpenForm = document.getElementById('btnOpenForm');
  const btnInterestCardOpen = document.getElementById('btnInterestCardOpen');
  const btnCloseModal = document.getElementById('btnCloseModal');
  const interestForm = document.getElementById('interestForm');

  // Scroll Indicator & Bottom Popup
  const scrollIndicatorBtn = document.getElementById('scrollIndicatorBtn');
  const bottomPopupCard = document.getElementById('bottomPopupCard');
  const btnClosePopup = document.getElementById('btnClosePopup');
  let isPopupDismissed = false;

  // Share & Toast
  const btnShareHeader = document.getElementById('btnShareHeader');
  const toastContainer = document.getElementById('toastContainer');

  // --- 3. INITIALIZE STATE ---
  if (elCurrentYear) elCurrentYear.textContent = new Date().getFullYear();
  updateEventDetailsUI();

  // --- 4. COUNTDOWN TIMER ---
  function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetEventDate.getTime() - now;

    if (distance < 0) {
      if (elDays) elDays.textContent = '00';
      if (elHours) elHours.textContent = '00';
      if (elMinutes) elMinutes.textContent = '00';
      if (elSeconds) elSeconds.textContent = '00';
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
  setInterval(updateCountdown, 1000);

  function updateEventDetailsUI() {
    if (elCountdownEventName) elCountdownEventName.textContent = eventName;
    if (btnWhatsappTop) btnWhatsappTop.href = whatsappGroupUrl;
    if (btnWhatsappMain) btnWhatsappMain.href = whatsappGroupUrl;
    if (btnWhatsappBottom) btnWhatsappBottom.href = whatsappGroupUrl;
    if (btnHeaderCta) btnHeaderCta.href = whatsappGroupUrl;
    if (btnPopupWhatsapp) btnPopupWhatsapp.href = whatsappGroupUrl;
  }

  // --- 5. SCROLL INDICATOR & POPUP ENGINE ---
  window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const fullHeight = document.documentElement.scrollHeight;
    const isNearBottom = (scrollPosition + windowHeight) >= (fullHeight - 300);

    if (scrollIndicatorBtn) {
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
  });

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

  // --- 6. MODAL LOGIC ---
  function openModal(modal) {
    if (!modal) return;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal(modal) {
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Contact Modal Handlers
  if (btnOpenForm) btnOpenForm.addEventListener('click', () => openModal(interestModal));
  if (btnInterestCardOpen) btnInterestCardOpen.addEventListener('click', () => openModal(interestModal));
  if (btnCloseModal) btnCloseModal.addEventListener('click', () => closeModal(interestModal));
  if (interestModal) {
    interestModal.addEventListener('click', (e) => {
      if (e.target === interestModal) closeModal(interestModal);
    });
  }

  if (interestForm) {
    interestForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('inputName').value.trim();
      const phone = document.getElementById('inputPhone').value.trim();
      const email = document.getElementById('inputEmail') ? document.getElementById('inputEmail').value.trim() : '';
      const age = document.getElementById('inputAge').value.trim();
      const city = document.getElementById('inputCity').value.trim();

      const leads = JSON.parse(localStorage.getItem('missoes_leads') || '[]');
      leads.push({ name, phone, email, age, city, date: new Date().toISOString() });
      localStorage.setItem('missoes_leads', JSON.stringify(leads));

      showToast(`Obrigado, ${name}! Abrindo conversa no WhatsApp...`);
      closeModal(interestModal);
      interestForm.reset();

      const textMsg = encodeURIComponent(
        `Salve Maria! Meu nome é ${name}${age ? ` (${age} anos)` : ''}${city ? ` de ${city}` : ''}. Preenchi a lista de interesse da Juventude Missionária (Regnum Christi Vale do Paraíba) e gostaria de participar da Missão Nossa Senhora Aparecida em São José dos Campos (10 a 12 de Outubro de 2026)!`
      );

      setTimeout(() => {
        window.open(`${whatsappGroupUrl}?text=${textMsg}`, '_blank');
      }, 1000);
    });
  }

  // --- 7. ACCORDION / FAQ ---
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const isActive = item.classList.contains('active');

      document.querySelectorAll('.accordion-item').forEach(i => {
        i.classList.remove('active');
        const content = i.querySelector('.accordion-content');
        if (content) content.style.maxHeight = null;
      });

      if (!isActive) {
        item.classList.add('active');
        const content = item.querySelector('.accordion-content');
        if (content) content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });

  // --- 8. SHARE & TOAST ---
  if (btnShareHeader) {
    btnShareHeader.addEventListener('click', async () => {
      const shareData = {
        title: 'Missão Nossa Senhora Aparecida em SJC | Juventude Missionária Vale do Paraíba',
        text: '«Vinde e vede.» (São João 1, 39) - Confira os detalhes da Missão Nossa Senhora Aparecida em São José dos Campos (10 a 12 de Outubro de 2026). Juventude Missionária Regnum Christi Vale do Paraíba.',
        url: window.location.href
      };

      if (navigator.share) {
        try {
          await navigator.share(shareData);
        } catch (err) {
          copyLink();
        }
      } else {
        copyLink();
      }
    });
  }

  function copyLink() {
    navigator.clipboard.writeText(window.location.href)
      .then(() => showToast('Link copiado com sucesso!'))
      .catch(() => showToast('Erro ao copiar link.'));
  }

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
