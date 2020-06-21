
var addbtn=document.getElementsByClassName('add')[0];

// Listening for add button... Adding the new task
addbtn.addEventListener('click',function()
{
	var list=document.getElementById("item-list")

	var item=document.createElement("li");	//Creating new element li that will be appended in the list.
	var val=document.getElementById("item-input-field").value;


	if(val!="")	//We will proceed further only if input field is not empty.
	{
		var checkbox = document.createElement("input");	//Made and appended checkbox in li
		checkbox.type="checkbox";
		item.appendChild(checkbox);		
		

		//Appending Input field text to li
		var text=document.createTextNode(val);	
		item.appendChild(text);
		list.appendChild(item);

		//Resetting the input field
		document.getElementById("item-input-field").value="";


		//appending the font-awesome minus icon to li. also adding delete class to it.
		var span = document.createElement("span");
		var icon=document.createElement("i");
		icon.classList.add("fas");
		icon.classList.add("fa-minus");
		span.appendChild(icon);	
		span.classList.add("delete");
		item.appendChild(span);


			//Adding click event listener on new delete button.
	    span.onclick = function() {
	    	if(!this.parentElement.firstElementChild.checked)
	  			document.getElementById("item-left").textContent=parseInt(document.getElementById("item-left").textContent)-1;

	      	this.parentElement.remove();
	    }

	  	//appending li to ul
		list.appendChild(item);

		var itemLeft=parseInt(document.getElementById("item-left").textContent)
		document.getElementById("item-left").textContent=itemLeft+1; //increasing the task left count
	}

});


// Deleting the task from list
var delItems = document.getElementsByClassName("delete");

//Adding click event listener on each delete button
for (var i = 0; i < delItems.length; i++) {
	
  	delItems[i].onclick = function() {
 
  	if(!this.parentElement.firstElementChild.checked) //if task is not done, only then decrease the no. of tasks left 
  		document.getElementById("item-left").textContent=parseInt(document.getElementById("item-left").textContent)-1;

    this.parentElement.remove();	//removing the li from list.
  }
}



//Checking the task and calculating the no. of tasks left.
document.querySelector('#item-list').addEventListener('change', function(event) { //listening for change in checkbox state.
  var total=this.childElementCount;//total tasks
  var done = this.querySelectorAll('input[type="checkbox"]:checked').length;// tasks already done. 
  document.getElementById("item-left").textContent=total-done;  // tasks left=total tasks-tasks already done. 

}); 


