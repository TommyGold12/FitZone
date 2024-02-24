class Validator {
    constructor(config) {
        this.elementsConfig = config;
        this.errors = {};

        //methods
        this.generateErrorObject();
        this.inputListener();
    }

    generateErrorObject() {
        for (let field in this.elementsConfig) {
            this.errors[field] = [];
            //console.log(this.elementsConfig)
        }
    }

    inputListener() {
        let inputSelector = this.elementsConfig;
        for (let field in inputSelector) {
            let selector = `input[name = '${field}']`;
            let el = document.querySelector(selector);
            el.addEventListener('input', this.validate.bind(this));
        }
    }

    validate(e) {
        let elFields = this.elementsConfig;
        let field = e.target;
        let fieldName = field.getAttribute('name');
        let fieldValue = field.value;
        this.errors[fieldName] = [];

        // validacija praznog polja
        if (elFields[fieldName].required) {
            if (fieldValue === '') {
                this.errors[fieldName].push('Polje je prazno');
            }
        }

        // validacija emaila
        if (elFields[fieldName].email) {
            if (!this.validateEmail(fieldValue)) {
                this.errors[fieldName].push('Neispravna email adresa.')
            }
        }

        // validacija duljine polja
        if (fieldValue.length < elFields[fieldName].minLength || fieldValue.length > elFields[fieldName].maxLength) {
            this.errors[fieldName].push(`Polje mora sadržavati minimalno ${elFields[fieldName].minLength} karaktera a maksimalno ${elFields[fieldName].maxLength} karaktera`);

        }

        // validacija lozinki
        if (elFields[fieldName].matching) {
            let matchingEl = document.querySelector(`input[name = ${elFields[fieldName].matching}]`);
            if (fieldValue != matchingEl.value) {
                this.errors[fieldName].push('Unesite identične lozinke');
            }


            // sprječavanje da se polja konstantno uspoređuju jedan sa drugim
            if (this.errors[fieldName].length === 0) {
                this.errors[fieldName] = [];
                this.errors[elFields[fieldName].matching] = [];
            }
        }
        this.populateErrors(this.errors);
        this.validationTest(fieldValue);
        console.log(field)
    }

    validationTest(value) {
        if (value) {
            console.log(value)
        }

    }

    validationPassed() {
        for (let key of Object.keys(this.errors)) {
            if (this.errors[key].length > 0) {
                return false;
            }
        }

        return true;
    }

    populateErrors(errors) {
        for (const elem of document.querySelectorAll('ul')) {
            elem.remove();
        }

        for (let key of Object.keys(errors)) {
            let input = document.querySelector(`input[name=${key}]`).parentElement;
            let parentElement = input.parentElement;
            let errorsElement = document.createElement('ul');
            parentElement.appendChild(errorsElement);

            errors[key].forEach(error => {
                console.log(error)
                let li = document.createElement('li');
                li.innerText = error;
                errorsElement.appendChild(li);
            })

        }
    }


    //regex- email validation
    validateEmail = (email) => {
        console.log(email)
        //REGEX- validacija email-a
        if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
            return true;

        }
        else false;
    }

}

