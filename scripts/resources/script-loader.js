var scriptLoader = (function() {
    return {
        loadedScripts: {},

        resolve: function(module, callback) {
            var dependencies = module.dependencies;
            var numLoadedDependencies = 0;
            var dependencyLength = dependencies.length

            var doc = app.globals.document;
            var head = doc.getElementsByTagName('head')[0];

            dependencies.forEach(function(dependency) {
                var script = doc.createElement('script');
                script.type = 'text/javascript';
                script.src = dependency;
                script.onload = function(){
                    numLoadedDependencies += 1;
                };
                head.appendChild(script);
            });

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
        }
    }
})();
