;(function() {
    app.circleView = {

        initialize: function($svg, animationCenterPoint) {
            this.$svg = $svg
            this.animationCenterPoint = animationCenterPoint;
            this.radius = app.globals.radius = Math.min(
                animationCenterPoint.xCoordinate, animationCenterPoint.yCoordinate
            );

            this.$el = document.createElementNS(
                app.constants.xmlNameSpace, 'circle'
            );

            var self = this;
            this.checkbox = document.getElementsByClassName('display-settings circle')[0];
            this.checkbox.addEventListener('click', function(){ self.toggleView(); })

            this.render();
        },

        render: function() {
            if (this.checkbox.checked) {
                this.appendCircle()
            }
        },

        appendCircle: function() {
            // TODO: set these at once?
            this.$el.setAttribute('cx', this.animationCenterPoint.xCoordinate);
            this.$el.setAttribute('cy', this.animationCenterPoint.yCoordinate);
            this.$el.setAttribute('r', this.radius);
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
