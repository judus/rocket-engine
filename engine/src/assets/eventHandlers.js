export function handleLoadingBinary(terminal, binaryUrl) {
    const id = `loading-${binaryUrl}`;
    terminal.log(`Loading binary: ${binaryUrl}`, 'info', 'loading', id);
}

export function handleUnpackingBinary(terminal, binaryUrl) {
    const id = `unpacking-${binaryUrl}`;
    terminal.log(`Unpacking binary: ${binaryUrl}`, 'info', 'unpacking', id);
}

export function handleAssetRegistered(terminal, assetKey) {
    const id = `asset-${assetKey}`;
    terminal.log(`Asset registered: ${assetKey}`, 'info', 'loaded', id);
}

export function handleError(terminal, error) {
    terminal.log(`Error: ${error}`, 'error');
}

export function registerEventHandlers(eventBus, terminal) {
    eventBus.on('assets.loadingBinary', binaryUrl => handleLoadingBinary(terminal, binaryUrl));
    eventBus.on('assets.unpackingBinary', binaryUrl => handleUnpackingBinary(terminal, binaryUrl));
    eventBus.on('assets.assetRegistered', assetKey => handleAssetRegistered(terminal, assetKey));
    eventBus.on('assets.error', error => handleError(terminal, error));
}
