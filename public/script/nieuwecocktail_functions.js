function 

window.onmousedown = function (e) {
    let el = e.target;
    if (el.tagName.toLowerCase() == 'option' && el.parentNode.hasAttribute('multiple')) {
        e.preventDefault();

        // toggle selection
        if (el.hasAttribute('selected')) el.removeAttribute('selected');
        else el.setAttribute('selected', '');

        // hack to correct buggy behavior
        let select = el.parentNode.cloneNode(true);
        el.parentNode.parentNode.replaceChild(select, el.parentNode);

        if (el.parentNode.name == "selectDrank" || el.parentNode.name == "selectFris") {

            let type = el.parentNode.name.replace("select", "").toLowerCase();

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
                    select.name = "selectType" + ele.innerHTML.replaceAll(" ", "_");
                    select.className = "hoeveelheid";
                    shot.innerHTML = "shot";
                    glas.innerHTML = "glas";
                    aanvullen.name = "aanvullen";
                    aanvullen.innerHTML = "met dit aanvullen";
                    select.append(shot, glas, aanvullen);

                    div.appendChild(label);
                    div.appendChild(input);
                    div.appendChild(select);
                    div.appendChild(document.createElement("br"))
                    div.appendChild(document.createElement("br"))
                    div.id = ele.innerHTML.replaceAll(" ", "_");
                    div.className = "field";

                    let xHoeveel = document.getElementById(type + "Hoeveel");
                    xHoeveel.appendChild(div);
                    if (xHoeveel.style.display = "none") xHoeveel.style.display = "initial";

                } else if (child != null && !ele.hasAttribute("selected")) {
                    let xHoeveel = document.getElementById(type + "Hoeveel");
                    xHoeveel.removeChild(child);
                    if (xHoeveel.childElementCount <= 3) xHoeveel.style.display = "none";


                }
            }
        }
    } else if (el.tagName.toLowerCase() == 'select' && el.classList.contains("hoeveelheid")) {
        if (isOptionSelected(el) && el.children.length == 3) {
            el.removeChild(el.lastChild);
        }
    }
}

function isOptionSelected(node){
    for (let x = 0; x < node.parentNode.parentNode.children.length; x++) {
        let n = node.parentNode.parentNode.children.item(x);
        for (let y = 0; y < n.children.length; y++) {
            let s = n.children.item(y);
            if (s.tagName.toLowerCase() == "select" && s.selectedIndex == 2) {
                    return true;
            }
        }
    }
    return false;
}