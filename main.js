var program = require('commander'),
    fs = require('fs'),
    modules = {
        createConfig: require('./modules/createConfig.js'),
        reobfuscate: require('./modules/reobfuscate.js'),
        deobfuscate: require('./modules/deobfuscate.js')
    };

program
    .version('1.0.0')
    .option('-c, --config', 'Create config')
    .option('-r, --reobfuscate', 'Reobfuscate')
    .option('-d, --deobfuscate', 'Deobfuscate')
    .option('-f, --file <path>', 'File')
    .option('-o, --output <path>', 'Output')
    .option('-v, --verbose', 'Verbose')
    .parse(process.argv);

console.log('Require.JS Deobfuscation/Reobfuscation');
console.log('by Thomas "TAT" Andresen');
console.log('');
console.log('Deobfuscate / Reobfuscate require.js module names');
console.log('');

var count = 0;
count += program.config ? 1 : 0;
count += program.reobfuscate ? 1 : 0;
count += program.deobfuscate ? 1 : 0;

if (count === 0 || count > 1 || !program.file)
    program.help();

console.log('Selected action:', program.config ? 'Create config file' : (program.reobfuscate ? 'Reobfuscate' : 'Deobfuscate'));
console.log('');

if (!fs.existsSync(program.file)) {
    console.log('File not found');
    return;
}

var args = {
    file: program.file,
    output: program.output,
    verbose: program.verbose
};

if (program.config) modules.createConfig(args);
if (program.reobfuscate) modules.reobfuscate(args);
if (program.deobfuscate) modules.deobfuscate(args);