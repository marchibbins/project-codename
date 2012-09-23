var Codename = (function() {

    var container = $('.container'),
        template = $('#template').html(),
        names = {};

    var init = function() {
        $.ajax({
            url: "data/codenames.json"
        })

        .done(function(data) { 
            names = data.names;
            get();
            reload();
        })

        .fail(function() {
            container.html("Oops, something went wrong.");
        });
    };

    var get = function() {
        var random = Math.floor(Math.random() * names.length),
            view = names[random],
            output = Mustache.render(template, view);

        var element = $('.name', container);
        if (!element.length) element = container;

        element.fadeTo(200, 0, function() {
            container.html(output).fadeTo(150, 1);
            $('.link').on('click', function(event) {
                event.preventDefault();
                window.open(this.href);
            });
        });
    };

    var reload = function() {
        var link = $('<a href="#" class="reload"></a>');
        container.after(link);

        link.on('click', function(event) {
            event.preventDefault();
            get();
        })

        .text('Rubbish, gimme another')
        .hide().delay(250)
        .fadeTo(200, 1);
    };

    return {
        init: init
    };

})();

$(Codename.init);
