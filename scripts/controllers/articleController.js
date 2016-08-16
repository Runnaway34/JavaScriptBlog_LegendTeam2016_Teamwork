class ArticleController {
    constructor(articleView, requester, baseUrl, appKey) {
        this._articleView = articleView;
        this._requester = requester;
        this._appKey = appKey;
        this._baseServiceUrl = baseUrl + "/appdata/" + appKey + "/articles/";
    }

    showCreateArticlePage(data, isLoggedIn) {
        this._articleView.showCreateArticlePage(data, isLoggedIn);
    }
    
    showEditArticlePage(data, isLoggedIn) {
        this._articleView.showEditArticlePage(data, isLoggedIn);
    }
    
    createArticle(requestData) {
        if (requestData.title.length < 10) {
            showPopup('error', "Article title must consist of at least 10 symbols.");
            return;
        }

        if (requestData.content.length < 10) {
            showPopup('error', "Article content must consist of at least 50 symbols.");
            return;
        }

        let requestUrl = this._baseServiceUrl;
        this._requester.post(requestUrl, requestData,
            function success(data) {
                showPopup('success', "You have successfully created a new article.");
                redirectUrl("#/home");
            },
            function error(data) {
                showPopup('error', "An error has occurred while attempting to create a new article");
            });
    }
    editArticle(requestData) {
        const kinveyArticleUrl =  this._baseServiceUrl;
        const kinveyHeaders = {
            'Authorization': "Kinvey " + sessionStorage.getItem('_authToken'),
            'Content-type': 'application/json'
        };
        if (!requestData.comments) {
            requestData.comments = [];
        }
        let articleText = $("#article-content").val();
        let articleTitle = $("#article-title").val();
        requestData.comments.push({articleComment: articleText,articleTitle:articleTitle});
        
        let stringy = JSON.stringify(requestData);
        $.ajax({
            method: "PUT",
            url: kinveyArticleUrl  + requestData._id,
            headers: kinveyHeaders,
            data: stringy,
            success: editArticleSuccess,
            error:editArticleError
        });
        function editArticleSuccess(response) {
            showPopup('success', "Article successfully updated");
            redirectUrl("#/home");
        }
        function editArticleError(response) {
            showPopup('error', "You are not authorized to edit this article!");
        }
    }
    deleteArticle(articleId) {
        let method = "DELETE";
        let requestUrl = this._baseServiceUrl + articleId;
        let headers = {};
        headers['Authorization'] = "Kinvey " + sessionStorage.getItem('_authToken');
        headers['Content-Type'] = "application/json";

        let requestData = {
            method: method,
            url: requestUrl,
            headers: headers
        };
        this._requester.delete(requestUrl, requestData,
            function success(response) {
                showPopup('success', "Article deleted successfully");
                redirectUrl("#/home");
            },
            function (response) {
                showPopup('error', "You are not authorized to delete this article");
            });
    }
}