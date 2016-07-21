/**
 * Created by simba on 05/02/15.
 */
angular.module('formApp')
    .config(['$httpProvider', function ($httpProvider) {
        $httpProvider.defaults.withCredentials = false;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
        //$httpProvider.defaults.headers.common['Cache-Control'] = 'no-cache';
    }])

    .config(function ($provide) {
        $provide.decorator('$uiViewScroll', function ($delegate) {
            return function (uiViewElement) {
                $('html,body').animate({
                    scrollTop: uiViewElement.offset().top
                }, 500);
            };
        });
    })

    .directive("modalShow", function () {
        return {
            restrict: "A",
            scope: {
                modalVisible: "="
            },
            link: function (scope, element, attrs) {

                //Hide or show the modal
                scope.showModal = function (visible) {
                    if (visible) {
                        element.modal("show");
                    }
                    else {
                        element.modal("hide");
                    }
                };

                //Check to see if the modal-visible attribute exists
                if (!attrs.modalVisible) {

                    //The attribute isn't defined, show the modal by default
                    scope.showModal(true);

                }
                else {

                    //Watch for changes to the modal-visible attribute
                    scope.$watch("modalVisible", function (newValue, oldValue) {
                        scope.showModal(newValue);
                    });

                    //Update the visible value when the dialog is closed through UI actions (Ok, cancel, etc.)
                    element.bind("hide.bs.modal", function () {
                        scope.modalVisible = false;
                        if (!scope.$$phase && !scope.$root.$$phase)
                            scope.$apply();
                    });

                }

            }
        };

    })

    .controller('formController', ['$scope', '$http', '$interval', function ($scope, $http, $interval) {

        $scope.formData = {};
        $scope.formData.ccj = false;
        $scope.formData.missed_credit = false;
        $scope.formData.consolidate_debt = true;
        $scope.mobilenumber = false;

        //delete console.log

        //process postcode
        //function to process postcode search
        $scope.getPostcode = function () {
            //$http.get("https://form.quiddiportal.com/v1.0/api/postcode?extended=1&postcode=" + $scope.formData.postcode)
            $http.get("https://form.quiddiportal.com/v1.0/api/postcode?postcode=" + $scope.formData.postcode)
                .success(function (data) {
                    $scope.Postcodes = data;
                    console.log($scope.Postcodes.house_number);
                })
                .error(function () {
                });
        };

        $scope.expandAddress = function () {
            document.getElementById('selectadd').size = '5';
            document.getElementById('selectadd').style.height = "200px";
            document.getElementById('selectadd').firstChild.style.display = "none";
        };

        $scope.compressAddress = function () {
            document.getElementById('selectadd').size = '1';
            document.getElementById('selectadd').style.height = "46px";
        };

        // function to process mobile no
        $scope.checkMobileno = function () {
            $http.get("https://form.quiddiportal.com/v1.0/api/mobile?data=" + $scope.formData.mobile_number + "&cc=GB")
                .success(function (data) {
                    $scope.mobilenoCheck = data.is_valid;
                    //       $scope.mobileCall = data.is_mobile;
                    console.log($scope.mobilenoCheck);

                    if ($scope.mobilenoCheck == true) {
                        $scope.mobilenumber = true;
                    }
                    if ($scope.mobilenoCheck == false) {
                        $scope.mobilenumber = false;
                    }
                    // console.log($scope.mobilenoCheck);
                    //    $scope.mobileNumber = mobileNumber;
                    //          return data.is_mobile
                })
                .error(function () {

                })
        };


        //validation
        $scope.validator = {
            start: null,
            amount: null,
            profile: null,
            status: null,
            //           identity:null,
            personal: null,
            finish: null,

            isValid: function () {
                return this.start;
            }
        };

        // Store all of our form data in this object

        $scope.amounts = [
            {str: '£25,000 - £29,999', value: '25000'},
            {str: '£30,000 - £39,999', value: '30000'},
            {str: '£40,000 - £49,999', value: '40000'},
            {str: '£50,000 - £59,999', value: '50000'},
            {str: '£60,000 - £69,999', value: '60000'},
            {str: '£70,000 - £79,999', value: '70000'},
            {str: '£80,000 - £89,999', value: '80000'},
            {str: '£90,000 - £99,999', value: '90000'},
            {str: '£100,000 - £199,999', value: '100000'},
            {str: '£110,000 - £119,999', value: '110000'},
            {str: '£120,000 - £129,999', value: '120000'},
            {str: '£130,000 - £139,999', value: '130000'},
            {str: '£140,000 - £149,999', value: '140000'},
            {str: '£150,000 - £159,999', value: '150000'},
            {str: '£160,000 - £169,999', value: '160000'},
            {str: '£170,000 - £179,999', value: '170000'},
            {str: '£180,000 - £189,999', value: '180000'},
            {str: '£190,000 - £199,999', value: '190000'},
            {str: '£200,000 - £209,999', value: '200000'},
            {str: '£210,000 - £219,999', value: '210000'},
            {str: '£220,000 - £229,999', value: '220000'},
            {str: '£230,000 - £239,999', value: '230000'},
            {str: '£240,000 - £249,999', value: '240000'},
            {str: '£250,000 - £259,999', value: '250000'},
            {str: '£260,000 - £269,999', value: '260000'},
            {str: '£270,000 - £279,999', value: '270000'},
            {str: '£280,000 - £289,999', value: '280000'},
            {str: '£290,000 - £299,999', value: '290000'},
            {str: '£300,000 - £309,999', value: '300000'},
            {str: '£310,000 - £319,999', value: '310000'},
            {str: '£320,000 - £329,999', value: '320000'},
            {str: '£330,000 - £339,999', value: '330000'},
            {str: '£340,000 - £349,999', value: '340000'},
            {str: '£350,000 - £359,999', value: '350000'},
            {str: '£360,000 - £369,999', value: '360000'},
            {str: '£370,000 - £379,999', value: '370000'},
            {str: '£380,000 - £389,999', value: '380000'},
            {str: '£390,000 - £399,999', value: '390000'},
            {str: '£400,000 - £409,999', value: '400000'},
            {str: '£400,000 - £409,999', value: '400000'},
            {str: '£410,000 - £419,999', value: '410000'},
            {str: '£420,000 - £429,999', value: '420000'},
            {str: '£430,000 - £439,999', value: '430000'},
            {str: '£440,000 - £449,999', value: '440000'},
            {str: '£450,000 - £459,999', value: '450000'},
            {str: '£460,000 - £469,999', value: '460000'},
            {str: '£470,000 - £479,999', value: '470000'},
            {str: '£480,000 - £489,999', value: '480000'},
            {str: '£490,000 - £499,999', value: '490000'},
            {str: '£500,000 - £519,999', value: '500000'},
            {str: '£520,000 - £539,999', value: '520000'},
            {str: '£540,000 - £559,999', value: '540000'},
            {str: '£560,000 - £579,999', value: '560000'},
            {str: '£580,000 - £599,999', value: '580000'},
            {str: '£600,000 - £619,999', value: '600000'},
            {str: '£620,000 - £639,999', value: '620000'},
            {str: '£640,000 - £659,999', value: '640000'},
            {str: '£660,000 - £679,999', value: '660000'},
            {str: '£680,000 - £699,999', value: '680000'},
            {str: '£700,000 - £719,999', value: '700000'},
            {str: '£720,000 - £739,999', value: '720000'},
            {str: '£740,000 - £759,999', value: '740000'},
            {str: '£760,000 - £779,999', value: '760000'},
            {str: '£780,000 - £799,999', value: '780000'},
            {str: '£800,000 - £819,999', value: '800000'},
            {str: '£820,000 - £839,999', value: '820000'},
            {str: '£840,000 - £859,999', value: '840000'},
            {str: '£860,000 - £879,999', value: '860000'},
            {str: '£880,000 - £899,999', value: '880000'},
            {str: '£900,000 - £919,999', value: '900000'},
            {str: '£920,000 - £939,999', value: '920000'},
            {str: '£940,000 - £959,999', value: '940000'},
            {str: '£960,000 - £979,999', value: '960000'},
            {str: '£980,000 - £999,999', value: '980000'},
            {str: 'Over £1,000,000', value: '1000000'}
        ];

        $scope.pvalues = [
            {str: '£50,000 - £54,999', value: '50000'},
            {str: '£55,000 - £59,999', value: '55000'},
            {str: '£60,000 - £64,999', value: '60000'},
            {str: '£65,000 - £69,999', value: '65000'},
            {str: '£70,000 - £74,999', value: '70000'},
            {str: '£75,000 - £79,999', value: '75000'},
            {str: '£80,000 - £84,999', value: '80000'},
            {str: '£85,000 - £89,999', value: '85000'},
            {str: '£90,000 - £94,999', value: '90000'},
            {str: '£95,000 - £99,999', value: '95000'},
            {str: '£100,000 - £104,999', value: '100000'},
            {str: '£105,000 - £109,999', value: '105000'},
            {str: '£110,000 - £114,999', value: '110000'},
            {str: '£110,000 - £114,999', value: '110000'},
            {str: '£115,000 - £119,999', value: '115000'},
            {str: '£120,000 - £129,999', value: '120000'},
            {str: '£130,000 - £139,999', value: '130000'},
            {str: '£140,000 - £149,999', value: '140000'},
            {str: '£150,000 - £159,999', value: '150000'},
            {str: '£160,000 - £169,999', value: '160000'},
            {str: '£170,000 - £179,999', value: '170000'},
            {str: '£180,000 - £189,999', value: '180000'},
            {str: '£190,000 - £199,999', value: '190000'},
            {str: '£200,000 - £209,999', value: '200000'},
            {str: '£210,000 - £219,999', value: '210000'},
            {str: '£220,000 - £229,999', value: '220000'},
            {str: '£230,000 - £239,999', value: '230000'},
            {str: '£240,000 - £249,999', value: '240000'},
            {str: '£250,000 - £259,999', value: '250000'},
            {str: '£260,000 - £269,999', value: '260000'},
            {str: '£270,000 - £279,999', value: '270000'},
            {str: '£280,000 - £289,999', value: '280000'},
            {str: '£290,000 - £299,999', value: '290000'},
            {str: '£300,000 - £309,999', value: '300000'},
            {str: '£310,000 - £319,999', value: '310000'},
            {str: '£320,000 - £329,999', value: '320000'},
            {str: '£330,000 - £339,999', value: '330000'},
            {str: '£340,000 - £349,999', value: '340000'},
            {str: '£350,000 - £359,999', value: '350000'},
            {str: '£360,000 - £369,999', value: '360000'},
            {str: '£370,000 - £379,999', value: '370000'},
            {str: '£380,000 - £389,999', value: '380000'},
            {str: '£390,000 - £399,999', value: '390000'},
            {str: '£400,000 - £409,999', value: '400000'},
            {str: '£400,000 - £409,999', value: '400000'},
            {str: '£410,000 - £419,999', value: '410000'},
            {str: '£420,000 - £429,999', value: '420000'},
            {str: '£430,000 - £439,999', value: '430000'},
            {str: '£440,000 - £449,999', value: '440000'},
            {str: '£450,000 - £459,999', value: '450000'},
            {str: '£460,000 - £469,999', value: '460000'},
            {str: '£470,000 - £479,999', value: '470000'},
            {str: '£480,000 - £489,999', value: '480000'},
            {str: '£490,000 - £499,999', value: '490000'},
            {str: '£500,000 - £519,999', value: '500000'},
            {str: '£520,000 - £539,999', value: '520000'},
            {str: '£540,000 - £559,999', value: '540000'},
            {str: '£560,000 - £579,999', value: '560000'},
            {str: '£580,000 - £599,999', value: '580000'},
            {str: '£600,000 - £619,999', value: '600000'},
            {str: '£620,000 - £639,999', value: '620000'},
            {str: '£640,000 - £659,999', value: '640000'},
            {str: '£660,000 - £679,999', value: '660000'},
            {str: '£680,000 - £699,999', value: '680000'},
            {str: '£700,000 - £719,999', value: '700000'},
            {str: '£720,000 - £739,999', value: '720000'},
            {str: '£740,000 - £759,999', value: '740000'},
            {str: '£760,000 - £779,999', value: '760000'},
            {str: '£780,000 - £799,999', value: '780000'},
            {str: '£800,000 - £819,999', value: '800000'},
            {str: '£820,000 - £839,999', value: '820000'},
            {str: '£840,000 - £859,999', value: '840000'},
            {str: '£860,000 - £879,999', value: '860000'},
            {str: '£880,000 - £899,999', value: '880000'},
            {str: '£900,000 - £919,999', value: '900000'},
            {str: '£920,000 - £939,999', value: '920000'},
            {str: '£940,000 - £959,999', value: '940000'},
            {str: '£960,000 - £979,999', value: '960000'},
            {str: '£980,000 - £999,999', value: '980000'},
            {str: 'Over £1,000,000', value: '1000000'}
        ];

        $scope.mtypes = [
            {option: 'Remortgage', value: 'remortgage'},
            {option: 'First Time Buyer', value: 'first_time_buyer'},
            {option: 'Buy to Let', value: 'buy_to_let'},
            {option: 'Right to buy', value: 'right_to_buy'},
            {option: 'New purchase', value: 'new_purchase'}
        ];

        $scope.estatuses = [
            {option: 'Employed', value: 'employed'},
            {option: 'Self Employed', value: 'self_employed'},
            {option: 'Retired', value: 'retired'},
            {option: 'Unemployed', value: 'unemployed'}
        ];

        $scope.bankrupts = [
            {option: 'No', value: 'no'},
            {option: 'Not in past 7 years', value: '7'},
            {option: 'Less than a year', value: '0'},
            {option: '1-2 years ago', value: '1'},
            {option: '2-5 years ago', value: '2'},
            {option: '5-7 years ago', value: '5'}
        ];

        $scope.titles = [
            {option: 'Mr', value: 'mr'},
            {option: 'Mrs', value: 'mrs'},
            {option: 'Miss', value: 'miss'},
            {option: 'Ms', value: 'ms'},
            {option: 'Dr', value: 'dr'},
            {option: 'Other', value: 'none'}
        ];

        $scope.callbacktimes = [
            {option: 'Daytime', value: 'daytime'},
            {option: 'Evening', value: 'evening'},
            {option: 'Anytime', value: 'anytime'}
        ];

        $scope.formData.bankrupt = $scope.bankrupts[0];


//year arrays
        var year = [],
            n = new Date().getFullYear(),
            lowEnd = 1900,
            highEnd = n - 18;

        for (var i = lowEnd; i <= highEnd; i++) {
            year.unshift(i);
        }

        $scope.days = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'];
        $scope.months = [
            {str: 'Jan', num: '01'},
            {str: 'Feb', num: '02'},
            {str: 'Mar', num: '03'},
            {str: 'Apr', num: '04'},
            {str: 'May', num: '05'},
            {str: 'Jun', num: '06'},
            {str: 'Jul', num: '07'},
            {str: 'Aug', num: '08'},
            {str: 'Sep', num: '09'},
            {str: 'Oct', num: '10'},
            {str: 'Nov', num: '11'},
            {str: 'Dec', num: '12'}
        ];
        $scope.years = year;


        String.prototype.replaceAll = function (str1, str2, ignore) {
            return this.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g, "\\$&"), (ignore ? "gi" : "g")), (typeof(str2) == "string") ? str2.replace(/\$/g, "$$$$") : str2);
        };


