class CommentController {
    constructor(commentView, requester, baseUrl, appKey) {
        this._commentView = commentView;
        this._requester = requester;
        this._appKey = appKey;
        this._baseServiceUrl = baseUrl + "/appdata/" + appKey + "/articles/";
    }

    createComment(requestData) {

        // if (requestData.content.length < 10) {
        //     showPopup('error', "Article content must consist of at least 10 symbols.");
        //     return;
        // }

        let requestUrl = this._baseServiceUrl;

        function getArticleById(id) {

            
            // let _that = this;
            // requestUrl =  + id;

            // let requestUrl = this._baseServiceUrl + "/appdata/" + this._appKey + "/articles/" + id;

            let article = null;
            this._requester.get(requestUrl,
                function success(data) {
                    article = data;
                },
                function error(data) {
                    showPopup('error', "Error loading posts!");
                }
            );
            return article;
        }
        let articleObj = getArticleById(requestData._id);
        console.debug(articleObj);
        if(!article.comment) {
            articleObj.comment = [];
        }
        articleObj.comment.push({})

        this._requester.put(requestUrl + requestData._id , requestData,
            function success(data) {

                showPopup('success', "You have successfully created a new article.");
                redirectUrl("#/home");
            },
            function error(data) {
                showPopup('error', "An error has occurred while attempting to create a new article");
            });
    }






    // createComment(requestData) {
    //
    //     if (requestData.content.length < 10) {
    //         showPopup('error', "Article content must consist of at least 10 symbols.");
    //         return;
    //     }
    //
    //     let requestUrl = this._baseServiceUrl;
    //
    //     function getArticleById(id) {
    //
    //         // let _that = this;
    //         // requestUrl =  + id;
    //
    //         let requestUrl = this._baseServiceUrl + "/appdata/" + this._appKey + "/articles/" + id;
    //
    //         let article = null;
    //         this._requester.get(requestUrl,
    //             function success(data) {
    //
    //                 article = data;
    //
    //             },
    //             function error(data) {
    //                 showPopup('error', "Error loading posts!");
    //             }
    //         );
    //         return article;
    //     }
    //     let articleObj = getArticleById(requestData._id);
    //
    //     this._requester.put(requestUrl + requestData._id , requestData,
    //         function success(data) {
    //
    //             showPopup('success', "You have successfully created a new article.");
    //             redirectUrl("#/home");
    //         },
    //         function error(data) {
    //             showPopup('error', "An error has occurred while attempting to create a new article");
    //         });
    // }

    showCreateCommentPage(articleId) {
        this._commentView.showCreateCommentPage(articleId);
    }

    editArticle(requestData) {


    }

    deteleArticle(requestData) {

    }
}