var readline = require('readline');

module.exports = function (config, questions, cb) {
    var i = 0;
    var rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    function ask(i) {
        if (!questions[i]) {
            rl.close();
            cb();
            return;
        }
        if (!config[questions[i].key]) {

            rl.question(questions[i].question, function (answer) {
                config[questions[i].key] = answer;
                ask(++i);
            })

        } else {
            ask(++i);
        }
    }
    ask(i);
};