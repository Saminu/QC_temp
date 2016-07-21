/*global angular*/
/*jslint node: true */

'use strict';

angular.module('QC')
    .service('Product', function Product($resource, endpoint) {
        //return $resource(endpoint + '/api/product');
        return $resource(endpoint + '/:productType');
    });