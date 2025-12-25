

let inputElements = {};


let country = document.getElementById('country');
let gender = document.getElementsByName('gender');

let form = document.getElementById('signupForm');
let inputItems = document.getElementsByClassName('inputItem');





function validInputItem(item) {
    item.querySelector('.error').innerText = "";
    item.classList.remove('invalid');
    item.classList.add('valid');


}
function invalidInputItem(item, message) {
    item.querySelector('.error').innerText = message;
    item.classList.add('invalid');
    item.classList.remove('valid');

}
function checkValidation(item) {
    let input = item.querySelector('input');
    let id = input.getAttribute('id');
    let validation;
    switch (id) {
        case 'name':

            inputElements['name'] = input;
            validation = checkName(input);
            break;
        case 'email':
            inputElements['email'] = input;
            validation = checkEmail(input);
            break;
        case 'phone':
            inputElements['phone'] = input;
            validation = checkPhone(input);
            break;
        case 'age':
            inputElements['age'] = input;
            validation = checkAge(input);
            break;
        case 'password':
            inputElements['password'] = input;
            validation = checkPassword(input);
            break;
        case 'confirm':
            inputElements['confirm'] = input;
            validation = checkConfirmPassword(inputElements['password'], input);

            break;
    }

    if (validation.isValid) {
        validInputItem(item);
    } else {
        invalidInputItem(item, validation.message);
    }
}
function focusEffect() {

    for (let i = 0; i < inputItems.length; i++) {

        let input = inputItems[i].querySelector('input');

        input.addEventListener('focus', () => {
            validInputItem(inputItems[i]);
            inputItems[i].classList.add('focus');

        });
        input.addEventListener('blur', () => {
            inputItems[i].classList.remove('focus');
            if (input.value.trim() !== "") {
                checkValidation(inputItems[i]);
            } else {
                inputItems[i].classList.remove('valid');
            }




        });

    }


}


focusEffect();
function checkInputs() {
    let isValid = true;
    for (let i = 0; i < inputItems.length; i++) {
        let item = inputItems[i];

        checkValidation(item);

        if (item.classList.contains('invalid')) {
            isValid = false;
        }
    }
    return isValid;
}



function checkCountry() {
    let isValid = true;
    if (country.value === "") {
        alert("Please select a country")

        isValid = false;
    }
    return isValid;
}


function checkGender() {
    let isValid = false;


    for (let i = 0; i < gender.length && !isValid; i++) {
        if (gender[i].checked) {
            isValid = true;

        }
    }

    if (!isValid) {
        alert("Please select a gender");
    }
    return isValid;
}

function register() {
    let selectedGender = "";
    let isRegistered = false;
    for (let i = 0; i < gender.length && selectedGender === ""; i++) {
        if (gender[i].checked) {
            selectedGender = gender[i].value;

        }
    }
    let newUser = {
        name: inputElements['name'].value,
        email: inputElements['email'].value,
        password: inputElements['password'].value,
        age: inputElements['age'].value,
        country: country.value,
        gender: selectedGender
    };


    isRegistered = registerUser(newUser);

    return isRegistered;
}

form.addEventListener('submit', function (e) {
    e.preventDefault();

    let isValid = true;

    isValid = checkInputs();
    if (isValid) {
        isValid = checkCountry();
        if (isValid) {
            isValid = checkGender();
            if (isValid) {

                isValid = register();
                if (isValid) {

                    alert("Success! \nAll data is valid.");
                    window.location.href = "../pages/login.html";

                }
            }
        }
    }
    else {
        alert("Invalid input :(\nPlease Enter Valid input and try again.");
    }
});