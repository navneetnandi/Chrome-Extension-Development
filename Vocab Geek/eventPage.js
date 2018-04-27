var objectProperty = {
	"id": "vocabGeek",
	"title": "Vocab Geek",
	"contexts": ["selection"],
	"visible": true
};

chrome.contextMenus.create(objectProperty);

//A helper function to help encode the selection text into a form suitable for a URL
function fixedEncodeURI (str) {
    return encodeURI(str).replace(/%5B/g, '[').replace(/%5D/g, ']');
}

//Listen for a click event
chrome.contextMenus.onClicked.addListener(function(clickData){

	//Need to ensure the user clicked on the Vocab Geek menu item
	//and also there was a text which was selected
	if(clickData.menuItemId == "vocabGeek" && clickData.selectionText){
		var searchWord = clickData.selectionText;

		//If the selected text is not a number then we know its a word we can search for
		if(isNaN(searchWord)){
			var vocabularyURL = "https://www.vocabulary.com/dictionary/" + fixedEncodeURI(clickData.selectionText);
			//Create a new window with this new URL
			var createData = {
				"url" : vocabularyURL,
				"type": "popup",
				"top": 50,
				"left": 250,
				"width": 800,
				"height": 600
			};

			chrome.windows.create(createData);
		}

	}

});