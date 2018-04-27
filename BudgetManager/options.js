$(function(){

	//Gets the limit that was set previously and displays it 
	chrome.storage.sync.get('limit', function(budget){
		$('#limit').val(budget.limit)
	})

	//We do this when user clicks on "Save Limit"
	$('#saveLimit').click(function(){
		var limit = $('#limit').val();
		if(limit){
			chrome.storage.sync.set({'limit': limit}, function(){
				close(); //Closes current tab
			});
		}
	});

	//We do this when user clicks on "Reset Total"
	$('#resetTotal').click(function(){
		chrome.storage.sync.set({'total' : 0}, function(){
			//Adding a notification when the total is being reset to 0
			var notifOptions = {
						type : 'basic',
						iconUrl : 'icon128.png',
						title: 'Reset Total',
						message: 'Total Spending Amount Has Been Reset To 0'
					};
					chrome.notifications.create('resetTotalNotif', notifOptions)

		});
	});

})