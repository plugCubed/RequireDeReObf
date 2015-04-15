function isChild(module, child) {
    return module.children.indexOf(child.id) > -1;
}

function run(rule) {
    return rule.children != null;
}

function notRun(rule) {
    return rule.notChildren != null;
}

/**
 * @param {{children: array, notChildren: array}} rule
 * @param module
 * @param translate
 * @param getModuleByName
 * @returns {boolean}
 */
module.exports = function(rule, module, translate, getModuleByName) {
    var i, child;

    if (run(rule)) {
        for (i in rule.children) {
            if (!rule.children.hasOwnProperty(i)) continue;

            child = getModuleByName(rule.children[i]);
            if (child == null) {
                return false;
            } else {
                if (!isChild(module, child, translate))
                    return false;
            }
        }
    }

    if (notRun(rule)) {
        for (i in rule.notChildren) {
            if (!rule.notChildren.hasOwnProperty(i)) continue;

            child = getModuleByName(rule.notChildren[i]);
            if (child != null) {
                if (isChild(module, child, translate))
                    return false;
            }
        }
    }

    return true;
};