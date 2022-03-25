function checkRegistration(){
	let order = {
		name: false,
		surname: false,
		email: false,
		password: false,
		repeat: false
	}
	let regName = new RegExp("[А-Я][а-я]{1,10}");

	let name = document.getElementById("name");
	if(name.value.match(regName)[0] == name.value) order.name = true;
	if(surname.value.match(regName)[0] == surname.value) order.surname = true;

	let regEmail = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i;
	order.email = regEmail.test(email.value.toLowerCase());

	if(password.value.length > 8 && password.value.length < 15) order.password = true;
	else order.password = false;

	if(password.value == repeat.value && order.password){
		order.repeat = true;
	} 
	return order;
}

function showRegistration(order){
	let errors = {
		name: "Имя введено неверно",
		surname: "Фамилия введена неверно",
		email: "Email введен некорректно",
		password: "Длина пароля должна быть больше 7 символов и меньше 15",
		repeat: "Повторно пароль введен неверно"
	}
	let fieldset = document.querySelector("#registration");
	let flag = true;

	for (key in order){
		let elem = document.getElementById(key);
		if(order[key]){
			elem.style.border = "1px solid #02eb7a"; // зеленый
			elem.style.background = "rgba(2, 235, 122, 0.3)";
		}else{
			flag = false;
			elem.style.border = "1px solid #f74551"; // красный
			elem.style.background = "rgba(247, 69, 81, 0.3)";
			alert(errors[key]);	
		}
	}
	if(flag) fieldset.style.border = "2px solid #02eb7a";
	else fieldset.style.border = "2px solid #f74551";
}

function checkLogin(){
	let order = {	
		email: false,
		password: false
	}
	let regEmail = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i;
	order.email = regEmail.test(login_email.value.toLowerCase());

	if(login_password.value.length > 8 || login_password.value.length < 15) order.password = true;
	else order.password = false;

	return order;
}

function showLogin(order){
	let errors = {
		email: "Email введен некорректно",
		password: "Длина пароля должна быть больше 8 символов и меньше 15"
	}
	let fieldset = document.querySelector("#login");
	let flag = true;
	for (key in order){
		let elem = document.getElementById("login_" + key);
		if(order[key]){
			elem.style.border = "1px solid #02eb7a"; // зеленый
			elem.style.background = "rgba(2, 235, 122, 0.3)";
		}else{
			flag = false;
			elem.style.border = "1px solid #f74551"; // красный
			elem.style.background = "rgba(247, 69, 81, 0.3)";
			alert(errors[key]);	
		}
	}
	if(flag) fieldset.style.border = "2px solid #02eb7a";
	else fieldset.style.border = "2px solid #f74551";
}

send.onclick = () => {
	showRegistration(checkRegistration());
}

login_button.onclick = () => {
	showLogin(checkLogin());
}