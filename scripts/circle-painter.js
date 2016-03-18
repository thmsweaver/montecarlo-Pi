
var circlePainter = (function(app) {

    var xmlNS = app.constants.xmlNameSpace;
    var circle = document.createElementNS(xmlNS, 'circle');

    var view = app.view;
    var centerPoint = view.centerPoint;
    circle.setAttribute('cx', centerPoint.xCoordinate);
    circle.setAttribute('cy', centerPoint.yCoordinate);

    var radiusBase = Math.min(view.width, view.height);
    var radius = ((radiusBase / 2) * 0.8);
    circle.setAttribute('r', radius);
    app.globals.radius = radius;

    circle.setAttribute('fill', 'none');
    circle.setAttribute('stroke-width', '2');
    circle.setAttribute('stroke', 'black');

    return {
        paintBounds: function() {
            var svg = view.svg;
            svg.appendChild(circle);
        }
    };

})(app);
