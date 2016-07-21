/**
 * Created by simba on 29/05/15.
 */
angular
    .module('QC')
    .directive('lenderList', function (Product) {
        return {
            restrict: 'AE',
            replace: 'true',
            templateUrl: '/templates/lender-list.html',
            link: function ($scope, element, attributes) {

                Product.get({productType: attributes.lenderList}).$promise.then(function (feed) {
                    $scope.lenderList = feed.data;
                    console.log($scope.lenderList);

                }, function (error) {
                    console.log(error);
                });

            }
        };
    });