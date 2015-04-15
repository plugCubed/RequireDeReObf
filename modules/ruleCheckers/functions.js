function run(rule) {
    return rule.functions != null;
}

function notRun(rule) {
    return rule.notFunctions != null;
}

module.exports = function(rule, module) {
    var i;
    if (run(rule)) {
        for (i in rule.functions) {
            if (!rule.functions.hasOwnProperty(i)) continue;
            if (typeof rule.functions[i] === 'string') {
                if (module.functions[rule.functions[i]] == null) {
                    return false;
                }
            } else {
                if (module.functions[rule.functions[i][0]] == null || module.functions[rule.functions[i][0]].length != rule.functions[i][1]) {
                    return false;
                }
            }
        }
    }

    if (notRun(rule)) {
        for (i in rule.notFunctions) {
            if (!rule.notFunctions.hasOwnProperty(i)) continue;
            if (typeof rule.notFunctions[i] === 'string') {
                if (module.functions[rule.notFunctions[i]] != null) {
                    return false;
                }
            } else {
                if (module.functions[rule.notFunctions[i][0]] != null && module.functions[rule.notFunctions[i][0]].length == rule.notFunctions[i][1]) {
                    return false;
                }
            }
        }
    }

    return true;
};