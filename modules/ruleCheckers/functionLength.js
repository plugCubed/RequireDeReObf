function runCheck(module) {
    var count = 0;

    for (var i in module.functions) {
        if (module.functions.hasOwnProperty(i))
            count++;
    }

    return count;
}

function run(rule) {
    return rule.functionLength != null;
}

function notRun(rule) {
    return rule.notFunctionLength != null;
}

module.exports = function(rule, module) {
    if (run(rule)) {
        if (runCheck(module) != rule.functionLength)
            return false;
    }

    if (notRun(rule)) {
        if (runCheck(module) == rule.notFunctionLength)
            return false;
    }

    return true;
};