'use strict';

// Declare app level module which depends on views, and components
angular.module('cnc-myapp', [
    // external components
    'ui.router',
    'ngResource',
    'ngCookies',

    //shared
    'cnc-myapp.directives',
    'cnc-myapp.filters',
    'cnc-myapp.services',
    'cnc-myapp.functions',

    // vistas
    'cnc-myapp.login',
    'cnc-myapp.home',
    'cnc-myapp.product',
    'cnc-myapp.logs',

    // routing
    'cnc-myapp.routing'
]);