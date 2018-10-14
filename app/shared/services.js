angular.module('cnc-myapp.services', [])
    //Servicio que contiene los métodos que usamos para obtener datos.
    .service('ProductsService', function () {
        this.postBusquedaProductos = function () {
            var urlBusquedaProductos = "http://localhost/PruebaCuponatic/web/app_dev.php/api/productscript/busquedas/"
            return urlBusquedaProductos;
        },
        this.getBusquedaLogs = function () {
            var urlBusquedaLogs = "http://localhost/PruebaCuponatic/web/app_dev.php/api/productscript/estadisticas/"
            return urlBusquedaLogs;
        },
        this.postValidateOauth = function(){
            var urlValidateOauth = "http://localhost/PruebaCuponatic/web/app_dev.php/oauth/v2/token";
            return urlValidateOauth;
        }
        return this;
    })

    .service('AuthenticationService',
        ['Base64','$http', '$cookieStore','$rootScope','$resource', 'ProductsService',
        function(Base64, $http, $cookieStore,$rootScope, $resource, ProductsService){

            this.getSecret = function(){
                return "4ok2x70rlfokc8g0wws8c8kwcokw80k44sg48goc0ok4w0so0k";
            },
            this.getClientId = function(){
                return "1_3bcbxd9e24g0gk4swg0kwgcwg4o8k8g4g888kwc44gcc0gwwk4";
            },
            this.validateOauth = function() {
                var ValidateUser = $resource( ProductsService.postValidateOauth(),{}, 
                    {'validate' : {method: 'POST', isArray:false}}
                );
                return ValidateUser;
            },

            this.SetCredentials= function (username, password, token) {                
                var authdata = Base64.encode(username + ':' + password);
                var tokenUsuario = token;
                $rootScope.globals = {
                    currentUser: {
                        username: username,
                        authdata: authdata,
                        token : tokenUsuario
                    }
                };
                                
                $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata; // jshint ignore:line
                $http.defaults.headers.common['Authorization'] = 'Bearer ' + token; // jshint ignore:line
                $cookieStore.put('globals', $rootScope.globals);
            },

            this.ClearCredentials = function () {
                $rootScope.globals = {};
                $cookieStore.remove('globals');
                $http.defaults.headers.common.Authorization = 'Basic ';
                $http.defaults.headers.common['Authorization'] = 'Bearer ';
            }
            return this;
    }])

    .service('Base64', function () {

        var keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
        return {
            encode: function (input) {
                var output = "";
                var chr1, chr2, chr3 = "";
                var enc1, enc2, enc3, enc4 = "";
                var i = 0;

                do {
                    chr1 = input.charCodeAt(i++);
                    chr2 = input.charCodeAt(i++);
                    chr3 = input.charCodeAt(i++);

                    enc1 = chr1 >> 2;
                    enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                    enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                    enc4 = chr3 & 63;

                    if (isNaN(chr2)) {
                        enc3 = enc4 = 64;
                    } else if (isNaN(chr3)) {
                        enc4 = 64;
                    }

                    output = output +
                        keyStr.charAt(enc1) +
                        keyStr.charAt(enc2) +
                        keyStr.charAt(enc3) +
                        keyStr.charAt(enc4);
                    chr1 = chr2 = chr3 = "";
                    enc1 = enc2 = enc3 = enc4 = "";
                } while (i < input.length);

                return output;
            },

            decode: function (input) {
                var output = "";
                var chr1, chr2, chr3 = "";
                var enc1, enc2, enc3, enc4 = "";
                var i = 0;

                // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
                var base64test = /[^A-Za-z0-9\+\/\=]/g;
                if (base64test.exec(input)) {
                    window.alert("There were invalid base64 characters in the input text.\n" +
                        "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
                        "Expect errors in decoding.");
                }
                input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

                do {
                    enc1 = keyStr.indexOf(input.charAt(i++));
                    enc2 = keyStr.indexOf(input.charAt(i++));
                    enc3 = keyStr.indexOf(input.charAt(i++));
                    enc4 = keyStr.indexOf(input.charAt(i++));

                    chr1 = (enc1 << 2) | (enc2 >> 4);
                    chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                    chr3 = ((enc3 & 3) << 6) | enc4;

                    output = output + String.fromCharCode(chr1);

                    if (enc3 != 64) {
                        output = output + String.fromCharCode(chr2);
                    }
                    if (enc4 != 64) {
                        output = output + String.fromCharCode(chr3);
                    }

                    chr1 = chr2 = chr3 = "";
                    enc1 = enc2 = enc3 = enc4 = "";

                } while (i < input.length);

                return output;
            }
        };
    });