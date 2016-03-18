
var squarePainter = (function(app) {

    var xmlNS = app.constants.xmlNameSpace;
    var square = document.createElementNS(xmlNS, 'rect');

    var view = app.view;
    var circleRadius = app.globals.radius;
    var centerPoint = view.centerPoint;

    var squareX = centerPoint.xCoordinate - circleRadius;
    square.setAttribute('x', squareX);

    var squareY = centerPoint.yCoordinate - circleRadius;
    square.setAttribute('y', squareY);

    var squareSide = circleRadius * 2;
    square.setAttribute('height', squareSide);
    square.setAttribute('width', squareSide);

    square.setAttribute('fill', 'none');
    square.setAttribute('stroke-width', '2');
    square.setAttribute('stroke', 'black');

    app.squarePainter = squarePainter;

    return {
        paintBounds: function() {
            var svg = view.svg;
            svg.appendChild(square);
        },
        paintData: function() {

        }
    };

})(app);
