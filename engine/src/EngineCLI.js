const {program} = require('commander');
const path = require('path');
const AssetPackager = require('./AssetPackager');

program
    .version('1.0.0')
    .description('Rocket Engine CLI for managing assets and engine operations');

program
    .command('package-assets')
    .description('Package assets into a binary file')
    .option('-c, --config <path>', 'Path to the asset configuration file', 'assetConfig.json')
    .option('-o, --output <name>', 'Name of the output binary file', 'assets.bin')
    .action((options) => {
        const configPath = path.resolve(process.cwd(), options.config);
        const assetPackager = new AssetPackager(configPath, options.output);
        assetPackager.packageAssets()
            .then(() => console.log('Assets packaged successfully'))
            .catch(error => console.error('Error packaging assets:', error));
    });

program.parse(process.argv);
