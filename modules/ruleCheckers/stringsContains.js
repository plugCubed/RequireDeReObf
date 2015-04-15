function run(rule) {
    return rule.stringsContains != null;
}

function notRun(rule) {
    return rule.notStringsContains != null;
}

/**
 * @param {{stringsContains: *, notStringsContains: *}} rule
 * @param module
 * @returns {boolean}
 */
module.exports = function(rule, module) {
    var i, j;

    if (run(rule)) {
        for (i in rule.stringsContains) {
            if (rule.stringsContains.hasOwnProperty(i)) {
                var found = false;
                for (j in module.strings) {
                    if (module.strings.hasOwnProperty(j)) {
                        if (module.strings[j].indexOf(rule.stringsContains[i]) > -1) {
                            found = true;
                        }
                    }
                }
                if (!found)
                    return false;
            }
        }
    }

    if (notRun(rule)) {
        for (i in rule.notStringsContains) {
            if (rule.notStringsContains.hasOwnProperty(i)) {
                for (j in module.strings) {
                    if (module.strings.hasOwnProperty(j)) {
                        if (module.strings[j].indexOf(rule.notStringsContains[i]) > -1) {
                            return false;
                        }
                    }
                }
            }
        }
    }

    return true;
};
