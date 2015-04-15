function run(rule) {
    return rule.variablesContains != null;
}

function notRun(rule) {
    return rule.notVariablesContains != null;
}

/**
 * @param {{variablesContains: *, notVariablesContains: *}} rule
 * @param module
 * @returns {boolean}
 */
module.exports = function(rule, module) {
    var i, j;

    if (run(rule)) {
        if (Array.isArray(rule.variablesContains)) {
            for (i in rule.variablesContains) {
                if (rule.variablesContains.hasOwnProperty(i)) {
                    var found = false;
                    for (j in module.variables) {
                        if (module.variables.hasOwnProperty(j)) {
                            if (module.variables[j].toString().indexOf(rule.variablesContains[i]) > -1) {
                                found = true;
                            }
                        }
                    }
                    if (!found)
                        return false;
                }
            }
        } else {
            for (i in rule.variablesContains) {
                if (rule.variablesContains.hasOwnProperty(i)) {
                    if (module.variables[i] == null || module.variables[i].toString().indexOf(rule.variablesContains[i]) < 0) {
                        return false;
                    }
                }
            }
        }
    }

    if (notRun(rule)) {
        if (Array.isArray(rule.notVariablesContains)) {
            for (i in rule.notVariablesContains) {
                if (rule.notVariablesContains.hasOwnProperty(i)) {
                    if (module.variables[i]) {
                        return false;
                    }
                    for (j in module.variables) {
                        if (module.variables.hasOwnProperty(j)) {
                            if (module.variables[j].toString().indexOf(rule.notVariablesContains[i]) > -1) {
                                return false;
                            }
                        }
                    }
                }
            }
        } else {
            for (i in rule.notVariablesContains) {
                if (rule.notVariablesContains.hasOwnProperty(i)) {
                    if (module.variables[i] != null && module.variables[i].toString().indexOf(rule.notVariablesContains[i]) > -1) {
                        return false;
                    }
                }
            }
        }
    }

    return true;
};
