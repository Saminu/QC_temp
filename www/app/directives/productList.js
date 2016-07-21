/**
 * Created by simba on 29/05/15.
 */
angular
    .module('QC')
    .directive('productList', function (Product, $http) {
        return {
            restrict: 'AE',
            replace: 'true',
            templateUrl: '/templates/product-table.html',
            link: function ($scope, attributes) {

                $scope.getAprColspan = function (isMobile) {

                    var i, all = 0, mobile = 0;

                    for (i in $scope.feed.meta) {
                        if ($scope.feed.meta.hasOwnProperty(i)) {
                            if ($scope.feed.meta[i].isMobile !== undefined) {
                                all++;
                                if ($scope.feed.meta[i].isMobile) {
                                    mobile++;
                                }
                            }
                        }
                    }

                    return isMobile ? mobile : all;
                };

                $scope.getImgRowspan = function (useImage) {

                    if (useImage) {

                        for (i in $scope.feed.meta) {
                            if ($scope.feed.meta.w(i)) {
                                if ($scope.feed.meta[i].message !== undefined) {
                                    return 2;
                                }
                            }
                        }
                    }

                    return 1;
                };

                //Shuffle arrays in random
                var shuffleArray = function (array) {
                        var m = array.length, t, i;

                        // While there remain elements to shuffle
                        while (m) {
                            // Pick a remaining element…
                            i = Math.floor(Math.random() * m--);

                            // And swap it with the current element.
                            t = array[m];
                            array[m] = array[i];
                            array[i] = t;
                        }

                        return array;
                    },

                //querystring parameters
                    getQueryStringParameters = function (url) {
                        if (url == undefined) {
                            url = window.location.href;
                        }
                        var vars = {};
                        var p = url.replace(/[?&]+([^=&]+)=([^&]*)/gi,
                            function (m, key, value) {
                                vars[key.toLowerCase()] = decodeURIComponent(value);
                            });
                        return vars;
                    },
                    openXArray = [],
                    exclude,
                    beaconPixel = function (data) {
                        //run script from open x in the background
                        var image, imgtag, pixel;

                        image = data.slice(data.nthIndexOf("src", 2), data.indexOf("/div"));
                        image = image.replace(/_/g, '');
                        image = image.replace(/\\/g, '');
                        image = image.slice(image.indexOf("http"), image.indexOf("width"));

                        imgtag = document.createElement('IMG');
                        pixel = imgtag.src = image;

                        // return div
                        return (pixel);
                    };

                /*
                 function OpenXvalues calls Openx addserver requesting payload for specific zone, the returned payload value bannerid is used matched against response from Product.get call to QC backed, if there is a match then the pushed to openXArray.
                 final calls value added to new scope finalResult and passed onto dispaly product-table
                 */
                $scope.shortterm = true;

                // function to find the nth occurance of a string
                String.prototype.nthIndexOf = function (s, n) {
                    var i = -1;
                    while (n-- > 0 && -1 != (i = this.indexOf(s, i + 1)));
                    return i;
                };

                $scope.openXvalues = function (feed, counter) {
                    if (counter >= 50) {
                        return feed;
                    }
                    $http.get('//adtracker.quiddicompare.co.uk/www/delivery/ajs.php?zoneid=35&block=1&exclude=,bannerid:' + $scope.bannerid_exclude_list + '&charset=UTF-8&loc=http%3A//adtracker.quiddicompare.co.uk/www/admin/zone-invocation.php%3Faffiliateid%3D4%26zoneid%3D9&referer=http%3A//adtracker.quiddicompare.co.uk/www/admin/zone-invocation.php%3Faffiliateid%3D4%26zoneid%3D9&context=YjoyODh8&mmm_fo=1'
                    ).success(function (data) {
                            /*
                             beacon pixel function to fire when the calls from open-x are returned
                             */
                            beaconPixel(data);

                            result = data.slice(data.indexOf("href"), data.indexOf(">"));
                            result = result.replace(/_/g, '&');
                            //console.log(result);

                            openxUrl = result.replace(/\\/g, '');
                            openxUrl = openxUrl.slice(openxUrl.nthIndexOf("http", 1), data.indexOf("target"));
                            openxUrl = openxUrl.replace(/target='&blank'/g, '');
                            openxUrl = openxUrl.replace(/'/g, '');
                            //console.log(openxUrl);


                            qs = getQueryStringParameters(result);
                            if (qs.bannerid == undefined) {
                                return
                            }
                            //bannerid = qs.bannerid;

                            if ($scope.bannerid_exclude_list == undefined) {
                                $scope.bannerid_exclude_list = qs.bannerid;
                            } else {
                                $scope.bannerid_exclude_list += "," + qs.bannerid;
                            }
                            //build list of excludes
                            //excludeOb.data = bannerid + ',';

                            var matched = undefined;
                            // console.log('looking for bannerid ' + qs.bannerid);
                            for (var i = 0; i < feed.data.length; i++) {
                                if (feed.data[i].bannerid == qs.bannerid) {
                                    //  console.log('matched bannerid ' + qs.bannerid);
                                    matched = i;

                                    // add/overwrite the hrefs
                                    feed.data[i].sam = true;
                                    openXArray.push(feed.data[i]);
                                    feed.data[i].openxurl = openxUrl;
                                    //console.log(feed.data[i].openxurl);

                                    break;
                                }
                            }
                            if (matched) {
                                feed.data.splice(matched, 1);
                                //console.log(feed.data);

                                //hide second display if product type is shortterm to prevent dupes
                                if (feed.data[0].productType == "Short Term Loans") {
                                    $scope.shortterm = false;
                                }
                            }
                            $scope.openXvalues(feed, counter += 1);
                            //Populate after the calls are being made
                        }).finally(function () {
                            $scope.finalResult = openXArray;
                        });
                };

                /*
                 Call to QC backed with the resulting response added to $scope.feed and passed on to OpenXvalue value function
                 */

                Product.get({productType: attributes.productList}).$promise.then(function (feed) {
                    $scope.feed = feed;

                    $scope.openXvalues(feed, 1);

                    shuffleArray($scope.feed.data);


                }, function (error) {
                    console.log(error);
                });

                //openX-filter
                $scope.filterOpenX = function (item) {
                    return (openXArray.indexOf(item.bannerid) == -1);
                };

                $scope.adrollPixel = function () {
                    try {
                        __adroll.record_user({"adroll_segments": "bd93e3a9"})
                    } catch (err) {
                    }
                };

            }
        };
    })
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
