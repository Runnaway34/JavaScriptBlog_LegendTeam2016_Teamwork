class HomeView {
    constructor(selector,mainContentSelector) {
        this._selector = selector;
        this._mainContentSelector = mainContentSelector;
    }

    showGuestPage(mainData) {
        let _that = this;
        $.get('templates/nav-guest.html',function (template) {
            let navSelector = Mustache.render(template,null);
            $(_that._selector).html(navSelector);
            $.get('templates/welcome-guest.html', function (template) {
                let renderMainContent = Mustache.render(template, null);
                $(_that._mainContentSelector).html(renderMainContent);
                $.get('templates/articles.html', function (template) {
                    let articles = {
                        articleContent: mainData
                    };
                    let renderedArticles = Mustache.render(template, articles);
                    $('.articles').html(renderedArticles);
                    $(".links").hide();
                });
            });
        })
    }
    
    showUserPage(mainData) {
        let _that = this;

        $.get('templates/nav-user.html',function (template) {
            let navSelector = Mustache.render(template,null);
            $(_that._selector).html(navSelector);

            $.get('templates/welcome-user.html', function (template) {
                let renderMainContent = Mustache.render(template, null);
                $(_that._mainContentSelector).html(renderMainContent);
                $.get('templates/articles.html', function (template) {
                    let articles = {
                        articleContent: mainData
                    };
                    let renderedArticles = Mustache.render(template, articles);
                    $('.articles').html(renderedArticles);
                });
            });
        })
    }
    
    showVideoPage() {
        let _that = this;
        $.get('templates/nav-user.html',function (template) {
            let navSelector = Mustache.render(template,null);
            $(_that._selector).html(navSelector);

            $.get('templates/video.html', function (template) {
                let renderMainContent = Mustache.render(template, null);
                $(_that._mainContentSelector).html(renderMainContent);
            });
        })
    }
    
    showAboutPage(isLoggedIn) {
        let _that = this;
        let templateUrl;
        if(isLoggedIn) {
            templateUrl = "templates/nav-user.html";
        }
        else {
            templateUrl = "templates/nav-guest.html";
        }

        $.get(templateUrl,function (template) {
            let navSelector = Mustache.render(template,null);
            $(_that._selector).html(navSelector);
        });
        $.get('templates/about.html', function (template) {
            let renderMainContent = Mustache.render(template, null);
            $(_that._mainContentSelector).html(renderMainContent);
        });
    }
}