function onScroll_fn() {
    var siteWindow = $( window ),
        siteHeader = $( ".js-navbar" )

    siteWindow.scroll(function() {
        if ( siteWindow.scrollTop() == 0) {
            siteHeader.removeClass( "scrollNav" );
        } else {
            siteHeader.addClass( "scrollNav");
        }
    });
}

$( function() {
    onScroll_fn();
});





