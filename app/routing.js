'use strict';

// Declare app level module which depends on views, and components
angular.module('cnc-myapp.routing', [])
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('login', {
                url: "/login",
                templateUrl: "pages/login/login.html",
                controller :  "LoginCtrl"
            })

            .state('home', {
                url: "/home",
                templateUrl: "pages/home/home.html",
                controller :  "HomeCtrl"
            })

            .state('home.product', {
                url: "/product",
                templateUrl: "pages/product/product.html",
                controller :  "ProductCtrl"
            })

            .state('home.logs', {
                url: "/logs",
                templateUrl: "pages/logs/logs.html",
                controller: "LogsCtrl"
            });


        // las direciones desconocidas se redirigen al la primera vista que es /login
        $urlRouterProvider.otherwise("/login");
    });