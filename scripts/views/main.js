(function() {

    var mainView = {
        dependencies: [
            './scripts/views/footer.js',
            './scripts/resources/helpers.js',
            './scripts/views/sidebar.js',
            './scripts/views/simulation-results.js',
        ],

        initialize: function() {
            var _callback = function() {
                this.configure();
                this.render();
            }.bind(this);

            scriptLoader.resolve(this.dependencies, _callback);
        },

        configure: function() {
            this.$input = app.helpers.getElByClass('milliSeconds');
        },

        render: function() {
            app.simulationResults.initialize();
            app.sidebar.initialize()
            app.footer.initialize();

            // this should go in to a header view
            // in the header view give focus to the input
            var startButton = app.helpers.getElByClass('milliSeconds');
            startButton.addEventListener('keyup', function(event) {
                event.preventDefault();
                if (event.keyCode == 13) { this.runSimulation(); }
            }.bind(this));
            startButton.disabled = false;

            this.$input.focus();
        },

        runSimulation: function() {
            // TODO add error feedback;
            var seconds = parseInt(this.$input.value);
            if (isNaN(seconds)) {
                input.style = 'border: 2px solid red;';
                return;
            }

            app.runSimulation(seconds);
        },

        paintPoint: function(point) {
            app.sidebar.paintPoint(point);
        }
    }

    app.mainView = mainView

})();
