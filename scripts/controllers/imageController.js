class ImageController {
    constructor(imageView, requester, baseUrl, appKey) {
        this._imageView = imageView;
        this._requester = requester;
        this._appKey = appKey;
        this._baseServiceUrl = baseUrl + "/appdata/" + appKey + "/gallery/";
    }

    showImagesPage() {
        let _that = this;
        let imageBaseUrl = this._baseServiceUrl;
        this._requester.get(imageBaseUrl,
            function success(data) {
                _that._imageView.showImagesPage(data);
                
            },
            
            function error(data) {
                showPopup('error', "Error");
            });
        
       
    }
}