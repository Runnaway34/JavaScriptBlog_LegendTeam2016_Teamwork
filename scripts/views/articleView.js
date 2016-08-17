class ArticleView {
    constructor(selector, mainContentSelector) {
        this._selector = selector;
        this._mainContentSelector = mainContentSelector;
    }

    showCreateArticlePage(data, isLoggedIn) {
        let _that = this;
        let templateUrl = "templates/nav-create-article.html";
        
        $.get(templateUrl, function (template) {
            let navSelector = Mustache.render(template, null);
            $(_that._selector).html(navSelector);
        });

        $.get('templates/form-create-article.html', function (template) {
            var renderMainContent = Mustache.render(template, null);
            $(_that._mainContentSelector).html(renderMainContent);

            $('#author').val(data.fullname);

            $('#create-new-article-request-button').on('click', function (ev) {
                let title = $('#title').val();
                let author = $('#author').val();
                let content = $('#content').val();
                let date = moment().format("MMMM Do YYYY,h:mm A");
                let data = {
                    title: title,
                    author: author,
                    content: content,
                    date: date
                };
                triggerEvent('createArticle', data);
            });
        });
    }
}

