;(function() {
    app.squareView = {

        initialize: function($svg, animationCenterPoint) {
            this.$svg = $svg
            this.animationCenterPoint = animationCenterPoint;

            this.$el = document.createElementNS(
                app.constants.xmlNameSpace, 'rect'
            );

            this.checkbox = document.getElementsByClassName('display-settings square')[0];
            var self = this;
            this.checkbox.addEventListener('click', function(){ self.toggleView(); })

            this.render();
        },

        render: function() {
            if (this.checkbox.checked)
                this.appendSquare();
        },

        appendSquare: function() {
            var xCoordinate = this.animationCenterPoint.xCoordinate;
            var yCoordinate = this.animationCenterPoint.yCoordinate;

            var circleRadiusBase = Math.min(xCoordinate * 2, yCoordinate * 2);
            var circleRadius = circleRadiusBase / 2;

            this.$el.setAttribute('x', xCoordinate - circleRadius);
            this.$el.setAttribute('y', yCoordinate - circleRadius);

            var squareSide = app.globals.squareSide = circleRadius * 2;
            this.$el.setAttribute('height', squareSide);
            this.$el.setAttribute('width', squareSide);

            this.$el.setAttribute('fill', 'none');
            this.$el.setAttribute('stroke-width', '1');
            this.$el.setAttribute('stroke', 'black');

            this.$svg.appendChild(this.$el);
        },

        toggleView: function() {
            if (this.checkbox.checked) {
                this.$el.setAttribute('opacity', '1.0');
            } else {
                this.$el.setAttribute('opacity', '0.0');
            }
        }
    };

})();
