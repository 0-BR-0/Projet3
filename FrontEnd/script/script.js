let filterInitialized = false; // Variable pour suivre l'initialisation du filtre

// Fonction pour récupérer les données des travaux depuis le backend
const fetchData = async () => {
	const response = await fetch('http://localhost:5678/api/works');
	const works = await response.json();
	displayData(works);

	// Initialiser le gestionnaire de filtres une seule fois
	if (!filterInitialized) {
		filterHandler(works);
		filterInitialized = true;
	}
}

// Fonction pour afficher les travaux dans la galerie
const displayData = (paramWorks) => {
	const galleryHTML = document.getElementById('gallery');
	galleryHTML.innerHTML = '';
	paramWorks.forEach(element => {
		const figureHTML = document.createElement('figure');
		const imgHTML = document.createElement('img');
		const figcaptionHTML = document.createElement('figcaption');
		imgHTML.src = element.imageUrl;
		imgHTML.alt = element.title;
		figcaptionHTML.innerText = element.title;
		figureHTML.appendChild(imgHTML);
		figureHTML.appendChild(figcaptionHTML);
		galleryHTML.appendChild(figureHTML);
	});
}

// Fonction pour gérer les filtres
const filterHandler = (works) => {
	const boutonTous = document.querySelector('.bouton-tous');
	const boutons = [boutonTous];
	boutonTous.addEventListener('click', function () {
		setActiveButton(boutonTous);
		displayData(works);
	});

	const categories = [...new Set(works.map(works => works.category.name))];
	const filtre = document.getElementById('filtre');
	categories.forEach(category => {
		const filtres = document.createElement('button');
		filtres.className = 'bouton-filtres';
		filtres.textContent = category;
		filtres.id = '';
		filtres.addEventListener('click', () => {
			setActiveButton(filtres);
			const filteredWorks = works.filter(work => work.category.name === category);
			displayData(filteredWorks);
		});
		filtre.appendChild(filtres);
		boutons.push(filtres);
	});

	// Fonction pour gérer l'état du bouton actif
	const setActiveButton = (activeButton) => {
		boutons.forEach(button => {
			if (button.id === 'bouton-filtre-active') {
				button.id = '';
			}
		});
		activeButton.id = 'bouton-filtre-active';
	};
}

// Fonction pour vérifier le token d'authentification dans sessionStorage
function checkToken() {
	const verifToken = sessionStorage.getItem('Token');
	if (verifToken) {
		const logOutBtn = document.getElementById('LienLogin');
		logOutBtn.textContent = 'Logout';
		logOutBtn.href = '#';
		logOutBtn.addEventListener('click', (e) => {
			e.preventDefault();
			sessionStorage.removeItem('Token');
			window.location.href = 'index.html';
		});

		const divPortFolio = document.createElement('div');
		divPortFolio.id = 'divPortFolio';
		const sectionPortFolio = document.getElementById('portfolio');
		sectionPortFolio.insertBefore(divPortFolio, sectionPortFolio.firstChild);

		const h2Element = document.querySelector('#portfolio h2');
		divPortFolio.appendChild(h2Element);

		const btnModifier = document.createElement('button');
		btnModifier.id = 'btnModifier';
		const iconeBtnModifier = document.createElement('i');
		iconeBtnModifier.id = 'iconeBtnModifier';
		iconeBtnModifier.classList.add('fa-regular', 'fa-pen-to-square', 'fa-sm');
		btnModifier.appendChild(iconeBtnModifier);
		btnModifier.appendChild(document.createTextNode('modifier'));
		divPortFolio.appendChild(btnModifier);

		displayModal(btnModifier);
	}
}

// Fonction pour afficher la modal
function displayModal(btnModifier) {
	btnModifier.addEventListener('click', (e) => {
		e.preventDefault();
		const modale = document.getElementById('modale');
		const modaleAjoutPhoto = document.getElementById('modaleAjoutPhoto');
		modale.style.display = 'flex';
		modaleWrapper.style = 'display: flex;';
		fetchDataModal();
	});
}

checkToken();
fetchData();