import {validateForm} from './getValidateForm';

const validateFooterForm = () => {
    const form = document.querySelector(`.feedback-form`);

    if (form) {
        const constraints = {
            name: {
                presence: true,
            },
            phone: {
                presence: true,
                format: {
                    pattern: /\+7\(\d{3}\)\d{3}-\d{2}-\d{2}/
                }
            },
        };

        validateForm(form, constraints);
    }
}

export {validateFooterForm};