// function to process the form
        $scope.processForm = function (signupform) {
            $scope.formPost = {};
            //loan_amount = $scope.formData.loan_amount.value;
            //property_value = $scope.formData.property_value.value;
            //county = $scope.formData.residential_address.county;
            //street = $scope.formData.residential_address.street;
            //house_number =  $scope.formData.residential_address.house_number;
            //town = $scope.formData.residential_address.town;
            //dob = $scope.formData.db.year + "-" + $scope.formData.db.month.num + "-" + $scope.formData.db.day;
            //employment_status = $scope.formData.employment_status.value;
            //bankrupt = $scope.formData.bankrupt.value;

            if ($scope.formData.loan_amount.value == !undefined) {
                $scope.formPost.loan_amount = $scope.formData.loan_amount.value;
            }

            if ($scope.formData.property_value.value !== undefined) {
                $scope.formPost.property_value = $scope.formData.property_value.value;
            }
            //if postcode call has been made
            //if ($scope.formData.residential_address.county !== undefined){
            //    $scope.formPost.county = $scope.formData.residential_address.county;
            //}

            //if ($scope.formData.residential_address.street !== undefined){
            //    $scope.formPost.street = $scope.formData.residential_address.street;
            //}

            //if ($scope.formData.residential_address.house_number !== undefined){
            //    $scope.formPost.house_number = $scope.formData.residential_address.house_number;
            //}

            //if ($scope.formData.residential_address.town !== undefined){
            //    $scope.formPost.town = $scope.formData.residential_address.town;
            //}

            if ($scope.formData.db.year && $scope.formData.db.month.num && $scope.formData.db.day !== undefined) {
                $scope.formPost.dob = dob = $scope.formData.db.year + "-" + $scope.formData.db.month.num + "-" + $scope.formData.db.day;
            }

            if ($scope.formData.employment_status.value !== undefined) {
                $scope.formPost.employment_status = $scope.formData.employment_status.value;
            }

            if ($scope.formData.bankrupt.value !== undefined) {
                $scope.formPost.bankrupt = $scope.formData.bankrupt.value;
            }

            ////format formData before sending
            //$scope.formData.loan_amount = $scope.formData.loan_amount.value;
            //$scope.formData.property_value = $scope.formData.property_value.value;
            //
            //$scope.formData.county = $scope.formData.residential_address.county;
            //    $scope.formData.street = $scope.formData.residential_address.street;
            //    $scope.formData.house_number = $scope.formData.residential_address.house_number;
            //    $scope.formData.town = $scope.formData.residential_address.town;
            //    $scope.formData.dob = $scope.formData.db.year + "-" + $scope.formData.db.month.num + "-" + $scope.formData.db.day;
            $scope.formData.employment_status = $scope.formData.employment_status.value;
            $scope.formData.product_type = $scope.formData.product_type.value;
            $scope.formData.bankrupt = $scope.formData.bankrupt.value;

            delete $scope.formData.residential_address
            delete $scope.formData.db
            delete $scope.formData.db

            $scope.formPost = $scope.formData;

            console.log($scope.formData);
            console.log($scope.formPost);

            // build variables before sending
            var add = {
                method: 'POST',
                //url: 'https://form.quiddiportal.com/v1.0/submit',
                url: 'https://google.com',

                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                },

                data: $scope.formData
            };
