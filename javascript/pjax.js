var Router = {
    link: 'a',
    container: 'body',
    options: undefined,
    pathURL: undefined,
    success: undefined,

    start: function(data) {
        this.link = data.link;
        this.container = data.container;
        this.container = data.container;
        this.getPathURL();
        this.success = data.success();
    },

    getPathURL: function() {
        var i = this;
        $(i.link).click(function(e) {
            e.preventDefault();
            i.pathURL = $(this).attr('href');
            i.getContent();
        });
    },

    getContent: function() {
        var i = this;
        $.ajax({
            url: i.pathURL,
            type: 'POST',
            data: {url: i.pathURL},
            success: function(data) {
                $(document).ready(function(){
                    i.destroyCurrentPage();
                    i.changeURL();
                    var title = $('<head>', {html: data}).find('title').text();
                    data = $("<head>", {html: data}).find(i.container).html();
                    $(i.container).html(data);
                    document.title = title;
                    $(i.container).css({'display': 'none'});
                    $(i.container).show();
                    i.getPathURL();
                });
            }
        }).done(function() {
            if(i.success !== undefined)
                i.success();
        });
    },

    destroyCurrentPage: function() {
        var i = this;
        $(this.container).html('');
    },

    changeURL: function() {
        var i = this;
        history.pushState(null, null, i.pathURL);
        $(document).ready(function() {
            window.addEventListener('popstate', function() {
                $.ajax({
                    url: location.pathname,
                    type: 'POST',
                    success: function(data){
                        i.destroyCurrentPage();
                        var title = $('<head>', {html: data}).find('title').text();
                        data = $("<head>", {html: data}).find(i.container).html();
                        $(i.container).html(data);
                        document.title = title;
                        $(i.container).css({'display': 'none'});
                        $(i.container).show();
                        i.getPathURL();
                    }
                })
            })
        });
    },

    reload: function(container) {
        var i = this;
        $(document).ready(function() {
            $.ajax({
                url: location.pathname,
                type: 'POST',
                success: function(data){
                    data = $("<body>", {html: data}).find(container).html();
                    $(container).html(data);
                    $(container).css({'display': 'none'});
                    $(container).show();
                    i.getPathURL();
                }
            })
        })
    },
};