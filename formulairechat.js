document.addEventListener('DOMContentLoaded', function() {
    let today = new Date();
    let threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(today.getMonth() - 3);

    let minDate = threeMonthsAgo.toISOString().split('T')[0];
    document.getElementById('birthdate').setAttribute('max', minDate);
});

document.addEventListener('DOMContentLoaded', (event) => {
    const modal = document.getElementById('formulaire');
    const btn = document.querySelector('.add'); // Utilisation de querySelector au lieu de getElementsByClassName
    const closeBtn = document.querySelector('.close');

    // Initial state: hide the modal
    modal.style.display = 'none';

    // When the user clicks the button, open the modal
    btn.onclick = function() {
        modal.style.display = 'flex';
    }

    // When the user clicks on <span> (x), close the modal
    closeBtn.onclick = closeModal2;

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }
});

const closeModal2 = () => {
    const modal = document.getElementById('formulaire');
    modal.style.display = 'none';
}

const catsContainer = document.getElementById('cats-container');
let annonces = []; // Liste des annonces

function addAnnonceToDOM(annonce) {
    const annonceDiv = document.createElement('div');
    annonceDiv.className = 'cat-card';

    const img = document.createElement('img');
    img.src = annonce.photo;
    img.alt = annonce.name;

    const nameP = document.createElement('h1');
    nameP.textContent = annonce.name;

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = 'Supprimer';
    deleteBtn.onclick = function() {
        deleteAnnonce(annonce.name);
    };

    annonceDiv.appendChild(img);
    annonceDiv.appendChild(nameP);
    annonceDiv.appendChild(deleteBtn);
    catsContainer.appendChild(annonceDiv);
}

function loadAnnonces() {
    catsContainer.innerHTML = ''; // Clear existing content
    annonces.forEach(addAnnonceToDOM);
}

function deleteAnnonce(name) {
    annonces = annonces.filter(annonce => annonce.name !== name);
    loadAnnonces();
}

// Form management for adding new cats
document.addEventListener('DOMContentLoaded', function() {
    const addBtn = document.querySelector('.add');
    const formulaire = document.getElementById('formulaire');
    const closeBtn = document.querySelector('.close');
    const catForm = document.getElementById('catForm');

    // Open formulaire
    addBtn.onclick = function() {
        formulaire.style.display = 'block';
    }

    // Close formulaire
    closeBtn.onclick = function() {
        formulaire.style.display = 'none';
    }

    // Close formulaire when clicking outside of it
    window.onclick = function(event) {
        if (event.target == formulaire) {
            formulaire.style.display = 'none';
        }
    }

    // Handle form submission
    catForm.onsubmit = function(event) {
        event.preventDefault();

        const catName = document.getElementById('catName').value;
        const catPhoto = document.getElementById('catPhoto').files[0];

        const reader = new FileReader();
        reader.onload = function(e) {
            const imgData = e.target.result;
            const annonce = {
                name: catName,
                photo: imgData
            };

            annonces.push(annonce);
            addAnnonceToDOM(annonce);
            formulaire.style.display = 'none';
            catForm.reset();
        }
        reader.readAsDataURL(catPhoto);
    }

    // Load annonces from initial array (if any)
    loadAnnonces();
});

// Responsive media query handling
const mediaQuery = window.matchMedia('(max-width: 600px)');
mediaQuery.addEventListener('change', (event) => {
    if (event.matches) {
        console.log('Screen width is 600px or less');
        // Perform actions specific to small screens
    } else {
        console.log('Screen width is more than 600px');
        // Perform actions specific to larger screens
    }
});

// Initial check
if (mediaQuery.matches) {
    console.log('Screen width is 600px or less');
    // Perform actions specific to small screens
} else {
    console.log('Screen width is more than 600px');
    // Perform actions specific to larger screens
}


