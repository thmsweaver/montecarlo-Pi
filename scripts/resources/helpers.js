;(function() {

    var helpers = {
        isPointInsideCircle: function(point, circleRadius) {
            var xLeft = Math.pow((point.x - circleRadius), 2);
            var yLeft = Math.pow((point.y - circleRadius), 2);
            return xLeft + yLeft <= Math.pow(circleRadius, 2);
        }
    }

    app.mainView.helpers = helpers;
})();
