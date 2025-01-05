// document.addEventListener("DOMContentLoaded", () => {
//     fetch("countries.json")
//     console.log("parseJson")
//     .then(respones => response.json())
//     .then(jsonData => parseJson(jsonData))
//     .catch(error=>{
//         console.log("Error")
//     });
// })

// Fetch continents and populate the dropdown
async function fetchContinents() {
    try {
      const response = await fetch('http://localhost:3000/countries');
      const data = await response.json();
  
      const continents = [...new Set(data.countries.map(country => country.continent))];
      const dropdown = document.getElementById('continentDropdown');
  
      continents.forEach(continent => {
        const option = document.createElement('option');
        option.value = continent;
        option.textContent = continent;
        dropdown.appendChild(option);
      });
    } catch (error) {
      console.error('Error fetching continents:', error);
    }
  }
  
  
  // Fetch and display countries by continent
  async function fetchCountriesByContinent(continent) {
    try {
      const response = await fetch(`http://localhost:3000/countries/${continent}`);
      if (!response.ok) throw new Error('No countries found for the selected continent.');
  
      const data = await response.json();
      const countriesList = document.getElementById('countriesList');
      countriesList.innerHTML = '';
  
      data.countries.forEach(country => {
        const listItem = document.createElement('li');
        listItem.textContent = country;
        countriesList.appendChild(listItem);
      });
    } catch (error) {
      console.error('Error fetching countries:', error);
      alert(error.message);
    }
  }
  
  // Add event listener to dropdown
  document.addEventListener('DOMContentLoaded', () => {
    const dropdown = document.getElementById('continentDropdown');
    fetchContinents();
  
    dropdown.addEventListener('change', (event) => {
      const selectedContinent = event.target.value;
      if (selectedContinent) {
        fetchCountriesByContinent(selectedContinent);
      } else {
        document.getElementById('countriesList').innerHTML = '';
      }
    });
  });
  