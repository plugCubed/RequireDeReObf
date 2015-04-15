function run(rule) {
    return rule.nameLength != null;
}

function notRun(rule) {
    return rule.notNameLength != null;
}

module.exports = function(rule, module) {
    if (run(rule)) {
        if (module.name.split('/').length != rule.nameLength)
            return false;
    }
    if (notRun(rule)) {
        if (module.name.split('/').length == rule.notNameLength)
            return false;
    }
    return true;
};