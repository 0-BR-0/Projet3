// let travaux = document.querySelectorAll(".gallery .figure img")
// console.log(travaux)


    //je dois recup les donnés (works) du backend
const fetchData = async () => {
    console.log('fechData');
    const response = await fetch('http://localhost:5678/api/works')
    const works = await response.json()
    displayData(works)
} 

const displayData = (paramWorks) => {
    console.log('displayData')
    console.log('paramWorks', paramWorks)
    const galleryHTML = document.getElementById("gallery")
    paramWorks.forEach(element => {
        //console.log(element)
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

    filterHandler();
}

const filterHandler = () => {
    const boutonTous = document.getElementById('bouton-tous');
    console.log(boutonTous)
    boutonTous.addEventListener('Click', function () {
//     displayData(works); // Afficher tous les travaux
    console.log('boutontousapplé')
     });
}

const boutonObjets = document.querySelector('.bouton-objets');

const boutonAppartements = document.querySelector('.bouton-appartements');

const boutonHotelsRestaurants = document.querySelector('.bouton-hotels-restaurants');

// boutonTous.addEventListener('Click', () => {
//     displayData(works); // Afficher tous les travaux
// });

// boutonObjets.addEventListener('click', () => {
//     const objets = works.filter(work => work.category.name === 'Objets');
//     displayData(objets); // Afficher seulement les objets
// });



fetchData();


