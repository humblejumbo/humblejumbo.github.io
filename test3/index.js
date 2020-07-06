
(function()
{
	let searchBar=document.getElementById('search');


	// Logic for instant search results whenever user stops writing

	let typingTimer;                //timer identifier
	let doneTypingInterval = 2000;  //time in ms, 2 second for example

	//on keyup, start the countdown
	searchBar.addEventListener('keyup', function () {
	  	clearTimeout(typingTimer);
	  	let searchResultsContainer=document.getElementById("search-results");
		searchResultsContainer.innerHTML="";
		let txt=this.value;

		if(txt!='')	//if search bar is not empty then call for searchHero after 2 s
			typingTimer = setTimeout(searchHero, doneTypingInterval, txt);
	});

	//on keydown, clear the countdown 
	searchBar.addEventListener('keydown', function () {
	  clearTimeout(typingTimer);
	});


	//searching hero by name
	function searchHero(name)
	{
		let xhrRequest = new XMLHttpRequest();
		xhrRequest.open('get',"https://www.superheroapi.com/api.php/4065231213548058/search/"+name,true);
		xhrRequest.send();
		xhrRequest.onload=function()
		{
			let data=JSON.parse(xhrRequest.responseText);
			let results=data.results;
			let searchResultsContainer=document.getElementById("search-results");
			searchResultsContainer.innerHTML="";


			if(data.response=="error")
			{
				searchResultsContainer.innerHTML+=`<h1 style="color:white;">Sorry No Superhero Found!</h1>`
			}
			else
			{
				let results=data.results;

    			for(let i=0;i<results.length;i++)
    			{
    				console.log(results[i].name);
    				searchResultsContainer.innerHTML+=`<div class="thumbnail">
    													<img src="${results[i].image.url}" style="width:250px;height:250px;" alt="unable to load">
      												   <div class="caption">
        											   <h3>${results[i].name}</h3>
        											   <p>SuperHero Id: ${results[i].id}</p>
        											   <p>Gender: ${results[i].appearance.gender}</p>
        											   <p>Height: ${results[i].appearance.height[0]}</p>
        											   <p><a href="about.html" class="btn btn-primary about" role="button">Know More &#8594;</a>
        											   <a href="#" class="btn btn-danger addFavourites" role="button">Add to Favourites</a></p>
      												   </div>
    												   </div>`


    			}

    			//Adding click listeners on add favourites and Know More buttons
		    	let favbtns=document.getElementsByClassName('addFavourites');
		    	let aboutbtns=document.getElementsByClassName('about');

    			for(let j=0;j<favbtns.length;j++)
    			{
    				favbtns[j].onclick=function()
    				{
    					let obj={
    						name:results[j].name,
    						id:results[j].id,
    						gender:results[j].appearance.gender,
    						height:results[j].appearance.height[0],
    						image:results[j].image.url
    					}
    					
    					//storing object in localstorage for persistant data
    					let obj_serialized=JSON.stringify(obj);
    					let index=localStorage.length;
    					localStorage.setItem(index,obj_serialized); //setting key as current length of localstorage
    				}

    				aboutbtns[j].onclick=function()
    				{
    					localStorage.setItem('about', results[j].name);
    				}
    			}


			}

		}
		//xhrRequest.send();
	}


})();