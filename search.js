document.getElementById('searchButton').addEventListener('click', function() {
    const query = document.getElementById('searchQuery').value;
    performSearch(query);
});

function performSearch(query) {
    if (!query) {
        alert('Please enter a search query.');
        return;
    }

    // Update the URL below with the endpoint of your perplexity API.
    const apiUrl = 'https://api.your-perplexity-service.com/search';

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // Include any required API keys or tokens here if needed.
            // 'Authorization': 'Bearer YOUR_API_KEY'
        },
        body: JSON.stringify({ query: query })
    })
    .then(response => response.json())
    .then(data => {
        displayResults(data);
    })
    .catch(error => {
        console.error('Error performing search:', error);
    });
}

function displayResults(data) {
    const resultsContainer = document.getElementById('searchResults');
    resultsContainer.innerHTML = ''; // Clear previous results.

    // Assuming the data returned is an array of search results.
    data.forEach(result => {
        const resultElement = document.createElement('div');
        resultElement.textContent = result.title; // Modify as per your API response structure.
        resultsContainer.appendChild(resultElement);
    });
}
