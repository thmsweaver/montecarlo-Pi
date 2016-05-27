var scriptLoader = (function() {
    return {
        loadedScripts: {},

        resolve: function(dependencies, callback) {
            var numLoadedDependencies = 0;
            var dependencyLength = dependencies.length
            var doc = app.globals.document;
            var head = doc.getElementsByTagName('head')[0];

            for (var i = 0; i < dependencyLength; i++) {
                var dependency = dependencies[i];
                var fileName = this.getFileName(dependency);
                if (app[fileName]) { continue; }

                var script = doc.createElement('script');
                script.type = 'text/javascript';
                script.src = dependency;
                script.onload = function(){
                    numLoadedDependencies += 1;
                };
                head.appendChild(script);
                head.removeChild(script);
            }

            // TODO: does setInterval need an int?
            var checkLoadedDependenciesIntervalId = setInterval(function() {
                if (dependencyLength === numLoadedDependencies) {
                    clearInterval(checkLoadedDependenciesIntervalId);
                    clearTimeout(timeoutId);
                    callback();
                }
            }, 1);

            var timeoutId = setTimeout(function() {
                clearInterval(checkLoadedDependenciesIntervalId);
            }, 30000);
        },

        // TODO: name this better
        getFileName: function(filePath) {
            var fileParts = filePath.split(/\//g).pop();
            var filename = fileParts.split(/\./)[0];

            if (~filename.indexOf(/-/)) {
                return this.filenameToCamelCase(filename);
            } else {
                return filename
            }
        },

        filenameToCamelCase: function(filename) {
            var filenameParts = filename.split(/-/g);
            return filenameParts.map(function(filePart, index) {
                if (index != 0) {
                    return filePart.charAt(0).toUpperCase() + filePart.slice(1);
                } else {
                    return filePart;
                }
            }).join('');
        }
    }
})();
