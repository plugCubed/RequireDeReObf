module.exports = function(args) {
    var fs, beautify, colors, modules, translations, fileContent, defines, requires;

    fs = require('fs');
    beautify = require('js-beautify').js_beautify;
    colors = require('colors');
    modules = {
        define: [],
        require: []
    };
    translations = require('../config.json');
    fileContent = beautify(fs.readFileSync(args.file, 'utf-8'));
    defines = fileContent.split(/(define|defined)\(/);
    requires = [];

    var a, i, j, module, translatedName, originalName;

    j = fileContent.split('require(');
    if (j.length > 0) {
        for (var k = 0; k < j.length; k++) {
            requires.push(j[k]);
        }
    }

    function whitelistedModule(name) {
        return name.indexOf('plugCubed/') === 0 || name.indexOf('hbs!') === 0 || ['module', 'jquery', 'underscore', 'sockjs', 'lang/Lang', 'backbone'].indexOf(name) > -1;
    }

    function translate(name) {
        for (j in translations) {
            if (translations.hasOwnProperty(j) && name == translations[j])
                return j;
        }
        return name;
    }

    function getModule(id) {
        var module, modules, lines, moduleInfo;

        module = {
            name: '',
            modules: {},
            functions: {},
            variables: {},
            strings: []
        };
        modules = [];
        lines = defines[id].split('\n');
        moduleInfo = lines[0].split("'");

        module.name = moduleInfo[1];
        if (moduleInfo.length > 1) {
            if (moduleInfo[2].indexOf('[') > -1) {
                for (i = 3; i < moduleInfo.length; i++) {
                    if (moduleInfo[i].indexOf(']') > -1) {
                        break;
                    }
                    if (moduleInfo[i].indexOf(',') > -1) {
                        continue;
                    }
                    if (moduleInfo[i].trim().length > 0) {
                        modules.push(moduleInfo[i]);
                    }
                }
            }
        }
        try {
            var moduleVars = lines[0].split('(')[1].split(')')[0].split(',');
            for (i = 0; i < moduleVars.length; i++) {
                var a = moduleVars[i].split("'").join('').trim();
                if (a.length > 0 && a != '[]' && ['jquery', 'lang/Lang', 'underscore', 'backbone'].indexOf(module.name) < 0)
                    module.modules[a] = modules[i];
            }
        } catch (e) {
        }
        return module;
    }

    function getRequire(id) {
        var module, modules, lines, moduleInfo;

        module = {
            name: '',
            modules: {},
            functions: {},
            variables: {},
            strings: []
        };
        modules = [];
        lines = requires[id].split('\n');
        moduleInfo = lines[0].split("'");

        if (lines[0].indexOf('[') < 0) {
            module.name = moduleInfo[1];
        } else {
            for (i = 1; i < moduleInfo.length; i++) {
                if (moduleInfo[i].indexOf(']') > -1) {
                    break;
                }
                if (moduleInfo[i].indexOf(',') > -1) {
                    continue;
                }
                if (moduleInfo[i].trim().length > 0) {
                    modules.push(moduleInfo[i]);
                }
            }
            try {
                var moduleVars = lines[0].indexOf('[') < 0 ? lines[0] : lines[0].split('(')[1].split(')')[0].split(',');
                for (i = 0; i < moduleVars.length; i++) {
                    var a = moduleVars[i].split("'").join('').trim();
                    if (a.length > 0 && a != '[]' && ['jquery', 'lang/Lang', 'underscore', 'backbone'].indexOf(module.name) < 0) {
                        module.modules[a] = modules[i];
                    }
                }
            } catch (e) {
            }
        }
        return module;
    }

    console.log('[REOBFUSCATE]', 'Finding modules...');
    for (var _define = 1; _define < defines.length; _define++) {
        module = getModule(_define);
        if (module.name == null || module.name === '' || ['jquery', 'lang/Lang', 'underscore', 'backbone'].indexOf(module.name) > 0) continue;
        if ((function() {
                for (var _module in modules) {
                    if (modules.hasOwnProperty(_module) && modules[_module].name === module.name)
                        return true;
                }
                return false;
            })())
            continue;
        if (args.verbose === true)
            console.log('[REOBFUSCATE] Found module:', module.name);
        modules.define.push(module);
    }
    for (var _require = 1; _require < requires.length; _require++) {
        module = getRequire(_require);
        if (module.name == null || module.name === '' || ['jquery', 'lang/Lang', 'underscore', 'backbone'].indexOf(module.name) > 0) continue;
        if (args.verbose === true)
            console.log('[REOBFUSCATE] Found require:', module.name);
        modules.require.push(module);
    }
    console.log('[REOBFUSCATE]', 'Found', modules.define.length + modules.require.length, 'module' + (modules.define.length + modules.require.length === 1 ? '' : 's') + '!');

    console.log('[REOBFUSCATE]', 'Reobfuscating modules...');
    var reobfuscatedNames = [];
    for (i in modules.define) {
        if (!modules.define.hasOwnProperty(i)) continue;
        module = modules.define[i];
        if (reobfuscatedNames.indexOf(module.name) < 0 && module.name !== '' && !whitelistedModule(module.name)) {
            translatedName = translate(module.name);
            if (module.name == translatedName) {
                if (args.verbose === true) {
                    console.log('[REOBFUSCATE] Could not reobfuscate the unknown module'.red, module.name);
                } else {
                    throw new Error('[REOBFUSCATE] Could not reobfuscate the unknown module '.red + module.name);
                }
            } else {
                a = fileContent.split("'" + module.name + "'");
                fileContent = a.join("'" + translate(module.name) + "'");
                reobfuscatedNames.push(module.name);
                if (args.verbose === true)
                    console.log('[REOBFUSCATE] Reobfuscate module', module.name, 'to', translate(module.name), a.length - 1, a.length - 1 === 1 ? 'place' : 'places');
            }
        }
        for (j in module.modules) {
            if (!module.modules.hasOwnProperty(j)) continue;
            originalName = module.modules[j];
            translatedName = translate(module.modules[j]);
            if (reobfuscatedNames.indexOf(originalName) > -1 || originalName === '' || whitelistedModule(originalName))
                continue;
            if (originalName == translatedName) {
                if (args.verbose === true) {
                    console.log('[REOBFUSCATE] Could not reobfuscate the unknown require'.red, originalName);
                } else {
                    throw new Error('[REOBFUSCATE] Could not reobfuscate the unknown require '.red + originalName);
                }
            } else {
                a = fileContent.split("'" + originalName + "'");
                fileContent = a.join("'" + translatedName + "'");
                reobfuscatedNames.push(originalName);
                if (args.verbose === true)
                    console.log('[REOBFUSCATE] Reobfuscate require', originalName, 'to', translatedName, a.length - 1, a.length - 1 === 1 ? 'place' : 'places');
            }
        }
    }
    for (i in modules.require) {
        if (!modules.require.hasOwnProperty(i)) continue;
        module = modules.require[i];
        if (reobfuscatedNames.indexOf(module.name) < 0 && module.name !== '' && !whitelistedModule(module.name)) {
            translatedName = translate(module.name);
            if (module.name == translatedName) {
                if (args.verbose === true) {
                    console.log('[REOBFUSCATE] Could not reobfuscate the unknown require'.red, module.name);
                } else {
                    throw new Error('[REOBFUSCATE] Could not reobfuscate the unknown require '.red + module.name);
                }
            } else {
                a = fileContent.split("'" + module.name + "'");
                fileContent = a.join("'" + translate(module.name) + "'");
                reobfuscatedNames.push(module.name);
                if (args.verbose === true)
                    console.log('[REOBFUSCATE] Reobfuscate require', module.name, 'to', translate(module.name), a.length - 1, a.length - 1 === 1 ? 'place' : 'places');
            }
        }
        for (j in module.modules) {
            if (!module.modules.hasOwnProperty(j)) continue;
            originalName = module.modules[j];
            translatedName = translate(module.modules[j]);
            if (reobfuscatedNames.indexOf(originalName) > -1 || originalName === '' || whitelistedModule(originalName))
                continue;
            if (originalName == translatedName) {
                if (args.verbose === true) {
                    console.log('[REOBFUSCATE] Could not reobfuscate the unknown require'.red, originalName);
                } else {
                    throw new Error('[REOBFUSCATE] Could not reobfuscate the unknown require '.red + originalName);
                }
            } else {
                a = fileContent.split("'" + originalName + "'");
                fileContent = a.join("'" + translatedName + "'");
                reobfuscatedNames.push(originalName);
                if (args.verbose === true)
                    console.log('[REOBFUSCATE] Reobfuscate require', originalName, 'to', translatedName, a.length - 1, a.length - 1 === 1 ? 'place' : 'places');
            }
        }
    }
    console.log('[REOBFUSCATE]', 'Reobfuscated!');
    fs.writeFileSync(args.output ? args.output : args.file.substr(0, args.file.lastIndexOf('.')) + '.reobfuscated', fileContent);
    console.log('[REOBFUSCATE]', 'DONE!');
};