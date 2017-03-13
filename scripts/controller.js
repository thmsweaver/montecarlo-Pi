;(function() {
    app.controller = {

        // TODO: this should be its own view...
        renderPointCounts: function() {
            var pointsInSquareDisplay = document.getElementsByClassName('pointsInSquare')[0];
            var pointsInCircleDisplay = document.getElementsByClassName('pointsInCircle')[0];

            pointsInSquareDisplay.innerHTML = app.state.pointsGenerated;
            pointsInCircleDisplay.innerHTML = app.state.pointsInCircle;

            var piEstimateDisplay = document.getElementsByClassName('piEstimate')[0];
            var piEstimate = (app.state.pointsInCircle / app.state.pointsGenerated) * 4;
            piEstimateDisplay.innerHTML = piEstimate;
        }

    };
})();
