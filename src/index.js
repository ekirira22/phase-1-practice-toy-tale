let addToy = false;
/******************* MAIN EVENT LISTENER - ENSURES DOM CONTENT IS LOADED ***************** */
document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  /* When the page loads, make a 'GET' request to fetch all the toy objects. With the response data, make a <div class="card"> for each toy and add it to the toy-collection div.*/

  fetchAndDisplayData()
  
  /*********** Event Listeners *****************/

    //Event Listener for adding a new toy based on Users' input
  document.querySelector('form').addEventListener('submit', e => {
      e.preventDefault()
      addNewToy(e)
  })

});

  /********************* FUNCTIONS ************************/

    //Function for displaying data from db.json

function fetchAndDisplayData(){

  const collection = document.getElementById('toy-collection')
  
  fetch('http://localhost:3000/toys')
    .then(res => res.json())
     .then(toys => {
      toys.forEach(toy => {
          //Creates the div.card for each toy
        const card = document.createElement('div')
        card.className = 'card'

          //Sets inner html for the card
        card.innerHTML = `
        <h2>${toy.name}</h2>
        <img src="${toy.image}" class="toy-avatar" />
        <p><span class="like-count">${toy.likes}</span> Likes</p>
        <button class="like-btn" id="toyid">Like ❤️</button>
        `

          //Attach an event listener to each like button of the toy
        card.querySelector('#toyid').addEventListener('click', e => {
          e.preventDefault()
          toy.likes += 1
          card.querySelector('.like-count').textContent = toy.likes

          addLikes(toy.likes, toy.id)
        })
          //Appends the child elements to div#toy-collection
        collection.appendChild(card)
      })
  })
}

  //Function for adding new toy based on users input

function addNewToy(e){

  let toyObject = {
    name: e.target.name.value,
    image: e.target.image.value,
    likes: 0
  }

  // console.log(toyObject)
  fetch('http://localhost:3000/toys', {
    method : 'POST',
    headers:
      {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(toyObject) 
  })
  .then(alert(`You have added ${toyObject.name}`))
}

function addLikes(likes, id){
  // console.log(`id is : ${id} and like is ${likes}`)
  fetch(`http://localhost:3000/toys/${id}`, {
    method: 'PATCH',
    headers:
      {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        "likes": likes
      })
  })
}


