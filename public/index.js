function displaySportList(data){
	console.log(data);
	
	for (let i=0; i<data.sports.length; i++)
	{
		$('.lista').append(`
				<div class="entry">
						${data.sports[i].name}
				</div>
			`);
	}
}

function onload(){
	let url = "./sports/api/list-sports";
	let settings = {
		method : "GET",
		headers: {
			'Content-Type' : 'application/json'
		}
	};

	fetch(url,settings)
		.then(response =>{
			if(response.ok){
				return response.json();
			}
			throw new Error(response.statusText);
		})
		.then(responseJSON =>{
			displaySportList(responseJSON);
		})
		.catch(err => {
			console.log(err);
		});
}
$(onload);

$('.postForm').on('submit',(event) => {
	event.preventDefault();
	let sportID = $('#sID').val();
	let sportName = $('#sName').val();
	console.log(sportID);
	console.log(sportName);

}	);



/*settings{
		method: "POST",
		headers: {
				"Content-Type":"application/json"
		}
		body: JSON.stringify({id: ... ,name: ...})
}

*/