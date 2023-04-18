'use strict';

/* DECLARATIONS */
let currentCardsArray;
const cards = document.getElementsByClassName('card');
let cardId;
let selectedObject;
const dimmedArea = document.querySelector('.dimmed-area');
const modalWindow = document.getElementsByClassName('modal-window')[0];
const body = document.querySelector('body');
let globalPetsArray = [];

/* FETCH PETS ARRAY */
fetch("../../assets/pets.json")
  .then((response) => response.json())
  .then((data) => {
    const pets = data.map((pet, index) => {
      return { id: index + 1, ...pet };
    });
    globalPetsArray = pets;
    createCards();
  })
  .catch((error) => {
    console.error("Error fetching JSON data:", error);
  });

/* GENERATE ARRAY */
let lastArray = null;

function generateArray() {
  let newArray = [];

  while (newArray.length < 3) {
    const number = Math.floor(Math.random() * 8) + 1;
    if (!newArray.includes(number) && (lastArray === null || !lastArray.includes(number))) {
      newArray.push(number);
    }
  }

  lastArray = newArray;
  return newArray;
}

/* GET OBJECTS BY IDS */
function getObjectsByIds(ids) {
  currentCardsArray = globalPetsArray.filter((obj) => ids.includes(obj.id));
  return currentCardsArray;
}

/* EVENT LISTENERS */
document.addEventListener('click', (event) => {
  if (event.target.closest('.left-arrow-button')) {
    [...cards].forEach(card => {
      card.classList.add('slide-right');
    });

    [...cards].forEach((card) => {
      setTimeout(() => {
        card.classList.remove('slide-right');
      }, 500);
    });

    setTimeout(() => {
      createCards();
    }, 500);
  }

  if (event.target.closest('.right-arrow-button')) {
    [...cards].forEach(card => {
      card.classList.add('slide-left');
    });

    [...cards].forEach((card) => {
      setTimeout(() => {
        card.classList.remove('slide-left');
      }, 500);
    });

    setTimeout(() => {
      createCards();
    }, 500);
  }

  if (event.target.closest('.card')) {
    if (dimmedArea.classList.contains('invisible')) {
      openDimmedArea();
    }

    body.classList.add('block-vertical-scroll');
    modalWindow.classList.remove('invisible');
    const card = event.target.closest('.card');

    if (card) {
      const id = card.id;
      cardId = id.split('-')[1];
      selectedObject = globalPetsArray[cardId - 1];
    }

    const modalContainer = document.querySelector('.popup-content');
    modalContainer.innerHTML = '';
    modalContainer.innerHTML = `
      <div class="popup-image">
        <img src="${selectedObject.img}" alt="Pet's photo">
      </div>
      <div class="popup-text">
        <h3>${selectedObject.name}</h3>
        <h4>${selectedObject.type} - ${selectedObject.breed}</h4>
        <h5>${selectedObject.description}</h5>
        <div class="        pet-diseases">
          <ul class="popup-list-container">
            <li class="popup-list">
              <h5>
                <b>Age:</b>
                ${selectedObject.age}
              </h5>
            </li>
            <li class="popup-list">
              <h5>
                <b>Inoculations:</b>
                ${selectedObject.inoculations.join(", ")}
              </h5>
            </li>
            <li class="popup-list">
              <h5>
                <b>Diseases:</b>
                ${selectedObject.diseases.join(', ')}
              </h5>
            </li>
            <li class="popup-list">
              <h5>
                <b>Parasites:</b>
                ${selectedObject.parasites.join(', ')}
              </h5>
            </li>
          </ul>
        </div>
      </div>
    `;
  }

  if (event.target.closest('.modal-close-button')) {
    closeModal();
  }

  if (!event.target.closest('.popup-content') && !event.target.closest('.mobile-menu') && !event.target.closest('.burger') && dimmedArea.classList.contains('dimmed-area-visible')) {
    closeModal();
  }
});

/* CREATE CARDS */
function createCards() {
  getObjectsByIds(generateArray());
  const cardContainer = document.getElementsByClassName("card-container")[0];
  cardContainer.innerHTML = '';

  const fragment = document.createDocumentFragment();
  currentCardsArray.forEach((cardData) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.id = `card-${cardData.id}`;

    card.innerHTML = `
      <div class="card-body">
        <img src="${cardData.img}" alt="${cardData.type} ${cardData.name}">
        <h3>${cardData.name}</h3>
        <button class="card-button">Learn more</button>
      </div>
    `;
    fragment.appendChild(card);
  });
  cardContainer.append(fragment);
}

/* CLOSE MODAL */
function closeModal() {
  body.classList.remove('block-vertical-scroll');
  modalWindow.classList.add('invisible');
  dimmedArea.classList.remove('dimmed-area-visible');
  setTimeout(() => {
    dimmedArea.classList.add('invisible');
  }, 500);
}

/* OPEN DIMMED AREA */
function openDimmedArea() {
  dimmedArea.classList.remove('invisible');
  setTimeout(() => {
    dimmedArea.classList.add('dimmed-area-visible');
  }, 50);
}

