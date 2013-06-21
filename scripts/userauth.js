var appAuth = angular.module('appAuth',['ui.date','ui.bootstrap','ui.keypress']);

//Routing
appAuth.config(function ($routeProvider) {
    $routeProvider
        .when('/',
            {
                controller: 'appController',
                templateUrl: 'partials/home.html'
            })
        .when('/page2',
            {
                controller: 'controllerPage2',
                templateUrl: 'partials/page2.html'
            })
        .otherwise({ redirectTo: '/' });
});

//Handle all HTTP calls to server
appAuth.factory('appSession', function($http){
    return {
       	login: function(email, pass) {
        	return $http.post('server/authenticate.php',{
        		type	: 'Login',
        		email	: email,
        		pass 	: pass
        	});
        },
        isAuth: function(){
            return $http.post('server/authenticate.php',{
                type        : 'isLogged'
            });
        },
        logout: function(){
            return $http.post('server/authenticate.php',{
                type        : 'Logout'
            });
        }
    }
});
appAuth.controller('controllerPage2', function($scope, $location, appSession){
    //$scope.isAuth = false;
    $scope.updateLogin = function(data, status, headers, config){
        console.log(data['status']);
        if(data['status']){
            console.log("Inside Success");
            $scope.alerts=[];
            $scope.isAuth = true;
        }
        else{
            console.log("Inside fail");
            $location.path('/');
        }
    };
    $scope.displayError = function(data, status, headers, config){
       
        console.log(data);
    };
    $scope.logout = function(){
        appSession.logout().success($scope.logoutSuccess).error($scope.displayError);
    };

    $scope.logoutSuccess = function(data, status, headers, config){        
         console.log(data);
         if(data['status']){
            $scope.isAuth = false;
            $location.path('/');
        }
    
    };
    init();
    function init(){
        console.log("Inside Initializer");
        appSession.isAuth().success($scope.updateLogin).error($scope.displayError);
    };
    $scope.homeClick = function(){
        $location.path('/');
    };
    $scope.nextpageClick = function(){
        $location.path('/page2');
    };
});
//controller
appAuth.controller('appController', function($scope, $location, appSession){

	$scope.isAuth      = false;
    $scope.usrEmail    = "Hello";
    $scope.usrPass     = "password";
    $scope.alerts      = [];
    $scope.updateLogin = function(data, status, headers, config){
        console.log(data);
        if(data['status']){
            $scope.alerts=[];
            $scope.isAuth = true;
        }
        else{
            $scope.alerts=[];
            $scope.alerts.push({type: 'error', msg: data['message']});
        }
    };
    $scope.loginSuccess = function(data, status, headers, config){
        console.log(data);
        if(data['status']){
            $scope.alerts=[];
            $scope.isAuth = true;
        }
        else{
            $scope.alerts=[];
            $scope.alerts.push({type: 'error', msg: data['message']});
        }

    };
    $scope.displayError = function(data, status, headers, config){
        $scope.alerts=[];
        $scope.alerts.push({type: 'error', msg: data['message']});
        console.log(data);
        
    };
    $scope.logoutSuccess = function(data, status, headers, config){        
         console.log(data);
         if(data['status']){
            $scope.alerts=[];
            $scope.isAuth = false;
        }
        else{
            $scope.alerts=[];
            $scope.alerts.push({type: 'error', msg: data['message']});
        }
    };
    $scope.authenticate = function(){
        appSession.login($scope.usrEmail, $scope.usrPass).success($scope.loginSuccess).error($scope.displayError);
    };
    $scope.logout = function(){
        appSession.logout().success($scope.logoutSuccess).error($scope.displayError);
    };
  	//Initializer
	init();
	function init(){
		appSession.isAuth().success($scope.updateLogin).error($scope.displayError);
	};
    $scope.homeClick = function(){
        $location.path('/');
    };
    $scope.nextpageClick = function(){
        console.log("Page 2 Click");
        $location.path('/page2');
    };
	
});