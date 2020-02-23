//Login

const login = document.querySelector("#login-form");
login.addEventListener('submit', (e) => {
	e.preventDefault();


	const email = login['login-email'].value;
	const password = login['login-password'].value;

	auth.signInWithEmailAndPassword(email, password).then(cred => {
		console.log(cred.user);
		window.location="home.html";
		login.reset();
	}).catch(err => {
		const wronglogin = document.querySelector("#wronglogin");
		wronglogin.style.display = "block";
		wronglogin.innerHTML = err;
		$('#wronglogin').delay(5000).fadeOut('slow');
	})
})


//Forget password
function showDiv() {
	var hiddendiv = document.getElementById('hiddendiv');
	var displaySetting = hiddendiv.style.display;
	var forgotpassword = document.getElementById('forgotpassword');
   if (displaySetting == 'block') {
      hiddendiv.style.display = 'none';   
      forgotpassword.innerHTML = 'Forgot password?';
  }else{
  	hiddendiv.style.display = "block";
    forgotpassword.innerHTML = 'Hide';
  }
}


var resetbtn = document.getElementById('resetbtn');
resetbtn.addEventListener('click', function(){
	var emailAddress = document.getElementById('reset-email').value;

	auth.sendPasswordResetEmail(emailAddress).then(function() {
	  const validemail = document.querySelector("#valid-email");
	   validemail.style.display = "block";
	   document.getElementById('reset-email').value="";
	   $('#valid-email').delay(5000).fadeOut('slow');

	}).catch(function(error) {
	  const invalidemail = document.querySelector("#invalid-email");
		invalidemail.style.display = "block";
		invalidemail.innerHTML = error;
		document.getElementById('reset-email').value="";
		$('#invalid-email').delay(5000).fadeOut('slow');
	});

})
