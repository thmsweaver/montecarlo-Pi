;(function() {

    var helpers = {
        isPointInsideCircle: function(point, circleRadius) {
            var xLeft = Math.pow((point.x - circleRadius), 2);
            var yLeft = Math.pow((point.y - circleRadius), 2);
            return xLeft + yLeft <= Math.pow(circleRadius, 2);
        },
        getElementByClassName: function(className) {
            // TODO: or raise?
            return document.getElementsByClassName(className)[0];
        }
    }

    app.helpers = helpers;
})();
