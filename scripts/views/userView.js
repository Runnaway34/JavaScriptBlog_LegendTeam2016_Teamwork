class UserView {
    constructor(mainNav, mainContentSelector) {
        this._selector = mainContentSelector;
        this._mainContentSelector = mainNav;
    }

    showLoginPage(isLoggedIn) {
        let _that = this;
        let templateUrl;
        if(isLoggedIn) {
            templateUrl = "templates/form-user.html";
        }
        else {
            templateUrl = "templates/form-guest.html";
        }
        
        $.get(templateUrl, function (template) {
            let renderedMainNav = Mustache.render(template, null);

            $(_that._selector).html(renderedMainNav);
            
            $.get('templates/login.html', function (template) {
                let rendered = Mustache.render(template, null);
                $(_that._mainContentSelector).html(rendered);

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
        })
    }
    
    showRegisterPage(isLoggedIn) {
        let _that = this;

        let templateUrl;
        if(isLoggedIn) {
            templateUrl="templates/form-user.html";
        }
        else {
            templateUrl="templates/form-guest.html";
        }
        $.get(templateUrl, function(template) {
            let renderedMainNav = Mustache.render(template, null);
             
            $(_that._selector).html(renderedMainNav);

            $.get('templates/register.html', function (template) {

                let rendered = Mustache.render(template, null);

                $(_that._mainContentSelector).html(rendered);

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
        });
    }
}