function run(rule) {
    return rule.nameStart != null;
}

function notRun(rule) {
    return rule.notNameStart != null;
}

module.exports = function(rule, module, translate) {
    if (run(rule)) {
        if (!(translate(module.name).indexOf(rule.nameStart) == 0)) {
            return false;
        }
    }
    if (notRun(rule)) {
        if (translate(module.name).indexOf(rule.notNameStart) == 0)
            return false;
    }
    return true;
};