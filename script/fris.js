//Plaatst de fris in de 
var fris = ["Appelsap", "Bitter Lemon", "Chocomel", "Cola", "Fanta", "Sinasappelsap", "Spirte"];
var optionsFris = "<option selected='selected'> Alle Fris </option>";
for(i=0; i<fris.length; i++){
	optionsFris += "<option> " + fris[i] + "</option>" 
}

document.getElementById('selectFris').innerHTML = optionsFris;