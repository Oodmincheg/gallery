function Gallery(gallery) {
  if (!gallery) {
    throw new Error("Gallery element should be passed!");
  }
  let currentImage;
  const images = gallery.querySelectorAll("img");
  const modal = document.querySelector(".modal");
  const prevButton = modal.querySelector(".prev");
  const nextButton = modal.querySelector(".next");

  function openModal() {
    if (modal.matches(".open")) {
    }
    modal.classList.add("open");
    window.addEventListener('keyup',handleKeyUp)
    nextButton.addEventListener('click', showNextImage); 
    prevButton.addEventListener('click', showPrevImage); 
  }

  function closeModal(event) {
    if (event.target === event.currentTarget) {
      modal.classList.remove("open");
    }
    window.removeEventListener('keyup',handleKeyUp)
    nextButton.removeEventListener('click', showNextImage); 
    prevButton.removeEventListener('click', showPrevImage); 
  }
  function showImage(image) {
   
    currentImage = image;

    modal.querySelector("img").src = image.src;
    modal.querySelector("h2").textContent = image.title;
    modal.querySelector("figcaption p").textContent = image.dataset.description;
    openModal();
  }
function showNextImage(){
showImage(currentImage.nextElementSibling || gallery.firstElementChild)
}
function showPrevImage(){
    showImage(currentImage.previousElementSibling || gallery.lastElementChild)
}

function handleKeyUp(event){
    if(event.key === 'Escape')return modal.classList.remove('open')
    if(event.key === 'ArrowLeft') return showPrevImage();
    if(event.key === 'ArrowRight') return showNextImage();
}
  images.forEach((image) => image.addEventListener("click", ({currentTarget})=> showImage(currentTarget)));
  modal.addEventListener("click", closeModal);

}
const gallery1 = Gallery(document.querySelector(".gallery1"));
const gallery2 = Gallery(document.querySelector(".gallery2"));
