function Gallery(gallery) {
  if (!gallery) {
    throw new Error('Gallery element should be passed!');
  }

  // select all element that we need
  const images = gallery.querySelectorAll('img');
  const modal = document.querySelector('.modal');
  const prevButton = modal.querySelector('.prev');
  const nextButton = modal.querySelector('.next');
  // open modal function
  function openModal() {
    if (modal.matches('.open')) {
      console.info('modal is open');
    }
    modal.classList.add('open');
    window.addEventListener('keyup', handleKeyUp);
    nextButton.addEventListener('click', showNextImage);
    prevButton.addEventListener('click', showPrevImage);
  }
  //close modal function
  function closeModal() {
    modal.classList.remove('open');
    window.removeEventListener('keyup', handleKeyUp);
    nextButton.removeEventListener('click', showNextImage);
    prevButton.removeEventListener('click', showPrevImage);
  }
  function handleOutModalClick(event) {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  }
  let currentImage;

  function showImage(image) {
    currentImage = image;
    modal.querySelector('img').src = image.src;
    modal.querySelector('h2').textContent = image.title;
    modal.querySelector('figcaption p').textContent = image.dataset.description;
    openModal();
  }
  function showNextImage() {
    //TODO: why nextSibling show text node?
    console.log(currentImage.nextSibling);
    showImage(currentImage.nextElementSibling || gallery.firstElementChild);
  }
  function showPrevImage() {
    showImage(currentImage.previousElementSibling || gallery.lastElementChild);
  }
  function handleKeyUp(event) {
    console.log('current image ===> ', currentImage);
    if (event.key === 'Escape') return closeModal();
    if (event.key === 'ArrowLeft') return showPrevImage();
    if (event.key === 'ArrowRight') return showNextImage();
  }
  //add event listenres
  images.forEach((image) =>
    image.addEventListener('click', ({ currentTarget }) =>
      showImage(currentTarget),
    ),
  );
  modal.addEventListener('click', handleOutModalClick);
}

const gallery1 = Gallery(document.querySelector('.gallery1'));
const gallery2 = Gallery(document.querySelector('.gallery2'));

// console.log(gallery1, gallery2);
