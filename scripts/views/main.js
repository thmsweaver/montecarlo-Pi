(function() {

    var mainView = {
        dependencies: [
            './scripts/views/circle.js',
            './scripts/views/footer.js',
            './scripts/views/sidebar.js',
            './scripts/views/simulation-results.js',
            './scripts/views/square.js',
            './scripts/resources/helpers.js'
        ],

        initialize: function() {
            scriptLoader.resolve(this.dependencies, this.render.bind(this));
        },

        getElByClass: function(className) {
            return document.getElementsByClassName(className)[0];
        },

        render: function() {
            app.simulationResults.initialize();
            this.sidebar.initialize();
            app.footer.initialize();

            // this should go in to a header view
            // in the header view give focus to the input
            var startButton = this.startButton = this.getElByClass('milliSeconds');
            startButton.addEventListener('keyup', function(event) {
                event.preventDefault();
                if (event.keyCode == 13) { this.runSimulation(); }
            }.bind(this));
            startButton.disabled = false;

            this.piEstimateDisplay = this.getElByClass('piEstimate');
            this.pointsInSquareDisplay = this.getElByClass('pointsInSquare');
            this.pointsInCircleDisplay = this.getElByClass('pointsInCircle');
        },

        runSimulation: function() {
            var input = app.globals.document.getElementsByClassName('milliSeconds')[0];
            input.style = 'border: 1px solid black;';
            var seconds = parseInt(input.value);
            if (isNaN(seconds)) {
                input.style = 'border: 2px solid red;';
                return;
            }

            app.runSimulation(seconds);
        },

        clearStats: function() {
            app.state.pointsInSquare = 0;
            app.state.pointsInCircle = 0;

            [
                this.pointsInSquareDisplay,
                this.pointsInCircleDisplay,
                this.piEstimateDisplay
            ].forEach(function(statDisplay) { statDisplay.innerHTML = 0; });

        },

        clearCanvas: function() {
            this.ctx.clearRect(0,0,canvas.width,canvas.height);
        },

        resetDisplay: function() {
            this.clearCanvas();
            this.clearStats();
        },
        paintPoint: function(point) {
            this.sidebar.paintPoint(point);
        }
    }

    app.mainView = mainView

})();
