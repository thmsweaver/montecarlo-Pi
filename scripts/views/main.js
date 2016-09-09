(function() {

    var mainView = {
        dependencies: [
            './scripts/views/circle.js',
            './scripts/views/square.js',
            './scripts/resources/helpers.js'
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
            startButton.addEventListener('click', function() {
                this.runSimulation()
            }.bind(this));
            startButton.disabled = false;

            this.piEstimateDisplay = this.getElByClass('piEstimate');
            this.pointsInSquareDisplay = this.getElByClass('pointsInSquare');
            this.pointsInCircleDisplay = this.getElByClass('pointsInCircle');
        },

        runSimulation: function() {
            var input = app.globals.document.getElementsByClassName('milliSeconds')[0];
            input.style = 'border: 1px solid black;';
            var value = parseInt(input.value);
            if (isNaN(value)) {
                input.style = 'border: 2px solid red;';
                return;
            }

            app.runSimulation(value);
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

        renderPointCounts: function(pointCount) {
            this.pointsInSquareDisplay.innerHTML = pointCount;
            var pointsInCircle = this.pointsInCircle;
            this.pointsInCircleDisplay.innerHTML = pointsInCircle;
            var piEstimate = (pointsInCircle / pointCount) * 4;
            this.piEstimateDisplay.innerHTML = piEstimate;
        },

        clearStats: function() {
            [
                this.pointsInSquareDisplay,
                this.pointsInCircleDisplay,
                this.piEstimateDisplay
            ].forEach(function(statDisplay) { statDisplay.innerHTML = 0; });

        },

        clearCanvas: function() {
            this.ctx.clearRect(0,0,canvas.width,canvas.height);
        },

        resetDisplay: function() {
            this.clearCanvas();
            this.clearStats();
        },

        paintPoint: function(point, pointCount) {
            var circleRadius = app.globals.radius;

            var pointX = this.translateX(point.x, circleRadius);
            var pointY = this.translateY(point.y, circleRadius);

            this.ctx.beginPath();
            this.ctx.arc(pointX, pointY, 2, 0, 2 * Math.PI);

            if (this.helpers.isPointInsideCircle(point, circleRadius)) {
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
