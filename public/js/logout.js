


firebase.auth().onAuthStateChanged(function(user) {
  if (!user) {
   	document.getElementsByTagName("body")[0].style.display = "none"
  	window.location = "login.html";
  } else {
  	 const logout = document.querySelector("#logout");
		logout.addEventListener('click', (e) => {
			e.preventDefault();
			auth.signOut().then(() => {	
				window.location = "login.html";
			})
		})
  	
  }
});





