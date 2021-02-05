import MicroModal from 'micromodal';
import validate from 'validate.js';

export const validateForm = function (form, config, closeModal= false) {
  if (form) {
    form.addEventListener(`submit`, function (e) {
      e.preventDefault();
      handleFormSubmit(form);
    });

    const inputs = form.querySelectorAll(`input, textarea, select`);

    for (let i = 0; i < inputs.length; ++i) {

      inputs.item(i).addEventListener(`change`, function (ev) {
        let errors = validate(form, config) || {};
        showErrorsForInput(this, errors[this.name]);
      });

      inputs.item(i).addEventListener(`focus`, function () {
        this.parentNode.classList.remove(`input-wrapper--error`);
        this.parentNode.classList.remove(`input-wrapper--success`);
      });
    }

    function handleFormSubmit(form, input) {
      let errors = validate(form, config);
      showErrors(form, errors || {});
      if (!errors) {
        showSuccess();
      }
    }

    function showErrors(form, errors) {
      form.querySelectorAll(`input[name], select[name]`).forEach(function (input) {
        showErrorsForInput(input, errors && errors[input.name]);
      });
    }

    function showErrorsForInput(input, errors) {
      let formGroup = closestParent(input.parentElement, `input-wrapper`);

      resetFormGroup(formGroup);

      if (errors) {
        formGroup.classList.add(`input-wrapper--error`);
      } else {
        formGroup.classList.add(`input-wrapper--success`);
      }
    }

    function closestParent(child, className) {
      if (!child || child === document) {
        return null;
      }
      if (child.classList.contains(className)) {
        return child;
      } else {
        return closestParent(child.parentNode, className);
      }
    }

    function resetFormGroup(formGroup) {
      formGroup.classList.remove(`input-wrapper--error`);
      formGroup.classList.remove(`input-wrapper--success`);
    }

    function showSuccess() {
      const dataForm = new FormData(form);

      $.ajax({
        type: form.getAttribute(`method`),
        url: form.getAttribute(`action`),
        processData: false,
        contentType: false,
        data: dataForm,
        success: function success(dataForm) {

          form.reset();

          MicroModal.show(`thnx-modal`);

          setTimeout(() => {
            MicroModal.close(`thnx-modal`);
          }, 2000);

        },
        error: function error(xhr, ajaxOptions, thrownError) {
          console.log(xhr.status);
          console.log(thrownError);
        },
      });

    }
  }
};
