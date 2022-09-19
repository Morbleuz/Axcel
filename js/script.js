//variable pour garder le outerHTML lors d'une nouvelle saisie
var outerHTML;
var displayMessageErreur = document.getElementById('erreur');
//Pour ajouter des eventListener aux TD
//Pour ajouter des EventsListerner sur les cases
function refreshAddEventListerner(){
    let items = document.getElementsByTagName('td');
    for(let td of items){
        if(td.className =="case"){
            td.addEventListener('click', switchInput, false);
        }
    }
}
//On refresh quand la page s'ouvre
refreshAddEventListerner();
document.addEventListener('keypress', e=>{
    if(e.keyCode == 13){
        if(e.explicitOriginalTarget.outerHTML == '<input type="text">'){
            let nombre = e.explicitOriginalTarget.value;
            try {
                nombre = parseInt(nombre);
            } catch (error) {
                console.log(error);
            }
            if(Number.isInteger(nombre)){
                e.explicitOriginalTarget.outerHTML = "<td class='case'>"+nombre+"</td>";
                refreshAddEventListerner();      
                displayMessageErreur.style = "display: none;"      
            }else{
                displayMessageErreur.style = "display: block;"
            }

        }
    }
});
function calculColonne(){
    let tr = document.getElementsByTagName('tr');
    for(x=1; x<tr.length-1;x++){
        let nombre = 0;
        for(let item of tr){
            if(item.children[x].className == "case"){
                nombre += parseInt(item.children[x].innerHTML);
            }else if(item.children[x].className == "total"){
               item.children[x].innerHTML = nombre;
            }  
        }
    }
}
function caculLigne(){
    let trs = document.getElementsByTagName('tr');
    for(let tr of trs){
        let nombre = 0;
        for(let children of tr.children){
            if(children.className == "case"){
                nombre += parseInt(children.innerHTML);
    
            }else if(children.className == "total"){
                children.innerHTML = nombre;
            }
        }
    }
}
function calculLeTotal(){
    let total = 0;
    let cases = document.getElementsByClassName("case");
    for(let lacase of cases){
        total += parseInt(lacase.innerHTML);
    }
    let leTotal = document.getElementById("leTotal");
    leTotal.innerHTML = total;
}
function calculTotal(){   
    //calcul des lignes
    caculLigne();
    //calcul des colonnes
    calculColonne();
    //Calcul du TOTAL
    calculLeTotal();

}
function resetCase(){
    let cases = document.getElementsByClassName("case");
    for(var lacase of cases){
        lacase.innerHTML = 0;
    }
    calculTotal();
}
function switchInput(){
    outer = this.outerHTML;
    this.outerHTML = '<input type="text">';
}

