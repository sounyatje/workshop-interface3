const CATS = [
    { name: "Bella", image: "Bella.jpeg", sex: "female", race: "siamese", city: "Bruxelles", idnumber: 947743219, birthdate: "2023-01-15", vaccinated: true, dewormed: true, antiparasitic: true, chipped: true, sterilized: true, clean: true, ownerName: "Alice", phoneNumber: "0498123456"},
    { name: "Kitty", image: "Kitty.jpeg", sex: "female", race: "british", city: "Brabant-wallon", idnumber: 947615872, birthdate: "2023-02-20", vaccinated: false, dewormed: true, antiparasitic: false, chipped: false, sterilized: false, clean: true, ownerName: "Bob", phoneNumber: "0498123457"},
    { name: "Max", image: "Max.jpeg", sex: "male", race: "alley-cat", city: "Halle-Vilvoorde", idnumber: null, birthdate: "2023-03-05", vaccinated: null, dewormed: false, antiparasitic: true, chipped: true, sterilized: null, clean: false, ownerName: "Charlie", phoneNumber: "0498123458"},
    { name: "Night", image: "night.jpeg", sex: "male", race: "alley-cat", city: "Brabant-flamand", idnumber: null, birthdate: "2023-01-25", vaccinated: true, dewormed: null, antiparasitic: false, chipped: false, sterilized: true, clean: true, ownerName: "David", phoneNumber: "0498123459"},
    { name: "Nina", image: "Nina.jpeg", sex: "female", race: "european", city: "Bruxelles", idnumber: 947994561, birthdate: "2023-04-10", vaccinated: false, dewormed: true, antiparasitic: null, chipped: true, sterilized: true, clean: false, ownerName: "Eva", phoneNumber: "0498123460"},
    { name: "Milo", image: "Milo.jpg", sex: "male", race: "scottish", city: "Bruxelles", idnumber: 947882465, birthdate: "2023-02-14", vaccinated: true, dewormed: false, antiparasitic: true, chipped: false, sterilized: null, clean: true, ownerName: "Fiona", phoneNumber: "0498123461"},
    { name: "Moon", image: "moon.jpeg", sex: "male", race: "bengal", city: "Halle-Vilvoorde", idnumber: 947427951, birthdate: "2023-01-30", vaccinated: null, dewormed: true, antiparasitic: false, chipped: true, sterilized: true, clean: false, ownerName: "George", phoneNumber: "0498123462"},
    { name: "Natsou", image: "Natsou.jpeg", sex: "female", race: "alley-cat", city: "Brabant-flamand", idnumber: null, birthdate: "2023-03-10", vaccinated: false, dewormed: null, antiparasitic: true, chipped: false, sterilized: false, clean: true, ownerName: "Hannah", phoneNumber: "0498123463"},
    { name: "Iris", image: "Iris.jpeg", sex: "female", race: "russian", city: "Bruxelles", idnumber: 947336510, birthdate: "2023-04-20", vaccinated: true, dewormed: false, antiparasitic: null, chipped: true, sterilized: true, clean: false, ownerName: "Ian", phoneNumber: "0498123464"},
];

function createCatCard(cat) {
    const idnumber = cat.idnumber ? cat.idnumber.toLocaleString() : "unknown data";
    const card = document.createElement('div');
    card.className = 'cat-card';

    const img = document.createElement('img');
    img.src = cat.image;
    img.alt = `Photo of ${cat.name}`;
    card.appendChild(img);

    const title = document.createElement('h1');
    title.textContent = cat.name;
    card.appendChild(title);

    const race = document.createElement('p');
    race.textContent = `Race: ${cat.race}`;
    card.appendChild(race);

    const city = document.createElement('p');
    city.textContent = `City: ${cat.city}`;
    card.appendChild(city);

    const sex = document.createElement('p');
    sex.textContent = `Sex: ${cat.sex}`;
    card.appendChild(sex);

    const idNum = document.createElement('p');
    idNum.textContent = `ID Number: ${idnumber}`;
    card.appendChild(idNum);

    const birthdate = document.createElement('p');
   // const TODAY = new Date();
    birthdate.textContent = `Birthdate: ${new Date(cat.birthdate).toLocaleDateString('fr-be')}`;//fr-ca
    card.appendChild(birthdate);

 // construire nous même la chaine en récupérant jour mois année
// console.log(`${TODAY.getFullYear()}-${String(TODAY.getMonth()+1).padStart(2, 0)}-${String(TODAY.getDate()).padStart(2, 0)}`);
// utiliser le format iso est ne garder que la partie avant le T
// console.log(TODAY.toISOString().split("T")[0]);


    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = 'delete';
    deleteBtn.onclick = function(event) {
        event.stopPropagation();
        deleteCat(cat.name);
    };

    card.appendChild(deleteBtn);

    card.addEventListener('click', () => openModal(cat)); // Pass the cat object directly

    return card;
}

function displayCats(cats) {
    const container = document.getElementById('cats-container');
    container.innerHTML = "";
    cats.forEach(cat => {
        const catCard = createCatCard(cat);
        container.appendChild(catCard);
    });
}

