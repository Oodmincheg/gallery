function Gallery(gallery) {
  if (!gallery) {
    throw new Error('Gallery element should be passed!');
  }

  // select all element that we need
  this.gallery = gallery;
  this.images = gallery.querySelectorAll('img');
  this.modal = document.querySelector('.modal');
  this.prevButton = this.modal.querySelector('.prev');
  this.nextButton = this.modal.querySelector('.next');
  // open modal function

  //close modal function

  //add event listenres
  this.handleOutModalClick = this.handleOutModalClick.bind(this); // привязали this навсегда
  this.handleKeyUp = this.handleKeyUp.bind(this);
  this.showNextImage = this.showNextImage.bind(this);
  this.showPrevImage = this.showPrevImage.bind(this);

  this.images.forEach((image) =>
    image.addEventListener('click', ({ currentTarget }) => {
      this.showImage(currentTarget);
    }),
  );
  this.modal.addEventListener('click', this.handleOutModalClick);
}

Gallery.prototype.openModal = function openModal() {
  if (this.modal.matches('.open')) {
    console.info('modal is open');
  }
  this.modal.classList.add('open');
  window.addEventListener('keyup', this.handleKeyUp);
  this.nextButton.addEventListener('click', this.showNextImage);
  this.prevButton.addEventListener('click', this.showPrevImage);
};
Gallery.prototype.showImage = function showImage(image) {
  this.currentImage = image;
  this.modal.querySelector('img').src = image.src;
  this.modal.querySelector('h2').textContent = image.title;
  this.modal.querySelector('figcaption p').textContent =
    image.dataset.description;
  this.openModal();
};
Gallery.prototype.closeModal = function closeModal() {
  this.modal.classList.remove('open');
  window.removeEventListener('keyup', this.handleKeyUp);
  this.nextButton.removeEventListener('click', this.showNextImage);
  this.prevButton.removeEventListener('click', this.showPrevImage);
};
Gallery.prototype.handleOutModalClick = function handleOutModalClick(event) {
  console.log('this ===> ', this);
  if (event.target === event.currentTarget) {
    this.closeModal();
  }
};
Gallery.prototype.handleKeyUp = function handleKeyUp(event) {
  if (event.key === 'Escape') return this.closeModal();
  if (event.key === 'ArrowLeft') return this.showPrevImage();
  if (event.key === 'ArrowRight') return this.showNextImage();
};

Gallery.prototype.showPrevImage = function showPrevImage() {
  this.showImage(
    this.currentImage.previousElementSibling || this.gallery.lastElementChild,
  );
};
Gallery.prototype.showNextImage = function showNextImage() {
  //TODO: why nextSibling show text node?
  //   console.log(this.currentImage.nextSibling);
  this.showImage(
    this.currentImage.nextElementSibling || this.gallery.firstElementChild,
  );
};

const gallery1 = new Gallery(document.querySelector('.gallery1'));
const gallery2 = new Gallery(document.querySelector('.gallery2'));

console.log(gallery1, gallery2);
