'use strict';

angular.module('QC')
    .service('Contact', function Contact($resource, endpoint) {
        return $resource(endpoint + '/api/contact', null, { post: { method: 'POST' }});
    })
    .service('OpenX', ['$http', function ($http) {
    return {
        bannerID: function () {
            return $http.get('http://adtracker.quiddicompare.co.uk/www/delivery/ajs.php?zoneid=9&amp;block=1&amp;exclude=,bannerid:288,&amp;charset=UTF-8&amp;loc=http%3A//adtracker.quiddicompare.co.uk/www/admin/zone-invocation.php%3Faffiliateid%3D4%26zoneid%3D9&amp;referer=http%3A//adtracker.quiddicompare.co.uk/www/admin/zone-invocation.php%3Faffiliateid%3D4%26zoneid%3D9&context=YjoyODh8&amp;mmm_fo=1')
        }
    }
}]);