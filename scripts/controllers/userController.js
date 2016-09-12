class UserController {
    constructor(userView, requester, baseUrl, appKey) {
        this._userView = userView;
        this._requester = requester;
        this._appKey = appKey;
        this._baseServiceUrl = baseUrl + "/user/" + appKey + "/";
    }

    showLoginPage(isLoggedIn) {
        this._userView.showLoginPage(isLoggedIn);
    }

    showRegisterPage(isLoggedIn) {
        this._userView.showRegisterPage(isLoggedIn);
    }

    login(requestData) { //Login the new user
        let requestUrl = this._baseServiceUrl + "login";
        this._requester.post(requestUrl, requestData,
            function success(data) {
                sessionStorage['_authToken'] = data._kmd.authtoken;
                sessionStorage['username'] = data.username;
                sessionStorage['fullname'] = data.fullname;
                showPopup('success', "You have successfully logged in.");
                redirectUrl("#/home");
            },
            function error(data) {
                showPopup('error', "An error has occurred while attempting to log in.");
            });
    }

    register(requestData) { //register new user
        if ((requestData.username.length < 5) ) {
            showPopup('error', "Username must consist of at least 5 characters.");
            return;
        }

        if (requestData.fullname.length < 8) {
            showPopup('error', "Full name must consist of at least 8 characters.");
            return;
        }

        if (requestData.password.length < 6) {
            showPopup('error', "Password must consist of at least 6 characters.");
            return;
        }

        if (requestData.password !== requestData.confirmPassword) {
            showPopup('error', "Passwords do not match.");
            return;
        }

        let requestUrl = this._baseServiceUrl;
        delete requestData['confirmPassword'];
        this._requester.post(requestUrl, requestData, function success(data) {
                showPopup('success', "You have successfully registered.");

                redirectUrl("#/login");
            },
            function error() {
                showPopup('error', "Username is already taken. Please try another");

            });
    }

    logout() {
        sessionStorage.clear();
        redirectUrl("#/home");
    }
}