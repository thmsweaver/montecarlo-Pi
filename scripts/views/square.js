;(function() {

    var xmlNS = app.constants.xmlNameSpace;
    var doc = app.globals.document;
    var square = doc.createElementNS(xmlNS, 'rect');

    var mainView = app.mainView;
    var radiusBase = Math.min(mainView.width, mainView.height);
    var circleRadius = ((radiusBase / 2) * 0.9);
    var centerPoint = mainView.centerPoint;

    var squareX = centerPoint.xCoordinate - circleRadius;
    square.setAttribute('x', squareX);

    var squareY = centerPoint.yCoordinate - circleRadius;
    square.setAttribute('y', squareY);

    var squareSide = app.globals.squareSide = circleRadius * 2;
    square.setAttribute('height', squareSide);
    square.setAttribute('width', squareSide);

    square.setAttribute('fill', 'none');
    square.setAttribute('stroke-width', '2');
    square.setAttribute('stroke', 'black');

    mainView.squareView = {
        render: function() {
            mainView.svg.appendChild(square);
        }
    };

})();
