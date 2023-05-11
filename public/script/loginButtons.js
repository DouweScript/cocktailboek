//test login token
let cookie = getCookie("bolk-oath-access-token");
let permCookie = getCookie("bolk-oath-permission");

if (cookie != null) {
	let login = document.getElementById("login");
	if (login !== null) login.style.display = "none";

	let logout = document.getElementById("logout");
	if (logout !== null) logout.style.display = "inherit";

	let new_cock = document.getElementById("new");
	if (new_cock !== null) new_cock.style.display = "initial";

	if (permCookie === "true") {
		let admin = document.getElementById("admin");
		if (admin !== null) admin.style.display = "inherit";
	}
}