;(function() {
    app.simulationResults = {
        dependencies: ['./scripts/resources/helpers.js'],

        initialize: function() {
            this.piEstimateDisplay = app.helpers.getElByClass('piEstimate');
            this.absoluteDifferenceDisplay = app.helpers.getElByClass('absoluteDifference');
            this.percentVarianceDisplay = app.helpers.getElByClass('percentVariance');
            this.mostAccurateRunDisplay = app.helpers.getElByClass('mostAccurateRun');
            this.leastAccurateRunDisplay = app.helpers.getElByClass('leastAccurateRun');

            this.render();
        },

        render: function() {
            var realTimeDisplays = [
                'piEstimateDisplay',
                'absoluteDifferenceDisplay',
                'percentVarianceDisplay',
            ];
            realTimeDisplays.forEach(function(display) {
                this[display].innerHTML = 'pending...'
            }, this);

            if (!app.storageEnabled) {
                this.renderWithoutHistoricalData();
            } else {
                this.renderHistoricalData();
            }
        },

        renderHistoryWithoutStorage: function() {
            var feedback = `
                Please enable 'localStorage' or 'sessionStorage '
                to take advantage of this feature.
            `;
            this.mostAccurateRunDisplay.innerHTML = feedback;
            this.leastAccurateRunDisplay.innerHTML = feedback;
        },

        renderHistoricalData: function() {
            var mostAccurateRunData = app.storage.getItem('mostAccurateRun') || 'pending...';
            var leastAccurateRunData = app.storage.getItem('leastAccurateRun') || 'pending...';

            this.mostAccurateRunDisplay.innerHTML = mostAccurateRunData;
            this.leastAccurateRunDisplay.innerHTML = leastAccurateRunData;
        },

        getPercentVariance: function() {
            var numerator = this.getAbsoluteDifference();
            var denominator = (Math.PI + this.getPiEstimate()) / 2

            return (numerator / denominator) * 100;
        },

        getPiEstimate: function() {
            return (app.state.pointsInCircle / app.state.pointsGenerated) * 4;
        },

        getAbsoluteDifference: function() {
            var difference = Math.PI - this.getPiEstimate();
            return Math.abs(difference);
        },

        renderPiEstimate: function(piEstimate) {
            var result = piEstimate || this.getPiEstimate();
            this.piEstimateDisplay.innerHTML = result;
        },

        renderAbsoluteDifference: function() {
            this.absoluteDifferenceDisplay.innerHTML = this.getAbsoluteDifference();
        },

        renderPercentVariance: function() {
            var result = this.getPercentVariance();
            this.percentVarianceDisplay.innerHTML = result.toFixed(2) + '%';
        },

        handleRunData: function(seconds, date, storageKey, handler) {
            var runData = {
                pIEstimate: this.getPiEstimate(),
                seconds: seconds,
                percentVariance: this.getPercentVariance(),
                date: date,
            };

            var lastRun = app.storage.getItem(storageKey);
            if (!lastRun) {
                app.storage.setItem(storageKey, JSON.stringify(runData));
                // this.renderShit()
                return
            }

            var lastRunData = JSON.parse(lastRun) || {};
            handler(
                this.getAbsoluteDifference(),
                lastRunData.absoluteDifference,
                storageKey,
                lastRunData
            );
        },

        handleSimulationOutcome: function(seconds, date) {
            if (!app.storageEnabled) return

            var mostAccurateRunHandler = function(a, b, storageKey, runData) {
                if (a < b) {
                    app.storage.setItem(storageKey, JSON.stringify(runData));
                }
            };

            var leastAccurateRunHandler = function(a, b, storageKey, runData) {
                if (a > b) {
                    app.storage.setItem(storageKey, JSON.stringify(runData));
                }
            };

            this.handleRunData(seconds, date, 'mostAccurateRun', mostAccurateRunHandler);
            this.handleRunData(seconds, date, 'leastAccurateRun', leastAccurateRunHandler);
        },

        renderResults: function() {
            var piEstimate = this.getPiEstimate();
            var absoluteDifference = this.getAbsoluteDifference();

            this.renderPiEstimate(piEstimate);
            this.renderAbsoluteDifference(absoluteDifference);
            this.renderPercentVariance();
        }
    };
})();
