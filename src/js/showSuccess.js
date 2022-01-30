const showSuccess = input => {
    input.classList.remove("field-error");
    const formField = input.parentElement;

    const error = formField.querySelector('.form-error-text');
    error.textContent = '';
};

export default showSuccess;