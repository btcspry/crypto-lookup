// Config context menus upon first install
chrome.runtime.onInstalled.addListener(function(request) {
	// Remove old version (if installed)
	removeContextMenu();
	// Add the new ones
	createContextMenu();
});

// Set the event listener ONCE at the beginning
chrome.contextMenus.onClicked.addListener(contextClickHandler);

// Define what happens when the menu items are clicked
function contextClickHandler(info, tab) {
	
	
	chrome.storage.sync.get({
        "extensionEnabled": true,
        "btcExplorer": "1",
        "ltcExplorer": "1",
        "dogeExplorer": "1",
        "qrGenerator": "3"
    }, function(items) {

    	// The following static object is for debugging, and is replaced by the definition based on options stored in chrome.storage.sync
    	/*var lookupConfig = {
			"BTCAddress" : "https://blockchain.info/address/",
			"LTCAddress" : "https://block-explorer.com/address/",
			"DOGEAddress": "https://dogechain.info/address/",
			"BTCTX" : "https://blockchain.info/tx/",
			"LTCTX" : "https://block-explorer.com/tx/",
			"DOGETX": "https://dogechain.info/tx/",
			"BTCBlock" : "https://blockchain.info/block/"
		};*/

		var sText = info.selectionText.replace(/ /g,'');
		var itemID = info.menuItemId;
		var newtab = true;

		// Build configs based on options from the options window
        var lookupConfig = {
        	"BTCAddress": ["https://blockchain.info/address/", "https://live.blockcypher.com/btc/address/", "https://chain.so/address/BTC/", "https://btc.blockr.io/address/info/"][items.btcExplorer-1],
        	"LTCAddress": ["https://block-explorer.com/address/", "https://live.blockcypher.com/ltc/address/", "https://chain.so/address/LTC/", "https://ltc.blockr.io/address/info/"][items.ltcExplorer-1],
        	"DOGEAddress": ["https://dogechain.info/address/", "https://live.blockcypher.com/doge/address/", "https://chain.so/address/DOGE/"][items.dogeExplorer-1],

        	"BTCTX": ["https://blockchain.info/tx/", "https://live.blockcypher.com/btc/tx/", "https://chain.so/tx/BTC/", "https://btc.blockr.io/tx/info/"][items.btcExplorer-1],
        	"LTCTX": ["https://block-explorer.com/tx/", "https://live.blockcypher.com/ltc/tx/", "https://chain.so/tx/LTC/", "https://ltc.blockr.io/tx/info/"][items.ltcExplorer-1],
        	"DOGETX": ["https://dogechain.info/tx/", "https://live.blockcypher.com/doge/tx/", "https://chain.so/tx/DOGE/"][items.dogeExplorer-1],

        	"BTCBlock": ["https://blockchain.info/block/", "https://live.blockcypher.com/btc/block/", "https://chain.so/block/BTC/", "https://btc.blockr.io/block/info/"][items.btcExplorer-1],
        	"QRGenerator": ["https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=", "http://chart.apis.google.com/chart?cht=qr&chs=400x400&chl=", "http://qrickit.com/api/qr?qrsize=400&d="][items.qrGenerator-1],
        };
		var sendtoConfig = {
			"BTC":"bitcoin:",
			"LTC":"litecoin:",
			"DOGE":"dogecoin:"
		};

        // Set the URL based on the config and the type of click
		if (itemID.indexOf("lookup") > -1) {
			// Note that the address lookup is never used anymore (it's automatic)
			_.each(["Address","TX","Block"], function (textType) {
				if (itemID.indexOf(textType) > -1) {
					_.each(["BTC","LTC","DOGE"], function (coinType) {
						if (itemID.indexOf(coinType) > -1) {
							url = lookupConfig[coinType+textType];
						}
					});
				}
			});
		}
		/*else if (itemID.indexOf("sendto") > -1) {
			_.each(["BTC","LTC","DOGE"], function (coinType) {
				if (itemID.indexOf(coinType) > -1) {
					url = sendtoConfig[coinType];
					newtab = false;
				}
			});
		} */
		else if (itemID == "autoLookup") {
			if(sText.match(/^[13][a-km-zA-HJ-NP-Z1-9]{26,33}$/)) {
		        // Bitcoin Address
		        url = lookupConfig["BTCAddress"];
		    }
		    else if(sText.match(/^L[a-km-zA-HJ-NP-Z1-9]{26,33}$/)) {
		    	// Litecoin Address
		    	url = lookupConfig["LTCAddress"];
		    }
		    else if(sText.match(/^D[a-km-zA-HJ-NP-Z1-9]{26,33}$/)) {
		    	// Dogecoin Address
		    	url = lookupConfig["DOGEAddress"];
		    }
		    else if(sText.match(/^[A-Fa-f0-9]{64}$/)) {
		    	// SHA256 Hash - Assuming TXID
		    	url = lookupConfig["BTCTX"];
		    }
		    else {
		        // Not a valid cryptocurrency address or tx format
		        alert("Please select a valid address (bitcoin, litecoin, or dogecoin only), or bitcoin TXID.");
		        return 0;
		    }
		}
		else if (itemID == "autoSendto") {
			if(sText.match(/^[13][a-km-zA-HJ-NP-Z1-9]{26,33}$/)) {
		        // Bitcoin Address
		        url = sendtoConfig["BTC"];
		    }
		    else if(sText.match(/^L[a-km-zA-HJ-NP-Z1-9]{26,33}$/)) {
		    	// Litecoin Address
		    	url = sendtoConfig["LTC"];
		    }
		    else if(sText.match(/^D[a-km-zA-HJ-NP-Z1-9]{26,33}$/)) {
		    	// Dogecoin Address
		    	url = sendtoConfig["DOGE"];
		    }
		    else {
		        // Not a valid cryptocurrency address or tx format
		        alert("Please select a valid address (bitcoin, litecoin, or dogecoin only).");
		        return 0;
		    }
		}
		else if (itemID == "generateQR") {
			url = lookupConfig["QRGenerator"];
		}

		url += sText;
		//if (newtab) { window.open(url, newtab); }
		//else { window.location(url); }
		window.open(url, "_blank");

    }); // End the chrome.storage.sync.get callback function
}
