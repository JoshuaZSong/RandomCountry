
// Fetch continents and populate the dropdown
function fetchContinents() {
    fetch('http://localhost:3000/countries')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        const continents = [];
        data.countries.forEach(country => {
          if (!continents.includes(country.continent)) {
            continents.push(country.continent);
          }
        });
  
    
        const dropdown = document.getElementById('continentDropdown');
  
        dropdown.innerHTML = '<option value="">Select a continent</option>';

        continents.forEach(continent => {
          const option = document.createElement('option');
          option.classList.add('grid-item');
          option.value = continent;
          option.textContent = continent;
          dropdown.appendChild(option);
        });
      })
      .catch(error => {
        console.error('Error fetching continents:', error);
      });
  }
  
  
  
  // Fetch and display countries by continent
  function fetchCountriesByContinent(continent) {
    if (!continent) {
      document.getElementById('countriesList').innerHTML = '';
      return;
    }
  
    fetch(`http://localhost:3000/countries/${continent}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('No countries found for the selected continent.');
        }
        return response.json();
      })
      .then(data => {
        const countriesList = document.getElementById('countriesList');
        countriesList.innerHTML = '';
  
        data.countries.forEach(country => {
          const listItem = document.createElement('li');
          listItem.textContent = country;
          countriesList.appendChild(listItem);
        });
      })
      .catch(error => {
        console.error('Error fetching countries:', error);
        alert(error.message);
      });
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
  