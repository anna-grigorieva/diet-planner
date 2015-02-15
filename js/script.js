$(function () {
    initWindow();
    ko.applyBindings(new NutritionPlanner(dishes));

    function initWindow() {        
        $(window).scroll(function () {
            if ($(this).scrollTop() > 200) {
                $('.back-to-top').fadeIn(500);
            } else {
                $('.back-to-top').fadeOut(500);
            }
        });

        $('.back-to-top').click(function (event) {
            event.preventDefault();
            $('html, body').animate({ scrollTop: 0 }, 500);
            return false;
        });
    }
})