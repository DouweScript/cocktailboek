function confirm(divId, callback) {
	let div = document.getElementById(divId);
	let content = document.getElementById("content");
	let overlay = document.getElementById("overlay");
	overlay.style.display = "block";
	content.addEventListener("mousedown", blockEvent);
	div.style.display = "block";

	for (let i in div.children){
		let item = div.children[i];
		if (item.id === "yes") {
			item.onclick = () => {
				overlay.style.display = "none";
				content.removeEventListener("mousedown", blockEvent);
				div.style.display = "none";
				callback();
			};
		} else if (item.id === "no") {
			item.onclick = () => {
				overlay.style.display = "none";
				content.removeEventListener("mousedown", blockEvent);
				div.style.display = "none";
			}
		}
	}
}

function blockEvent(e){
	e.preventDefault();
}

if (location.pathname.includes("/admin/cocktails/edit")) {
	const cocktailID = new URLSearchParams(window.location.search).get('cocktail');
	if (cocktailID in cocktailDB) {
		let cocktail = cocktailDB[cocktailID];
		console.log(cocktail);

		document.getElementById("name").value = cocktail.name;
		document.getElementById("selectGlass").value = cocktail.glass;
		document.getElementById("desc").value = cocktail.desc;
		document.getElementById("creator").value = cocktail.creator;

		let selAlc = document.getElementById("selectAlcohol");
		for (let i in selAlc.children) {
			let option = selAlc.children[i];
			if (option.value in cocktail.alcohol){
				option.selected = true;
				selectEasy(option);

				let type = document.getElementById("selectType{}".format(getId(option.innerHTML)));
				type.value = cocktail.alcohol[option.value][1];

				if (type.value !== "aanvullen") {
					document.getElementById("selectN{}".format(getId(option.innerHTML))).value = cocktail.alcohol[option.value][0];
				} else {
					let input = document.getElementById("selectN{}".format(getId(option.innerHTML)));
					type.style.width = "60%";
                    input.style.display = "none";
					input.required = false;
				}
			}
		}

		let selNonAlc = document.getElementById("selectNonAlcohol");
		for (let i in selNonAlc.children) {
			let option = selNonAlc.children[i];
			if (option.value in cocktail.nonAlcohol){
				option.selected = true;
				selectEasy(option);

				let type = document.getElementById("selectType{}".format(getId(option.innerHTML)));
				type.value = cocktail.nonAlcohol[option.value][1];

				if (type.value !== "aanvullen") {
					document.getElementById("selectN{}".format(getId(option.innerHTML))).value = cocktail.nonAlcohol[option.value][0];
				} else {
					let input = document.getElementById("selectN{}".format(getId(option.innerHTML)));
					type.style.width = "60%";
                    input.style.display = "none";
					input.required = false;
				}
			}
		}
	} else {
		location.href = "/admin/cocktails";
	}
}