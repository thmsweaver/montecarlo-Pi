var app = (function() {
    return {
        globals: {},
        constants: { xmlNameSpace: 'http://www.w3.org/2000/svg' },
        dependencies: [
            './scripts/views/main.js',
            './scripts/controller.js',
            './scripts/resources/point-generator.js'
        ],

        state: {
            pointsGenerated: 0,
            pointsInCircle: 0,
        },

        incrementPointsGenerated: function() {
            this.state.pointsGenerated += 1;
        },

        incrementPointsInCircle: function() {
            this.state.pointsInCircle += 1;
        },

        initialize: function(window) {
            this.globals.window = window;
            this.globals.document = window.document;
            scriptLoader.resolve(this.dependencies, this.start.bind(this));
        },

        start: function() {
            this.mainView.initialize();
        },

        runSimulation: function(seconds) {
            var self = this;
            var pointCount = 0;
            this.mainView.resetDisplay();

            var intervalId = setInterval(function() {
                var randomPoint = self.pointGenerator.getRandomPoint();
                self.incrementPointsGenerated();

                // TODO: should be controller
                self.mainView.paintPoint(randomPoint);
                setTimeout(function() { clearInterval(intervalId) }, seconds * 1000);
            });
        }
    }
})();