//            if (signupform.$valid) {
            $http(add).
                success(function (data) {
                    console.log(data)
                })
                .error(function (data) {
                    console.log(data)
                });
//            }

        }

    }])

    .controller('mortgageController', ['$scope', '$http', '$log', '$timeout', '$analytics', function ($scope, $http, $log, $timeout, $analytics) {

        //object holding payload
        $scope.formData = {};

        //mobile number validation
        $scope.mobilenumber = false;

        $scope.remortgageSelected = false;
        $scope.selectaddShow = false;
        $scope.houseShow = false;

        //apply button default class and value
        //$scope.appTxt = 'Get a Free Quote';
        $scope.appTxt = 'Request a Call Back';
        $scope.formstatus = 'btn btn-block btn-lg btn-warning form-apply';
        $scope.submitted = false;

        //modal dislay directive
        $scope.showDialog = false;
        //for reseting form field
        $scope.quoteSent = true;
        $scope.master = {};

        /*
         display postcode filed if the value selected is remortgage
         */
        //$scope.showPostcode = function () {
        //    if ($scope.formData.product_type.value == 'remortgage') {
        //        $scope.remortgageSelected = true;
        //    } else {
        //        $scope.remortgageSelected = false;
        //    }
        //};

        /*
         function to process postcode search
         */
        $scope.getPostcode = function () {
            $http.get("https://form.quiddiportal.com/v1.0/api/postcode?postcode=" + $scope.formData.postcode)
                .success(function (data) {
                    $scope.Postcodes = data;
                    //console.log($scope.Postcodes);
                    if ($scope.Postcodes.count > 1) {
                        $scope.selectaddShow = true;
                        $scope.houseShow = true;
                    } else {
                        $scope.selectaddShow = false;
                        $scope.houseShow = false;
                    }
                })
                .error(function () {
                });
        };

        /*
         function to expnad address filed
         */
        $scope.expandAddress = function (e) {
            //e.stopPropagation();

            if (screen.width > 768) {
                document.getElementById('selectadd').size = '5';
                document.getElementById('selectadd').style.height = "200px";
            }
            document.getElementById('selectadd').firstChild.style.display = "none";
        };

        /*
         Function to compress address field select
         */
        $scope.compressAddress = function (e) {
            //e.stopPropagation();
            document.getElementById('selectadd').size = '1';
            document.getElementById('selectadd').style.height = "46px";
            $scope.selectaddShow = false;
        };
        /*
         function to process mobile no
         */
        $scope.checkMobileno = function () {
            $http.get("https://form.quiddiportal.com/v1.0/api/telephone?data=" + $scope.formData.telephone + "&cc=GB")
                .success(function (data) {
                    $scope.mobilenoCheck = data.is_valid;
                    //console.log(data.pretty);

                    if ($scope.mobilenoCheck == true) {
                        $scope.mobilenumber = true;
                        $scope.formData.telephone = data.pretty;
                    } else {
                        $scope.mobilenumber = false;
                    }
                })
                .error(function () {

                })
        };

        /*
         Reset form and set scope quotesent to false
         */
        $scope.reset = function () {
            $scope.formData = angular.copy($scope.master);
            $scope.quoteSent = false;
        };

        /*
         function to serialise formData as urlencoded request
         */

        $scope.serializeData = function (data) {

            // If this is not an object, defer to native stringification.
            if (!angular.isObject(data)) {

                return ( ( data == null ) ? "" : data.toString() );
            }

            var buffer = [];

            // Serialize each key in the object.
            for (var name in data) {

                if (!data.hasOwnProperty(name)) {

                    continue;

                }

                var value = data[name];

                buffer.push(
                    encodeURIComponent(name) +
                    "=" +
                    encodeURIComponent(( value == null ) ? "" : value)
                );

            }

            // Serialize the buffer and clean it up for transportation.
            var source = buffer
                    .join("&")
                    .replace(/%20/g, "+")
                ;

            return ( source );

        };

        // Store all of our form data in this object
        $scope.amounts = [
            {str: '£25,000 - £29,999', value: '25000'},
            {str: '£30,000 - £39,999', value: '30000'},
            {str: '£40,000 - £49,999', value: '40000'},
            {str: '£50,000 - £59,999', value: '50000'},
            {str: '£60,000 - £69,999', value: '60000'},
            {str: '£70,000 - £79,999', value: '70000'},
            {str: '£80,000 - £89,999', value: '80000'},
            {str: '£90,000 - £99,999', value: '90000'},
            {str: '£100,000 - £109,999', value: '100000'},
            {str: '£110,000 - £119,999', value: '110000'},
            {str: '£120,000 - £129,999', value: '120000'},
            {str: '£130,000 - £139,999', value: '130000'},
            {str: '£140,000 - £149,999', value: '140000'},
            {str: '£150,000 - £159,999', value: '150000'},
            {str: '£160,000 - £169,999', value: '160000'},
            {str: '£170,000 - £179,999', value: '170000'},
            {str: '£180,000 - £189,999', value: '180000'},
            {str: '£190,000 - £199,999', value: '190000'},
            {str: '£200,000 - £209,999', value: '200000'},
            {str: '£210,000 - £219,999', value: '210000'},
            {str: '£220,000 - £229,999', value: '220000'},
            {str: '£230,000 - £239,999', value: '230000'},
            {str: '£240,000 - £249,999', value: '240000'},
            {str: '£250,000 - £259,999', value: '250000'},
            {str: '£260,000 - £269,999', value: '260000'},
            {str: '£270,000 - £279,999', value: '270000'},
            {str: '£280,000 - £289,999', value: '280000'},
            {str: '£290,000 - £299,999', value: '290000'},
            {str: '£300,000 - £309,999', value: '300000'},
            {str: '£310,000 - £319,999', value: '310000'},
            {str: '£320,000 - £329,999', value: '320000'},
            {str: '£330,000 - £339,999', value: '330000'},
            {str: '£340,000 - £349,999', value: '340000'},
            {str: '£350,000 - £359,999', value: '350000'},
            {str: '£360,000 - £369,999', value: '360000'},
            {str: '£370,000 - £379,999', value: '370000'},
            {str: '£380,000 - £389,999', value: '380000'},
            {str: '£390,000 - £399,999', value: '390000'},
            {str: '£400,000 - £409,999', value: '400000'},
            {str: '£400,000 - £409,999', value: '400000'},
            {str: '£410,000 - £419,999', value: '410000'},
            {str: '£420,000 - £429,999', value: '420000'},
            {str: '£430,000 - £439,999', value: '430000'},
            {str: '£440,000 - £449,999', value: '440000'},
            {str: '£450,000 - £459,999', value: '450000'},
            {str: '£460,000 - £469,999', value: '460000'},
            {str: '£470,000 - £479,999', value: '470000'},
            {str: '£480,000 - £489,999', value: '480000'},
            {str: '£490,000 - £499,999', value: '490000'},
            {str: '£500,000 - £519,999', value: '500000'},
            {str: '£520,000 - £539,999', value: '520000'},
            {str: '£540,000 - £559,999', value: '540000'},
            {str: '£560,000 - £579,999', value: '560000'},
            {str: '£580,000 - £599,999', value: '580000'},
            {str: '£600,000 - £619,999', value: '600000'},
            {str: '£620,000 - £639,999', value: '620000'},
            {str: '£640,000 - £659,999', value: '640000'},
            {str: '£660,000 - £679,999', value: '660000'},
            {str: '£680,000 - £699,999', value: '680000'},
            {str: '£700,000 - £719,999', value: '700000'},
            {str: '£720,000 - £739,999', value: '720000'},
            {str: '£740,000 - £759,999', value: '740000'},
            {str: '£760,000 - £779,999', value: '760000'},
            {str: '£780,000 - £799,999', value: '780000'},
            {str: '£800,000 - £819,999', value: '800000'},
            {str: '£820,000 - £839,999', value: '820000'},
            {str: '£840,000 - £859,999', value: '840000'},
            {str: '£860,000 - £879,999', value: '860000'},
            {str: '£880,000 - £899,999', value: '880000'},
            {str: '£900,000 - £919,999', value: '900000'},
            {str: '£920,000 - £939,999', value: '920000'},
            {str: '£940,000 - £959,999', value: '940000'},
            {str: '£960,000 - £979,999', value: '960000'},
            {str: '£980,000 - £999,999', value: '980000'},
            {str: 'Over £1,000,000', value: '1000000'}
        ];

        $scope.pvalues = [
            {str: '£50,000 - £54,999', value: '50000'},
            {str: '£55,000 - £59,999', value: '55000'},
            {str: '£60,000 - £64,999', value: '60000'},
            {str: '£65,000 - £69,999', value: '65000'},
            {str: '£70,000 - £74,999', value: '70000'},
            {str: '£75,000 - £79,999', value: '75000'},
            {str: '£80,000 - £84,999', value: '80000'},
            {str: '£85,000 - £89,999', value: '85000'},
            {str: '£90,000 - £94,999', value: '90000'},
            {str: '£95,000 - £99,999', value: '95000'},
            {str: '£100,000 - £104,999', value: '100000'},
            {str: '£105,000 - £109,999', value: '105000'},
            {str: '£110,000 - £114,999', value: '110000'},
            {str: '£110,000 - £114,999', value: '110000'},
            {str: '£115,000 - £119,999', value: '115000'},
            {str: '£120,000 - £129,999', value: '120000'},
            {str: '£130,000 - £139,999', value: '130000'},
            {str: '£140,000 - £149,999', value: '140000'},
            {str: '£150,000 - £159,999', value: '150000'},
            {str: '£160,000 - £169,999', value: '160000'},
            {str: '£170,000 - £179,999', value: '170000'},
            {str: '£180,000 - £189,999', value: '180000'},
            {str: '£190,000 - £199,999', value: '190000'},
            {str: '£200,000 - £209,999', value: '200000'},
            {str: '£210,000 - £219,999', value: '210000'},
            {str: '£220,000 - £229,999', value: '220000'},
            {str: '£230,000 - £239,999', value: '230000'},
            {str: '£240,000 - £249,999', value: '240000'},
            {str: '£250,000 - £259,999', value: '250000'},
            {str: '£260,000 - £269,999', value: '260000'},
            {str: '£270,000 - £279,999', value: '270000'},
            {str: '£280,000 - £289,999', value: '280000'},
            {str: '£290,000 - £299,999', value: '290000'},
            {str: '£300,000 - £309,999', value: '300000'},
            {str: '£310,000 - £319,999', value: '310000'},
            {str: '£320,000 - £329,999', value: '320000'},
            {str: '£330,000 - £339,999', value: '330000'},
            {str: '£340,000 - £349,999', value: '340000'},
            {str: '£350,000 - £359,999', value: '350000'},
            {str: '£360,000 - £369,999', value: '360000'},
            {str: '£370,000 - £379,999', value: '370000'},
            {str: '£380,000 - £389,999', value: '380000'},
            {str: '£390,000 - £399,999', value: '390000'},
            {str: '£400,000 - £409,999', value: '400000'},
            {str: '£400,000 - £409,999', value: '400000'},
            {str: '£410,000 - £419,999', value: '410000'},
            {str: '£420,000 - £429,999', value: '420000'},
            {str: '£430,000 - £439,999', value: '430000'},
            {str: '£440,000 - £449,999', value: '440000'},
            {str: '£450,000 - £459,999', value: '450000'},
            {str: '£460,000 - £469,999', value: '460000'},
            {str: '£470,000 - £479,999', value: '470000'},
            {str: '£480,000 - £489,999', value: '480000'},
            {str: '£490,000 - £499,999', value: '490000'},
            {str: '£500,000 - £519,999', value: '500000'},
            {str: '£520,000 - £539,999', value: '520000'},
            {str: '£540,000 - £559,999', value: '540000'},
            {str: '£560,000 - £579,999', value: '560000'},
            {str: '£580,000 - £599,999', value: '580000'},
            {str: '£600,000 - £619,999', value: '600000'},
            {str: '£620,000 - £639,999', value: '620000'},
            {str: '£640,000 - £659,999', value: '640000'},
            {str: '£660,000 - £679,999', value: '660000'},
            {str: '£680,000 - £699,999', value: '680000'},
            {str: '£700,000 - £719,999', value: '700000'},
            {str: '£720,000 - £739,999', value: '720000'},
            {str: '£740,000 - £759,999', value: '740000'},
            {str: '£760,000 - £779,999', value: '760000'},
            {str: '£780,000 - £799,999', value: '780000'},
            {str: '£800,000 - £819,999', value: '800000'},
            {str: '£820,000 - £839,999', value: '820000'},
            {str: '£840,000 - £859,999', value: '840000'},
            {str: '£860,000 - £879,999', value: '860000'},
            {str: '£880,000 - £899,999', value: '880000'},
            {str: '£900,000 - £919,999', value: '900000'},
            {str: '£920,000 - £939,999', value: '920000'},
            {str: '£940,000 - £959,999', value: '940000'},
            {str: '£960,000 - £979,999', value: '960000'},
            {str: '£980,000 - £999,999', value: '980000'},
            {str: 'Over £1,000,000', value: '1000000'}
        ];

        $scope.mtypes = [
            {option: 'Buy To Let', value: 'buy_to_let'},
            {option: 'Buy to Let Remortgage', value: 'buy_to_let_remortgage'},
            {option: 'First Time Buyer', value: 'first_time_buyer'},
            {option: 'New Purchase', value: 'new_purchase'},
            {option: 'Remortgage', value: 'remortgage'},
            {option: 'Right To Buy', value: 'right_to_buy'}
        ];

        $scope.titles = [
            {option: 'Mr', value: 'mr'},
            {option: 'Mrs', value: 'mrs'},
            {option: 'Miss', value: 'miss'},
            {option: 'Ms', value: 'ms'},
            {option: 'Dr', value: 'dr'},
            {option: 'Other', value: 'other'}
        ];


        String.prototype.replaceAll = function (str1, str2, ignore) {
            return this.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g, "\\$&"), (ignore ? "gi" : "g")), (typeof(str2) == "string") ? str2.replace(/\$/g, "$$$$") : str2);
        };


