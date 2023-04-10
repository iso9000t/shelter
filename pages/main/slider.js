"use strict";
//Declaring global variables
let currentCardsArray;
const cards = document.getElementsByClassName('card')
let cardId;
let selectedObject;
const dimmedArea = document.querySelector('.dimmed-area');
const modalWindow = document.getElementsByClassName('modal-window')[0];
const body = document.querySelector('body');




/* fetch the PETS ARRAY */
let globalPetsArray = [];

fetch("../../assets/pets.json")
  .then((response) => response.json())
 .then((data) => {
  // Add an ID to each pet
  const pets = data.map((pet, index) => {
    return { id: index + 1, ...pet };
  });

  globalPetsArray = pets;

  // Call createCards after globalPetsArray is updated
  createCards();
})
  .catch((error) => {
    console.error("Error fetching JSON data:", error);
  });



/* Get random numbers */
let lastArray = null;

function generateArray() {
  let newArray = [];

  // Generate new array with non-repeating random numbers from 1 to 8 whicj will serve as ids for the cards to choose from globalPetsArray
  while (newArray.length < 3) {
    const number = Math.floor(Math.random() * 8) + 1;
    if (!newArray.includes(number) && (lastArray === null || !lastArray.includes(number))) {
      newArray.push(number);
    }
  }

  // Update lastArray with the newly generated id-array
  lastArray = newArray;

  return newArray;
}






//Create a new array with the selected cards withthe help of the id-array 
function getObjectsByIds(ids) {
  currentCardsArray = globalPetsArray.filter((obj) => ids.includes(obj.id));
  //Retorn the updayted array of three cards
  return currentCardsArray;
}

document.addEventListener('click', (event) => {
  if (event.target.closest('.right-arrow-button')) {
  
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

  if (event.target.closest('.left-arrow-button')) {
  
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
      console.log(cardId);
      selectedObject = globalPetsArray[cardId - 1];
      console.log(selectedObject);

    }

    const modalContainer = document.querySelector('.popup-content');
  

    modalContainer.innerHTML = '';
    modalContainer.innerHTML = `
   <div class="popup-image">
            <img
              src="${selectedObject.img}"
              alt="Pet's photo"
            />
          </div>
          <div class="popup-text">
            <h3>${selectedObject.name}</h3>
            <h4>${selectedObject.type} - ${selectedObject.breed}</h4>
            <h5>${selectedObject.description}</h5>
            <div class="pet-deseases">
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
  `
  }

  if (event.target.closest('.modal-close-button')) {
    closeModal();
  }
  if (event.target === dimmedArea) {
  if (!event.target.closest('.modal-window') && !dimmedArea.classList.contains('invisible')) {
    closeModal();
  }
}



 });
 


 // Creating the card set
function createCards () {
  // Update currentCardsArray with the selected cards using the id-array with random numbers
  getObjectsByIds(generateArray());
  console.log(currentCardsArray);

  // We get the parent element
  const cardContainer = document.getElementsByClassName("card-container")[0];

  // Clear existing cards
  cardContainer.innerHTML = '';

  // Create cards dynamically based on currentCardsArray
  currentCardsArray.forEach((cardData) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.id = `card-${cardData.id}`;

    card.innerHTML = `
      <div class="card-body">
        <img src="${cardData.img}" alt="${cardData.type} ${cardData.name}" />
        <h3>${cardData.name}</h3>
        <button class="card-button">Learn more</button>
      </div>
    `;

    cardContainer.append(card);
  });
}
 

function closeModal() {
  body.classList.remove('block-vertical-scroll');
  
  modalWindow.classList.add('invisible');
  dimmedArea.classList.remove('dimmed-area-visible');
  setTimeout(() => {
    dimmedArea.classList.add('invisible');
  }, 500);
}

function openDimmedArea() { 
    dimmedArea.classList.remove('invisible');

            setTimeout(() => {
                dimmedArea.classList.add('dimmed-area-visible');
            }, 50);
          
}

