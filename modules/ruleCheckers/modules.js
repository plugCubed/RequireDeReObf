function run(rule) {
    return rule.modules != null;
}

function notRun(rule) {
    return rule.notModules != null;
}

module.exports = function(rule, module, translate) {
    var modules, i;

    if (run(rule) || notRun(rule)) {
        modules = [];
        for (i in module.modules) {
            if (!module.modules.hasOwnProperty(i)) continue;
                modules.push(translate(module.modules[i]));
        }
    }

    if (run(rule)) {
        for (i in rule.modules) {
            if (!rule.modules.hasOwnProperty(i)) continue;
            if (modules.indexOf(rule.modules[i]) < 0) {
                return false;
            }
        }
    }

    if (notRun(rule)) {
        for (i in rule.notModules) {
            if (!rule.notModules.hasOwnProperty(i)) continue;
            if (modules.indexOf(rule.notModules[i]) > -1) {
                return false;
            }
        }
    }

    return true;
};