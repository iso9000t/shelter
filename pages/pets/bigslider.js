"use strict";

// Global variables
let randomPetsArray = [];
let originalPetsArray = [];
let bigRandomArray = [];
let currentCardsArray;
const cards = document.getElementsByClassName('card')
let cardId;
const firstPageButton = document.getElementsByClassName('first-page')[0];
const lastPageButton = document.getElementsByClassName('last-page')[0];
const previousPageButton = document.getElementsByClassName('previous-page')[0];
const nextPageButton = document.getElementsByClassName('next-page')[0];
const currentPageIcon = document.getElementsByClassName('current-page')[0];
const pageButtonsContainer = document.getElementsByClassName('pagination')[0];
let currentPageNumber = 1;
let totalPages = 6;
let itemsPerPage = 8;
const cardsContainer = document.getElementsByClassName('slider')[0];
let currentCardPet;
const dimmedArea = document.getElementsByClassName('dimmed-area')[0];
const modalWindow = document.getElementsByClassName('modal-window')[0];
const layout = document.getElementsByClassName('layout')[0];
const documentBody = document.querySelector('body');
const popupContainer = document.getElementsByClassName('popup-content')[0];
const burger = document.getElementsByClassName('burger')[0];




//Add an event listener to the cards using the cardsContainer and delegation

cardsContainer.addEventListener('click', (e) => { 
  const target = e.target.closest('.card');
  if (target) {
    cardId = target.id.split('-')[1];
    currentCardPet = originalPetsArray[cardId - 1];
    updateModalWindow();
    openModalWindow();
    openDimmedArea();
    blockVerticalScroll();
    
   
  }
})

layout.addEventListener('click', (e) => {
  if (e.target.closest('.dimmed-area') || e.target.closest('.modal-close-button')) {
    closeModalWindow();
    closeDimmedArea();
    unBlockVerticalScroll();
  }

 })

//Reveal the modal window
function openModalWindow() {
  modalWindow.style.display = 'block';
  

 }

//Hide the modal window
function closeModalWindow() {
  modalWindow.style.display = 'none';
}
 
//Reveal the dimmed area
function openDimmedArea() {
  burger.style.zIndex = 0;
  dimmedArea.classList.remove('invisible');


setTimeout(() => {
  dimmedArea.classList.add('dimmed-area-visible');
}, 10);
  
}

//Reveal the dimmed area
function closeDimmedArea() {
  
  dimmedArea.classList.remove('dimmed-area-visible');

setTimeout(() => {
  dimmedArea.classList.add('invisible');
}, 500);
  setTimeout(() => {
    burger.style.zIndex = 3;
  }, 505);
}

//Block vertical scroll
function blockVerticalScroll() { 
  documentBody.classList.add('block-vertical-scroll');
}

//Unblock vertical scroll
function unBlockVerticalScroll() {
   documentBody.classList.remove('block-vertical-scroll');
}

//Update the modal window
function updateModalWindow() {
  popupContainer.innerHTML = `
 
          <div class="popup-image">
            <img src="${currentCardPet.img}" alt="Pet's photo">
          </div>
          <div class="popup-text">
            <h3>${currentCardPet.name}</h3>
            <h4>${currentCardPet.type} - ${currentCardPet.breed}</h4>
            <h5>
              ${currentCardPet.description}
            </h5>
            <div class="pet-deseases">
              <ul class="popup-list-container">
                <li class="popup-list">
                  <h5>
                    <b>Age:</b>
                    ${currentCardPet.age}
                  </h5>
                </li>
                <li class="popup-list">
                  <h5>
                    <b>Inoculations:</b>
                    ${currentCardPet.inoculations.join(", ")}
                  </h5>
                </li>
                 <li class="popup-list">
                  <h5>
                    <b>Diseases:</b>
                    ${currentCardPet.diseases.join(", ")}
                  </h5>
                </li>
                <li class="popup-list">
                  <h5>
                    <b>Parasites:</b>
                    ${currentCardPet.parasites.join(", ")}
                  </h5>
                </li>

              </ul>
            </div>
          </div>
     
  `

 }


