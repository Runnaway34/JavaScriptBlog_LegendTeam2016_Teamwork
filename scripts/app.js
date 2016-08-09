$(function () {
    let baseUrl = "https://baas.kinvey.com";
    let appKey = "kid_HkUWjv0u";
    let appSecret = "bfeaef3d1d6a4361885d0db6ffa9bbad";
    var _guestCredentials = "603ccc72-ac11-405a-ba7d-958a07cb47b7.7Z/IKmJNLO3XoXjPeL9jRB6pSDCQWOTvTnSiFlOjavE=";


    let selector = ".main-content";
    let mainContentSelector = ".wrapper";

    let authService = new AuthorizationService(baseUrl, appKey, appSecret, _guestCredentials);
    authService.initAuthorizationType("Kinvey");

    let requester = new Requester(authService);
    
    let homeView = new HomeView(mainContentSelector);
    let homeController = new HomeController(homeView,requester,baseUrl,appKey);

    let userView = new UserView(selector,mainContentSelector);
    let userController = new UserController(userView,requester,baseUrl,appKey);

    // let articleView = new ArticleView(selector,mainContentSelector);
    // let articleController = new ArticleController(selector,mainContentSelector);


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
    
    onRoute("#/", function () {
        if(!authService.isLoggedIn()) {
            homeController.showGuestPage();
        }
        else {
            homeController.showUserPage();
        }
    });

    // onRoute("#/post-:id", function () {
    //     // Create a redirect to one of the recent posts...
    //     let top = $("#post-" + this.params['id']).position().top;
    //     $(window).scrollTop(top);
    // });

    onRoute("#/login", function () {
        userController.showLoginPage(authService.isLoggedIn());
    });

    onRoute("#/register", function () {
        userController.showRegisterPage(authService.isLoggedIn())
    });

    onRoute("#/logout", function () {
        // Logout the current user...
        userController.logout();
    });

    // onRoute('#/posts/create', function () {
    //     // Show the new post page...
    //     let data = {
    //         fullname:sessionStorage['fullname']
    //     };
    //     postController.showCreatePostPage(data,authService.isLoggedIn());
    // });

    bindEventHandler('login', function (event, data) {
        // Login the user...
        userController.login(data);
    });

    bindEventHandler('register', function (event, data) {
        // Register a new user...
        userController.register(data);
    });

    // bindEventHandler('createPost', function (event, data) {
    //     // Create a new post...
    //     postController.createPost(data)
    // });

    run('#/');

    

});