;(function() {
    var mainView = app.mainView

    app.sidebar = {
        dependencies: [
            './scripts/resources/helpers.js',
            './scripts/views/circle.js',
            './scripts/controller.js',
            './scripts/views/square.js',
        ],

        initialize: function() {
            this.$el = document.getElementById('sidebar');
            this.$canvas = document.getElementById('canvas');
            this.$svg = document.getElementById('svg');

            this.width = this.getWidth();
            this.height = this.getHeight();

            this.animationCenterPoint = {
                xCoordinate: (this.width / 2),
                yCoordinate: (this.height / 2)
            };

            scriptLoader.resolve(this.dependencies, this.render.bind(this));
            this.initialized = true;
        },

        render: function() {
            // TODO: why is this always 4px larger if not set?
            this.$el.style.height = this.height + 'px';

            this.configureSVG();
            this.configureCanvas();
            app.circleView.initialize(this.$svg, this.animationCenterPoint);
            app.squareView.initialize(this.$svg, this.animationCenterPoint);
        },

        clearCanvas: function() {
            this.ctx.clearRect(0,0,canvas.width,canvas.height);
        },

        configureCanvas: function() {
            this.$canvas.width = this.width;
            this.$canvas.height = this.height;
            // TODO:
            mainView.ctx = this.ctx = canvas.getContext('2d');
        },
        configureSVG: function() {
            this.$svg.setAttribute('width', this.width);
            this.$svg.setAttribute('height', this.height);
            this.$svg.setAttribute('xmlns', app.constants.xmlNameSpace);
        },
        getHeight: function() {
            var $header = document.getElementById('header');
            var headerHeight = $header.offsetHeight + $header.offsetTop;

            var $footer = this.getElByClass('footer');
            var footerHeight = $footer.offsetHeight;

            var innerHeight = window.innerHeight;
            innerHeight -= headerHeight;
            innerHeight -= footerHeight;

            return innerHeight;
        },
        getWidth: function() {
            return this.$el.offsetWidth;
        },
        getElByClass: function(className) {
            return document.getElementsByClassName(className)[0];
        },

        translateX: function(xVal, circleRadius) {
            return xVal + this.animationCenterPoint.xCoordinate - circleRadius;
        },

        translateY: function(yVal,circleRadius) {
            return yVal + this.animationCenterPoint.yCoordinate - circleRadius;
        },

        paintPoint: function(point) {
            var circleRadius = app.globals.radius;

            var pointX = this.translateX(point.x, circleRadius);
            var pointY = this.translateY(point.y, circleRadius);

            this.ctx.beginPath();
            this.ctx.arc(pointX, pointY, 2, 0, 2 * Math.PI);

            if (app.helpers.isPointInsideCircle(point, circleRadius)) {
                app.incrementPointsInCircle();
                this.ctx.strokeStyle = 'red';
            } else {
                this.ctx.strokeStyle = 'blue';
            }

            this.ctx.fillStyle = 'yellow';
            this.ctx.fill();
            this.ctx.stroke();
            app.controller.dispatchPaintPointResults()
        }
    };
})();
