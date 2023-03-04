function selectEasy(e) {
    let el = e.target;
    if (el.tagName.toLowerCase() == "option" && el.parentNode.hasAttribute("multiple")) {
        e.preventDefault();

        // toggle selection
        if (el.hasAttribute('selected')) el.removeAttribute('selected');
        else el.setAttribute('selected', '');

        if (el.parentNode.name == "selectDrank" || el.parentNode.name == "selectFris") {

            let type = el.parentNode.name.replace("select", "").toLowerCase();

            let xAmount = document.getElementById(type + "Amount");

            for (let i = 0; i < el.parentNode.childElementCount; i++) {

                let ele = el.parentNode.children.item(i);
                let child = document.getElementById(ele.innerHTML.replaceAll(" ", "_"));
                if (ele.hasAttribute('selected') && child == null) {

                    let div = document.createElement("div");
                    let label = document.createElement("label");
                    let input = document.createElement("input");
                    let select = document.createElement("select");
                    let shot = document.createElement("option");
                    let glas = document.createElement("option");
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
                        if (select.selectedIndex == 2){
                            xAmount.setAttribute("aanvullen", select.name);
                            select.style.width = "60%";
                            input.style.display = "none";
                            input.required = false;
                        } else if (xAmount.hasAttribute("aanvullen")
                            && xAmount.getAttribute("aanvullen") == select.name) {
                            xAmount.removeAttribute("aanvullen");
                            select.style.width = "initial";
                            input.style.display = "initial";
                            input.required = true;
                        }
                    };
                    select.onmousedown = function() {
                        if (xAmount.hasAttribute("aanvullen")
                            && xAmount.getAttribute("aanvullen") != select.name
                            && select.children.length == 3) {
                            select.removeChild(aanvullen);
                        } else if (!xAmount.hasAttribute("aanvullen")
                            && select.children.length < 3) {
                            select.appendChild(aanvullen);
                        }
                    }
                    shot.innerHTML = "shot";
                    shot.name = "shot";
                    glas.innerHTML = "glas";
                    glas.name = "glas";
                    aanvullen.name = "aanvullen";
                    aanvullen.innerHTML = "aanvullen";
                    select.append(shot, glas, aanvullen);

                    div.appendChild(label);
                    div.appendChild(input);
                    div.appendChild(select);
                    div.appendChild(document.createElement("br"))
                    div.appendChild(document.createElement("br"))
                    div.id = ele.innerHTML.replaceAll(" ", "_");

                    xAmount.appendChild(div);
                    if (xAmount.style.display = "none") xAmount.style.display = "initial";

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
    document.getElementById("drankAmount").innerHTML = "";
    document.getElementById("frisAmount").innerHTML = "";

    let selectDrank = document.getElementById("selectDrank");
    for (let i = 0; i < selectDrank.children.length; i++) {
        let child = selectDrank.children.item(i);
        if (child.hasAttribute("selected")) {
            child.removeAttribute("selected");
        }
    }

    let selectFris = document.getElementById("selectFris");
    for (let i = 0; i < selectFris.children.length; i++) {
        let child = selectFris.children.item(i);
        if (child.hasAttribute("selected")) {
            child.removeAttribute("selected");
        }
    }
}