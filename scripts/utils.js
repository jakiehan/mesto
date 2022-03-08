export const chart = (function () {
  return {
    openPopup: function openPopup(elem) {
      elem.classList.add('popup_opened');
      document.addEventListener('keydown', chart.closePopupTheEsc);
    },
    closePopup: function closePopup(elem) {
      elem.classList.remove('popup_opened');
      document.removeEventListener('keydown', chart.closePopupTheEsc);
    },
    closePopupTheEsc: function closePopupTheEsc(evt) {
      if (evt.key === 'Escape') {
        const popupActive = document.querySelector('.popup_opened');
        chart.closePopup(popupActive);
      }
    },
  }
}());