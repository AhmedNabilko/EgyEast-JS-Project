
function registerUser(userData) {
    let isRegistered = true;
    if (!userData.name) {
        alert("Error: User name is required to register.");
        isRegistered = false;
    } else {

        if (hasCookie(userData.name)) {
            alert("This username is already registered.\nPlease use another name.");
            isRegistered = false;
        }

        userData.favouriteAnime = [];


        setCookie(userData.name, JSON.stringify(userData), 15);

    }


    return isRegistered;
}
function getUser(username) {
    var user;

    if (hasCookie(username)) {
        let encodedData = getCookie(username);
        let jsonString = decodeURIComponent(encodedData);
        user = JSON.parse(jsonString);

    }

    return user;
}

function loginUser(username, password) {
    let loginResponse = {};
    let user = getUser(username)
    if (!user) {

        loginResponse = {
            isValid: false,
            message: "name not registered"
        };
    } else {



        if (user.password === password) {
            loginResponse = {
                isValid: true,
                message: "Successful",
                user: user
            };
        } else {
            loginResponse = {
                isValid: false,
                message: "Incorrect Password"
            };
        }
    }


    return loginResponse;
}

function saveSession(username) {

    setCookie("currentUser", JSON.stringify(username));
}

function getCurrentUser() {
    let username = getCookie("currentUser");
    username = decodeURIComponent(username);
    username = JSON.parse(username);

    let user = getUser(username);
    return user;
}

function logoutNow() {
    deleteCookie("currentUser");

}



function addToFavorites(user, animeId) {
    let isAdded = false;


    if (user) {

        if (!user.favouriteAnime.includes(animeId)) {
            user.favouriteAnime.push(animeId);
            deleteCookie(user.name);

            setCookie(user.name, JSON.stringify(user), 15);
            isAdded = true;
        }

    }


    return isAdded;
}

function removeFromFavorites(user, animeId) {
    let isRemoved = false;



    if (user) {

        if (user.favouriteAnime) {

            user.favouriteAnime = user.favouriteAnime.filter(id => id !== animeId);

            setCookie(user.name, JSON.stringify(user), 15);
            isRemoved = true;
        }
    }


    return isRemoved;
}