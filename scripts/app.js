var app = (function() {
    return {
        globals: {},
        constants: { xmlNameSpace: 'http://www.w3.org/2000/svg' },
        dependencies: [
            './scripts/views/main.js',
            './scripts/resources/point-generator.js'
        ],

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
                pointCount++;

                self.mainView.paintPoint(randomPoint, pointCount);
                setTimeout(function() { clearInterval(intervalId) }, seconds * 1000);
            });
        }
    }
})();
