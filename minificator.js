var domain = require('domain').createDomain();
domain.on('error', function (err) {
    console.log("Error has occured with some files: " + err.name + " " + err.message);
});

module.exports = function (srcFld, destFld) {
    domain.run(function () {

        var path = require('path');
        var fs = require('fs');
        var colors = require("colors");
        var minify = require("minify");
        var glob = require("glob");
        var filendir = require("filendir");

        console.log("Running!!!");
        console.log("Sources: " + srcFld);
        console.log("Destinations: " + destFld);
        console.log("Files were processed:");

        function minificate(filename) {
            console.log(filename);
            minify(filename, function (err, fileContent) {

                if (err) return console.log(err.red);

                var newFilePath = path.join(destFld, path.relative(srcFld, filename));

                filendir.writeFileAsync(newFilePath, fileContent, function (err) {
                    if (err) return console.log(err.red);
                    console.log(newFilePath.green);
                });
            });
        }

        glob(srcFld + "**/*.js", function (err, files) {
            console.log(files);
            files.forEach(function (val) {
                minificate(val);
            })
        });

    });
};
