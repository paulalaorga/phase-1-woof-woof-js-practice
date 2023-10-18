
document.addEventListener("DOMContentLoaded", () => {

const dogBar = document.getElementById("dog-bar");

let pups;

  fetch("http://localhost:3000/pups")
    .then((response) => response.json())
    .then((data) => {
      pups = data;
      renderPupSpan();
    });


function renderPupSpan() {
  while (dogBar.firstChild) {
    dogBar.removeChild(dogBar.firstChild);
  }
  pups.forEach((pup) => {
    const span = document.createElement("span");
    span.textContent = pup.name;
    span.addEventListener("click", () => {
      displayDogInfo(pup);
    });
    dogBar.appendChild(span);
  });
}

function displayDogInfo(pup) {

  const infoContainer = document.getElementById("dog-info");

  const image = document.createElement("img");
  image.id = "dog-image";
  image.src = pup.image;

  const name = document.createElement("h2");
  name.id = "dog-name";
  name.textContent = pup.name;

  const button = document.createElement("button");
  button.id = "dog-button";
  button.type = "button";
  button.textContent = pup.isGoodDog ? "Good Dog" : "Bad Dog";
  button.dataset.id = pup.id;

  infoContainer.appendChild(image);
  infoContainer.appendChild(name);
  infoContainer.appendChild(button);

  button.addEventListener("click", () => {
    console.log("Button clicked");
    pup.isGoodDog = !pup.isGoodDog; 
   //button.textContent = pup.isGoodDog ? "Good Dog" : "Bad Dog";

    fetch(`http://localhost:3000/pups/${pup.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isGoodDog: pup.isGoodDog }),
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((updatedPup) => {
      console.log("Pup updated:", updatedPup);
    })
    .catch((error) => {
        console.error("Error updating pup:", error);
      });
  });


}

});
