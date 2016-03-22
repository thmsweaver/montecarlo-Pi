
(function() {

    var xmlNS = app.constants.xmlNameSpace;
    var doc = app.globals.document;
    var circle = doc.createElementNS(xmlNS, 'circle');

    var mainView = app.mainView
    var centerPoint = mainView.centerPoint;
    circle.setAttribute('cx', centerPoint.xCoordinate);
    circle.setAttribute('cy', centerPoint.yCoordinate);

    var radiusBase = Math.min(mainView.width, mainView.height);
    var radius = ((radiusBase / 2) * 0.8);
    app.globals.radius = radius;
    circle.setAttribute('r', radius);

    circle.setAttribute('fill', 'none');
    circle.setAttribute('stroke-width', '2');
    circle.setAttribute('stroke', 'black');

    mainView.circleView = {
        render: function() {
            mainView.svg.appendChild(circle);
        }
    };

})();
