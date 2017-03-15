;(function() {

    var helpers = {
        isPointInsideCircle: function(point, circleRadius) {
            var xLeft = Math.pow((point.x - circleRadius), 2);
            var yLeft = Math.pow((point.y - circleRadius), 2);
            return xLeft + yLeft <= Math.pow(circleRadius, 2);
        },

        getElByClass: function(className) {
            // TODO: or raise?
            return document.getElementsByClassName(className)[0];
        },

        emptyNode: function(node) {
            while (node.firstChild) node.removeChild(node.firstChild);
        },

        isStorageEnabled: function(storageType) {
            if (!window[storageType]) return false;
            var test = 'test';

            try {
                localStorage.setItem(test, test);
                localStorage.getItem(test);
                localStorage.removeItem(test);
                return true;
            } catch(e) {
                return false;
            }
        }
    }

    app.helpers = helpers;
})();
