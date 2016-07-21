/**
 * Created by simba on 18/12/14.
 */

// app.js
// create our angular app and inject ngAnimate and ui-router
// =============================================================================
angular.module('formApp', ['ngAnimate', 'ui.router', 'angulartics', 'angulartics.google.analytics', 'ng.shims.placeholder'])

    .factory('$exceptionHandler', function () {
        return function errorCatcherHandler(exception, cause) {
            console.error(exception.stack);
            Raven.captureException(exception);
        };
    })
    .factory('errorHttpInterceptor', ['$q', function ($q) {
        return {
            responseError: function responseError(rejection) {
                Raven.captureException(new Error('HTTP response error'), {
                    extra: {
                        config: rejection.config,
                        status: rejection.status
                    }
                });
                return $q.reject(rejection);
            }
        };
    }])
    .config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push('errorHttpInterceptor');
    }])

    .directive('mortgageForm', function () {
        return {
            //restrict: 'AE',
            //replace: 'true',
            templateUrl: '/form/form.html'
            //template: 'Name: {{customer.name}} Address: {{customer.address}}'
        }
    });

//.factory('$exceptionHandler', ['$window', '$log',
//    function ($window, $log) {
//        if ($window.Raven) {
//            //console.log('Using the RavenJS exception handler.');
//            //Raven.config('YOUR_PUBLIC_DSN').install();
//            Raven.config('https://1afb1d3a2d7141519c638708c53ed4e2@monitor.quiddiportal.com/13', {
//            }).install();
//            return function (exception, cause) {
//                $log.error.apply($log, arguments);
//                Raven.captureException(exception);
//            };
//        } else {
//            console.log('Using the default logging exception handler.');
//            return function (exception, cause) {
//                $log.error.apply($log, arguments);
//            };
//        }
//    }
//])