// filter and sort cats
function filterAndSortCats() {
    const selectedCity = document.getElementById('city').value;
    const selectedSort = document.getElementById('sort').value;
    let filteredCats = selectedCity === "" ? CATS : CATS.filter(cat => cat.city === selectedCity);
    if (selectedSort === "age-asc") {
        filteredCats.sort((a, b) =>  new Date(b.birthdate) - new Date(a.birthdate)); //b.birthdate avant a.birthdate car dans la logique de l'age la date la plus grande est plus jeune
    } else if (selectedSort === "age-desc") {
        filteredCats.sort((a, b) => new Date(a.birthdate) - new Date(b.birthdate) ); //a.birthdate avant b.birthdate car dans la logique de l'age la plus petite date est plus vieux
    }
    displayCats(filteredCats);
}
const citySelect = document.getElementById('city');
const sortSelect = document.getElementById('sort');
citySelect.addEventListener('change', filterAndSortCats);
sortSelect.addEventListener('change', filterAndSortCats);
// Call filterAndSortCats on page load
window.onload = filterAndSortCats;
function deleteCat(name) {
    const index = CATS.findIndex(cat => cat.name === name);
    if (index !== -1) {
        CATS.splice(index, 1);
        filterAndSortCats(); // Re-display filtered and sorted cats
    }
}

// Form management for adding new cats
document.addEventListener('DOMContentLoaded', function() {
    const addBtn = document.querySelector('.add');
    const formulaire = document.getElementById('formulaire');
    const closeBtn = document.querySelector('.close');
    const catForm = document.getElementById('catForm');
    const container = document.getElementById('cats-container');
   
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
        const cityFormulaire = document.getElementById('cityForm').value;
        const sexCat = document.querySelector('input[name="sex"]:checked').value;
        const birthdateCat = document.getElementById('birthdate').value;
        
        const catRace = document.getElementById('catRace').value;
        const phoneNumber = document.getElementById('phoneNumber').value; // Get phone number from form
        const ownerName = document.getElementById('ownerName').value; // Get owner name from form
        const vaccinated = document.getElementById('vaccinated').checked;
        const dewormed = document.getElementById('dewormed').checked;
        const antiparasitic = document.getElementById('antiparasitic').checked;
        const chipped = document.getElementById('chipped').checked;
        const sterilized = document.getElementById ('sterilized').checked;
        const clean = document.getElementById ('clean').checked



        const reader = new FileReader();
        reader.onload = function(e) {
            const imgData = catPhoto ? e.target.result : '';

            const annonce = {
                name: catName,
                image: imgData,
                sex: sexCat,
                birthdate: birthdateCat,
                city: cityFormulaire,
                race: catRace,
                phoneNumber: phoneNumber, // Add phone number to annonce object
                ownerName: ownerName, // Add owner name to annonce object
                vaccinated: vaccinated,
                dewormed: dewormed,
                antiparasitic: antiparasitic,
                chipped: chipped,
                sterilized:sterilized,
                clean:clean
            };

            CATS.push(annonce)
            displayCats(CATS)
            formulaire.style.display = 'none';
            catForm.reset();
            filterAndSortCats();
            displayCats(filteredCats);
        };

        if (catPhoto) {
            reader.readAsDataURL(catPhoto);
        } else {
            const annonce = {
                name: catName,
                image: '',
                sex: sexCat,
                birthdate: birthdateCat,
                city: cityFormulaire,
                race: catRace,
                phoneNumber: phoneNumber, // Add phone number to annonce object
                ownerName: ownerName, // Add owner name to annonce object
                vaccinated: vaccinated,
                dewormed: dewormed,
                antiparasitic: antiparasitic,
                chipped: chipped,
                sterilized:sterilized,
                clean:clean
            };

            CATS.push(annonce);
            displayCats(CATS);
            formulaire.style.display = 'none';
            catForm.reset();
            filterAndSortCats();
            displayCats(filteredCats);
        }
    };
});

// Modal du tableau
function openModal(cat) {
    const modal = document.getElementById('cat-modal');
    modal.style.display = 'block';

    document.getElementById('modal-cat-image').src = cat.image;
    document.getElementById('modal-cat-image').alt = `Photo of ${cat.name}`;
    document.getElementById('modal-cat-name').textContent = cat.name;
    document.getElementById('modal-cat-city').textContent = `City: ${cat.city}`;
    document.getElementById('modal-cat-vaccinated').textContent = cat.vaccinated ? '✅' : '✖️';
    document.getElementById('modal-cat-dewormed').textContent = cat.dewormed ? '✅' : '✖️';
    document.getElementById('modal-cat-antiparasitic').textContent = cat.antiparasitic ? '✅' : '✖️';
    document.getElementById('modal-cat-chipped').textContent = cat.chipped ? '✅' : '✖️';
    document.getElementById('modal-cat-sterilized').textContent = cat.sterilized ? '✅' : '✖️';
    document.getElementById('modal-cat-clean').textContent = cat.clean ? '✅' : '✖️';
    document.getElementById('modal-cat-owner').textContent = `Owner: ${cat.ownerName}`;
    document.getElementById('modal-cat-phone').textContent = `Phone: ${cat.phoneNumber}`;
    document.getElementById('contact-link').href = `tel:${cat.phoneNumber}`;
}

const closeModal = () => {
    const modal = document.getElementById('cat-modal');
    modal.style.display = 'none';
}

document.querySelector('.close-btn').addEventListener('click', closeModal);

window.onclick = function(event) {
    const modal = document.getElementById('cat-modal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}
