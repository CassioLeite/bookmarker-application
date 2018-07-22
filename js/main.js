// Listen for form submit
document.getElementById('myForm').addEventListener('click', saveBookmark);

// Save bookmark
function saveBookmark(event){

	// Prevent form from submitting
	event.preventDefault(); 

	// Get form values
	var siteName = document.getElementById('siteName').value;
	var siteUrl  = document.getElementById('siteUrl').value;

	if(!siteName || !siteUrl){
		return;
	}

	var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
	var regex = new RegExp(expression);

	if(!siteUrl.match(regex)){
		document.getElementById('msg-failure').innerHTML = 'This isn\'t a valid url. Please, try it again.';	
		clearInput();
		return;
	}

	var bookmark = {
		name: siteName,
		site: siteUrl
	}

	if(localStorage.getItem('bookmarks') === null){
		var bookmarks = [];
		bookmarks.push(bookmark);
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	}else{
		var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
		bookmarks.push(bookmark);
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	}

	fetchBookmarks();
	clearInput();

}

function deleteBookmark(url){
	console.log(url);

	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
	bookmarks.forEach(function(bookmark){
		if(bookmark.site == url){ 
			bookmarks.splice(bookmark, 1);
		}
	});

	localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

	fetchBookmarks();
}

function fetchBookmarks(){
	if(localStorage.getItem('bookmarks') === null){
		return;
	}
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
	var bookmarkResults = document.getElementById('bookmarkResults');

	bookmarkResults.innerHTML = ''

	bookmarks.forEach(function(bookmark){			
		var name = bookmark.name;
		var url  = bookmark.site;

		bookmarkResults.innerHTML += '<div class="alert alert-secondary" role="alert">'+
									 '<h3>' + name +
									 '  <a class="btn btn-primary" target="_blank" href="'+ url +'">Visit</a>' +
									 ' <a onclick="deleteBookmark(\'' + url+ '\')" class="btn btn-danger" href="#'+ url +'">Delete</a>' +	
									 '</h3>'+
									 '</div>'
	});	
}

function clearErrorMsg(){
	document.getElementById('msg-failure').innerHTML = '';
}

function clearInput(){
	document.getElementById('siteName').value = '';
	document.getElementById('siteUrl').value = '';
}
// Local storage

	//setItem
	//localStorage.setItem('test', 'na na na');
	
	//getItem
	//console.log(localStorage.getItem('test'));
	
	//removeItem
	//localStorage.removeItem('test');