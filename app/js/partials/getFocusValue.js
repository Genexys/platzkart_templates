const getFocusValue = function () {
  const inputFields = document.querySelectorAll('.feedback-form__field input');
  const textArea = document.querySelector('.feedback-form__field textarea');

  if (inputFields[0]) {
    for (const field of inputFields) {
      // console.log(field.parentNode)
      field.addEventListener('blur', () => {
        if (field.value !== '') {
          field.parentNode.classList.add('feedback-form__field--focus');
        } else {
          field.parentNode.classList.remove('feedback-form__field--focus');
        }
      });
    }
  }

  if (textArea) {
    textArea.addEventListener('blur', () => {
      if (textArea.value !== '') {
        textArea.parentNode.classList.add('feedback-form__field--focus');
      } else {
        textArea.parentNode.classList.remove('feedback-form__field--focus');
      }
    });
  }
};

export {getFocusValue};
