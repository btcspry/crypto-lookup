function removeContextMenu() {
	// Remove all the existing menu items (previous install maybe)
    chrome.contextMenus.removeAll();
}

function createContextMenu() {
    // Add the new menu items
    chrome.contextMenus.create({
		"id" : "autoLookup",
	    "title" : "Auto-Lookup Text",
	    "type" : "normal",
	    "contexts" : ["selection"]
	});
	chrome.contextMenus.create({
		"id" : "lookupBTCAddress",
	    "title" : "Look Up Bitcoin Address",
	    "type" : "normal",
	    "contexts" : ["selection"]
	});
	chrome.contextMenus.create({
		"id" : "sendtoBTCAddress",
	    "title" : "Send To Bitcoin Address",
	    "type" : "normal",
	    "contexts" : ["selection"]
	});
	chrome.contextMenus.create({
		"id" : "lookupLTCAddress",
	    "title" : "Look Up Litecoin Address",
	    "type" : "normal",
	    "contexts" : ["selection"]
	});
	chrome.contextMenus.create({
		"id" : "sendtoLTCAddress",
	    "title" : "Send To Litecoin Address",
	    "type" : "normal",
	    "contexts" : ["selection"]
	});
	chrome.contextMenus.create({
		"id" : "lookupDOGEAddress",
	    "title" : "Look Up Dogecoin Address",
	    "type" : "normal",
	    "contexts" : ["selection"]
	});
	chrome.contextMenus.create({
		"id" : "sendtoDOGEAddress",
	    "title" : "Send To Dogecoin Address",
	    "type" : "normal",
	    "contexts" : ["selection"]
	});
	chrome.contextMenus.create({
		"id" : "lookupBTCTX",
	    "title" : "Look Up Bitcoin TXID",
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
}
