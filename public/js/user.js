
firebase.auth().onAuthStateChanged(function(user) {
  if (!user) {
   	document.getElementsByTagName("body")[0].style.display = "none"
  	window.location = "login.html";
  } else {
  	db.collection('users').doc(user.uid).get().then(doc => {
	  	document.getElementById('newusername').value = doc.data().name;
	  	document.getElementById('newdob').value = doc.data().dob;
	  	document.getElementById('newaddress').value = doc.data().address;
	  	document.getElementById('newadhaar').value = doc.data().adhaar;
	  	document.getElementById('newpassword').value = doc.data().password;
  	})

	var user = firebase.auth().currentUser;

		var update = document.getElementById('update-user');
		update.addEventListener('submit', (e) => {
			e.preventDefault();

			db.collection('users').doc(user.uid).update({
				dob: document.getElementById("newdob").value,
				name: document.getElementById("newusername").value,
				adhaar: document.getElementById("newadhaar").value,
				address: document.getElementById("newaddress").value
			}).then(function(){
				var newPassword = document.getElementById('newpassword').value;
				user.updatePassword(newPassword).then(function() {
				document.getElementById("update-details").style.display = "block";
				$('#update-details').delay(3000).fadeOut('slow');
				}).catch(function(error) {
				  	auth.signOut().then(() => {	
						window.location = "login.html";
					})
					alert(error)
				});
			}).catch(function(eror){
				document.getElementById("wrong-details").style.display = "block";
				$('#wrong-details').delay(3000).fadeOut('slow');
				document.getElementById("wrong-details").innerHTML = error;
			})
		})
	}
});

