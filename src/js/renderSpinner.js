const container = document.querySelector('.container');
const containerText = document.querySelector('.container__text');

const renderSpinner = () => {
    const markup = `
    <div class="hollow-dots-spinner" :style="spinnerStyle">
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
    </div>
    `;
    containerText.classList.add('hidden');
    container.insertAdjacentHTML('afterbegin', markup);
};

export default renderSpinner;