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
    createArticle(requestData) {
        if (requestData.title.length < 10) {
            showPopup('error', "Article title must consist of at least 10 symbols.");
            return;
        }
        if (requestData.content.length < 50) {
            showPopup('error', "Article content must consist of at least 50 symbols.");
            return;
        }

        let requestUrl = this._baseServiceUrl;
        this._requester.post(requestUrl, requestData,
            function success() {
                showPopup('success', "You have successfully created a new article.");
                redirectUrl("#/home");
            },
            function error() {
                showPopup('error', "An error has occurred while attempting to create a new article");
            });
    }

    sortArticleByTag(tagName) {
        let _that = this;
        let articleByTag = [];
        let requestUrl = this._baseServiceUrl;
        let sportTag = tagName;
        this._requester.get(requestUrl,
            function success(data) {

                data.sort(function (elem1, elem2) {
                    let date1 = new Date(elem1._kmd.ect);
                    let date2 = new Date(elem2._kmd.ect);
                    return date2 - date1;
                });

                for (let i = 0; i < data.length; i++) {
                    if (data[i].tag == sportTag) {
                        articleByTag.push(data[i]);
                    }
                }

                _that._articleView.showSortedArticle(articleByTag);
            },
            function error() {
                showPopup('error', "Error loading posts!");
            }
        );
    }

    getArticle() {
        let articleid = sessionStorage.getItem('id');
        let requestUrl = this._baseServiceUrl + articleid;

        this._requester.get(requestUrl,
            function success(selectedArticle) {
                triggerEvent('loadComments', selectedArticle);
            },
            function error() {
                showPopup('error', "Error loading this article!");
            });
    }

    showSelectedArticle(article) {
        
        this._articleView.showSelectedArticle(article);
    }

    editArticlePage(data) {
        let requestUrl = this._baseServiceUrl + data;
        let _that = this;
        this._requester.get(requestUrl,
            function success(data) {
                showPopup('success', "Success loading this article!");
                _that._articleView.showEditArticlePage(data);
            },
            function error() {
                showPopup('error', "Error loading this article!");
            });
    }

    editArticle(requestData) {
        if (requestData.title.length < 10) {
            showPopup('error', "Article title must consist of at least 10 symbols.");
            return;
        }

        if (requestData.content.length < 50) {
            showPopup('error', "Article content must consist of at least 50 symbols.");
            return;
        }
        let requestUrl = this._baseServiceUrl + requestData._id;
        let articleTitle = requestData.title;
        let articleText = requestData.content;
        let articleAuthor = requestData.author;
        let date = requestData.date;
        let tagName = requestData.tag;

        let request = {
            title: articleTitle,
            content: articleText,
            author: articleAuthor,
            date: date,
            tag:tagName
        };
        this._requester.put(requestUrl, request,
            function success() {
                showPopup("success", "You have successfully edited this article");
                redirectUrl("#/home")
            },
            function error() {
                showPopup("error", "You don't have authorization to edit this article");
            });
    }

    deleteArticle(articleId) {

        let requestUrl = this._baseServiceUrl + articleId;

        let headers = {};
        headers['Authorization'] = "Kinvey " + sessionStorage.getItem('_authToken');
        headers['Content-Type'] = "application/json";
        let requestData = {
            headers: headers
        };

        this._requester.delete(requestUrl, requestData,
            function success(response) {
                showPopup("success", "You have successfully deleted this article");
                redirectUrl("#/home")
            },
            function error(response) {
                showPopup("error", "You don't have authorization to delete this article");
            });
    }
}