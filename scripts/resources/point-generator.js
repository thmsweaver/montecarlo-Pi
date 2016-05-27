;(function() {

    var pointGenerator = {
        getRandomPoint: function() {
            var squareSide = app.globals.squareSide;

            return {
                x: (Math.random() * squareSide),
                y: (Math.random() * squareSide)
            };
        }
    }

    app.pointGenerator = pointGenerator;

})();
