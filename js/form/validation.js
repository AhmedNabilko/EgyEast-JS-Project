


function checkName(name) {
    let nameRegex = /^[a-zA-Z\s]{3,}$/;
    let input = name.value.trim();
    let response = {
        isValid: true,
        message: ""
    };
    if (!nameRegex.test(input)) {
        response.isValid = false;
        if (input.length <= 3) {
            response.message = "at least 3 letters";
        } else {
            response.message = "invalid characters";
        }
    }
    return response;
}




function checkEmail(email) {
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let input = email.value.trim();
    let response = {
        isValid: true,
        message: ""
    };
    if (!emailRegex.test(input)) {
        response.isValid = false;
        response.message = "Please enter a valid email";
    }
    return response;
}


function checkPassword(password) {
    let input = password.value;
    let passwordRegex = /^(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/;
    let response = {
        isValid: true,
        message: ""
    };

    if (!passwordRegex.test(input)) {
        response.isValid = false;
        let hasCapital = /[A-Z]/;
        let hasSymbol = /[^a-zA-Z0-9\s]/;

        if (input.length < 8) {
            response.message = "at least 8 characters";
        } else if (!hasCapital.test(input)) {
            response.message = "at least 1 capital letter";
        } else if (!hasSymbol.test(input)) {
            response.message = "at least 1 symbol";

        }
    }

    return response;
}

function checkConfirmPassword(password, confirmPassword) {
    let passwordInput = password.value;
    let confirmPasswordInput = confirmPassword.value;
    let response = {
        isValid: true,
        message: ""
    };
    if (passwordInput !== confirmPasswordInput) {
        response.isValid = false;
        response.message = "not matched";
    }
    return response;
}



function checkPhone(phone) {

    let phoneRegex = /^(01[0125][0-9]{8})$/;

    let input = phone.value.trim();
    let response = {
        isValid: true,
        message: ""
    };
    if (!phoneRegex.test(input)) {
        response.isValid = false;
        response.message = "invalid phone";
    }
    return response;
}



function checkAge(age) {
    let input = age.value.trim();
    let response = {
        isValid: true,
        message: ""
    };
    let ageNumber = Number(input);
    if (isNaN(ageNumber) || ageNumber <= 0 || ageNumber > 100) {
        response.isValid = false;
        response.message = "invalid age";
    }
    return response;
}

