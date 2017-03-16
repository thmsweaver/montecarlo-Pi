;(function() {
    app.controller = {
        dependencies: [
            './scripts/views/footer.js',
            './scripts/views/simulation-results.js',
        ],

        // TODO: some initiailzied should return when done or something;
        initialize: function() {
            // TODO
        },

        dispatchPaintPointResults: function() {
            app.footer.renderPointCounts();
            app.simulationResults.renderRealTimeResults();
        },

        dispatchReset: function() {
            app.resetState();
            app.simulationResults.renderRealTimeResults('N/A', 'N/A', 'N/A');
            app.sidebar.clearCanvas();
            app.footer.renderPointCounts();
        },

        dispatchSimulationOutcome: function(seconds, date) {
            app.simulationResults.handleSimulationOutcome(seconds, date)
        }

    };
})();
