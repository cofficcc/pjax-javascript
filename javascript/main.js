$(document).ready(function() {
    Router.start({
        link: 'a',
        container: '#pjax-container', // name of container which us update
        success: function() {
            //Router.reload("#header"); //reload "header" container if you want it
        }
    });
});