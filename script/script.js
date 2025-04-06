function burger() {
   const burger = document.querySelector('.header-burger')
   const header = document.querySelector('.header')

   burger.addEventListener('click', item => {
      header.classList.toggle('active')
   })
}

function productCollapse() {
   const buttons = document.querySelectorAll('.product-item__button')

   buttons.forEach(item => {
      item.addEventListener('click', () => {
         const parentItem = item.closest('.product-item')
         const darkParentItem = buttons[1].closest('.product-item')
         const lightParentItem = buttons[0].closest('.product-item')
         parentItem.classList.toggle('active')

         if (parentItem.classList.contains('active')) {
            parentItem.classList.add('active')

            if (item.closest('.product-item__dark')) {
               darkParentItem.querySelector('.product-item__bg').classList.remove('active')
               lightParentItem.querySelector('.product-item__bg').classList.add('active')
            } else {
               lightParentItem.querySelector('.product-item__bg').classList.remove('active')
               darkParentItem.querySelector('.product-item__bg').classList.add('active')
            }
         } else {
            parentItem.classList.remove('active')

            if (item.closest('.product-item__dark')) {
               lightParentItem.querySelector('.product-item__bg').classList.remove('active')
            } else {
               darkParentItem.querySelector('.product-item__bg').classList.remove('active')
            }
         }

         if (item.closest('.product-item__dark')) {
            lightParentItem.classList.remove('active')
         } else {
            darkParentItem.classList.remove('active')
         }
      })
   })
}

function modal() {
   const openModalBtns = document.querySelectorAll('.product-item__order');
   const modalOverlay = document.getElementById('modalOverlay');
   const modalClose = document.getElementById('modalClose');
   const modalForm = document.getElementById('modalForm');

   // Открыть модальное окно
   openModalBtns.forEach(item => {
      item.addEventListener('click', function () {
         modalOverlay.classList.add('active');
         document.body.style.overflow = 'hidden'; // Блокировка прокрутки страницы
      });
   })

   // Закрыть модальное окно при клике на крестик
   modalClose.addEventListener('click', function () {
      closeModal();
   });

   // Закрыть модальное окно при клике на подложку
   modalOverlay.addEventListener('click', function (e) {
      if (e.target === modalOverlay) {
         closeModal();
      }
   });

   // Функция закрытия модального окна
   function closeModal() {
      modalOverlay.classList.remove('active');
      document.body.style.overflow = ''; // Возвращение прокрутки страницы
   }
}

function pricing() {
   const accordionHeaders = document.querySelectorAll('.pricing__accordion-header');

   // Відкриваємо третій елемент за замовчуванням
   const defaultOpenItem = document.getElementById('item3');
   if (defaultOpenItem) {
      const contentHeight = defaultOpenItem.querySelector('.pricing__accordion-inner').offsetHeight;
      defaultOpenItem.style.height = contentHeight + 'px';
   }

   accordionHeaders.forEach(header => {
      header.addEventListener('click', function () {
         const accordionId = this.getAttribute('data-accordion');
         const content = document.getElementById(accordionId);
         const icon = this.querySelector('.pricing__accordion-icon');
         const contentInner = content.querySelector('.pricing__accordion-inner');

         // Закриваємо інші акордеони
         document.querySelectorAll('.pricing__accordion-content').forEach(item => {
            if (item.id !== accordionId) {
               item.style.height = '0px';
            }
         });

         document.querySelectorAll('.pricing__accordion-icon').forEach(i => {
            if (i !== icon) {
               i.classList.remove('open');
            }
         });

         // Перемикаємо поточний акордеон
         if (content.style.height === '0px' || content.style.height === '') {
            const contentHeight = contentInner.offsetHeight;
            content.style.height = contentHeight + 'px';
            icon.classList.add('open');
         } else {
            content.style.height = '0px';
            icon.classList.remove('open');
         }
      });
   });
}

function mentorsSlider() {
   const slider = document.querySelector('.js-mentors-slider');
   if (slider) {
      new Flickity(slider, {
         cellAlign: 'left',
         contain: true,
         pageDots: false,
         prevNextButtons: true,
         groupCells: true,
         wrapAround: true
      });
   }
}

function testimonialsSlider() {
   const slider = new Flickity('.testimonials__slider', {
      cellAlign: 'center',
      contain: true,
      wrapAround: true,
      prevNextButtons: false,
      pageDots: true,
      adaptiveHeight: true
   });

   const prevButton = document.querySelector('.testimonials__nav-btn--prev');
   const nextButton = document.querySelector('.testimonials__nav-btn--next');

   prevButton.addEventListener('click', function () {
      slider.previous();
   });

   nextButton.addEventListener('click', function () {
      slider.next();
   });
}

function phoneMask() {
   const phoneInput = document.querySelectorAll('#phone');
   const phoneMask = new Inputmask('+380(99) 999-99-99');

   phoneInput.forEach(item => {
      phoneMask.mask(item);
   })
}

function sendForms() {
   function sendForm(form, formType) {
      form.addEventListener("submit", function (e) {
         e.preventDefault();

         const formData = new FormData(form);
         formData.append("form_type", formType); // указываем, какая форма

         fetch("../send.php", {
            method: "POST",
            body: formData
         })
            .then(res => res.text())
            .then(data => {
               formType == 'modalForm' && document.querySelector('.modal__seccess').classList.add('active')
               formType == 'contact' && document.querySelector('.contact .modal__seccess').classList.add('active')
               form.reset();
            })
            .catch(err => {
               formType == 'modalForm' && document.querySelector('.modal__error').classList.add('active')
               formType == 'contact' && document.querySelector('.contact .modal__error').classList.add('active')
            });
      });
   }

   const modalForm = document.getElementById("modalForm");
   if (modalForm) sendForm(modalForm, "modal");

   const contactForm = document.querySelector(".contact__form");
   if (contactForm) sendForm(contactForm, "contact");
}

document.addEventListener('DOMContentLoaded', function () {
   burger()
   productCollapse()
   modal()
   pricing()
   mentorsSlider()
   testimonialsSlider()
   phoneMask()
   sendForms()
});