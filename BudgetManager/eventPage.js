var contextMenuItem = {
	"id" : "spendMoney",
	"title" : "SpendMoney",
	"contexts" : ["selection", "page"]
};
chrome.contextMenus.create(contextMenuItem);

function isInt(value){
	return !isNaN(value) &&
			parseInt(Number(value)) == value &&
			!isNaN(parseInt(value, 10));
}

//Listen for the click event on the context menu
chrome.contextMenus.onClicked.addListener(function(clickData){
	if(clickData.menuItemId = "spendMoney" && clickData.selectionText){

		//if(Number.isInteger(clickData.selectionText)){
		if(isInt(clickData.selectionText)){

			chrome.storage.sync.get(['total', 'limit'], function(budget){
				var newTotal = 0;
				if (budget.total) {
					newTotal += parseInt(budget.total);
				}
				newTotal += parseInt(clickData.selectionText);
				chrome.storage.sync.set({'total' : newTotal}, function(){
					if(newTotal >= budget.limit){
						var notifOptions = {
						type : 'basic',
						iconUrl : 'icon128.png',
						title: 'Limit Reached',
						message: 'You have reached your limit'
					};
					chrome.notifications.create('limitNotif', notifOptions);
					}
				});
			});
		}
	}
});

//Creating a badge. When the spending crosses the limit, the color of the badge will change to red
chrome.storage.onChanged.addListener(function(changes, storageName){
	var newSpendValue = changes.total.newValue;
	chrome.storage.sync.get(['limit'], function(budget){
		if(newSpendValue > budget.limit){
			chrome.browserAction.setBadgeText({"text" : newSpendValue.toString()})
			chrome.browserAction.setBadgeBackgroundColor({ color: [255, 0, 0, 1] });
		}
		else{
			chrome.browserAction.setBadgeText({"text" : newSpendValue.toString()});
			chrome.browserAction.setBadgeBackgroundColor({ color: [0, 0, 255, 1] });
		}
	});
		
	
});