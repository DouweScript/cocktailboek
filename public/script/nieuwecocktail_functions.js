function selectEasy(e) {
    let el = e.target;
    if (el.tagName.toLowerCase() === "option" && el.parentNode.hasAttribute("multiple")) {
        e.preventDefault();

        // toggle selection
        if (el.hasAttribute('selected')) el.removeAttribute('selected');
        else el.setAttribute('selected', '');

        if (el.parentNode.name === "selectAlcohol" || el.parentNode.name === "selectNonAlcohol") {

            let type = el.parentNode.name.replace("select", "");
            type = type.charAt(0).toLowerCase() + type.slice(1);

            console.log(type)

            let xAmount = document.getElementById(type + "Amount");

            for (let i = 0; i < el.parentNode.childElementCount; i++) {

                let ele = el.parentNode.children.item(i);
                let child = document.getElementById(ele.innerHTML.replaceAll(" ", "_"));
                if (ele.hasAttribute('selected') && child === null) {

                    let div = document.createElement("div");
                    let label = document.createElement("label");
                    let input = document.createElement("input");
                    let select = document.createElement("select");
                    let shot = document.createElement("option");
                    let scheut = document.createElement("option");
                    let aanvullen = document.createElement("option");
                    input.type = "number";
                    input.className = "hoeveelheid";
                    input.name = "selectN" + ele.innerHTML.replaceAll(" ", "_");
                    input.required = true;
                    label.innerHTML = ele.innerHTML;
                    label.style.marginLeft = '1%';
                    select.name = "selectType" + ele.innerHTML.replaceAll(" ", "_");
                    select.className = "hoeveelheid";
                    select.onchange = function() {
                        if (select.selectedIndex === 1){
                            select.style.width = "60%";
                            input.style.display = "none";
                            input.required = false;
                        } else {
                            select.style.width = "initial";
                            input.style.display = "initial";
                            input.required = true;
                        }
                    };
                    shot.innerHTML = "shot";
                    shot.name = "shot";
                    scheut.innerHTML = "scheut";
                    scheut.name = "scheut";
                    aanvullen.name = "aanvullen";
                    aanvullen.innerHTML = "aanvullen";

                    select.append(shot, aanvullen);
                    if (type === "nonAlcohol") {
                        select.append(scheut);
                    }

                    div.appendChild(label);
                    div.appendChild(input);
                    div.appendChild(select);
                    div.appendChild(document.createElement("br"))
                    div.appendChild(document.createElement("br"))
                    div.id = ele.innerHTML.replaceAll(" ", "_");

                    xAmount.appendChild(div);
                    if (xAmount.style.display === "none") xAmount.style.display = "initial";

                } else if (child != null && !ele.hasAttribute("selected")) {
                    xAmount.removeChild(child);
                    if (xAmount.childElementCount <= 3) xAmount.style.display = "none";
                }
            }
        }
        return true;
    }
    return false;
}

function reset() {
    document.getElementById("alcoholAmount").innerHTML = "";
    document.getElementById("nonAlcoholAmount").innerHTML = "";

    let selectAlcohol = document.getElementById("selectAlcohol");
    for (let i = 0; i < selectAlcohol.children.length; i++) {
        let child = selectAlcohol.children.item(i);
        if (child.hasAttribute("selected")) {
            child.removeAttribute("selected");
        }
    }

    let selectNonAlcohol = document.getElementById("selectNonAlcohol");
    for (let i = 0; i < selectNonAlcohol.children.length; i++) {
        let child = selectNonAlcohol.children.item(i);
        if (child.hasAttribute("selected")) {
            child.removeAttribute("selected");
        }
    }
}