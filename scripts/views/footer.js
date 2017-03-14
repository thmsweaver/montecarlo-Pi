;(function() {
    app.footer = {
        dependencies: [
            './scripts/views/square.js',
            './scripts/views/circle.js',
        ],

        initialize: function() {
            this.pointsInSquareDisplay = document.getElementsByClassName('pointsInSquare')[0];
            this.pointsInCircleDisplay = document.getElementsByClassName('pointsInCircle')[0];

            this.initializeClickHandlers()
        },

        initializeClickHandlers: function() {
            this.addEventListener(
                'display-settings circle', 'click', app.circleView.toggleView.bind(app.circleView)
            )
            this.addEventListener(
                'display-settings square', 'click', app.squareView.toggleView.bind(app.squareView)
            )
        },

        initializeKeyPressHandlers: function() {
            var keypressHandler = function(e) {
                if (e.which == 13) {
                    this.checkbox.checked = !this.checkbox.checked;
                    this.toggleView();
                }
            };

            this.addEventListener(
                'display-settings circle', 'keypress', keypressHandler.bind(app.circleView)
            )
            this.addEventListener(
                'display-settings square', 'keypress', keypressHandler.bind(app.squareView)
            )
        },

        addEventListener: function(className, event, callBack) {
            var element = document.getElementsByClassName(className)[0];
            element.addEventListener(event, callBack);
        },

        renderPointCounts: function() {
            this.pointsInSquareDisplay.innerHTML = app.state.pointsGenerated;
            this.pointsInCircleDisplay.innerHTML = app.state.pointsInCircle;
        }
    };
})();
