firebase.auth().onAuthStateChanged(function(user) {
  if (!user) {
   	document.getElementsByTagName("body")[0].style.display = "none"
  	window.location = "login.html";
  } else {

  	//Adding cards
  	const newcard = document.querySelector('#newcard');
	function renderCard(doc){
		let outerDiv = document.createElement('div');
		outerDiv.className = "card";
		outerDiv.style.cssText = 'margin: 10px 0px';

		let headerDiv = document.createElement('div');
		headerDiv.className = "card-header";
		headerDiv.style.cssText = 'letter-spacing: 5px;font-size: larger;';

		let bodyDiv = document.createElement('div');
		bodyDiv.className = "card-body";
		bodyDiv.style.cssText = 'color: black';

		let icon = document.createElement('i');
		icon.className = "fas fa-credit-card";

		let name = document.createElement('h6');
		name.className = 'card-title';

		let cardno = document.createElement('h6');
		cardno.className = 'card-title';

		let expr = document.createElement('h6');
		expr.className = 'card-title';

		outerDiv.setAttribute('data-id', doc.id);

		name.innerHTML = " <strong>NAME : </strong>" + doc.data().cardname;
		cardno.innerHTML = " <strong>CARD NO. : </strong>"+doc.data().cardno;
		expr.innerHTML =  " <strong>EXPIRY DATE : </strong>" + doc.data().expr;


		outerDiv.appendChild(headerDiv);
		outerDiv.appendChild(bodyDiv);
		headerDiv.appendChild(icon);
		bodyDiv.appendChild(name);
		bodyDiv.appendChild(cardno);
		bodyDiv.appendChild(expr);
		newcard.appendChild(outerDiv);

	}


  	//Filling wallet with user details


  	db.collection('users').doc(user.uid).get().then(doc => {
	  	document.getElementById('walletun').innerHTML = doc.data().name;
	})  	
	db.collection('users').doc(user.uid).collection('wallet').get().then(docs1 =>{	
		docs1.forEach(doc1 => {
			docid1 = doc1.id
			db.collection('users').doc(user.uid).collection('wallet').doc(docid1).get().then( doc => {
			  	document.getElementById('walletm').innerHTML = doc.data().balance;
			  	db.collection('users').doc(user.uid).collection('wallet').doc(docid1).collection('cards').get().then( docs2 => {
			  		docs2.forEach(doc2 => {
						docid2 = doc2.id
						db.collection('users').doc(user.uid).collection('wallet').doc(docid1).collection('cards').doc(docid2).get().then( doc => {
						  	renderCard(doc);
						})
					})  	
			  	})
			})
		})	
	})	  	



	

	// db.collection('users').doc(user.uid).collection('wallet').doc('iMsV7wV1lZIyekKrv6Gr').collection('cards').doc('LqJ6vf7sbsKbV9N2LF2d').get().then( (snapshot) => {
	// 	snapshot.forEach(doc => {
	// 		console.log(doc.data())
	// 	})
	// })



	// var user = firebase.auth().currentUser;

	// 	var update = document.getElementById('update-user');
	// 	update.addEventListener('submit', (e) => {
	// 		e.preventDefault();

	// 		db.collection('users').doc(user.uid).update({
	// 			dob: document.getElementById("newdob").value,
	// 			name: document.getElementById("newusername").value,
	// 			adhaar: document.getElementById("newadhaar").value,
	// 			address: document.getElementById("newaddress").value
	// 		}).then(function(){
	// 			var newPassword = document.getElementById('newpassword').value;
	// 			user.updatePassword(newPassword).then(function() {
	// 			document.getElementById("update-details").style.display = "block";
	// 			$('#update-details').delay(3000).fadeOut('slow');
	// 			}).catch(function(error) {
	// 			  	auth.signOut().then(() => {	
	// 					window.location = "login.html";
	// 				})
	// 				alert(error)
	// 			});
	// 		}).catch(function(eror){
	// 			document.getElementById("wrong-details").style.display = "block";
	// 			$('#wrong-details').delay(3000).fadeOut('slow');
	// 			document.getElementById("wrong-details").innerHTML = error;
	// 		})
	// 	})
	}
});