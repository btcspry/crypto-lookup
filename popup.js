document.addEventListener('DOMContentLoaded', function(){

    var input = document.getElementById('enable_extension');

    // set the initial state of the checkbox
    chrome.storage.sync.get("BTCLookup_Enabled", function(data){
        if (data["BTCLookup_Enabled"]){
          input.checked = true;
        } else {
            input.checked = false;
        }
      });


    input.addEventListener("change", function(){
        chrome.storage.sync.set({BTCLookup_Enabled: input.checked});
    });

});