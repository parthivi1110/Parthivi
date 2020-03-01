firebase.auth().onAuthStateChanged(function(user) {
  if (!user) {
   	document.getElementsByTagName("body")[0].style.display = "none"
  	window.location = "login.html";
  } else {

	  	//Adding cards from DB
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

			let cross = document.createElement('div');
			cross.style.cssText = 'float: right';

			let icon2 = document.createElement('i');
			icon2.className = "fas fa-trash-alt"
			icon2.style.cssText = 'color: red;font-size: x-large;';

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
			cross.appendChild(icon2);		
			headerDiv.appendChild(cross);
			bodyDiv.appendChild(name);
			bodyDiv.appendChild(cardno);
			bodyDiv.appendChild(expr);
			newcard.appendChild(outerDiv);

			//Deleting cards

			cross.addEventListener('click',(e) => {
				e.stopPropagation();
				let temp1 = e.target.parentElement;
				let temp2 = temp1.parentElement;
				let id = temp2.parentElement.getAttribute('data-id');
				db.collection('users').doc(user.uid).collection('wallet').get().then(docs1 =>{	
					docs1.forEach(doc1 => {
						docid1 = doc1.id						
						db.collection('users').doc(user.uid).collection('wallet').doc(docid1).get().then( doc => {
						  	db.collection('users').doc(user.uid).collection('wallet').doc(docid1).collection('cards').doc(id).delete();
						})
					})	
				})
				document.getElementById("deletedcard").style.display = "block";
				$('#deletedcard').delay(3000).fadeOut('slow');
			})

		}

		//Adding accounts from DB
		const newaccount = document.querySelector('#newaccount');
		function renderAccount(doc){
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
			icon.className = "fas fa-university";

			let cross = document.createElement('div');
			cross.style.cssText = 'float: right';

			let icon2 = document.createElement('i');
			icon2.className = "fas fa-trash-alt"
			icon2.style.cssText = 'color: red;font-size: x-large;';

			let name = document.createElement('h6');
			name.className = 'card-title';

			let cardno = document.createElement('h6');
			cardno.className = 'card-title';

			let expr = document.createElement('h6');
			expr.className = 'card-title';

			outerDiv.setAttribute('data-id', doc.id);

			name.innerHTML = " <strong>BANK NAME : </strong>" + doc.data().bank;
			cardno.innerHTML = " <strong>ACCOUNT NO. : </strong>"+doc.data().accno;
			expr.innerHTML =  " <strong>IFSC : </strong>" + doc.data().ifsc;


			outerDiv.appendChild(headerDiv);
			outerDiv.appendChild(bodyDiv);
			headerDiv.appendChild(icon);
			cross.appendChild(icon2);		
			headerDiv.appendChild(cross);
			bodyDiv.appendChild(name);
			bodyDiv.appendChild(cardno);
			bodyDiv.appendChild(expr);
			newaccount.appendChild(outerDiv);

			//Removing accounts

			cross.addEventListener('click',(e) => {
				e.stopPropagation();
				let temp1 = e.target.parentElement;
				let temp2 = temp1.parentElement;
				let id = temp2.parentElement.getAttribute('data-id');
				db.collection('users').doc(user.uid).collection('wallet').get().then(docs1 =>{	
					docs1.forEach(doc1 => {
						docid1 = doc1.id						
						db.collection('users').doc(user.uid).collection('wallet').doc(docid1).get().then( doc => {
						  	db.collection('users').doc(user.uid).collection('wallet').doc(docid1).collection('accounts').doc(id).delete();
						})
					})	
				})
				document.getElementById("deletedaccount").style.display = "block";
				$('#deletedaccount').delay(3000).fadeOut('slow');
			})

		}


	  	//Filling wallet with user details


	  	db.collection('users').doc(user.uid).get().then(doc => {
		  	document.getElementById('walletun').innerHTML = doc.data().name;
		})  


		db.collection('users').doc(user.uid).collection('wallet').doc(wallet.id).set({balance: 0}, {merge: true}); 
		db.collection('users').doc(user.uid).collection('wallet').get().then(docs1 =>{	
				db.collection('users').doc(user.uid).collection('wallet').doc(wallet.id).get().then( doc => {
					// if(document.getElementById('walletm').innerHTML == 0){
					// 	document.getElementById('walletm').innerHTML = doc.data().balance;
					// 	const alertnewuser = document.querySelector("#alert-newuser");
					// 	alertnewuser.style.display = "block";
					// 	$('#alert-newuser').delay(5000).fadeOut('slow');
					// }
					document.getElementById('walletm').innerHTML = doc.data().balance;
					text = document.getElementById('walletm').textContent;
			    	balance = parseInt(text, 10);
					if( balance < 150){
			    		const minwallet = document.querySelector("#min-wallet");
						minwallet.style.display = "block";
			    	}
				})	
		})
	
		document.getElementById("currentemail").innerHTML = firebase.auth().currentUser.email;		  



		//Adding new card	
		const new_card = document.querySelector('#new-card');
		new_card.addEventListener('submit', (e) => {
			e.preventDefault();

			const cardname = new_card['cardname'].value;
			const cardno = new_card['cardno'].value;
			const cardexpr = new_card['cardexpr'].value;
			const cardcvv = new_card['cvv'].value;


			db.collection('users').doc(user.uid).collection('wallet').get().then(docs1 =>{	
				docs1.forEach(doc1 => {
					docid1 = doc1.id
					db.collection('users').doc(user.uid).collection('wallet').doc(docid1).get().then( doc => {
					  	db.collection('users').doc(user.uid).collection('wallet').doc(docid1).collection('cards').add({
							cardname: cardname,
							cardno: cardno,
							expr: cardexpr,
							cvv : cardcvv
					  	})
					})
				})	
			})
			new_card.reset(); 
   			$('#exampleModalCenter').modal('toggle');
   			document.getElementById("addedcard").style.display = "block";
			$('#addedcard').delay(3000).fadeOut('slow');		
		});


		//Adding a new account
		const new_account = document.querySelector('#new-account');
		new_account.addEventListener('submit', (e) => {
			e.preventDefault();

			const bank = new_account['accountname'].value;
			const accno = new_account['accountno'].value;
			const ifsc = new_account['ifsc'].value;

			db.collection('users').doc(user.uid).collection('wallet').get().then(docs1 =>{	
				docs1.forEach(doc1 => {
					docid1 = doc1.id
					db.collection('users').doc(user.uid).collection('wallet').doc(docid1).get().then( doc => {
					  	db.collection('users').doc(user.uid).collection('wallet').doc(docid1).collection('accounts').add({
							bank: bank,
							accno: accno,
							ifsc: ifsc
					  	})
					})
				})	
			})
			new_account.reset(); 
   			$('#exampleModalCenter1').modal('toggle');
   			document.getElementById("addedaccount").style.display = "block";
			$('#addedaccount').delay(3000).fadeOut('slow');		
		});



		//Real time listener
		db.collection('users').doc(user.uid).collection('wallet').get().then(docs1 =>{	
			docs1.forEach(doc1 => {
				docid1 = doc1.id
				db.collection('users').doc(user.uid).collection('wallet').doc(docid1).get().then( doc => {
				  	db.collection('users').doc(user.uid).collection('wallet').doc(docid1).collection('cards').onSnapshot( snapshot => {
				  		let changes = snapshot.docChanges();
				  		changes.forEach(change => {
				  			if(change.type == 'added'){
				  				renderCard(change.doc);
				  			}else if(change.type = 'removed'){
				  				let div = newcard.querySelector('[data-id=' + change.doc.id + ']');
				  				newcard.removeChild(div);
				  			}
				  		})
				  	})
				  	db.collection('users').doc(user.uid).collection('wallet').doc(docid1).collection('accounts').onSnapshot( snapshot => {
				  		let changes = snapshot.docChanges();
				  		changes.forEach(change => {
				  			if(change.type == 'added'){
				  				renderAccount(change.doc);
				  			}else if(change.type = 'removed'){
				  				let div = newaccount.querySelector('[data-id=' + change.doc.id + ']');
				  				newaccount.removeChild(div);
				  			}
				  		})
				  	})
				})
			})
		})


		db.collection('users').doc(user.uid).collection('wallet').onSnapshot( snapshot => {
					text = document.getElementById('walletm').textContent;
			    	balance = parseInt(text, 10);
			    	if(balance < 150 ) {
					    const minwallet = document.querySelector("#min-wallet");
						minwallet.style.display = "block";
					}
		});



	}
});