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
        if (tequestData.title.length < 10) {
            showPopup('error', "Article title must consist of atleast 10 symbols.");
            return;
        }
        
        if (requestData.content.length < 50) {
            showPopup('error', "Article content must consist of atleast 50 symbols.");
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
    
    
}