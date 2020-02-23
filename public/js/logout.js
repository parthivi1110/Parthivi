// Logout
const logout = document.querySelector("#logout");
logout.addEventListener('click', (e) => {
	e.preventDefault();
	console.log(e);
	auth.signOut().then(() => {	
		window.location = "login.html";
	})
})
