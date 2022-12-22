const changeHeader = (() => {
  const header = document.querySelector('.header');
  const scrollHeight = header.scrollHeight;
  let scrolled = false;

  function init() {
    window.addEventListener('scroll', () => {
      if(!scrolled) {
        scrolled = true;
        scrollPage();
      }
    }, false);
  }

  function scrollPage() {
    if (window.pageYOffset > scrollHeight) {
      header.classList.add('affix');
    } else {
      header.classList.remove('affix');
    }
    scrolled = false;
  }

  init();
})();
