/**
 * Created by simba on 21/01/15.
 */
function load_script( options ) {
    /*
     Use text/javascript is no type is defined.
     */
    if ( options.type === undefined ) {
        options.type = 'text/javascript' ;
    }
    /*
     Create an JS element and add it to the end of the current list of elements.
     */
    source_element = document.createElement('SCRIPT') ;
    source_element.type = options.type ;
    source_element.src = options.script ;
    source_element.defer = true ;
    source_element.async = true ;
    /*
     If a callback has been provided then run that code once the script has been successfully donwloaded and is in a ready state.
     */
    if ( typeof( options.callback ) == "function" ) {
        source_element.onreadystatechange = source_element.onload = function() {
            var state = source_element.readyState;
            if ( !options.done && ( !state || /loaded|complete/.test( state ) ) ) {
                options.done = true ;
                options.callback() ;
            }
        };
    }
    document.getElementsByTagName('head')[0].appendChild( source_element ) ;
}
//load_script( { script: "//d3c3cq33003psk.cloudfront.net/opentag-88319-1593523.js" } ) ;


//Quiddi.Core.js hook
function getQueryStringParameters( url ) {
    if ( url == undefined ) {
        url = window.location.href ;
    }
    var vars = { } ;
    var p = url.replace( /[?&]+([^=&]+)=([^&]*)/gi,
        function( m, key, value ) {
            vars[key.toLowerCase()] = value ;
        } ) ;
    return vars ;
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

var qs = getQueryStringParameters() ;
if ( qs.said != undefined ) { setCookie( 'SAID', qs.said ) ; }
if ( qs.aid != undefined ) { setCookie( 'AID', qs.aid ) ; }