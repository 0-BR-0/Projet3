const btnRetourModale = document.querySelector('.btnRetourModale');
const selectCategorie = document.getElementById('categorie');
const btnModaleValiderAjout = document.getElementById('btnModaleValiderAjout');
let inputAjouterImage = document.getElementById('inputAjouterImage');
const inputTitre = document.getElementById('titre');
const idForm = document.getElementById('idForm');
const errorHTML = document.getElementById('errorForm')

// Ajout d'événements pour vérifier la validité du formulaire
inputAjouterImage.addEventListener('change', updateButtonState); // Lorsque l'image est sélectionnée
inputTitre.addEventListener('input', updateButtonState); // Lorsque le titre est ajouté
selectCategorie.addEventListener('change', updateButtonState); // Lorsque la catégorie est choisie

document.getElementById('custominputAjouterImage').addEventListener('click', function(e) {
    e.preventDefault();
    document.getElementById('inputAjouterImage').click(); // Ouvre le sélecteur de fichiers
});

// Fonction pour revenir à la modale principale
function retourModale() {
    btnRetourModale.addEventListener('click', () => {
        modaleWrapperAjoutPhoto.style.display = 'none';
        modaleWrapper.style = 'display: flex;';
    });
}

// Fonction pour vérifier si le formulaire est complet et valide
function validateForm() {
    const isTitleValid = inputTitre.value.trim() !== ''; // Vérifie si le titre est rempli
    const isCategoryValid = selectCategorie.value !== ''; // Vérifie si une catégorie est sélectionnée
    const isImageValid = inputAjouterImage.files.length > 0; // Vérifie si une image est sélectionnée
    return isTitleValid && isCategoryValid && isImageValid; // Renvoie vrai si tous les champs sont valides
}

// Fonction pour mettre à jour l'état du bouton
function updateButtonState() {
    if (validateForm()) {
        btnModaleValiderAjout.style.backgroundColor = '#1D6154'; // Change la couleur en vert
        errorHTML.innerHTML = ''; //Erreur dans l’identifiant ou le mot de passe
        // btnModaleValiderAjout.disabled = false; // Active le bouton
    } else {
        btnModaleValiderAjout.style.backgroundColor = ''; // Réinitialise la couleur
        // btnModaleValiderAjout.disabled = true; // Désactive le bouton
    };
}

function attachImagePreview(inputAjouterImage) {
    inputAjouterImage.addEventListener('change', function() {
        const file = inputAjouterImage.files[0]; // Récupère le premier fichier sélectionné
        if (file) { // Vérifie si un fichier a été sélectionné
            const reader = new FileReader(); // Crée un nouvel objet FileReader
            reader.onload = function(e) { // Définit la fonction à exécuter lorsque le fichier est chargé
                const ajouterImageDiv = document.getElementById('divAjouterImage'); // Sélectionne l'élément pour afficher l'image
                ajouterImageDiv.innerHTML = `
                    <img src="${e.target.result}" alt="Image sélectionnée" id="imagePreview" style="max-height: 100%; cursor: pointer;">
                `;
                const imagePreview = document.getElementById('imagePreview'); // Sélectionne l'image ajoutée
                imagePreview.addEventListener('click', function() { // Ajoute un écouteur pour permettre de changer l'image
                    inputAjouterImage.click(); // Ouvre le sélecteur de fichiers lorsqu'on clique sur l'image
                });
            };
            reader.readAsDataURL(file); // Lit le fichier et le convertit en URL
        } else {
            resetImagePreview(); // Réinitialise la prévisualisation si aucune image n'est sélectionnée
        };
        updateButtonState(); // Met à jour l'état du bouton
    });
}

// Fonction pour réinitialiser la prévisualisation d'image
function resetImagePreview() {
    const ajouterImageDiv = document.getElementById('divAjouterImage');
    ajouterImageDiv.innerHTML = `
        <div id="divAjouterImage">
            <i id= "customIconAjouterImage" class="fa-regular fa-image " style="color: #b9c5cc;"></i>
            <button id="custominputAjouterImage" class="custom-inputAjouterImage"> + Ajouter photo</button>
            <label id="labelInfoImage">jpg, png : 4mo max</label>
        </div>
    `;
    document.getElementById('custominputAjouterImage').addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('inputAjouterImage').click(); // Ouvre le sélecteur de fichiers
    });
}

btnModaleValiderAjout.addEventListener('click', function(event) {
    event.preventDefault();
    if (validateForm()) {
        sendFile();
    } else {
        errorHTML.innerHTML = "Formulaire d'envoi incomplet" //Erreur dans l’identifiant ou le mot de passe
    };
});

// Fonction pour envoyer le fichier à l'API
async function sendFile() {
    const formData = new FormData();
    formData.append('title', inputTitre.value);
    formData.append('image', inputAjouterImage.files[0]); // Utilisation du fichier sélectionné
    formData.append('category', selectCategorie.value);
    const verifToken = sessionStorage.getItem('Token');
    const response = await fetch('http://localhost:5678/api/works/', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${verifToken}`,
        },
        body: formData
    });
    if (response.status === 201) {
        resetForm(); // Réinitialiser le formulaire
    } else {
        console.error("Erreur lors de l'envoi du formulaire");
    };
}

// Fonction pour réinitialiser le formulaire
function resetForm() {
    inputTitre.value = ''; // Vide le champ titre
    selectCategorie.value = ''; // Réinitialise la sélection de catégorie
    inputAjouterImage.value = ''; // Réinitialise l'input fichier sans recréer l'élément
    resetImagePreview(); // Réinitialise la prévisualisation d'image
    updateButtonState(); // Réinitialise l'état du bouton
    fetchDataModal();
    fetchData();
}

// Fonction pour récupérer les catégories depuis l'API
const fetchCategories = async () => {
    const response = await fetch('http://localhost:5678/api/categories');
    const categories = await response.json();
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.id;
        option.textContent = category.name;
        selectCategorie.appendChild(option);
    });
}



attachImagePreview(inputAjouterImage);
fetchCategories();
retourModale();
updateButtonState(); // Initialiser l'état du bouton au chargement