import skel from '../../lib/js/skel.min.js'

Template.container.created = function(){
    $('body').addClass('is-loading');
};

Template.container.rendered = function(){

    skel.breakpoints({
        xlarge:	'(max-width: 1680px)',
        large:	'(max-width: 1280px)',
        medium:	'(max-width: 980px)',
        small:	'(max-width: 736px)',
        xsmall:	'(max-width: 480px)'
    });

    var $window = $('window');
    Meteor.setTimeout(function() {
        $('body').removeClass('is-loading');
    }, 100);

    // Fix: Placeholder polyfill.
        $('form').placeholder();

    // Prioritize "important" elements on medium.
    skel.on('+medium -medium', function() {
        $.prioritize(
            '.important\\28 medium\\29',
            skel.breakpoint('medium').active
        );
    });

    // Banner.
    var $banner = $('#banner'),
        $header = $('#header');
    if ($banner.length > 0) {

        // Video check.
        var video = $banner.data('video');

        if (video){
            if (!skel.vars.mobile
                &&	!skel.breakpoint('large').active
                &&	skel.vars.IEVersion > 9)
                $banner.append('<video autoplay muted loop class="video-js vjs-fullscreen" style="position:absolute;" poster="images/banner.jpg" data-setup=""> ' +
                '<source src="' + video + '.mp4" type="video/mp4"/>' +
                '<source src="' + video + '.webm" type="video/webm"/></video>');
        }


        // IE: Height fix.
        if (skel.vars.browser == 'ie'
            &&	skel.vars.IEVersion > 9) {

            skel.on('-small !small', function() {
                $banner.css('height', '100vh');
            });

            skel.on('+small', function() {
                $banner.css('height', '');
            });

        }

        // More button.
        $banner.find('.more')
            .addClass('scrolly');
        // contactus button.
        $banner.find('.contactuslink').addClass('scrolly');
        // Header.
        $header
            .addClass('with-banner')
            .addClass('alt');

        $banner.scrollex({
            mode: 'top',
            top: '-100vh',
            bottom: 10,
            enter: function() { $header.addClass('alt'); },
            leave: function() { $header.removeClass('alt'); }
        });

    }

    // Spotlights.
    var $spotlight = $('.spotlight');

    if ($spotlight.length > 0
        &&	skel.canUse('transition'))
        $spotlight.each(function() {

            var $this = $(this);

            $this.scrollex({
                mode: 'middle',
                top: '-10vh',
                bottom: '-10vh',
                initialize: function() { $this.addClass('inactive'); },
                enter: function() { $this.removeClass('inactive'); }
            });

        });

    // Features.
    var $features = $('.features');

    if ($features.length > 0
        &&	skel.canUse('transition'))
        $features.each(function() {

            var $this = $(this);

            $this.scrollex({
                mode: 'middle',
                top: '-20vh',
                bottom: '-20vh',
                initialize: function() { $this.addClass('inactive'); },
                enter: function() { $this.removeClass('inactive'); }
            });

        });

    // Scrolly.
    $('.scrolly').scrolly();

    // Initial scroll.
        $('window').trigger('scroll');

};

Template.container.events({

});