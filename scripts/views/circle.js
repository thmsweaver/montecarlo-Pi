;(function() {
    var xmlNS = app.constants.xmlNameSpace;
    var doc = app.globals.document;
    var circle = doc.createElementNS(xmlNS, 'circle');

    var mainView = app.mainView
    var centerPoint = mainView.centerPoint;
    circle.setAttribute('cx', centerPoint.xCoordinate);
    circle.setAttribute('cy', centerPoint.yCoordinate);

    var radiusBase = Math.min(mainView.width, mainView.height);
    var radius = app.globals.radius = ((radiusBase / 2) * 0.9);
    circle.setAttribute('r', radius);

    circle.setAttribute('fill', 'none');
    circle.setAttribute('stroke-width', '2');
    circle.setAttribute('stroke', 'black');

    mainView.circleView = {
        init: function() {
            this.checkbox = mainView.getElByClass('display-settings circle')
            var self = this;
            this.checkbox.addEventListener('click', function(){ self.toggleView(); })
            this.render();
        },

        render: function() {
            if (this.checkbox.checked) {
                mainView.svg.appendChild(circle);
            }
        },

        toggleView: function() {
            var el = doc.getElementsByTagName('circle')[0]
            if (this.checkbox.checked) {
                el.setAttribute('opacity', '1.0');
            } else {
                el.setAttribute('opacity', '0.0');
            }
        }
    };
})();
