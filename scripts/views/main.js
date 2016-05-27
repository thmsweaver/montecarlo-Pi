(function() {

    var mainView = {
        dependencies: [
            './scripts/views/circle.js',
            './scripts/views/square.js',
        ],

        initialize: function() {
            var header = app.globals.document.getElementsByClassName('header')[0];
            var headerBottomFromWindowTop = header.offsetHeight + header.offsetTop;

            var innerWidth = app.globals.window.innerWidth;
            var innerHeight = app.globals.window.innerHeight - headerBottomFromWindowTop;

            this.pointsInSquare = 0;
            this.pointsInCircle = 0;

            this.height = innerHeight;
            this.width = innerWidth;
            this.centerPoint = {
                xCoordinate: (innerWidth / 2),
                yCoordinate: (innerHeight / 2)
            };

            scriptLoader.resolve(this.dependencies, this.render.bind(this));
        },

        getElByClass: function(className) {
            var doc = app.globals.document;
            return doc.getElementsByClassName(className)[0];
        },

        render: function() {
            this.configureSVG();
            this.configureCanvas();
            this.circleView.render(this);
            this.squareView.render(this);

            var startButton = this.startButton = this.getElByClass('startButton');
            startButton.addEventListener('click', function() { app.runSimulation(); });
            startButton.disabled = false;

            this.piEstimateDisplay = this.getElByClass('piEstimate');
            this.pointsInSquareDisplay = this.getElByClass('pointsInSquare');
            this.pointsInCircleDisplay = this.getElByClass('pointsInCircle');
        },

        configureSVG: function() {
            var doc = app.globals.document;

            var svg = doc.getElementById('svg');
            // TODO: can setting this shit to 100% work?
            svg.setAttribute('width', this.width);
            svg.setAttribute('height', this.height);
            svg.setAttribute('xmlns', app.constants.xmlNameSpace);
            this.svg = svg;
        },

        configureCanvas: function() {
            var canvas = app.globals.document.getElementById('canvas');
            canvas.width = this.width;
            canvas.height = this.height;
            this.ctx = canvas.getContext('2d');
        },

        translateX: function(xVal, circleRadius) {
            return xVal + this.centerPoint.xCoordinate - circleRadius;
        },

        translateY: function(yVal,circleRadius) {
            return yVal + this.centerPoint.yCoordinate - circleRadius;
        },

        isInsideCircle: function(point, circleRadius) {
            var xLeft = Math.pow((point.x - circleRadius), 2);
            var yLeft = Math.pow((point.y - circleRadius), 2);
            return xLeft + yLeft <= Math.pow(circleRadius, 2);
        },

        renderPointCounts: function(pointCount) {
            this.pointsInSquareDisplay.innerHTML = pointCount;
            var pointsInCircle = this.pointsInCircle;
            this.pointsInCircleDisplay.innerHTML = pointsInCircle;
            var piEstimate = (pointsInCircle / pointCount) * 4;
            this.piEstimateDisplay.innerHTML = piEstimate;
        },

        paintPoint: function(point, pointCount) {
            var circleRadius = app.globals.radius;

            var pointX = this.translateX(point.x, circleRadius);
            var pointY = this.translateY(point.y, circleRadius);

            this.ctx.beginPath();
            this.ctx.arc(pointX, pointY, 2, 0, 2 * Math.PI);

            if (this.isInsideCircle(point, circleRadius)) {
                this.pointsInCircle++;
                this.ctx.strokeStyle = 'red';
            } else {
                this.ctx.strokeStyle = 'blue';
            }

            this.ctx.fillStyle = 'yellow';
            this.ctx.fill();
            this.ctx.stroke();
            this.renderPointCounts(pointCount);
        }
    }

    app.mainView = mainView

})();
