function run(rule) {
    return rule.variables != null;
}

function notRun(rule) {
    return rule.notVariables != null;
}

/**
 * @param {{variables: *, notVariables: *}} rule
 * @param module
 * @returns {boolean}
 */
module.exports = function(rule, module) {
    var i;
    if (run(rule)) {
        if (Array.isArray(rule.variables)) {
            for (i in rule.variables) {
                if (!rule.variables.hasOwnProperty(i)) continue;
                if (module.variables[rule.variables[i]] == null) {
                    return false;
                }
            }
        } else {
            for (i in rule.variables) {
                if (!rule.variables.hasOwnProperty(i)) continue;
                if (module.variables[i] == null || module.variables[i] != rule.variables[i]) {
                    return false;
                }
            }
        }
    }

    if (notRun(rule)) {
        if (Array.isArray(rule.notVariables)) {
            for (i in rule.notVariables) {
                if (!rule.notVariables.hasOwnProperty(i)) continue;
                if (module.variables[rule.notVariables[i]] != null) {
                    return false;
                }
            }
        } else {
            for (i in rule.notVariables) {
                if (!rule.notVariables.hasOwnProperty(i)) continue;
                if (module.variables[i] != null && module.variables[i] == rule.notVariables[i]) {
                    return false;
                }
            }
        }
    }

    return true;
};
