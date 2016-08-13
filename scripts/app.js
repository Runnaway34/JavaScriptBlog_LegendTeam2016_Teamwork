$(function () {
    let baseUrl = "https://baas.kinvey.com";
    let appKey = "kid_ryNU2M9d";
    let appSecret = "9a10f2ce7f3b476e85e647ba672d5bb2";
    var _guestCredentials = "d99412bd-d47f-43b2-893e-2662d2b0b11e.WqAhBgnI6gT/vr4edgmgvRHD3IDNWDeXvLofWYN+nO4=";
    
    
    let selector = ".nav";
    let mainContentSelector = ".main-content";
    
    let authService = new AuthorizationService(baseUrl, appKey, appSecret, _guestCredentials);
    authService.initAuthorizationType("Kinvey");
    
    let requester = new Requester(authService);
    
    let homeView = new HomeView(selector,mainContentSelector);
    let homeController = new HomeController(homeView,requester,baseUrl,appKey);
    
    
    let userView = new UserView(selector,mainContentSelector);
   
    let userController = new UserController(userView,requester,baseUrl,appKey);
    
    let articleView = new ArticleView(selector,mainContentSelector);
    
    let articleController = new ArticleController(articleView, requester, baseUrl, appKey);
    
    let commentView = new CommentView(selector,mainContentSelector);
    
    let commentController = new CommentController(commentView, requester, baseUrl, appKey);


    initEventServices();
    
    onRoute("#/home", function () {
        if(!authService.isLoggedIn()) {
            homeController.showGuestPage();
        }
        else {
            homeController.showUserPage();
        }
    });

    onRoute("#/create/comment/", function (context) {
        commentController.showCreateCommentPage(context.params.id);
    });

    onRoute("#/register", function () {
        userController.showRegisterPage(authService.isLoggedIn())
    });

    onRoute("#/audio", function () {
        homeController.showAudioPage();
    });

    onRoute("#/video", function () {
        homeController.showVideoPage();
    });

    onRoute("#/about", function () {
        homeView.showAboutPage(authService.isLoggedIn());
    });
    
    onRoute("#/login", function () {
        userController.showLoginPage(authService.isLoggedIn());
    });
    
    onRoute("#/logout", function () {
        userController.logout();
    });

    onRoute('#/articles/create', function () {
        // Show the new post page...
        let data = {
            fullname:sessionStorage['fullname']
        };
        articleController.showCreateArticlePage(data,authService.isLoggedIn());
    });
    
    
    //
    // onRoute('#/create/comment', function () {
    //     articleController.showCreateCommentPage();
    // });

   
    
    bindEventHandler('login', function (event, data) {
        // Login the user...
        userController.login(data);
    });
    
    bindEventHandler('register', function (event, data) {
        // Register a new user...
        userController.register(data);
    });
    
    bindEventHandler('createArticle', function (event, data) {
        // Create a new post...
        articleController.createArticle(data);
    });
    
    bindEventHandler('createComment', function (event, data) {
        // console.debug(data);
        commentController.createComment(data);
    });


    run('#/home');
});