// function to process the form
        $scope.processForm = function (mortgageForm) {
            $scope.submitted = true;

            if (mortgageForm.$valid && $scope.mobilenumber) {
                $scope.isProcessing = true;

                $scope.appTxt = 'Sending';
                $scope.formstatus = 'btn btn-block btn-lg btn-warning form-apply-progress';

                //format formData before sending
                $scope.formData.mortgage_amount = $scope.formData.mortgage_amount.value;
                $scope.formData.property_value = $scope.formData.property_value.value;
                $scope.formData.mortgage_purpose = $scope.formData.mortgage_purpose.value;
                $scope.formData.x_tokenid = "55770c4316619a8e35e31b7e";
                $scope.formData.x_tokenname = "quiddicompare";

                /*
                 Check to see if postcode has been touched before adding it to formData
                 */
                if (mortgageForm.current_postcode.$dirty) {
                    /*
                     Check to see if select add has been touched before creating county, street, house number and town
                     */
                    if (mortgageForm.selectadd.$dirty) {
                        //console.log("postcode detected");
                        $scope.formData.county = $scope.formData.residential_address.county;
                        $scope.formData.street = $scope.formData.residential_address.street;
                        $scope.formData.house_number = $scope.formData.residential_address.house_number;
                        $scope.formData.town = $scope.formData.residential_address.town;
                        $scope.formData.residential_address = $scope.formData.residential_address.address;

                    }
                }

                if (mortgageForm.title.$dirty) {
                    /*
                     Check to see if title has been touched before creating title inside title.formData
                     */
                    $scope.formData.title = $scope.formData.title.value;
                }

                //console.log($scope.serializeData($scope.formData));
                //$scope.formData = $scope.serializeData($scope.formData);
                //console.log($scope.formData);
                //console.log($.param($scope.formData));
                //console.log($scope.serializeData($scope.formData));

                var add = {
                    method: 'POST',
                    //url: 'https://www.google.co.uk/',
                    //url: 'https://as.quiddiportal.com/v1.0/offer/mortgage/back_on_track',
                    url: 'https://as.quiddiportal.com/v1.0/offer/mortgage',
                    headers: {
                        //'Content-Type': 'application/json; charset=utf-8'
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    //transformRequest: transformRequestAsFormPost,
                    data: $scope.serializeData($scope.formData)
                    //data: $scope.formData
                    //data: $.param ($scope.formData)
                };

                //form posted to url endpoint
                $http(add).
                    success(function (data) {
                        //console.log(data);
                        //disable button to prevent multiple post
                        $scope.isProcessing = false;

                        //event tracking
                        $analytics.eventTrack('event', {category: 'Mortgage', label: $scope.formData.mortgage_purpose});
                        //console.log($scope.formData.mortgage_purpose);

                        //if form sent successfully, wait for five 5 seconds and reset page
                        if (data.success = true)
                            $scope.appTxt = 'Quote Sent';
                        $scope.formstatus = 'btn btn-block btn-lg btn-warning form-apply-success';
                        $timeout(function () {
                            $scope.showDialog = true;
                            $scope.reset();
                        }, 1000);

                        //if (data.succes = false) {
                        //    $scope.appTxt = 'Quote Not Sent';
                        //    $scope.formstatus = 'btn btn-block btn-lg btn-danger form-apply-success';
                        //}

                        ////if (data.success = false){
                        //    console.log("Time to kick in the delay and reset foam");
                        //    //$scope.resetDelay = $timeout(function() {
                        //    //    $scope.reset();
                        //    //}, 250);
                        //}

                        /*
                         Delay for one second and call reset function
                         */
                    })
                    .error(function (data) {
                        //console.log(data);
                        //$scope.appTxt = 'Quote Sent';


                    })
                    //.finally(function (data) {
                    //    //$scope.appTxt = 'Quote Sent';
                    //    //$scope.formstatus = 'btn btn-block btn-lg btn-warning form-apply-success';
                    //});

            } else {
                //$log.error('Form is not valid');
                //mortgageForm.$valid = false;
            }
        };

    }])

    .controller('SecondCController', ['$scope', '$http', '$log', '$timeout', '$analytics', function ($scope, $http, $log, $timeout, $analytics) {

        //object holding payload
        $scope.formData = {};

        //mobile number validation
        $scope.mobilenumber = false;

        $scope.remortgageSelected = false;
        $scope.selectaddShow = false;
        $scope.houseShow = false;

        //apply button default class and value
        $scope.appTxt = 'Request a Call Back';
        $scope.formstatus = 'btn btn-block btn-lg btn-warning form-apply';
        $scope.submitted = false;

        //modal dislay directive
        $scope.showDialog = false;
        //for reseting form field
        $scope.quoteSent = true;
        $scope.master = {};
        $scope.ShowMortgageBalance = false;
        $scope.ShowPropertyValue = false;

        /*
         display postcode filed if the value selected is remortgage
         */
        //$scope.showPostcode = function () {
        //    if ($scope.formData.product_type.value == 'remortgage') {
        //        $scope.remortgageSelected = true;
        //    } else {
        //        $scope.remortgageSelected = false;
        //    }
        //};

        /*
         function to process postcode search
         */
        $scope.getPostcode = function () {
            $http.get("https://form.quiddiportal.com/v1.0/api/postcode?postcode=" + $scope.formData.postcode)
                .success(function (data) {
                    $scope.Postcodes = data;
                    //console.log($scope.Postcodes);
                    if ($scope.Postcodes.count > 1) {
                        $scope.selectaddShow = true;
                        $scope.houseShow = true;
                    } else {
                        $scope.selectaddShow = false;
                        $scope.houseShow = false;
                    }
                })
                .error(function () {
                });
        };

        /*
         function to expnad address filed
         */
        $scope.expandAddress = function (e) {
            //e.stopPropagation();

            if (screen.width > 768) {
                document.getElementById('selectadd').size = '5';
                document.getElementById('selectadd').style.height = "200px";
            }
            document.getElementById('selectadd').firstChild.style.display = "none";
        };

        /*
         Function to compress address field select
         */
        $scope.compressAddress = function (e) {
            //e.stopPropagation();
            document.getElementById('selectadd').size = '1';
            document.getElementById('selectadd').style.height = "46px";
            $scope.selectaddShow = false;
        };
        /*
         function to process mobile no
         */
        $scope.checkMobileno = function () {
            $http.get("https://form.quiddiportal.com/v1.0/api/telephone?data=" + $scope.formData.telephone + "&cc=GB")
                .success(function (data) {
                    $scope.mobilenoCheck = data.is_valid;
                    //console.log(data.pretty);

                    if ($scope.mobilenoCheck == true) {
                        $scope.mobilenumber = true;
                        $scope.formData.telephone = data.pretty;
                    } else {
                        $scope.mobilenumber = false;
                    }
                })
                .error(function () {

                })
        };

        /*
         Reset form and set scope quotesent to false
         */
        $scope.reset = function () {
            $scope.formData = angular.copy($scope.master);
            $scope.quoteSent = false;
        };

        /*
         function to serialise formData as urlencoded request
         */

        $scope.serializeData = function (data) {

            // If this is not an object, defer to native stringification.
            if (!angular.isObject(data)) {

                return ( ( data == null ) ? "" : data.toString() );
            }

            var buffer = [];

            // Serialize each key in the object.
            for (var name in data) {

                if (!data.hasOwnProperty(name)) {

                    continue;

                }

                var value = data[name];

                buffer.push(
                    encodeURIComponent(name) +
                    "=" +
                    encodeURIComponent(( value == null ) ? "" : value)
                );

            }

            // Serialize the buffer and clean it up for transportation.
            var source = buffer
                    .join("&")
                    .replace(/%20/g, "+")
                ;

            return ( source );

        };

        // Store all of our form data in this object
        $scope.amounts = [
            {str: '£1,000 - £1,500', value: '1000'},
            {str: '£2,000 - £2,500', value: '2000'},
            {str: '£3,000 - £3,500', value: '3000'},
            {str: '£4,000 - £4,500', value: '4000'},
            {str: '£5,000 - £5,500', value: '5000'},
            {str: '£6,000 - £6,500', value: '6000'},
            {str: '£7,000 - £7,500', value: '7000'},
            {str: '£8,000 - £8,500', value: '8000'},
            {str: '£9,000 - £9,999', value: '9000'},
            {str: '£10,000 - £10,999', value: '10000'},
            {str: '£11,000 - £11,999', value: '11000'},
            {str: '£12,000 - £12,999', value: '12000'},
            {str: '£13,000 - £13,999', value: '13000'},
            {str: '£14,000 - £14,999', value: '14000'},
            {str: '£15,000 - £15,999', value: '15000'},
            {str: '£16,000 - £16,999', value: '16000'},
            {str: '£17,000 - £17,999', value: '17000'},
            {str: '£18,000 - £18,999', value: '18000'},
            {str: '£19,000 - £19,999', value: '19000'},
            {str: '£20,000 - £22,499', value: '20000'},
            {str: '£22,500 - £24,999', value: '22500'},
            {str: '£25,000 - £27,499', value: '25000'},
            {str: '£27,500 - £29,999', value: '27000'},
            {str: '£30,000 - £32,499', value: '30000'},
            {str: '£32,500 - £34,999', value: '32000'},
            {str: '£35,000 - £37,499', value: '35000'},
            {str: '£37,500 - £39,999', value: '37000'},
            {str: '£40,000 - £42,499', value: '40000'},
            {str: '£42,500 - £42,499', value: '42000'},
            {str: '£45,000 - £47,499', value: '45000'},
            {str: '£47,500 - £49,999', value: '47000'},
            {str: '£50,000 - £54,999', value: '50000'},
            {str: '£55,000 - £59,999', value: '55000'},
            {str: '£60,000 - £64,999', value: '60000'},
            {str: '£65,000 - £69,999', value: '65000'},
            {str: '£70,000 - £74,999', value: '70000'},
            {str: '£75,000 - £79,999', value: '75000'},
            {str: '£80,000 - £84,999', value: '80000'},
            {str: '£85,000 - £89,999', value: '85000'},
            {str: '£90,000 - £94,999', value: '90000'},
            {str: '£95,000 - £99,999', value: '95000'},
            {str: '£100,000 - £109,999', value: '100000'},
            {str: '£110,000 - £119,999', value: '110000'},
            {str: '£120,000 - £129,999', value: '120000'},
            {str: '£130,000 - £139,999', value: '130000'},
            {str: '£140,000 - £149,999', value: '140000'},
            {str: '£150,000 - £159,999', value: '150000'},
            {str: '£160,000 - £169,999', value: '160000'},
            {str: '£170,000 - £179,999', value: '170000'},
            {str: '£180,000 - £189,999', value: '180000'},
            {str: '£190,000 - £199,999', value: '190000'},
            {str: '£200,000 - £200,000+', value: '200000'}
            //{str: '£210,000 - £219,999', value: '210000'},
            //{str: '£220,000 - £229,999', value: '220000'},
            //{str: '£230,000 - £239,999', value: '230000'},
            //{str: '£240,000 - £249,999', value: '240000'},
            //{str: '£250,000 - £259,999', value: '250000'},
            //{str: '£260,000 - £269,999', value: '260000'},
            //{str: '£270,000 - £279,999', value: '270000'},
            //{str: '£280,000 - £289,999', value: '280000'},
            //{str: '£290,000 - £299,999', value: '290000'},
            //{str: '£300,000 - £309,999', value: '300000'},
            //{str: '£310,000 - £319,999', value: '310000'},
            //{str: '£320,000 - £329,999', value: '320000'},
            //{str: '£330,000 - £339,999', value: '330000'},
            //{str: '£340,000 - £349,999', value: '340000'},
            //{str: '£350,000 - £359,999', value: '350000'},
            //{str: '£360,000 - £369,999', value: '360000'},
            //{str: '£370,000 - £379,999', value: '370000'},
            //{str: '£380,000 - £389,999', value: '380000'},
            //{str: '£390,000 - £399,999', value: '390000'},
            //{str: '£400,000 - £409,999', value: '400000'},
            //{str: '£400,000 - £409,999', value: '400000'},
            //{str: '£410,000 - £419,999', value: '410000'},
            //{str: '£420,000 - £429,999', value: '420000'},
            //{str: '£430,000 - £439,999', value: '430000'},
            //{str: '£440,000 - £449,999', value: '440000'},
            //{str: '£450,000 - £459,999', value: '450000'},
            //{str: '£460,000 - £469,999', value: '460000'},
            //{str: '£470,000 - £479,999', value: '470000'},
            //{str: '£480,000 - £489,999', value: '480000'},
            //{str: '£490,000 - £499,999', value: '490000'},
            //{str: '£500,000 - £519,999', value: '500000'},
            //{str: '£520,000 - £539,999', value: '520000'},
            //{str: '£540,000 - £559,999', value: '540000'},
            //{str: '£560,000 - £579,999', value: '560000'},
            //{str: '£580,000 - £599,999', value: '580000'},
            //{str: '£600,000 - £619,999', value: '600000'},
            //{str: '£620,000 - £639,999', value: '620000'},
            //{str: '£640,000 - £659,999', value: '640000'},
            //{str: '£660,000 - £679,999', value: '660000'},
            //{str: '£680,000 - £699,999', value: '680000'},
            //{str: '£700,000 - £719,999', value: '700000'},
            //{str: '£720,000 - £739,999', value: '720000'},
            //{str: '£740,000 - £759,999', value: '740000'},
            //{str: '£760,000 - £779,999', value: '760000'},
            //{str: '£780,000 - £799,999', value: '780000'},
            //{str: '£800,000 - £819,999', value: '800000'},
            //{str: '£820,000 - £839,999', value: '820000'},
            //{str: '£840,000 - £859,999', value: '840000'},
            //{str: '£860,000 - £879,999', value: '860000'},
            //{str: '£880,000 - £899,999', value: '880000'},
            //{str: '£900,000 - £919,999', value: '900000'},
            //{str: '£920,000 - £939,999', value: '920000'},
            //{str: '£940,000 - £959,999', value: '940000'},
            //{str: '£960,000 - £979,999', value: '960000'},
            //{str: '£980,000 - £999,999', value: '980000'},
            //{str: 'Over £1,000,000', value: '1000000'}
        ];

        $scope.pvalues = [
            {str: '£50,000 - £54,999', value: '50000'},
            {str: '£55,000 - £59,999', value: '55000'},
            {str: '£60,000 - £64,999', value: '60000'},
            {str: '£65,000 - £69,999', value: '65000'},
            {str: '£70,000 - £74,999', value: '70000'},
            {str: '£75,000 - £79,999', value: '75000'},
            {str: '£80,000 - £84,999', value: '80000'},
            {str: '£85,000 - £89,999', value: '85000'},
            {str: '£90,000 - £94,999', value: '90000'},
            {str: '£95,000 - £99,999', value: '95000'},
            {str: '£100,000 - £104,999', value: '100000'},
            {str: '£105,000 - £109,999', value: '105000'},
            {str: '£110,000 - £114,999', value: '110000'},
            {str: '£110,000 - £114,999', value: '110000'},
            {str: '£115,000 - £119,999', value: '115000'},
            {str: '£120,000 - £129,999', value: '120000'},
            {str: '£130,000 - £139,999', value: '130000'},
            {str: '£140,000 - £149,999', value: '140000'},
            {str: '£150,000 - £159,999', value: '150000'},
            {str: '£160,000 - £169,999', value: '160000'},
            {str: '£170,000 - £179,999', value: '170000'},
            {str: '£180,000 - £189,999', value: '180000'},
            {str: '£190,000 - £199,999', value: '190000'},
            {str: '£200,000 - £209,999', value: '200000'},
            {str: '£210,000 - £219,999', value: '210000'},
            {str: '£220,000 - £229,999', value: '220000'},
            {str: '£230,000 - £239,999', value: '230000'},
            {str: '£240,000 - £249,999', value: '240000'},
            {str: '£250,000 - £259,999', value: '250000'},
            {str: '£260,000 - £269,999', value: '260000'},
            {str: '£270,000 - £279,999', value: '270000'},
            {str: '£280,000 - £289,999', value: '280000'},
            {str: '£290,000 - £299,999', value: '290000'},
            {str: '£300,000 - £309,999', value: '300000'},
            {str: '£310,000 - £319,999', value: '310000'},
            {str: '£320,000 - £329,999', value: '320000'},
            {str: '£330,000 - £339,999', value: '330000'},
            {str: '£340,000 - £349,999', value: '340000'},
            {str: '£350,000 - £359,999', value: '350000'},
            {str: '£360,000 - £369,999', value: '360000'},
            {str: '£370,000 - £379,999', value: '370000'},
            {str: '£380,000 - £389,999', value: '380000'},
            {str: '£390,000 - £399,999', value: '390000'},
            {str: '£400,000 - £409,999', value: '400000'},
            {str: '£400,000 - £409,999', value: '400000'},
            {str: '£410,000 - £419,999', value: '410000'},
            {str: '£420,000 - £429,999', value: '420000'},
            {str: '£430,000 - £439,999', value: '430000'},
            {str: '£440,000 - £449,999', value: '440000'},
            {str: '£450,000 - £459,999', value: '450000'},
            {str: '£460,000 - £469,999', value: '460000'},
            {str: '£470,000 - £479,999', value: '470000'},
            {str: '£480,000 - £489,999', value: '480000'},
            {str: '£490,000 - £499,999', value: '490000'},
            {str: '£500,000 - £519,999', value: '500000'},
            {str: '£520,000 - £539,999', value: '520000'},
            {str: '£540,000 - £559,999', value: '540000'},
            {str: '£560,000 - £579,999', value: '560000'},
            {str: '£580,000 - £599,999', value: '580000'},
            {str: '£600,000 - £619,999', value: '600000'},
            {str: '£620,000 - £639,999', value: '620000'},
            {str: '£640,000 - £659,999', value: '640000'},
            {str: '£660,000 - £679,999', value: '660000'},
            {str: '£680,000 - £699,999', value: '680000'},
            {str: '£700,000 - £719,999', value: '700000'},
            {str: '£720,000 - £739,999', value: '720000'},
            {str: '£740,000 - £759,999', value: '740000'},
            {str: '£760,000 - £779,999', value: '760000'},
            {str: '£780,000 - £799,999', value: '780000'},
            {str: '£800,000 - £819,999', value: '800000'},
            {str: '£820,000 - £839,999', value: '820000'},
            {str: '£840,000 - £859,999', value: '840000'},
            {str: '£860,000 - £879,999', value: '860000'},
            {str: '£880,000 - £899,999', value: '880000'},
            {str: '£900,000 - £919,999', value: '900000'},
            {str: '£920,000 - £939,999', value: '920000'},
            {str: '£940,000 - £959,999', value: '940000'},
            {str: '£960,000 - £979,999', value: '960000'},
            {str: '£980,000 - £999,999', value: '980000'},
            {str: 'Over £1,000,000', value: '1000000'}
        ];

        $scope.mtypes = [
            {option: 'Car', value: 'car'},
            {option: 'Consolidation', value: 'consolidation'},
            {option: 'Holiday', value: 'holiday'},
            {option: 'Home improvements', value: 'home_improvements'},
            {option: 'New home', value: 'new_home'},
            {option: 'Second home', value: 'second_home'},
            {option: 'Other', value: 'other'}
        ];

        $scope.titles = [
            {option: 'Mr', value: 'mr'},
            {option: 'Mrs', value: 'mrs'},
            {option: 'Miss', value: 'miss'},
            {option: 'Ms', value: 'ms'},
            {option: 'Dr', value: 'dr'},
            {option: 'Other', value: 'other'}
        ];

        $scope.homeowners = [
            {option: 'Yes, with a mortgage', value: 'yes_with_a_mortgage'},
            {option: 'Yes, without a mortgage', value: 'yes_without_a_mortgage'}
        ];
        /*
         show mortgage balance
         */
        $scope.showmortgageBalance = function (homeowner) {

            //console.log(homeowner);

            var selectedValue = homeowner.value;

            console.log(selectedValue.value);

            if (selectedValue !== undefined){
                if (selectedValue == 'yes_with_a_mortgage') {
                    //console.log('show mortgage balance')
                    $scope.ShowMortgageBalance = true;
                    $scope.ShowPropertyBalance = true;

                } else {
                    //console.log('Do not show')
                    $scope.ShowMortgageBalance = false;
                    $scope.ShowPropertyBalance = false;
                }

                if (selectedValue == 'yes_without_a_mortgage') {
                    //console.log('show mortgage balance')
                    $scope.ShowPropertyValue = true;
                    $scope.ShowPropertyValue = true;

                } else {
                    //console.log('Do not show')
                    $scope.ShowPropertyValue = false;
                    $scope.ShowPropertyValue = false;
                }
            }
        };

        String.prototype.replaceAll = function (str1, str2, ignore) {
            return this.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g, "\\$&"), (ignore ? "gi" : "g")), (typeof(str2) == "string") ? str2.replace(/\$/g, "$$$$") : str2);
        };


