;(function() {

    var pointGenerator = {
        getRandomPoint: function() {
            var squareSide = app.globals.squareSide;
            var x = (Math.random() * squareSide);
            var y = (Math.random() * squareSide);

            return {
                x: x,
                y: y
            };
        }
    }

    app.pointGenerator = pointGenerator;

})();
