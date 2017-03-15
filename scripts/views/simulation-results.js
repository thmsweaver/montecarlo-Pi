;(function() {
    app.simulationResults = {
        dependencies: ['./scripts/resources/helpers.js'],
        realTimeDisplays: [
            'piEstimateDisplay',
            'absoluteDifferenceDisplay',
            'percentVarianceDisplay',
        ],
        storedDataKeys: [
            'pIEstimate',
            'seconds',
            'percentVariance',
            'date',
        ],

        initialize: function() {
            this.$piEstimateDisplay = app.helpers.getElByClass('piEstimate');
            this.$absoluteDifferenceDisplay = app.helpers.getElByClass('absoluteDifference');
            this.$percentVarianceDisplay = app.helpers.getElByClass('percentVariance');
            this.$mostAccurateRunDisplay = app.helpers.getElByClass('mostAccurateRun');
            this.$leastAccurateRunDisplay = app.helpers.getElByClass('leastAccurateRun');

            this.render();
        },

        render: function() {
            this.realTimeDisplays.forEach(function(display) {
                this['$' + display].innerHTML = 'pending...'
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
            // TODO: must I clear this out first?
            this.$mostAccurateRunDisplay.innerHTML = feedback;
            this.$leastAccurateRunDisplay.innerHTML = feedback;
        },

        getValidStoredData: function(key) {
            var fromStorage = app.storage.getItem(key) || '{}';
            var runData;
            try {
                runData = JSON.parse(fromStorage);
            } catch(e) {
                app.storage.clear();
                return;
            }
            var isValidData = this.storedDataKeys.every(function(key) {
                return key in runData;
            });

            if (isValidData) return runData;
        },

        getStoredDataTemplate: function(validStoredData) {
            if (!validStoredData) {
                var $span = document.createElement('SPAN');
                $span.innerHTML = 'pending...';
                return $span;
            }

            var $list = document.createElement('UL');
            this.storedDataKeys.forEach(function(dataKey) {
                // sanitize unsafe strings
                var textNode = document.createTextNode(validStoredData[dataKey]);
                var $item = document.createElement('LI');
                $item.innerHTML = dataKey + ': ';
                $item.appendChild(textNode);
                $list.appendChild($item);
            });

            return $list;
        },

        renderHistoricalData: function() {
            var validatedRunDataMA = this.getValidStoredData('mostAccurateRun');
            var mostAccurateRunTemplate = this.getStoredDataTemplate(validatedRunDataMA);

            var validatedRunDataLA = this.getValidStoredData('leastAccurateRun');
            var leastAccurateRunTemplate = this.getStoredDataTemplate(validatedRunDataLA);

            this.$mostAccurateRunDisplay.appendChild(mostAccurateRunTemplate);
            this.$leastAccurateRunDisplay.appendChild(leastAccurateRunTemplate);
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
            this.$piEstimateDisplay.innerHTML = result;
        },

        renderAbsoluteDifference: function() {
            this.$absoluteDifferenceDisplay.innerHTML = this.getAbsoluteDifference();
        },

        renderPercentVariance: function() {
            var result = this.getPercentVariance();
            this.$percentVarianceDisplay.innerHTML = result.toFixed(2) + '%';
        },

        handleRunData: function(seconds, date, storageKey, handler) {
            var currentRunData = {
                pIEstimate: this.getPiEstimate(),
                seconds: seconds,
                percentVariance: this.getPercentVariance(),
                date: date,
            };

            var storedRun = app.storage.getItem(storageKey);
            if (!storedRun) {
                app.storage.setItem(storageKey, JSON.stringify(currentRunData));
                var node = this['$' + storageKey + 'Display'];
                app.helpers.emptyNode(node)
                var template = this.getStoredDataTemplate(currentRunData);
                node.appendChild(template);
                return;
            }

            var storedRunData = JSON.parse(storedRun) || {};
            handler(currentRunData, storedRunData, storageKey);
        },

        handleSimulationOutcome: function(seconds, date) {
            if (!app.storageEnabled) return

            var mostAccurateRunHandler = function(currentRunData, storedRunData, storageKey) {
                if (currentRunData.percentVariance < storedRunData.percentVariance) {
                    app.storage.setItem(storageKey, JSON.stringify(currentRunData));
                    var template = this.getStoredDataTemplate(currentRunData);
                    app.helpers.emptyNode(this.$mostAccurateRunDisplay);
                    this.$mostAccurateRunDisplay.appendChild(template);
                }
            }.bind(this);

            var leastAccurateRunHandler = function(currentRunData, storedRunData, storageKey) {
                if (currentRunData.percentVariance > storedRunData.percentVariance) {
                    app.storage.setItem(storageKey, JSON.stringify(currentRunData));
                    var template = this.getStoredDataTemplate(currentRunData);
                    app.helpers.emptyNode(this.$leastAccurateRunDisplay);
                    this.$leastAccurateRunDisplay.appendChild(template);
                }
            }.bind(this);

            this.handleRunData(seconds, date, 'mostAccurateRun', mostAccurateRunHandler);
            this.handleRunData(seconds, date, 'leastAccurateRun', leastAccurateRunHandler);
        },

        renderRealTimeResults: function() {
            var piEstimate = this.getPiEstimate();
            var absoluteDifference = this.getAbsoluteDifference();

            this.renderPiEstimate(piEstimate);
            this.renderAbsoluteDifference(absoluteDifference);
            this.renderPercentVariance();
        }
    };
})();
