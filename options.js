
// Saves options to chrome.storage
function save_options() {
    var extensionEnabled = document.getElementById('enable_extension').checked;
    var btcExplorer = document.getElementById('btc_explorer').value;
    var ltcExplorer = document.getElementById('ltc_explorer').value;
    var dogeExplorer = document.getElementById('doge_explorer').value;

    chrome.storage.sync.set({
        "extensionEnabled": extensionEnabled,
        "btcExplorer": btcExplorer,
        "ltcExplorer": ltcExplorer,
        "dogeExplorer": dogeExplorer
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

// Restores select box and checkbox state using the preferences stored in chrome.storage.
function restore_options() {
    // First param of sync.get sets the defaults
    chrome.storage.sync.get({
        "extensionEnabled": true,
        "btcExplorer": "1",
        "ltcExplorer": "1",
        "dogeExplorer": "1"
    }, function(items) {
        document.getElementById('enable_extension').checked = items.likesColor;
        document.getElementById('btcExplorer').value = items.btcExplorer;
        document.getElementById('ltcExplorer').value = items.ltcExplorer;
        document.getElementById('dogeExplorer').value = items.dogeExplorer;
    });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);