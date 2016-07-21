/**
 * Created by simba on 12/10/2014.
 */


function getQueryStringParameters(url) {
    if (url == undefined) {
        url = window.location.href;
    }
    var vars = {};
    var p = url.replace(/[?&]+([^=&]+)=([^&]*)/gi,
        function (m, key, value) {
            vars[key.toLowerCase()] = decodeURIComponent(value);
        });
    return vars;
}


//load header function

$(document).ready(function () {

    //compress select

    /*
     PPC keyword processing
     */
    //var qs = getQueryStringParameters();

    var qs = getQueryStringParameters();
    // console.log(qs.seed)

    if (qs.seed != undefined) {
        seed = qs.seed.replace(/[-_]/g, ' ');
        seed = seed.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
        jQuery('.replace-seed-value').html(seed);
    }

    //if (qs.seed != undefined) {
    //    // qs.seed.replace(/#/g, '');
    //    seed = qs.seed.replace(/[-_]/g, ' ');
    //    seed = seed.replace(/\w\S*/g, function (txt) {
    //        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    //    });
    //
    //
    //    // replace substring after #bang
    //    //seed = seed.substring(0, seed.indexOf('#'));
    //    console.log(seed);
    //    jQuery('.replace-seed-value').html(seed);
    //}

//    var menutoggle = function(){
//        var sideslider = $('[data-toggle=collapse-side]');
//        var sel = sideslider.attr('data-target');
//        var sel2 = sideslider.attr('data-target-2');
//        sideslider.click(function () {
//            $(sel).toggleClass('in');
//            $(sel2).toggleClass('out');
//        });
//    }

    $("#header").load("/templates/header.html", function () {
        var sideslider = $('[data-toggle=collapse-side]');
        var sel = sideslider.attr('data-target');
        var sel2 = sideslider.attr('data-target-2');
        sideslider.click(function () {
            $(sel).toggleClass('in');
            $(sel2).toggleClass('out');
        });
    });

    $("#email-header").load("/templates/email-header.html", function () {
        var sideslider = $('[data-toggle=collapse-side]');
        var sel = sideslider.attr('data-target');
        var sel2 = sideslider.attr('data-target-2');
        sideslider.click(function () {
            $(sel).toggleClass('in');
            $(sel2).toggleClass('out');
        });
    });

    $("a .dropdown-toggle").hover(function (event) {
        console.log(event);
        //      $(this).dropdown('toggle')
    });
});

//load footer function
$(function () {
    $("#footer").load("/templates/footer.html");
    $("#leftsiderbar").load("/templates/leftsidebar.html", function () {
        load_script({script: "//pagead2.googlesyndication.com/pagead/show_ads.js"}, function (stLight) {
            stLight.options({
                publisher: '7a123f43-1c12-4a3a-9891-e0180bfe15f4',
                doNotHash: false,
                doNotCopy: false,
                hashAddressBar: false
            });
        });
    });
    //$("#mortgage-sideform").load("/templates/mortgage-sideform.html");
    $("#mortgage-calculator").load("/templates/mortgage-calculator.html");
});

//expand address and compress address
//var expandAddress = function(){
//    document.getElementById('selectadd').size='5';
//    document.getElementById('selectadd').style.height = "200px";
//    document.getElementById('selectadd').firstChild.style.display = "none";
//},
//
//    compressAddress = function(){
//        document.getElementById('selectadd').size='1';
//        document.getElementById('selectadd').style.height = "46px";
//    };


//scrollable mortgage apply button
$(window).scroll(function () {
    var threshold = 1000, // number of pixels before bottom of page that you want to start fading
        op = (($(document).height() - $(window).height()) - $(window).scrollTop()) / threshold,
        button = $(".affix-top");
    if (op <= 0) {
        button.hide();
    } else {
        button.show();
    }
    button.css("opacity", op);
});

//site wide and tag drop
var load_script = function (options) {
    /*
     Use text/javascript is no type is defined.
     */
    if (options.type === undefined) {
        options.type = 'text/javascript';
    }
    /*
     Create an JS element and add it to the end of the current list of elements.
     */
    source_element = document.createElement('SCRIPT');
    source_element.type = options.type;
    source_element.src = options.script;
    source_element.defer = true;
    source_element.async = true;
    /*
     If a callback has been provided then run that code once the script has been successfully donwloaded and is in a ready state.
     */
    if (typeof( options.callback ) == "function") {
        source_element.onreadystatechange = source_element.onload = function () {
            var state = source_element.readyState;
            if (!options.done && ( !state || /loaded|complete/.test(state) )) {
                options.done = true;
                options.callback();
            }
        };
    }
    document.getElementsByTagName('head')[0].appendChild(source_element);
};
//load_script( { script: "//d3c3cq33003psk.cloudfront.net/opentag-88319-1593523.js" } ) ;


//shareThis
//var switchTo5x = true;
//load_script({script: "//ws.sharethis.com/button/buttons.js"}, function (stLight) {
//    stLight.options({
//        publisher: '7a123f43-1c12-4a3a-9891-e0180bfe15f4',
//        doNotHash: false,
//        doNotCopy: false,
//        hashAddressBar: false
//    });
//});

//google adSense


//
//document.getElementById('selectadd').onchange(function(){
//});

/* Google Analytics Script */

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-27686131-1', 'auto');
ga('send', 'pageview');

/* Google Code for Remarketing Tag */
load_script( { script: "//www.googleadservices.com/pagead/conversion_async.js", callback: function() {
    window.google_trackConversion({
        google_conversion_id: 970546039,
        google_custom_params: window.google_tag_params,
        google_remarketing_only: true
    });
} } ) ;

load_script({ script:"//platform.twitter.com/oct.js", callback: function(){
    twttr.conversion.trackPid('l6m1d', { tw_sale_amount: 0, tw_order_quantity: 0 });

}});


//pop over on hover bootstrap
var originalLeave = $.fn.popover.Constructor.prototype.leave;
$.fn.popover.Constructor.prototype.leave = function(obj){
    var self = obj instanceof this.constructor ?
        obj : $(obj.currentTarget)[this.type](this.getDelegateOptions()).data('bs.' + this.type)
    var container, timeout;

    originalLeave.call(this, obj);

    if(obj.currentTarget) {
        container = $(obj.currentTarget).siblings('.popover')
        timeout = self.timeout;
        container.one('mouseenter', function(){
            //We entered the actual popover – call off the dogs
            clearTimeout(timeout);
            //Let's monitor popover content instead
            container.one('mouseleave', function(){
                $.fn.popover.Constructor.prototype.leave.call(self, self);
            });
        })
    }
};


$('body').popover({ selector: '[data-popover]', trigger: 'click hover', placement: 'top', delay: {show: 30, hide: 200}});


//$(function () {
//    $('[data-toggle="tooltip"]').tooltip()
//})