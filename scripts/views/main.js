(function() {

    var mainView = {
        dependencies: [
            './scripts/views/circle.js',
            './scripts/views/square.js',
        ],

        initialize: function() {
            var header = app.globals.document.getElementsByClassName('header')[0];
            var headerBottomFromTop = header.offsetHeight;

            debugger
            var innerWidth = app.globals.window.innerWidth;
            var innerHeight = app.globals.window.innerHeight - headerBottomFromTop;

            this.height = innerHeight;
            this.width = innerWidth;
            this.centerPoint = {
                xCoordinate: (innerWidth / 2),
                yCoordinate: (innerHeight / 2)
            };

            scriptLoader.resolve(this, this.render.bind(this));
        },

        render: function() {
            this.configureSVG();
            this.configureCanvas();
            // this.circleView.render(this);
            // this.squareView.render(this);
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
            return xLeft + yLeft < Math.pow(circleRadius, 2);
        },

        paintPoint: function(point, pointCount) {
            var circleRadius = app.globals.radius;

            var pointX = this.translateX(point.x, circleRadius);
            var pointY = this.translateY(point.y, circleRadius);

            this.ctx.beginPath();
            this.ctx.arc(pointX, pointY, 2, 0, 2 * Math.PI);

            if (this.isInsideCircle(point, circleRadius)) {
                this.ctx.strokeStyle = 'red';
            } else {
                this.ctx.strokeStyle = 'blue';
            }

            this.ctx.stroke();
        }
    }

    app.mainView = mainView

})();
