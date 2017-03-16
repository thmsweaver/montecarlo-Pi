;(function() {
    app.circleView = {
        // TODO: a negative value is not accepted (small screen width)

        initialize: function($svg, animationCenterPoint) {
            this.$svg = $svg
            this.animationCenterPoint = animationCenterPoint;
            this.checkbox = document.getElementsByClassName('display-settings circle')[0];
            this.radius = app.globals.radius = Math.min(
                animationCenterPoint.xCoordinate, animationCenterPoint.yCoordinate
            );

            this.$el = document.createElementNS(
                app.constants.xmlNameSpace, 'circle'
            );

            this.render();
        },

        render: function() {
            this.appendCircle();
            this.toggleView();
        },

        appendCircle: function() {
            // TODO: set these at once?
            this.$el.setAttribute('cx', this.animationCenterPoint.xCoordinate);
            this.$el.setAttribute('cy', this.animationCenterPoint.yCoordinate);
            this.$el.setAttribute('r', this.radius);
            this.$el.setAttribute('fill', 'none');
            this.$el.setAttribute('stroke-width', '1');
            this.$el.setAttribute('stroke', 'black');
            this.$el.setAttribute('opacity', '0.0');

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
