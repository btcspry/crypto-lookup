function removeContextMenu() {
	// Remove all the existing menu items (previous install maybe)
    chrome.contextMenus.removeAll();
}

function createContextMenu() {
    // Add the new menu items
    chrome.contextMenus.create({
		"id" : "autoLookup",
	    "title" : "Look Up Address / Bitcoin TXID",
	    "type" : "normal",
	    "contexts" : ["selection"]
	});
    chrome.contextMenus.create({
		"id" : "autoSendto",
	    "title" : "Send To Address",
	    "type" : "normal",
	    "contexts" : ["selection"]
	});
	chrome.contextMenus.create({
		"id" : "lookupLTCTX",
	    "title" : "Look Up Litecoin TXID",
	    "type" : "normal",
	    "contexts" : ["selection"]
	});
	chrome.contextMenus.create({
		"id" : "lookupDOGETX",
	    "title" : "Look Up Dogecoin TXID",
	    "type" : "normal",
	    "contexts" : ["selection"]
	});
	chrome.contextMenus.create({
		"id" : "lookupBTCBlock",
	    "title" : "Look Up Bitcoin Block",
	    "type" : "normal",
	    "contexts" : ["selection"]
	});
	chrome.contextMenus.create({
		"id" : "generateQR",
	    "title" : "Generate QR Code",
	    "type" : "normal",
	    "contexts" : ["selection"]
	});
}
