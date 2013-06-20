var appAuth = angular.module('appAuth',['ui.date','ui.bootstrap','ui.keypress']);

//Routing
appAuth.config(function ($routeProvider) {
    $routeProvider
        .when('/',
            {
                controller: 'appController',
                templateUrl: 'partials/home.html'
            })
        .otherwise({ redirectTo: '/' });
});

//Handle all HTTP calls to server
appAuth.factory('appSession', function($http){
    return {
       	login: function(email, pass) {
        	return $http.post('server/authenticate.php',{
        		type		: 'Login',
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
//controller
appAuth.controller('appController', function($scope, appSession){

	$scope.isAuth = false;
    $scope.usrEmail = "Hello";
    $scope.usrPass = "password";
    $scope.updateLogin = function(data, status, headers, config){
        console.log(data);
        if(data['status'])
            $scope.isAuth = true;
    };
    $scope.loginSuccess = function(data, status, headers, config){
        console.log(data);
        if(data['status'])
            $scope.isAuth = true;
    };
    $scope.displayError = function(data, status, headers, config){
        console.log(data);
        
    };
    $scope.logoutSuccess = function(data, status, headers, config){        
         console.log(data);
         if(data['status'])
            $scope.isAuth = false;
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
    
	
});