import Swiper, { Navigation, Autoplay } from 'swiper';

const jumbotronSlides = document.querySelector('.jumbotron__slides');
if(jumbotronSlides) {
  new Swiper(jumbotronSlides, {
    modules: [Navigation, Autoplay],
    slidesPerView: 1,
    spaceBetween: 0,
    speed: 1000,
    autoplay: {
      delay: 7000,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: jumbotronSlides.querySelector('.jumbotron__btn_next'),
      prevEl: jumbotronSlides.querySelector('.jumbotron__btn_prev'),
    }
  });
}
