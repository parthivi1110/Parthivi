//New User Sign up

const newuser = document.querySelector('#new-user');
newuser.addEventListener('submit', (e) => {
	e.preventDefault();


	const name = newuser['username'].value;
	const dob = newuser['dob'].value;
	const email = newuser['uid'].value;
	const password = newuser['password'].value;
	const address = newuser['address'].value;
	const adhaar = newuser['adhaar'].value;

	auth.createUserWithEmailAndPassword(email, password).then(cred => {
		return db.collection('users').doc(cred.user.uid).set({
			name: name,
			dob: dob,
			address: address,
			adhaar: adhaar
		});
	}).then(() => {
			window.location = "login.html";
			newuser.reset();
	}).catch(err => {
		const wrongalert = document.querySelector("#wrongemail");
		wrongalert.style.display = "block";
		wrongalert.innerHTML = err;
	});
});



