function run(rule) {
    return rule.strings != null;
}

function notRun(rule) {
    return rule.notStrings != null;
}

/**
 * @param {{strings: *, notStrings: *}} rule
 * @param module
 * @returns {boolean}
 */
module.exports = function(rule, module) {
    var i;

    if (run(rule)) {
        for (i in rule.strings) {
            if (rule.strings.hasOwnProperty(i) && module.strings.indexOf(rule.strings[i]) < 0) {
                return false;
            }
        }
    }

    if (notRun(rule)) {
        for (i in rule.notStrings) {
            if (rule.notStrings.hasOwnProperty(i) && module.strings.indexOf(rule.notStrings[i]) > -1) {
                return false;
            }
        }
    }

    return true;
};
