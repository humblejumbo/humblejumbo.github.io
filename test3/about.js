(function()
{

	//Retreiving the hero to which this about page belongs
	let heroName=localStorage.getItem('about');

	document.getElementById('hero-name').textContent=heroName;
	let heroId;
	searchHeroId(heroName);


	function searchHeroId(name)
	{
		let xhrRequest = new XMLHttpRequest();
		xhrRequest.open('get',"https://www.superheroapi.com/api.php/4065231213548058/search/"+name,true);
		xhrRequest.send();
		xhrRequest.onload=function()
		{
			let data=JSON.parse(xhrRequest.responseText);
			let result=data.results[0];
			
			heroId=result.id;//getting the heroId

			document.getElementById('hero-image').setAttribute("src",result.image.url);//setting the image

			//calling for powerstats and biography
			powerStats(heroId);
			biography(heroId);
		}
	}

	function powerStats(heroId)
	{
		let xhrRequest = new XMLHttpRequest();
		xhrRequest.open('get',"https://www.superheroapi.com/api.php/4065231213548058/"+heroId+"/powerstats",true);
		xhrRequest.send();

		xhrRequest.onload=function()
		{
			let data=JSON.parse(xhrRequest.responseText);

			let powerStatsContainer=document.getElementById('powerstats');

			powerStatsContainer.innerHTML+=`<p>Intelligence: ${data.intelligence}</p>
											<p>Strength: ${data.strength}</p>
											<p>Speed: ${data.speed}</p>
											<p>Durability: ${data.power}</p>
											<p>Power: ${data.power}</p>
											<p>Combat: ${data.combat}</p>`
			
		}
	}

	function biography(heroId)
	{
		let xhrRequest = new XMLHttpRequest();
		xhrRequest.open('get',"https://www.superheroapi.com/api.php/4065231213548058/"+heroId+"/biography",true);
		xhrRequest.send();

		xhrRequest.onload=function()
		{
			let data=JSON.parse(xhrRequest.responseText);

			let biographyContainer=document.getElementById('biography');

			biographyContainer.innerHTML+=`<p>Full Name: ${data['full-name']}</p>
										   <p>Place of Birth: ${data['place-of-birth']}</p>
										   <p>First Appearance: ${data['first-appearance']}</p>
										   <p>Alignment: ${data.alignment}</p>
										   <p>Alter Egos: ${data['alter-egos']}</p>
										   <p>Aliases: ${data.aliases}</p>`

			
		}
	}


})()