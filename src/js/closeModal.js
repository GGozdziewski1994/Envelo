const modal = document.querySelector('.container__modal');
const formContainer = document.querySelector('.form');
const containerBtn = document.querySelector('.container__button');

const closeModal = () => {
    modal.classList.add('hidden');
    formContainer.classList.add('hidden');
    containerBtn.classList.remove('hidden');
};

document.addEventListener("keydown", event => {
    if(event.key === "Escape" && !modal.classList.contains('hidden')) {
        closeModal();
    }
});

export default closeModal;