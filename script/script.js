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
         groupCells: 1,
         wrapAround: true
      });
   }
}

function testimonialsSlider() {
   const slider = new Flickity('.testimonials__slider', {
      cellAlign: 'center',
      contain: true,
      wrapAround: true,
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

function smoothScrollToAnchor(anchorId, duration = 800, offset = 0) {
   // Получаем элемент по ID
   const targetElement = document.getElementById(anchorId);

   // Проверяем, существует ли элемент
   if (!targetElement) {
      console.error(`Элемент с ID "${anchorId}" не найден`);
      return;
   }

   // Получаем текущую позицию прокрутки
   const startPosition = window.pageYOffset;

   // Вычисляем позицию элемента с учетом offset
   const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - offset;

   // Разница между начальной и конечной позициями
   const distance = targetPosition - startPosition;

   // Время начала анимации
   let startTime = null;

   function animation(currentTime) {
      if (startTime === null) startTime = currentTime;

      // Прогресс анимации от 0 до 1
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);

      // Функция плавности (easeInOutQuad)
      const ease = progress => (progress < 0.5
         ? 2 * progress * progress
         : 1 - Math.pow(-2 * progress + 2, 2) / 2);

      // Выполняем скролл
      window.scrollTo(0, startPosition + distance * ease(progress));

      // Продолжаем анимацию, если она не завершена
      if (progress < 1) {
         requestAnimationFrame(animation);
      }
   }

   // Запускаем анимацию
   requestAnimationFrame(animation);
}

function smoothScroll() {
   // Находим все ссылки, которые начинаются с #
   const anchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');

   // Добавляем обработчик на каждую ссылку
   anchorLinks.forEach(link => {
      link.addEventListener('click', function (e) {
         e.preventDefault(); // Отменяем стандартное поведение ссылки

         // Получаем ID якоря из href (убираем #)
         const anchorId = this.getAttribute('href').substring(1);

         // Вызываем функцию плавного скролла
         smoothScrollToAnchor(anchorId, 800, 50); // 800ms, 50px offset
      });
   });
}

function typedElems() {
   const heading = document.querySelectorAll(".typed-heading");

   heading.forEach(item => {
      const itemHtml = item.innerHTML
      item.innerHTML = ''

      console.log(item);


      new Typed(item, {
         strings: [itemHtml],
         typeSpeed: item.nodeName == 'P' ? 100 : 1,
         backSpeed: 20,
         startDelay: 100,
         loop: false,
         contentType: "html",
         showCursor: false,
      });
   })
}

function fillTitles() {
   document.addEventListener('scroll', () => {
      const elements = document.querySelectorAll('.filled-heading');
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;

      elements.forEach((element) => {
         const rect = element.getBoundingClientRect();

         if (rect.top < windowHeight && rect.bottom > 0) {
            const scrollPercentage = Math.min((windowHeight - rect.top) / (windowHeight + rect.height), 1);
            element.style.backgroundPosition = `${100 - scrollPercentage * 110}% 0`;
         }
      });
   });
}

function parallax() {
   // JavaScript для анимации
   const items = document.querySelectorAll('.bg__img');

   window.addEventListener('mousemove', (e) => {
      const { clientX, clientY } = e;

      items.forEach((item) => {
         const index = parseFloat(item.dataset.index) || 1; // Сила движения зависит от data-index
         const offsetX = (clientX - window.innerWidth / 2) * (index / 50);
         const offsetY = (clientY - window.innerHeight / 2) * (index / 50);

         // Применяем сдвиг
         item.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
      });
   });
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
   smoothScroll()
   typedElems()
   fillTitles()
   parallax()
});