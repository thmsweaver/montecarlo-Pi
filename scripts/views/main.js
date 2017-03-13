(function() {

    var mainView = {
        dependencies: [
            './scripts/views/circle.js',
            './scripts/views/sidebar.js',
            './scripts/views/square.js',
            './scripts/resources/helpers.js'
        ],

        initialize: function() {
            // var header = this.getElByClass('header');
            // var headerHeight = header.offsetHeight + header.offsetTop;
            // var footerHeight = this.getElByClass('footer').offsetHeight
            // var innerHeight = app.globals.window.innerHeight
            // innerHeight -= headerHeight;
            // innerHeight -= footerHeight;
            // var innerWidth = app.globals.window.innerWidth;

            // this.pointsInSquare = 0;
            // this.pointsInCircle = 0;

            // this.height = innerHeight;
            // this.width = innerWidth;
            // this.centerPoint = {
            //     xCoordinate: (innerWidth / 2),
            //     yCoordinate: (innerHeight / 2)
            // };

            scriptLoader.resolve(this.dependencies, this.render.bind(this));
        },

        getElByClass: function(className) {
            return document.getElementsByClassName(className)[0];
        },

        render: function() {
            this.sidebar.initialize();

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
