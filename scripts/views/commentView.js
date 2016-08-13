class CommentView {
    constructor(selector, mainContentSelector) {
        this._selector = selector;
        this._mainContentSelector = mainContentSelector;
    }
    showCreateCommentPage(articleId) {
        let _that = this;
        let templateUrl = "templates/nav-create-comment.html";
        $.get(templateUrl, function (template) {
            let navSelector = Mustache.render(template, null);
            $(_that._selector).html(navSelector);
        });

        $.get('templates/form-create-comment.html', function (template) {
            var renderMainContent = Mustache.render(template, null);
            $(_that._mainContentSelector).html(renderMainContent);

            $('#create-new-comment-request-button').on('click', function (ev) {
                let content = $('#content').val();
                let date = moment().format("MMMM Do YYYY");

                let data = {
                    "content":content,
                    "date":date,
                    "_id":articleId
                };
                
                triggerEvent('createComment', data);
                
            })
        });
    }
}