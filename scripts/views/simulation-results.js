;(function() {
    app.simulationResults = {
        dependencies: [
            './scripts/resources/helpers.js'
        ],
        displayHooks: [
            'absoluteDifference',
            'percentVariance',
            'piEstimate',
            'mostAccurateRun',
            'leastAccurateRun',
        ],
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
            var _callback = function() {
                this.configure();
                this.render();
            }.bind(this);

            scriptLoader.resolve(this.dependencies, _callback);
        },

        configure: function() {
            _cachedGetElByClass = app.helpers.getElByClass;
            this.displayHooks.forEach(function(className) {
                this['$' + className + 'Display'] = _cachedGetElByClass(className);
            }, this);
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
                // `createTextNode` to sanitize unsafe strings
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

        getFormattedPercentVariance: function() {
            var numerator = this.getAbsoluteDifference();
            var denominator = (Math.PI + this.getPiEstimate()) / 2
            var result = (numerator / denominator) * 100;
            return result.toFixed(2) + '%';
        },

        getPiEstimate: function() {
            if (!app.state.pointsGenerated) return 0
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

        renderAbsoluteDifference: function(absoluteDifference) {
            var result = absoluteDifference || this.getAbsoluteDifference();
            this.$absoluteDifferenceDisplay.innerHTML = result;
        },

        renderPercentVariance: function(percentVariance) {
            var result = percentVariance || this.getFormattedPercentVariance();
            this.$percentVarianceDisplay.innerHTML = result;
        },

        handleRunData: function(seconds, date, storageKey, handler) {
            var currentRunData = {
                pIEstimate: this.getPiEstimate(),
                seconds: seconds,
                percentVariance: this.getFormattedPercentVariance(),
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

        renderRealTimeResults: function(piEstimate, absoluteDifference, percentVariance) {
            var piEstimate = piEstimate || this.getPiEstimate();
            var absoluteDifference = absoluteDifference || this.getAbsoluteDifference();
            var percentVariance = percentVariance || this.getFormattedPercentVariance();

            this.renderPiEstimate(piEstimate);
            this.renderAbsoluteDifference(absoluteDifference);
            this.renderPercentVariance(percentVariance);
        }
    };
})();
