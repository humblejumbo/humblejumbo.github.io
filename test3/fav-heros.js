(function()
{
	renderFavourites();

	//rendering the saved favourites on this page
	function renderFavourites()
	{
		let searchResultsContainer=document.getElementById("search-results");
		searchResultsContainer.innerHTML="";

		if(localStorage.length==0)
		{
			searchResultsContainer.innerHTML+=`<h1 style="color:white;">Sorry No Favourite Superhero Found!</h1>`
		}

		for(let i=0;i<localStorage.length;i++)
		{
			let obj=JSON.parse(localStorage.getItem(i));

			if(obj==null || obj==undefined ||obj==NaN)
				continue;

			searchResultsContainer.innerHTML+=`<div class="thumbnail">
    													<img src="${obj.image}" style="width:250px;height:250px;" alt="unable to load">
      												   <div class="caption">
        											   <h3>${obj.name}</h3>
        											   <p>SuperHero Id: ${obj.id}</p>
        											   <p>Gender: ${obj.gender}</p>
        											   <p>Height: ${obj.height}</p>
        											   <p><a href="about.html" class="btn btn-primary about" role="button">Know More &#8594;</a>
        											   <a href="#" class="btn btn-danger removeFavourites" role="button">Remove from Favourites</a></p>
      												   </div>
    												   </div>`


		}

    	let elements=document.getElementsByClassName('removeFavourites');
    	let aboutbtns=document.getElementsByClassName('about');
		for(let j=0;j<elements.length;j++)
		{
			let obj=JSON.parse(localStorage.getItem(j));

			elements[j].onclick=function()
			{
				localStorage.removeItem(j);
				renderFavourites();
			}

	    	aboutbtns[j].onclick=function()
			{
				localStorage.setItem('about', obj.name);
			}

		}
			
	}
})()