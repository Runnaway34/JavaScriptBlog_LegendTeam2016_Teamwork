class CommentController {
    constructor(commentView, requester, baseServiceUrl, appKey) {
        this._commentView = commentView;
        this._requester = requester;
        this._appKey = appKey;
        this._baseServiceUrl = baseServiceUrl;
    }

    // createComment(requestData) {
    //     const kinveyBooksUrl =  this._baseServiceUrl + "/appdata/" + this._appKey + "/articles";
    //     const kinveyHeaders = {
    //         'Authorization': "Kinvey " + sessionStorage.getItem('_authToken'),
    //         'Content-type': 'application/json'
    //     };
    //
    //     if (!requestData.comments) {
    //         requestData.comments = [];
    //     }
    //     let commentText = $("#comment").val();
    //     requestData.comments.push({textComment: commentText});
    //     let stringy = JSON.stringify(requestData);
    //     $.ajax({
    //         method: "PUT",
    //         url: kinveyBooksUrl + '/' + requestData._id,
    //         headers: kinveyHeaders,
    //         data: stringy,
    //         success: addBookCommentSuccess
    //     });
    //     function addBookCommentSuccess(response) {
    //         showPopup('success', "Article successfully updated");
    //         redirectUrl("#/home");
    //     }
    // }
    // editComment(requestData) {
    //     const kinveyBooksUrl =  this._baseServiceUrl + "/appdata/" + this._appKey + "/articles";
    //     const kinveyHeaders = {
    //         'Authorization': "Kinvey " + sessionStorage.getItem('_authToken'),
    //         'Content-type': 'application/json'
    //     };
    //
    //     if (!requestData.comments) {
    //         requestData.comments = [];
    //     }
    //     let commentText = $("#comment").val();
    //     requestData.comments.push({textComment: commentText});
    //     let stringy = JSON.stringify(requestData);
    //     $.ajax({
    //         method: "PUT",
    //         url: kinveyBooksUrl + '/' + requestData._id,
    //         headers: kinveyHeaders,
    //         data: stringy,
    //         success: addBookCommentSuccess
    //     });
    //     function addBookCommentSuccess(response) {
    //         showPopup('success', "Article successfully updated");
    //         redirectUrl("#/home");
    //     }
    // }
    //
    // deleteArticle(id) {
    //     let method = "DELETE";
    //     let requestUrl = this._baseServiceUrl + "/appdata/" + this._appKey + "/articles/" + id;
    //     let headers = {};
    //     headers['Authorization'] = "Kinvey " + sessionStorage.getItem('_authToken');
    //     headers['Content-Type'] = "application/json";
    //    
    //     let requestData = {
    //         method: method,
    //         url: requestUrl,
    //         headers: headers
    //     };
    //     this._requester.delete(requestUrl, requestData,
    //         function success(response) {
    //             showPopup('success', "Article deleted successfully");
    //             redirectUrl("#/home");
    //         },
    //         function (response) {
    //             showPopup('error', "You are not authorized to delete this article");
    //         });
    // }
    showCreateCommentPage(articleId) {
        this._commentView.showCreateCommentPage(articleId);
    }
}
