

let inputElements = {};



let form = document.getElementById('loginForm');
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
        case 'username':
            inputElements['username'] = input;
            validation = checkName(input);
            break;

        case 'password':
            inputElements['password'] = input;
            validation = checkPassword(input);
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


function login() {

    let loginResponse = {};
    let user = {
        name: inputElements['username'].value,
        password: inputElements['password'].value
    };

    loginResponse = loginUser(user.name, user.password);

    return loginResponse;
}

form.addEventListener('submit', function (e) {
    e.preventDefault();

    let isValid = true;


    let loginResponse = {};


    isValid = checkInputs();
    if (isValid) {

        loginResponse = login();
        isValid = loginResponse.isValid;

        if (isValid) {
            alert(loginResponse.message + "\nWelcome " + loginResponse.user.name + " :)");
            saveSession(loginResponse.user.name);
            window.location.href = "../pages/home.html";

        } else {
            alert("Login Failed :(\n" + loginResponse.message);
            window.location.href = "../pages/signup.html";
        }


    }
    else {
        alert("Invalid input :(\nPlease Enter Valid input and try again.");
    }
});