// let travaux = document.querySelectorAll(".gallery .figure img")
// console.log(travaux)


//je dois recup les donnés (works) du backend
const fetchData = async () => {
    // console.log('fechData');
    const response = await fetch('http://localhost:5678/api/works')
    const works = await response.json()
    displayData(works)
    filterHandler(works)
} 

const displayData = (paramWorks) => {
    // console.log('displayData')
    // console.log('paramWorks', paramWorks)
    const galleryHTML = document.getElementById("gallery")
    galleryHTML.innerHTML = '';
    paramWorks.forEach(element => {
        //creer balise figure en js
        const figureHTML = document.createElement("figure")
        //creer balise img en JS
        const imgHTML = document.createElement("img")
        //creer balise figcaption en js
        const figcaptionHTML = document.createElement("figcaption")
        //alimenter attribu src img
        imgHTML.src = element.imageUrl
        //alimenter attribu alt img
        imgHTML.alt = element.title
        //alimenter texte figcaption
        figcaptionHTML.innerText = element.title
        //inclure img dans figure
        figureHTML.appendChild(imgHTML)        
        //inclure figcaption dans figure
        figureHTML.appendChild(figcaptionHTML)
        //inclure figure dans gallery
        galleryHTML.appendChild(figureHTML)
    });
}

const filterHandler = (works) => {


    const boutonTous = document.querySelector('.bouton-tous');
    // console.log(boutonTous)
    boutonTous.addEventListener('click', function () {
        setActiveButton(boutonTous);
    displayData(works); // Afficher tous les travaux
    // console.log('boutontousapplé')
    });

    const boutonObjets = document.querySelector('.bouton-objets');
    // console.log(boutonObjets)
    boutonObjets.addEventListener('click', () => {
        setActiveButton(boutonObjets);
    const objets = works.filter(work => work.category.name === 'Objets');
    displayData(objets); // Afficher seulement les objets
    // console.log('boutonobjetapplé')
    });

    const boutonAppartements = document.querySelector('.bouton-appartements');
    // console.log(boutonAppartements)
    boutonAppartements.addEventListener('click', () => {
        setActiveButton(boutonAppartements);
    const appartements = works.filter(work => work.category.name === 'Appartements');
    displayData(appartements); // Afficher seulement les appartements
    // console.log('boutonappartementsapplé')
    });

    const boutonHotelsRestaurants = document.querySelector('.bouton-hotels-restaurants');
    // console.log(boutonHotelsRestaurants)
    boutonHotelsRestaurants.addEventListener('click', () => {
        setActiveButton(boutonHotelsRestaurants);
    const hotelsRestaurants = works.filter(work => work.category.name === 'Hotels & restaurants');
    displayData(hotelsRestaurants); // Afficher seulement les hotelsRestaurants
    // console.log('boutonhotelsRestaurantsapplé')
    });

    const boutons = [boutonTous, boutonObjets, boutonAppartements, boutonHotelsRestaurants];

    // Enlever l'ID 'bouton-filtre-active' de tous les boutons
    const setActiveButton = (activeButton) => {
        boutons.forEach(button => {
            if (button.id === 'bouton-filtre-active') {
                button.id = ''; // Supprimer l'ID 'bouton-filtre-active'
            }
        });
    
        // Ajouter l'ID 'bouton-filtre-active' au bouton cliqué
        activeButton.id = 'bouton-filtre-active';
    };

    //const setActiveButton = (activeButton) => {
       // boutons.forEach(button => button.classList.remove('Active')); // Enlever la classe 'active' de tous les boutons
        //activeButton.classList.add('Active'); // Ajouter la classe 'active' au bouton cliqué
    //};
    
}

function checkToken() {
    // console.log("checkToken")
    const verifToken = sessionStorage.getItem("Token")
    // console.log(verifToken)
    if (verifToken) {
        const logOutBtn = document.getElementById("LienLogin");
        logOutBtn.textContent = "Logout";
        logOutBtn.href = '#';

        logOutBtn.addEventListener('click', () => {
            event.preventDefault();
            sessionStorage.removeItem("Token");
            window.location.href = "index.html"
        });

        const divPortFolio = document.createElement('div');
        divPortFolio.id = "divPortFolio";

        const sectionPortFolio = document.getElementById("portfolio");
        sectionPortFolio.insertBefore(divPortFolio, sectionPortFolio.firstChild);

        const h2Element = document.querySelector("#portfolio h2");

        divPortFolio.appendChild(h2Element)

        const btnModifier = document.createElement("button");
        btnModifier.id = "btnModifier";
        const iconeBtnModifier = document.createElement("i");
        iconeBtnModifier.id = "iconeBtnModifier";
        iconeBtnModifier.classList.add("fa-regular", "fa-pen-to-square", "fa-sm");
        btnModifier.appendChild(iconeBtnModifier);
        btnModifier.appendChild(document.createTextNode("modifier"));
        divPortFolio.appendChild(btnModifier)
        // h2Element.parentNode.insertBefore(btnModifier, h2Element.nextSibling);
        // console.log(btnModifier)
         
        displayModal(btnModifier);
    }

}

function displayModal(btnModifier) {
    // console.log("displayModal")
    btnModifier.addEventListener('click', () => {
        event.preventDefault();
        const modale = document.getElementById("modale");
        const modaleAjoutPhoto = document.getElementById("modaleAjoutPhoto");
        modale.style.display = "flex"
        modaleWrapper.style = "display: flex;"

    });



}

checkToken();

fetchData();

// faire afficher le bouton modifier et logout
// au logout supprimé sessionstorage et redirection page d'acceuil normale
//au clic sur le bouton modifier, faire afficher une modale

//eventlistener sur le bouton modifier
// design de la modale des deux parties
//puis javascript

// //logOutBtn.addEventListener('click', function(event) {
//     event.preventDefault();
//     sessionStorage.removeItem("Token");
//     window.location.href = "index.html"
// });