//Update page number 
function updatePageNumber() {
currentPageIcon.textContent = currentPageNumber;
}
//Update page buttons
function updateButtons() {
  if (currentPageNumber <= 1) {
    firstPageButton.classList.add("inactive");
    firstPageButton.classList.remove("active-button");
    previousPageButton.classList.add("inactive");
    previousPageButton.classList.remove("active-button");
    firstPageButton.disabled = true;
    previousPageButton.disabled = true;
  } else {
    firstPageButton.classList.remove("inactive");
    firstPageButton.classList.add("active-button");
    previousPageButton.classList.remove("inactive");
    previousPageButton.classList.add("active-button");
    firstPageButton.disabled = false;
    previousPageButton.disabled = false;
  }
  
   if (currentPageNumber >= totalPages) {
     lastPageButton.classList.add("inactive");
     lastPageButton.classList.remove("active-button");
     nextPageButton.classList.add("inactive");
     nextPageButton.classList.remove("active-button");
    lastPageButton.disabled = true;
    nextPageButton.disabled = true;
  } else {
     lastPageButton.classList.remove("inactive");
     lastPageButton.classList.add("active-button");
     nextPageButton.classList.remove("inactive");
     nextPageButton.classList.add("active-button");
    lastPageButton.disabled = false;
    nextPageButton.disabled = false;
  }
}

function addPageButtonEventListeners() {

  pageButtonsContainer.addEventListener("click", (event) => {

    if (event.target === firstPageButton) {
      currentPageNumber = 1;
    } else if (event.target === previousPageButton) {
      currentPageNumber--;
    } else if (event.target === nextPageButton) {
      currentPageNumber++;
    } else if (event.target === lastPageButton) {
      currentPageNumber = totalPages;
    } else {
      return; // If the clicked element is not one of the buttons, exit the function
    }

    updateButtons();
    useRandomPetsArray();
    updatePageNumber();
  });
}


// Fetch the pets data
function fetchPetsData() {
  fetch("../../assets/pets.json")
    .then((response) => response.json())
    .then((data) => {
      // Process the fetched data
      originalPetsArray = data.map((pet, index) => {
        return { id: index + 1, ...pet };
      });

      // Generate the random pets array
      randomPetArray();
      addPageButtonEventListeners();

      // Update itemsPerPage and totalPages based on screen width
      updateItemsPerPageAndTotalPages();

      // Use the random pets array
      useRandomPetsArray();

    })
    .catch((error) => {
      console.error("Error fetching JSON data:", error);
    });
}


// Generate a random array of numbers from 1 to 8
function randomArray() {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8];

  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return arr;
}

// Generate the big random array with 48 elements
function generateBigRandomArray() {

  for (let i = 0; i < 6; i++) {
    const tempArray = randomArray();
    bigRandomArray = [...bigRandomArray, ...tempArray];
  }

  return bigRandomArray;
}

// Create the randomPetsArray with 48 pet objects
function randomPetArray() {
  const bigRandomArray = generateBigRandomArray();

  for (let i = 0; i < 48; i++) {
    randomPetsArray.push(originalPetsArray[bigRandomArray[i] - 1]);
  }
}


//Render the visible card set

function renderCard(from, to) {
    const start = from - 1;
    const end = to;
    currentCardsArray = randomPetsArray.slice(start, end);
    const cardContainer = document.getElementsByClassName('slider')[0];
    cardContainer.innerHTML = '';
    const fragment = document.createDocumentFragment();
    currentCardsArray.forEach((cardData) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.id = `card-${cardData.id}`;

      card.innerHTML = `
    
        <div class="card-body">
            <img
                src="${cardData.img}"
                alt="${cardData.type} ${cardData.name}"
            />
            <h3>${cardData.name}</h3>
            <button class="card-button">Learn more</button>
            </div>
              
        ` 
        fragment.append(card);
    });
    cardContainer.append(fragment);

}


// Update items per page and total pages based on screen width
function updateItemsPerPageAndTotalPages() {
  const screenWidth = window.innerWidth;
  let previousTotalPages = totalPages;

  if (screenWidth >= 1280) {
    itemsPerPage = 8;
    totalPages = 6;
  } else if (screenWidth >= 768 && screenWidth < 1280) {
    itemsPerPage = 6;
    totalPages = 8;
  } else {
    itemsPerPage = 3;
    totalPages = 16;
  }

  // Update the current page number if it's greater than the new total pages
  if (currentPageNumber > totalPages) {
    currentPageNumber = totalPages;
    updatePageNumber();
    updateButtons();
  } else if (previousTotalPages !== totalPages && currentPageNumber === totalPages) {
    // This condition checks if the total number of pages has changed and the current page is the last page
    updateButtons();
  }
}

/* Add a resize event listener to update 
itemsPerPage and totalPages when the window is resized */
window.addEventListener("resize", () => {
  updateItemsPerPageAndTotalPages();
  useRandomPetsArray(); // Update the pets displayed based on the new itemsPerPage
  updateButtons(); // Update the buttons based on the new totalPages
});


// Use the randomPetsArray
function useRandomPetsArray() {
  const startIndex = (currentPageNumber - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  renderCard(startIndex + 1, endIndex);
}

// Start fetching the pets data
fetchPetsData();


