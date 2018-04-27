$(function(){

	chrome.storage.sync.get(['total', 'limit'], function(budget){ //[...] indicates an array of things we are getting
		$('#total').text(budget.total);
		$('#limit').text(budget.limit);
	})

	$('#spendAmount').click(function(){
		chrome.storage.sync.get(['total', 'limit'] , function(budget){ //function is the callback function
			var newTotal = 0;
			if (budget.total) {
				newTotal += parseInt(budget.total);
			}

			var amount = $('#amount').val();
			if(amount){
				newTotal += parseInt(amount);
			}

			//chrome.storage.sync.set({'total' : newTotal});
			//Updated the line above with the version below
			//Added a callback function while setting the new total and checking to see if the limit has been exceeded
			chrome.storage.sync.set({'total' : newTotal}, function(){
				if(amount && newTotal >= budget.limit){
					var notifOptions = {
						type : 'basic',
						iconUrl : 'icon128.png',
						title: 'Limit Reached',
						message: 'You have reached your limit'
					};
					chrome.notifications.create('limitNotif', notifOptions)
				}

			});

			$('#total').text(newTotal);
			$('#amount').val('');
		});
	});
});

