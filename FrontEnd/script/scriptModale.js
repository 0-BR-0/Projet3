const btnFermerModale = document.querySelectorAll('.btnFermerModale');

// Fonction pour fermer la modale lorsqu'on clique en dehors ou sur le bouton de fermeture
const fermerModale = () => {
	document.addEventListener('click', function(e) {
		if (e.target === modale || e.target === btnFermerModale[0] || e.target === btnFermerModale[1]) {
			e.preventDefault();
			modale.style.display = 'none';
			modaleWrapperAjoutPhoto.style.display = 'none';
		}
	})
}

// Fonction pour récupérer les données des travaux à afficher dans la modale
const fetchDataModal = async () => {
	const response = await fetch('http://localhost:5678/api/works');
	const works = await response.json();
	displayDataModal(works);
} 

// Fonction pour afficher les travaux dans la modale
const displayDataModal = (paramWorks) => {
	const galleryHTML = document.getElementById('modaleAffichageTravaux');
	galleryHTML.innerHTML = '';
	paramWorks.forEach(element => {
		const figureHTML = document.createElement('figure');
		figureHTML.classList = 'classFigure';
		const imgHTML = document.createElement('img');
		imgHTML.id = element.id;
		imgHTML.src = element.imageUrl;
		imgHTML.alt = element.title;
		figureHTML.appendChild(imgHTML);     
		galleryHTML.appendChild(figureHTML);

		const btnSupprimerIMG = document.createElement('span');
		btnSupprimerIMG.id = element.id;
		btnSupprimerIMG.classList = 'btnSupprimerIMG';
		btnSupprimerIMG.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
		figureHTML.appendChild(btnSupprimerIMG);
		btnSupprimerIMG.addEventListener('click', async function(e) {
			e.preventDefault();
			await deleteImage(element.id);
			await fetchDataModal();
			await fetchData();
		})
	})
}

// Fonction pour supprimer une image via l'API
const deleteImage = async (id) =>  {
	const verifToken = sessionStorage.getItem('Token');
	const response = await fetch('http://localhost:5678/api/works/'+ id, {
		method: 'DELETE',
		headers: {
			'Authorization': `Bearer ${verifToken}`,
		}
	})
}

const btnModaleAjout = document.getElementById('btnModaleAjout')

// Fonction pour ouvrir la modale d'ajout de photo
function ouvrirModaleAjoutPhoto() {
	btnModaleAjout.addEventListener('click', () => {
		modaleWrapper.style = 'display: none;';
		modaleWrapperAjoutPhoto.style.display = 'flex';    
	});
}

ouvrirModaleAjoutPhoto();
fermerModale();
