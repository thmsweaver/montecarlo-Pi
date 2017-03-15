;(function() {
    app.controller = {
        dependencies: [
            './scripts/views/footer.js',
            './scripts/views/simulation-results.js',
        ],

        dispatchPaintPointResults: function() {
            app.footer.renderPointCounts();
            app.simulationResults.renderRealTimeResults();
        },

        dispatchSimulationOutcome: function(seconds, date) {
            app.simulationResults.handleSimulationOutcome(seconds, date)
        }

    };
})();
