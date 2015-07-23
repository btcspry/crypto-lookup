
// Saves options to chrome.storage
function save_options() {
    var extensionEnabled = document.getElementById('enable_extension').checked;
    var btcExplorer = document.getElementById('btc_explorer').value;
    var ltcExplorer = document.getElementById('ltc_explorer').value;
    var dogeExplorer = document.getElementById('doge_explorer').value;
    var qrGenerator = document.getElementById('qr_generator').value;

    chrome.storage.sync.set({
        "extensionEnabled": extensionEnabled,
        "btcExplorer": btcExplorer,
        "ltcExplorer": ltcExplorer,
        "dogeExplorer": dogeExplorer,
        "qrGenerator": qrGenerator
    }, function() {
        // Update status to let user know options were saved.
        document.getElementById('status').innerHTML = "<p>Options saved.</p>";
        setTimeout(function() {
            document.getElementById('status').innerHTML = "";
        }, 1500);
    });

    // Remove all the context menu items
    removeContextMenu();

    // If it is enabled, create the context menu
    if (extensionEnabled) { createContextMenu(); }
}

// Restores the option states (making them appear persistent) using the preferences stored in chrome.storage.
function restore_options() {
    // First param of sync.get sets the defaults
    chrome.storage.sync.get({
        "extensionEnabled": true,
        "btcExplorer": "1",
        "ltcExplorer": "1",
        "dogeExplorer": "1",
        "qrGenerator": "3"
    }, function(items) {
        document.getElementById('enable_extension').checked = items.extensionEnabled;
        document.getElementById('btc_explorer').value = items.btcExplorer;
        document.getElementById('ltc_explorer').value = items.ltcExplorer;
        document.getElementById('doge_explorer').value = items.dogeExplorer;
        document.getElementById('qrGenerator').value = items.qrGenerator;
    });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);