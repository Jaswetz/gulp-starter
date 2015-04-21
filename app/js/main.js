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
    // init controller
    var controller = new ScrollMagic.Controller();

    // change behaviour of controller to animate scroll instead of jump
    controller.scrollTo(function (newpos) {
        TweenMax.to(window, 0.5, {scrollTo: {y: newpos}});
    });

    //  bind scroll to anchor links
    $(document).on("click", "a[href^='#']", function (e) {
        var id = $(this).attr("href");
        if ($(id).length > 0) {
            e.preventDefault();

            // trigger scroll
            controller.scrollTo(id);

                // if supported by the browser we can even update the URL.
            if (window.history && window.history.pushState) {
                history.pushState("", document.title, id);
            }
        }
    });

    var skillTween1 = TweenMax.staggerFromTo('#animation-1', 1,
        {opacity: 0, scale: 0},
        {delay: 0, opacity: 1, scale: 1, ease: Back.easeOut});

    var skillTween2 = TweenMax.staggerFromTo('#animation-2', 1,
        {opacity: 0, scale: 0},
        {delay: .2, opacity: 1, scale: 1, ease: Back.easeOut});

    var skillTween3 = TweenMax.staggerFromTo('#animation-3', 1,
        {opacity: 0, scale: 0},
        {delay: .4, opacity: 1, scale: 1, ease: Back.easeOut});

    // build scene
    var scene = new ScrollMagic.Scene({triggerElement: ".js-triggerSkillAnimation"})
        .setTween(skillTween1)
        .addTo(controller);

    var scene = new ScrollMagic.Scene({triggerElement: ".js-triggerSkillAnimation"})
        .setTween(skillTween2)
        .addTo(controller);

    var scene = new ScrollMagic.Scene({triggerElement: ".js-triggerSkillAnimation"})
        .setTween(skillTween3)
        .addTo(controller);

    onScroll_fn();
});





