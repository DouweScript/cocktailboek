function selectEasy(el) {
    if (el.tagName.toLowerCase() === "option" && el.parentNode.hasAttribute("multiple")) {
        // toggle selection
        if (el.hasAttribute('selected')) el.removeAttribute('selected');
        else el.setAttribute('selected', '');

        if (el.parentNode.name === "nieuweSelectAlcohol" || el.parentNode.name === "nieuweSelectNonAlcohol") {

            let type = el.parentNode.name.replace("select", "");
            type = type.charAt(0).toLowerCase() + type.slice(1);

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
                    let fles = document.createElement("option");
                    let scheutje = document.createElement("option");
                    let aanvullen = document.createElement("option");
                    input.type = "number";
                    input.step = "any";
                    input.className = "hoeveelheid";
                    input.name = "selectN" + ele.value.replaceAll(" ", "_");
                    input.id = "selectN" + ele.value.replaceAll(" ", "_");
                    input.required = true;
                    label.innerHTML = ele.innerHTML;
                    label.style.marginLeft = '1%';
                    label.style.maxWidth = "35%";
                    label.style.textAlign = "left";
                    select.name = "selectType" + ele.value.replaceAll(" ", "_");
                    select.id = "selectType" + ele.value.replaceAll(" ", "_");
                    select.className = "hoeveelheid";
                    select.onchange = function() {
                        if (select.item(select.selectedIndex) === aanvullen) {
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
                    scheutje.innerHTML = "scheutje";
                    scheutje.name = "scheutje";
                    fles.innerHTML = "fles";
                    fles.name = "fles";
                    aanvullen.name = "aanvullen";
                    aanvullen.innerHTML = "aanvullen";

                    select.append(shot, fles, aanvullen);
                    if (type === "nonAlcohol") {
                        select.insertBefore(scheutje, aanvullen);
                    }

                    div.appendChild(label);
                    div.appendChild(select);
                    div.appendChild(input);
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