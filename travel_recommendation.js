const searchBtn = document.getElementById("searchBtn");
const clearBtn = document.getElementById("clearBtn");

// Defined the main screen div to hide when the search results are shown
const mainScreenTextDiv = document.getElementById("mainScreenTextDiv");

searchBtn.addEventListener("click", searchCondition);

function searchCondition() {
  const searchInput = document
    .getElementById("searchInput")
    .value.toLowerCase();
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "";

  fetch("travel_recommendation_api.json")
    .then((response) => response.json())
    .then((data) => {
      const countries = data.countries;
      const temples = data.temples;
      const beaches = data.beaches;

      let results = [];

      // Logic to determine what the user enters and return results based on it
      if (
        searchInput.includes("country") ||
        searchInput.includes("countries")
      ) {
        countries.forEach((country) => {results = results.concat(country.cities)});
      }
      if (searchInput.includes("temple")) {
        results = temples;
      }
      if (searchInput.includes("beach")) {
        results = beaches;
      }

      if (results.length === 0) {
        mainScreenTextDiv.style.display = "none";
        resultDiv.innerHTML = `<p id="NoResultText">There is no result to be found.</p>`;
      } else {
        mainScreenTextDiv.style.display = "none";
        results.forEach((item) => {
          resultDiv.innerHTML += `
              <div class="resultCard">
                <div><img src="${item.imageUrl}" alt="${item.name}" class="resultImg" /></div>
                <h3 style="color:black;">${item.name}</h3>
                <p style="color:black;">${item.description}</p>
              </div>
            `;
        });
      }
    });
}

function clear(){
  document.getElementById('searchInput').value = "";
  document.querySelector('#result').style.display = "none";
  mainScreenTextDiv.style.display = "";
}

clearBtn.addEventListener('click',clear)