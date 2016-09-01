class HomeController {
    constructor(homeView, requester, baseServiceUrl, appKey) {
        this._homeView = homeView;
        this._requester = requester;
        this._baseServiceUrl = baseServiceUrl;
        this._appKey = appKey;
    }

    showGuestPage() {
        
        let _that = this;
        let recentPosts = [];
        let requestUrl = this._baseServiceUrl + "/appdata/" + this._appKey + "/articles";
        this._requester.get(requestUrl,
            function success(data) {
                let currentId = 1;
                data.sort(function (elem1, elem2) {
                    let date1 = new Date(elem1._kmd.ect);
                    let date2 = new Date(elem2._kmd.ect);
                    return date2 - date1;
                });
                
                for (let i = 0; i < data.length && i < 3; i++) {
                    data[i].postId = currentId;
                    currentId++;
                    recentPosts.push(data[i]);
                }
                _that._homeView.showGuestPage(recentPosts, data);
            },
            function error() {
                showPopup('error', "Error loading posts!");
            }
        );
        
    }
    

    showUserPage() {
        let _that = this;
        let requestUrl = this._baseServiceUrl + "/appdata/" + this._appKey + "/articles";

        this._requester.get(requestUrl,
            function success(data) {
                data.sort(function (elem1, elem2) {
                    let date1 = new Date(elem1._kmd.ect);
                    let date2 = new Date(elem2._kmd.ect);
                    return date2 - date1;
                });
                _that._homeView.showUserPage(data);
            },
            function error(data) {
                showPopup('error', "Error loading posts!");
            }
        );
    }
    
    showVideoPage() {
        let _that = this;
        $('onclick',function () {
            _that._homeView.showVideoPage();
        })
    }

    showAboutPage() {
        let _that = this;
        $('onclick',function () {
            _that._homeView.showAboutPage();
        })
    }
    
}