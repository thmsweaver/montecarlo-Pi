var app = (function() {
    return {
        globals: {},
        constants: {
            xmlNameSpace: 'http://www.w3.org/2000/svg'
        },
        dependencies: [
            './scripts/views/main.js',
            './scripts/views/circle.js',
            './scripts/controller.js',
            './scripts/resources/helpers.js',
            './scripts/resources/point-generator.js',
            './scripts/views/square.js',
        ],

        state: {
            pointsGenerated: 0,
            pointsInCircle: 0,
        },

        storageEnabled: false,

        incrementPointsGenerated: function() {
            this.state.pointsGenerated += 1;
        },

        incrementPointsInCircle: function() {
            this.state.pointsInCircle += 1;
        },

        initialize: function(window) {
            scriptLoader.resolve(this.dependencies, this.start.bind(this));
        },

        start: function() {
            this.configureStorage();
            this.mainView.initialize();
        },

        configureStorage: function() {
            // TODO: ensure this returns and does not continue elif
            if (app.helpers.isStorageEnabled('localStorage')) {
                this.storageEnabled = true;
                this.storage = localStorage;
            } else if (app.helpers.isStorageEnabled('sessionStorage')) {
                this.storageEnabled = true;
                this.storage = sessionStorage;
            }
        },

        resetState: function(seconds) {
            this.state.pointsGenerated = 0;
            this.state.pointsInCircle = 0;
        },

        runSimulation: function(seconds) {
            this.controller.dispatchReset();

            var self = this;
            var intervalID = setInterval(function() {
                var randomPoint = self.pointGenerator.getRandomPoint();
                self.incrementPointsGenerated();

                // TODO: should be controller
                self.mainView.paintPoint(randomPoint);
            });

            setTimeout(function() {
                clearInterval(intervalID)
                self.controller.dispatchSimulationOutcome(seconds, Date());
            }, seconds * 1000);
        }
    }
})();
