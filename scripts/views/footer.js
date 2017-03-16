;(function() {
    app.footer = {
        dependencies: [
            './scripts/views/circle.js',
            './scripts/resources/helpers.js',
            './scripts/views/square.js',
        ],

        initialize: function() {
            scriptLoader.resolve(this.dependencies, this.configure.bind(this));
        },

        configure: function() {
            this.$pointsGeneratedDisplay = app.helpers.getElByClass('pointsInSquare');
            this.$pointsInCircleDisplay = app.helpers.getElByClass('pointsInCircle');
            this.configreClickHandlers()
            this.configureKeyPressHandlers();
        },

        configreClickHandlers: function() {
            this.configureListener(
                'display-settings circle',
                'click',
                function(){ app.circleView.toggleView(); }
            );
            this.configureListener(
                'display-settings square',
                'click',
                function(){ app.squareView.toggleView(); }
            );
        },

        configureKeyPressHandlers: function() {
            var _curryCallback = function(viewName) {
                return function(e) {
                    if (!e.which == 13) return
                    var view = app[viewName];
                    view.checkbox.checked = !view.checkbox.checked;
                    view.toggleView();
                };
            };
            this.configureListener(
                'display-settings circle',
                'keypress',
                _curryCallback('circleView')
            );
            this.configureListener(
                'display-settings square',
                'keypress',
                _curryCallback('squareView')
            );
        },

        configureListener: function(className, event, callBack) {
            var element = app.helpers.getElByClass(className);
            element.addEventListener(event, callBack);
        },

        renderPointCounts: function() {
            this.$pointsGeneratedDisplay.innerHTML = app.state.pointsGenerated;
            this.$pointsInCircleDisplay.innerHTML = app.state.pointsInCircle;
        }
    };
})();
