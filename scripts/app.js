$(function () {
    let baseUrl = "https://baas.kinvey.com";
    let appKey = "kid_ryNU2M9d";
    let appSecret = "9a10f2ce7f3b476e85e647ba672d5bb2";
    let _guestCredentials = "d99412bd-d47f-43b2-893e-2662d2b0b11e.WqAhBgnI6gT/vr4edgmgvRHD3IDNWDeXvLofWYN+nO4=";
    
    let authService = new AuthorizationService(baseUrl, appKey, appSecret, _guestCredentials);
        authService.initAuthorizationType("Kinvey");
    
    let requester = new Requester(authService);
    let selector = ".nav";
    let mainContentSelector = ".main-content";
    
    let homeView = new HomeView(selector,mainContentSelector);
    let homeController = new HomeController(homeView,requester,baseUrl,appKey);

    let userView = new UserView(selector,mainContentSelector);
    let userController = new UserController(userView,requester,baseUrl,appKey);
    
    let commentView = new CommentView(selector,mainContentSelector);
    let commentController = new CommentController(commentView, requester, baseUrl, appKey);
    
    let articleView = new ArticleView(selector,mainContentSelector);
    let articleController = new ArticleController(articleView, requester, baseUrl, appKey);
  
    let imageView = new ImageView(selector,mainContentSelector);
    let imageController = new ImageController(imageView,requester,baseUrl,appKey);
    
    let audioView = new AudioView(selector,mainContentSelector);
    let audioController = new AudioController(audioView,requester,baseUrl,appKey);
    
    initEventServices();

    // onRoutes //
    
    onRoute("#/home", function () {
        if(!authService.isLoggedIn()) {
            homeController.showGuestPage();
        }
        else {
            homeController.showUserPage();
        }
    });

    onRoute("#/register", function () {
        userController.showRegisterPage(authService.isLoggedIn())
    });
    
    onRoute("#/audio", function () {
        audioController.showAudioPage();
    });
    
    onRoute("#/video", function () {
        homeController.showVideoPage(authService.isLoggedIn());
    });
    
    onRoute("#/images", function () {
        imageController.showImagesPage();
    });
    
    onRoute("#/about", function () {
        homeView.showAboutPage(authService.isLoggedIn());
    });
    
    onRoute("#/login", function () {
        userController.showLoginPage(authService.isLoggedIn());
    });
    
    onRoute('#/logout', function () {
        userController.logout();
    });

    onRoute('#/articles/create', function () {
        // Show the new post page...
        let data = {
            fullname:sessionStorage['fullname']
        };
        articleController.showCreateArticlePage(data, authService.isLoggedIn());
    });

    onRoute('#/create/comment/:id', function () {
       commentController.showCreateCommentPage(authService.isLoggedIn());
        sessionStorage.setItem('id', this.params['id']);
    });
    
    onRoute('#/article/:id', function () {
        sessionStorage.setItem('id', this.params['id']);
        articleController.getArticle();
    });
    
    onRoute("#/edit/article/", function (data) {
        let articleId  = data.params.id;
        articleController.showEditArticlePage(articleId);
    });

    onRoute('#/delete/article/', function (articleId) {
        articleController.deleteArticle(articleId.params.id);
    });
    
    // Event Handlers //

    bindEventHandler('register', function (event, data) {
        // Register a new user...
        userController.register(data);
    });

    bindEventHandler('login', function (event, data) {
        // Log user in...
        userController.login(data);
    });
    
    bindEventHandler('createArticle', function (event, data) {
        // Create a new article...
        articleController.createArticle(data);
    });

    bindEventHandler('createComment', function (event, data) {
        //  Create a new comment...
        commentController.createComment(data);
    });

    bindEventHandler('loadComments', function (event, data){
        // Creates a list of all comments
        commentController.loadComments(data);
    });

    bindEventHandler('postCommentList', function (event, data){
        // Post a list with all comments
        articleController.showSelectedArticle(data);
    });
    
    bindEventHandler('editArticle', function (event, data) {
        articleController.editArticle(data);
    });
    run('#/home');
});