module.exports = function(args) {
    var fs, beautify, colors, modules, translations, fileContent, defines, requires, i, j;

    fs = require('fs');
    beautify = require('js-beautify').js_beautify;
    colors = require('colors');
    modules = [];
    translations = require('../config.json');
    fileContent = beautify(fs.readFileSync(args.file, 'utf-8'));
    defines = fileContent.split('define(');
    requires = [];

    j = fileContent.split('require(');
    if (j.length > 0) {
        for (var k = 0; k < j.length; k++) {
            requires.push(j[k]);
        }
    }

    function translate(name) {
        return translations[name] ? translations[name] : name;
    }

    function getModule(id) {
        var module = {
                name: '', modules: {}, functions: {}, variables: {}, strings: []
            },
            modules = [],
            lines = defines[id].split('\n'),
            moduleInfo = lines[0].split('"');

        module.name = moduleInfo[1];
        if (moduleInfo.length > 1) {
            if (moduleInfo[2].indexOf('[') > -1) {
                for (i = 3; i < moduleInfo.length; i++) {
                    if (moduleInfo[i].indexOf(']') > -1) {
                        break;
                    } else if (moduleInfo[i].indexOf(',') > -1) {
                    } else if (moduleInfo[i].trim().length > 0) {
                        modules.push(moduleInfo[i]);
                    }
                }
            }
        }
        try {
            var moduleVars = lines[0].split('(')[1].split(')')[0].split(',');
            for (var i = 0; i < moduleVars.length; i++) {
                var a = moduleVars[i].split('"').join('').trim();
                if (a.length > 0 && a != '[]')
                    module.modules[a] = modules[i];
            }
        } catch (e) {
        }
        return module;
    }

    function getRequire(id) {
        var module = {
                name: '', modules: {}, functions: {}, variables: {}, strings: []
            },
            modules = [],
            lines = requires[id].split('\n'),
            moduleInfo = lines[0].split('"');

        for (i = 1; i < moduleInfo.length; i++) {
            if (moduleInfo[i].indexOf(']') > -1) {
                break;
            } else if (moduleInfo[i].indexOf(',') > -1) {
            } else if (moduleInfo[i].trim().length > 0) {
                modules.push(moduleInfo[i]);
            }
        }
        try {
            var moduleVars = lines[0].split('(')[1].split(')')[0].split(',');
            for (var i = 0; i < moduleVars.length; i++) {
                var a = moduleVars[i].split('"').join('').trim();
                if (a.length > 0 && a != '[]')
                    module.modules[a] = modules[i];
            }
        } catch (e) {
        }
        return module;
    }

    console.log('[DEOBFUSCATE]', 'Finding modules...');
    for (i = 1; i < defines.length; i++)
        modules.push(getModule(i));
    for (i = 1; i < requires.length; i++)
        modules.push(getRequire(i));
    console.log('[DEOBFUSCATE]', 'Found', modules.length, 'module' + (modules.length === 1 ? '' : 's') + '!');

    console.log('[DEOBFUSCATE]', 'Deobfuscating modules...');
    for (i in modules) {
        if (!modules.hasOwnProperty(i)) continue;
        try {
            var module = modules[i];
            if (module.name === '') continue;
            fileContent = fileContent.split('"' + module.name + '"').join('"' + translate(module.name) + '"');
            for (j in module.modules) {
                if (!module.modules.hasOwnProperty(j)) continue;
                try {
                    fileContent = fileContent.split('"' + module.modules[j] + '"').join('"' + translate(module.modules[j]) + '"');
                } catch (e) {
                    console.log(module, e);
                }
            }
        } catch (e) {
        }
    }
    console.log('[DEOBFUSCATE]', 'Deobfuscated!');
    fs.writeFileSync(args.output ? args.output : args.file.substr(0, args.file.length - 3) + '.deobfuscated.js', fileContent);
    console.log('[DEOBFUSCATE]', 'DONE!');
};