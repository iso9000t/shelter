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
        console.log(globalPetsArray);
    // Code that uses globalPetsArray
    const array1 = generateArray();
    console.log(array1);

    const array2 = generateArray();
    console.log(array2);

    const array3 = generateArray();
    console.log(array3);

    const result = getObjectsByIds(array3);
    console.log(result);
   

  })
  .catch((error) => {
    console.error("Error fetching JSON data:", error);
  });

console.log(globalPetsArray);

/* Get random numbers */
let lastArray = null;

function generateArray() {
  let newArray = [];

  // Generate new array with non-repeating random numbers from 1 to 8
  while (newArray.length < 3) {
    const number = Math.floor(Math.random() * 8) + 1;
    if (!newArray.includes(number) && (lastArray === null || !lastArray.includes(number))) {
      newArray.push(number);
    }
  }

  // Update lastArray with the newly generated array
  lastArray = newArray;

  return newArray;
}

function getObjectsByIds(ids) {
  return globalPetsArray.filter((obj) => ids.includes(obj.id));
}

 document.addEventListener('click', () => {
  console.log(getObjectsByIds(generateArray()))
});