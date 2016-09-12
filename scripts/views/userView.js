class UserView {
    constructor(selector,mainContentSelector) {
        this._selector = selector;
        this._mainContentSelector = mainContentSelector;
    }
    
    showLoginPage() {
        let _that = this;
        let templateUrl= "templates/nav-guest.html";

        $.get(templateUrl, function (template) {
            let navSelector = Mustache.render(template, null);
            $(_that._selector).html(navSelector);
        });
        $.get('templates/form-login.html', function (template) {
            let renderMainContent = Mustache.render(template, null);
            $(_that._mainContentSelector).html(renderMainContent);

            $('#login-request-button').on('click', function (event) {
                let username = $('#username').val();
                let password = $('#password').val();

                let data = {
                    username:username,
                    password:password
                };

                triggerEvent('login', data);
            })
        });
    }
    
    showRegisterPage() {
        let _that = this;
        let templateUrl= "templates/nav-guest.html";
        $.get(templateUrl, function (template) {
            let navSelector = Mustache.render(template, null);
            $(_that._selector).html(navSelector);
        });
        
            $.get('templates/form-register.html', function (template) {

                let renderMainContent = Mustache.render(template, null);
                
                $(_that._mainContentSelector).html(renderMainContent);

                $('#register-request-button').on('click', function (ev) {
                    let username = $('#username').val(),
                        password = $('#password').val(),
                        fullname = $('#fullname').val(),
                        confirmPassword = $('#passConfirm').val();
                    let data = {
                        username: username,
                        password: password,
                        fullname: fullname,
                        confirmPassword: confirmPassword
                    };
                    triggerEvent('register', data);
                });
            });
    }

   
}