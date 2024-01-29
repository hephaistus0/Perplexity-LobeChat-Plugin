document.getElementById('searchButton').addEventListener('click', function() {
    const query = document.getElementById('searchQuery').value;
    performSearch(query);
});

function performSearch(query) {
    if (!query) {
        alert('Please enter a search query.');
        return;
    }

    // The endpoint of the Perplexity API.
    const apiUrl = 'https://damp-reaches-11122.herokuapp.com/search';

    // The data to be sent in the POST request.
    const postData = {
        model: "mistral-7b-instruct", // You might want to allow users to select the model.
        messages: [
            {
                "role": "system",
                "content": "Be precise and concise."
            },
            {
                "role": "user",
                "content": query
            }
        ]
    };

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData)
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

    // Assuming the data returned includes a response field with the text.
    // You'll need to adjust this based on the actual structure of the response.
    const responseText = data.responses[0].message.content; // Adjust this line as needed.
    const resultElement = document.createElement('div');
    resultElement.textContent = responseText;
    resultsContainer.appendChild(resultElement);
}