// function to process the form
        $scope.processForm = function (mortgageForm) {
            $scope.submitted = true;

            if (mortgageForm.$valid && $scope.mobilenumber) {
                $scope.isProcessing = true;

                $scope.appTxt = 'Sending';
                $scope.formstatus = 'btn btn-block btn-lg btn-warning form-apply-progress';

                //format formData before sending
                $scope.formData.loan_amount = $scope.formData.loan_amount.value;
                $scope.formData.loan_purpose = $scope.formData.loan_purpose.value;
                $scope.formData.x_tokenid = "55770c4316619a8e35e31b7e";
                $scope.formData.x_tokenname = "quiddicompare";

                /*
                 Check to see if postcode has been touched before adding it to formData
                 */
                if (mortgageForm.current_postcode.$dirty) {
                    /*
                     Check to see if select add has been touched before creating county, street, house number and town
                     */
                    if (mortgageForm.selectadd.$dirty) {
                        //console.log("postcode detected");
                        $scope.formData.county = $scope.formData.residential_address.county;
                        $scope.formData.street = $scope.formData.residential_address.street;
                        $scope.formData.house_number = $scope.formData.residential_address.house_number;
                        $scope.formData.town = $scope.formData.residential_address.town;
                        $scope.formData.residential_address = $scope.formData.residential_address.address;

                    }
                }

                /*
                 Check to see if postcode has been touched before adding it to formData
                 */

                if (mortgageForm.homeowner.$dirty) {
                    /*
                     Check to see if select add has been touched before creating county, street, house number and town
                     */
                    if ($scope.ShowMortgageBalance) {
                        console.log("postcode detected");
                        $scope.formData.homeowner = $scope.formData.homeowner.value;
                    }
                }


                if (mortgageForm.title.$dirty) {
                    /*
                     Check to see if title has been touched before creating title inside title.formData
                     */
                    $scope.formData.title = $scope.formData.title.value;
                }

                //console.log($scope.serializeData($scope.formData));
                //$scope.formData = $scope.serializeData($scope.formData);
                //console.log($scope.formData);
                //console.log($.param($scope.formData));
                //console.log($scope.serializeData($scope.formData));

                var add = {
                    method: 'POST',
                    //url: 'https://www.google.co.uk/',
                    //url: 'https://as.quiddiportal.com/v1.0/offer/mortgage',
                    url: 'https://as.quiddiportal.com/v1.0/offer/second_charge',
                    headers: {
                        //'Content-Type': 'application/json; charset=utf-8'
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    //transformRequest: transformRequestAsFormPost,
                    data: $scope.serializeData($scope.formData)
                    //data: $scope.formData
                    //data: $.param ($scope.formData)
                };

                //form posted to url endpoint
                $http(add).
                    success(function (data) {
                        //console.log(data);
                        //disable button to prevent multiple post
                        $scope.isProcessing = false;

                        //event tracking
                        $analytics.eventTrack('event', {category: 'SecondCharge', label: $scope.formData.loan_purpose});
                        //console.log($scope.formData.mortgage_purpose);

                        //if form sent successfully, wait for five 5 seconds and reset page
                        if (data.success = true)
                            $scope.appTxt = 'Quote Sent';
                        $scope.formstatus = 'btn btn-block btn-lg btn-warning form-apply-success';
                        $timeout(function () {
                            $scope.showDialog = true;
                            $scope.reset();
                        }, 1000);

                        //if (data.succes = false) {
                        //    $scope.appTxt = 'Quote Not Sent';
                        //    $scope.formstatus = 'btn btn-block btn-lg btn-danger form-apply-success';
                        //}

                        ////if (data.success = false){
                        //    console.log("Time to kick in the delay and reset foam");
                        //    //$scope.resetDelay = $timeout(function() {
                        //    //    $scope.reset();
                        //    //}, 250);
                        //}

                        /*
                         Delay for one second and call reset function
                         */
                    })
                    .error(function (data) {
                        //console.log(data);
                        //$scope.appTxt = 'Quote Sent';


                    })
                    //.finally(function (data) {
                    //    //$scope.appTxt = 'Quote Sent';
                    //    //$scope.formstatus = 'btn btn-block btn-lg btn-warning form-apply-success';
                    //});

            } else {
                //$log.error('Form is not valid');
                //mortgageForm.$valid = false;
            }
        };

    }]);
