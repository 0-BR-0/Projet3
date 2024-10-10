// Fonction pour récupérer les données des travaux depuis le backend
const fetchData = async () => {
    const response = await fetch('http://localhost:5678/api/works'); // Faire une requête pour obtenir les données
    const works = await response.json(); // Convertir la réponse en format JSON
    displayData(works); // Afficher les travaux récupérés
    filterHandler(works); // Initialiser le gestionnaire de filtres
} 

// Fonction pour afficher les travaux dans la galerie
const displayData = (paramWorks) => {
    const galleryHTML = document.getElementById("gallery"); // Sélectionner l'élément "gallery"
    galleryHTML.innerHTML = ''; // Réinitialiser le contenu de la galerie
    paramWorks.forEach(element => {
        //Créer balise figure en js
        const figureHTML = document.createElement("figure");
        //Créer balise img en JS
        const imgHTML = document.createElement("img");
        //Créer balise figcaption en js
        const figcaptionHTML = document.createElement("figcaption");
        //Alimenter attribu src img
        imgHTML.src = element.imageUrl;
        //Alimenter attribu alt img
        imgHTML.alt = element.title;
        //Alimenter texte figcaption
        figcaptionHTML.innerText = element.title;
        //Inclure img dans figure
        figureHTML.appendChild(imgHTML);
        //Inclure figcaption dans figure
        figureHTML.appendChild(figcaptionHTML);
        //Inclure figure dans gallery
        galleryHTML.appendChild(figureHTML);
    });
}

// Fonction pour gérer les filtres
const filterHandler = (works) => {
    const boutonTous = document.querySelector('.bouton-tous');
    boutonTous.addEventListener('click', function () {
        setActiveButton(boutonTous); // Mettre le bouton actif
        displayData(works); // Afficher tous les travaux
    });

    const boutonObjets = document.querySelector('.bouton-objets');
    boutonObjets.addEventListener('click', () => {
        setActiveButton(boutonObjets);
    const objets = works.filter(work => work.category.name === 'Objets');
    displayData(objets); // Afficher seulement les objets
    });

    const boutonAppartements = document.querySelector('.bouton-appartements');
    boutonAppartements.addEventListener('click', () => {
        setActiveButton(boutonAppartements);
    const appartements = works.filter(work => work.category.name === 'Appartements');
    displayData(appartements); // Afficher seulement les appartements
    });

    const boutonHotelsRestaurants = document.querySelector('.bouton-hotels-restaurants');
    boutonHotelsRestaurants.addEventListener('click', () => {
        setActiveButton(boutonHotelsRestaurants);
    const hotelsRestaurants = works.filter(work => work.category.name === 'Hotels & restaurants');
    displayData(hotelsRestaurants); // Afficher seulement les hotelsRestaurants
    });

    // Tableau des boutons pour les manipulations
    const boutons = [boutonTous, boutonObjets, boutonAppartements, boutonHotelsRestaurants];

    // Fonction pour gérer l'état du bouton actif
    const setActiveButton = (activeButton) => {
        boutons.forEach(button => {
            if (button.id === 'bouton-filtre-active') {
                button.id = ''; // Supprimer l'ID 'bouton-filtre-active'
            }
        });
        // Ajouter l'ID 'bouton-filtre-active' au bouton cliqué
        activeButton.id = 'bouton-filtre-active';
    };
}

// Fonction pour vérifier le token d'authentification est présent dans sessionStorage
function checkToken() {
    const verifToken = sessionStorage.getItem("Token");
    if (verifToken) {
        const logOutBtn = document.getElementById("LienLogin");
        logOutBtn.textContent = "Logout";
        logOutBtn.href = '#';
        logOutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            sessionStorage.removeItem("Token");
            window.location.href = "index.html";
            console.log("checkToken")
        });

        // Créer un div pour le portfolio
        const divPortFolio = document.createElement('div');
        divPortFolio.id = "divPortFolio";
        const sectionPortFolio = document.getElementById("portfolio");
        sectionPortFolio.insertBefore(divPortFolio, sectionPortFolio.firstChild);

        // Déplacer le h2Element du portfolio dans le nouveau div
        const h2Element = document.querySelector("#portfolio h2");
        divPortFolio.appendChild(h2Element);

        // Créer un bouton pour modifier
        const btnModifier = document.createElement("button");
        btnModifier.id = "btnModifier";
        const iconeBtnModifier = document.createElement("i");
        iconeBtnModifier.id = "iconeBtnModifier";
        iconeBtnModifier.classList.add("fa-regular", "fa-pen-to-square", "fa-sm");
        btnModifier.appendChild(iconeBtnModifier);
        btnModifier.appendChild(document.createTextNode("modifier"));
        divPortFolio.appendChild(btnModifier);

        displayModal(btnModifier); // Afficher la modal lors du clic sur le bouton
    }
}

// Fonction pour afficher la modal
function displayModal(btnModifier) {
    btnModifier.addEventListener('click', (e) => {
        e.preventDefault();
        const modale = document.getElementById("modale");
        const modaleAjoutPhoto = document.getElementById("modaleAjoutPhoto");
        modale.style.display = "flex";
        modaleWrapper.style = "display: flex;";
        console.log("displayModal")
        fetchDataModal();
    });
}

checkToken();
fetchData();