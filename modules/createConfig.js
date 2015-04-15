module.exports = function(args) {
    var fs = require('fs'),
        beautify = require('js-beautify').js_beautify,
        colors = require('colors'),
        fileContent = beautify(fs.readFileSync(args.file, 'utf-8')),
        modules = [],
        modulesDone = [],
        split = fileContent.split('define('),
        translations = {},
        untranslated = {},
        translationConfig = {},
        rules = require('../rules.js'),
        stats = {
            success: 0,
            failed: 0,
            translated: 0,
            untranslated: 0
        },
        i;

    var testing = false,
        testingRule = 0,
        testingModule = 0;

    var ruleCheckers = {
        nameStart: require('./ruleCheckers/nameStart'),
        nameLength: require('./ruleCheckers/nameLength'),
        moduleLength: require('./ruleCheckers/moduleLength'),
        functionLength: require('./ruleCheckers/functionLength'),
        modules: require('./ruleCheckers/modules'),
        functions: require('./ruleCheckers/functions'),
        variables: require('./ruleCheckers/variables'),
        variablesContains: require('./ruleCheckers/variablesContains'),
        strings: require('./ruleCheckers/strings'),
        stringsContains: require('./ruleCheckers/stringsContains'),
        children: require('./ruleCheckers/children')
    };

    fs.writeFileSync(args.output ? args.output : args.file.substr(0, args.file.lastIndexOf('.')) + '.beautified.js', fileContent);

    function isNumber(value) {
        return !isNaN(parseInt(value, 10)) && isFinite(value);
    }

    function formatRuleNumber(a) {
        a = a.toString();
        for (var i = a.length; i < rules.length.toString().length; i++)
            a = '0' + a;
        return a;
    }

    function formatModuleNumber(a) {
        a = a.toString();
        for (var i = a.length; i < modules.length.toString().length; i++)
            a = '0' + a;
        return a;
    }

    function compare(original) {
        if (original.indexOf('hbs!template') === 0 || original.indexOf('handlebars') === 0 || original.indexOf('jquery') === 0 || original.indexOf('lang') === 0 || original.indexOf('app') === 0 || original.indexOf('backboneSuper') === 0 || original.indexOf('mwheelIntent') === 0) return;
        var originalParts = original.split('/'),
            nowParts = translate(original).split('/');

        for (var i in originalParts) {
            if (originalParts.hasOwnProperty(i) && originalParts[i] === nowParts[i]) {
                if (untranslated[i] === undefined) untranslated[i] = [];
                if (untranslated[i].indexOf(originalParts[i]) < 0)
                    untranslated[i].push(originalParts[i]);
            }
        }
    }

    function getChildren(id) {
        var identifier = modules[id].name,
            children = [];
        for (var i in modules) {
            if (!modules.hasOwnProperty(i)) continue;
            for (var j in modules[i].modules) {
                if (modules[i].modules.hasOwnProperty(j) && modules[i].modules[j] === identifier)
                    children.push(~~i);
            }
        }
        return children;
    }

    function getModuleByName(name) {
        for (var i in modules) {
            if (!modules.hasOwnProperty(i)) continue;
            if (modules[i].name === name || translate(modules[i].name) === name)
                return modules[i];
        }
        return null;
    }

    function translate(name) {
        var curPos = translations;
        var parts = name.split('/');
        for (var i in parts) {
            if (!parts.hasOwnProperty(i)) continue;
            var part = parts[i];
            if (curPos[part] != null) {
                parts[i] = curPos[part].translated;
                curPos = curPos[part].children;
            } else {
                break;
            }
        }
        return parts.join('/');
    }

    function getModule(id) {
        var module = {
                id: id - 1,
                name: '',
                modules: {},
                functions: {},
                variables: {},
                strings: []
            },
            modules = [], lines, moduleInfo, i;

        lines = split[id].split('\n');
        moduleInfo = lines[0].split('"');
        module.name = moduleInfo[1];

        if (moduleInfo.length > 1) {
            if (moduleInfo[2].indexOf('[') > -1) {
                for (i = 3; i < moduleInfo.length; i++) {
                    if (moduleInfo[i].indexOf(']') > -1)
                        break;
                    else if (moduleInfo[i].indexOf(',') < 0) {
                        if (moduleInfo[i].trim().length > 0)
                            modules.push(moduleInfo[i]);
                    }
                }
            }
        }

        try {
            var moduleVars = lines[0].split('(')[1].split(')')[0].split(',');
            for (i = 0; i < moduleVars.length; i++) {
                var a = moduleVars[i].split('"').join('').trim();
                if (a.length > 0 && a != '[]')
                    module.modules[a] = modules[i];
            }
        } catch (e) {
        }

        for (i = 1; i < lines.length; i++) {
            // Functions
            try {
                function functionInfoChecker(functionInfo) {
                    if (functionInfo.length > 1) {
                        var functionName = functionInfo[0].split('.')[functionInfo[0].split('.').length - 1].trim();
                        var functionArgs = functionInfo[1].split(')')[0].split(',');
                        functionName = functionName.split(' ')[functionName.split(' ').length - 1].trim();
                        if (functionArgs.length == 1 && functionArgs[0] === '')
                            functionArgs = [];
                        else
                            for (var j = 0; j < functionArgs.length; j++)
                                functionArgs[j] = functionArgs[j].trim();
                        module.functions[functionName] = functionArgs;
                    }
                }

                functionInfoChecker(lines[i].trim().split(': function('));
                functionInfoChecker(lines[i].trim().split('= function('));
            } catch (e) {
            }

            // Variables
            try {
                function variableInfoChecker(variableInfo) {
                    if (variableInfo.length > 1) {
                        if (variableInfo[1].indexOf('function') > -1) return;

                        var key = variableInfo[0].split(' ')[variableInfo[0].split(' ').length - 1].trim();
                        var value = variableInfo[1].split(',')[0].split('"').join('').trim();

                        if (value == '!0') value = true;
                        else if (value == '!1') value = false;
                        else if (typeof value === 'string' && isNumber(value)) value = parseInt(value, 10);

                        module.variables[key] = value;
                    }
                }

                variableInfoChecker(lines[i].trim().split(': '));
                variableInfoChecker(lines[i].trim().split(' = '));
            } catch (e) {
            }

            // Strings
            try {
                var stringInfo = lines[i].trim().split('"');
                if (stringInfo.length > 2) {
                    for (var j = 1; j < stringInfo.length; j += 2) {
                        if (module.strings.indexOf(stringInfo[j]) < 0) {
                            module.strings.push(stringInfo[j]);
                        }
                    }
                }
            } catch (e) {
            }
        }

        lines.shift();
        lines.pop();
        module.content = lines.join("\n");
        return module;
    }

    function runRules() {
        for (var a in rules) {
            if (!rules.hasOwnProperty(a)) continue;

            /**
             * @type {
             *      {
             *          idStart: number,
             *          idEnd: number,
             *          nameLength: number
             *          notNameLength: number,
             *          nameStart: string,
             *          notNameStart: string,
             *          name: array,
             *          notModuleLength: number,
             *          moduleLength: number,
             *          notFunctionLength: number,
             *          functionLength: number,
             *          modules: array,
             *          notModules: array,
             *          functions: array,
             *          notFunctions: array
             *      }
             * }
             */
            var rule = rules[a];

            var searchStart = 0,
                searchEnd = modules.length,
                matches = [], c;

            if (rule.id != null) {
                if (rule.id > searchEnd || rule.id < searchStart)
                    continue;
                searchStart = rule.id;
                searchEnd = rule.id + 1;
            } else if (rule.idStart != null || rule.idEnd != null) {
                if (rule.idStart != null) {
                    if (rule.idStart > searchEnd || rule.idStart < searchStart)
                        continue;
                    searchStart = rule.idStart;
                }
                if (rule.idEnd != null) {
                    if (rule.idEnd > searchEnd || rule.idEnd < searchStart)
                        continue;
                    searchEnd = rule.idEnd;
                }
            }

            for (var b = searchStart; b < searchEnd; b++) {
                if (modulesDone.indexOf(b) > -1) continue;
                var module = modules[b],
                    failed = false;

                for (c in ruleCheckers) {
                    if (ruleCheckers.hasOwnProperty(c)) {
                        if (!ruleCheckers[c](rule, module, translate, getModuleByName)) {
                            if (testing && a == testingRule && b == testingModule) {
                                console.log('[FAIL]'.red, c);
                            } else {
                                failed = true;
                                break;
                            }
                        } else {
                            if (testing && a == testingRule && b == testingModule) {
                                console.log('[PASS]'.green, c);
                            }
                        }
                    }
                }

                if (testing && a == testingRule && b == testingModule) {
                    process.exit(0);
                }

                if (failed) continue;

                matches.push(module);
                var nameParts = module.name.split('/');
                var curPos = translations;
                var curIndent = 0;
                for (c in nameParts) {
                    if (!nameParts.hasOwnProperty(c)) continue;

                    if (curPos[nameParts[c]] != null) {
                        if (curPos[nameParts[c]].children == null) {
                            curPos[nameParts[c]].children = {};
                        }
                        curPos = curPos[nameParts[c]].children;
                    } else {
                        if (rule.name[curIndent] != null) {
                            curPos[nameParts[c]] = {
                                translated: rule.name[curIndent]
                            };
                            stats.translated++;
                            if (c < nameParts.length - 1) {
                                curPos[nameParts[c]].children = {};
                                curPos = curPos[nameParts[c]].children;
                            }
                        } else {
                            throw new Error('Unknown translation');
                        }
                    }

                    curIndent++;
                }

                modulesDone.push(b);
                console.log('[Match found]'.green + '[Rule #' + formatRuleNumber(a) + '][Module #' + formatModuleNumber(b) + ']', translate(module.name));
            }

            if (matches.length > 1) {
                console.dir(matches);
                console.log(rule);
                stats.failed++;
                throw new Error('[OVERUSE]'.red + '[Rule #' + formatRuleNumber(a) + ']');
            } else if (matches.length === 0) {
                stats.failed++;
                console.log('[No Match Found]'.red + '[Rule #' + formatRuleNumber(a) + ']');
                console.log(rule);
            } else stats.success++;
        }
    }

    console.log('[CREATE CONFIG]', 'Searching for modules...');
    for (i = 1; i < split.length; i++) {
        modules.push(getModule(i));
    }
    console.log('[CREATE CONFIG]', 'Found', modules.length, 'module' + (modules.length === 1 ? '' : 's') + '!');

    console.log('[CREATE CONFIG]', 'Getting children of modules...');
    var childrenCount = 0;
    for (i = 1; i < modules.length; i++) {
        modules[i].children = getChildren(i);
        childrenCount += modules[i].children.length;
    }
    console.log('[CREATE CONFIG]', 'Found', childrenCount, 'children!');

    if (testing) {
        console.log('[CREATE CONFIG]', 'Running test on module', '#' + formatModuleNumber(testingModule), 'with rule', '#' + formatRuleNumber(testingRule) + '...');
    } else {
        console.log('[CREATE CONFIG]', 'Running rules on modules...');
    }

    runRules();

    console.log('[CREATE CONFIG]', 'Creating config...');
    for (i in modules) {
        if (!modules.hasOwnProperty(i)) continue;
        var module = modules[i],
            translatedName = translate(module.name);
        compare(module.name);
        if (module.name != translatedName)
            translationConfig[module.name] = translatedName;
        module.name = translatedName;
        for (var j in module.modules) {
            if (!module.modules.hasOwnProperty(j)) continue;
            try {
                if (module.modules[j] != null) {
                    translationConfig[module.modules[j]] = translate(module.modules[j]);
                    module.modules[j] = translate(module.modules[j]);
                }
            } catch (e) {
                console.log(module, e);
            }
        }
    }
    console.log('[CREATE CONFIG]', 'Config created!');

    fs.writeFileSync('deobfuscated.json', JSON.stringify(modules, null, 4));
    fs.writeFileSync('config.json', JSON.stringify(translationConfig, null, 4));
    fs.writeFileSync('config.tree.json', JSON.stringify(translations, null, 4));
    fs.writeFileSync('untranslated.json', JSON.stringify(untranslated, null, 4));

    console.log('[CREATE CONFIG] DONE!');

    for (i in untranslated) {
        if (!untranslated.hasOwnProperty(i)) continue;
        stats.untranslated += untranslated[i].length;
    }

    console.log('Rules:', (stats.success + ' success').green + ',', (stats.failed + ' failed').red, '(' + Math.round(stats.success / (stats.success + stats.failed) * 100) + '% success)');
    console.log('Strings:', (stats.translated + ' deobfuscated').green + ',', (stats.untranslated + ' obfuscated').red, '(' + Math.round(stats.translated / (stats.translated + stats.untranslated) * 100) + '% deobfuscated)');
};