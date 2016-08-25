class ArticleView {
    constructor(selector, mainContentSelector) {
        this._selector = selector;
        this._mainContentSelector = mainContentSelector;
    }

    showCreateArticlePage(data) {
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
                
                let tag = $('#tag').val();
                let author = $('#author').val();
                let content = $('#content').val();
                let date = moment().format("MMMM Do YYYY,h:mm A");
                let data = {
                    title: title,
                    tag:tag,
                    author: author,
                    content: content,
                    date: date
                };
                triggerEvent('createArticle', data);
            });
        });
    }

    showSelectedArticle(article) {
        let _that = this;
        let theData = {
            selectedArticle: article,
            selectedArticleComments: article['commentsList']
        };

        $.get('templates/selected-article.html', function (template) {
            var renderMainContent = Mustache.render(template, theData);
            $(_that._mainContentSelector).html(renderMainContent);


        });
    }

    showEditArticlePage(articleId) {
        let _that = this;
        let templateUrl;
        let authToken = sessionStorage['_authToken'];
        if(authToken != null && authToken!='undefined') {
            templateUrl = "templates/nav-user.html";
        }
        else {
            showPopup("error","Please Login.");
            redirectUrl("#/login");
            return;
        }
        $.get(templateUrl, function (template) {
            let navSelector = Mustache.render(template, null);
            $(_that._selector).html(navSelector);
        });

        
        
        // $('#article-author').val(authorName);
        

        $('#article-author').val(sessionStorage.getItem('fullname'));
        $.get('templates/form-edit-article.html', function (template) {
            var renderMainContent = Mustache.render(template, null);
            $(_that._mainContentSelector).html(renderMainContent);

            $('#edit-article-request-button').on('click', function (ev) {
                let title = $('#article-title').val();
                let content = $('#article-content').val();
                let authorName = sessionStorage.getItem("fullname");
                let date = moment().format("MMMM Do YYYY,h:mm A");
                let data = {
                    "title":title,
                    "author": authorName,
                    "content":content,
                    "date":date,
                    "_id":articleId
                };
                triggerEvent('editArticle', data);

            })
        });
    }
}

