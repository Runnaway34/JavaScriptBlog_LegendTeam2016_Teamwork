$(function () {
    let baseUrl = "https://baas.kinvey.com";
    let appKey = "kid_ryNU2M9d";
    let appSecret = "9a10f2ce7f3b476e85e647ba672d5bb2";
    var _guestCredentials = "1498ac7a-e6e5-45fb-92e0-7397637796f1.FhAjNPMvLND61KtIQilimGUKD1nwJzgLICdFnkNCIZ0=";


    let selector = ".main-content";
    let mainContentSelector = ".wrapper";

    let authService = new AuthorizationService(baseUrl, appKey, appSecret, _guestCredentials);
    authService.initAuthorizationType("Kinvey");

    let requester = new Requester(authService);
    
    let homeView = new HomeView(mainContentSelector);
    let homeController = new HomeController(homeView,requester,baseUrl,appKey);

    let userView = new UserView(selector,mainContentSelector);
    let userController = new UserController(userView,requester,baseUrl,appKey);

    let articleView = new ArticleView(mainContentSelector);
    let articleController = new ArticleController(articleView, requester, baseUrl, appKey);
    

    // Do not change this!--->
   // ->  This is for HomePage!
   //  -> homeView.showGuestPage();
   //  -> homeController.showGuestPage();
    // homeController.showUserPage();
    // ->  This is for Login Page!
    // -> let userView = new UserView(selector,mainContentSelector);
    // -> userView.showLoginPage();
    // -> This is for RegisterPage!
   // let userView = new UserView(selector,mainContentSelector);
    //userView.showLoginPage();
    //userView.showRegisterPage();

    initEventServices();
    
    onRoute("#/home", function () {
        if(!authService.isLoggedIn()) {
            homeController.showGuestPage();
        }
        else {
            homeController.showUserPage();
        }
    });

    onRoute("#/about", function () {
        homeView.showAboutPage;
    });
    
    onRoute("#/register", function () {
        userController.showRegisterPage(authService.isLoggedIn())
    });

    onRoute("#/login", function () {
        userController.showLoginPage(authService.isLoggedIn());
    });

    onRoute("#/logout", function () {
        userController.logout();
    });
    
    
    
    
    
    
    // onRoute("#/post-:id", function () {
    //     // Create a redirect to one of the recent posts...
    //     let top = $("#post-" + this.params['id']).position().top;
    //     $(window).scrollTop(top);
    // });

    onRoute('#/articles/create', function () {
        // Show the new post page...
        let data = {
            fullname:sessionStorage['fullname']
        };
        articleController.showCreateArticlePage(data,authService.isLoggedIn());
    });
    
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

    run('#/home');

    

});