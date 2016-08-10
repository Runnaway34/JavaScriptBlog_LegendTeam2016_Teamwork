class HomeView {
    constructor(mainContentSelector) {
        this._selector = mainContentSelector;
    }
    
    showGuestPage(mainData) {
        let _that = this;
            $.get('templates/welcome-guest.html', function (template) {
            let renderedWrapper = Mustache.render(template, null);
            $(_that._selector).html(renderedWrapper);
            $.get('templates/articles.html', function (template) {
                let articles = {
                    articleContent: mainData
                };
                let renderedArticles = Mustache.render(template, articles);
                $('.articles').html(renderedArticles);
            });
        });
    }
   
    showUserPage(mainData) {
        let _that = this;
        $.get('templates/welcome-user.html', function (template) {
            let renderedWrapper = Mustache.render(template, null);
            $(_that._selector).html(renderedWrapper);
            $.get('templates/articles.html', function (template) {
                let articles = {
                    articleContent: mainData
                };
                let renderedArticles = Mustache.render(template, articles);
                $('.articles').html(renderedArticles);
            });
        });
    }
    
    
    
    //Как да заредя Welcome-admin.html?
    showAdminPage(mainData) {
        let _that = this;
        $.get('templates/welcome-admin.html', function (template) {
            let renderedWrapper = Mustache.render(template, null);
            $(_that._selector).html(renderedWrapper);
            $.get('templates/articles.html', function (template) {
                let articles = {
                    articleContent: mainData
                };
                let renderedArticles = Mustache.render(template, articles);
                $('.articles').html(renderedArticles);
            });
        });
    }
}