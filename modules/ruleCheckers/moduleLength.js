function runCheck(module) {
    var count = 0;

    for (var i in module.modules) {
        if (module.modules.hasOwnProperty(i))
            count++;
    }

    return count;
}

function run(rule) {
    return rule.moduleLength != null;
}

function notRun(rule) {
    return rule.notModuleLength != null;
}

module.exports = function(rule, module) {
    if (run(rule)) {
        if (runCheck(module) != rule.moduleLength)
            return false;
    }
    if (notRun(rule)) {
        if (runCheck(module) == rule.notModuleLength)
            return false;
    }
    return true;
};