console.log(LobeChat);

LobeChat.registerPlugin({
    id: 'PerplexiLobe',
    name: 'PerplexiLobe: A Perplexity AI Plugin for LobeChat',
});

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
    const apiUrl = '/search';

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
    console.log(data); // Log the full response data to the console
    const resultsContainer = document.getElementById('searchResults');
    resultsContainer.innerHTML = ''; // Clear previous results.

    try {
        // Adjusted to match the structure of the response data.
        // Assuming the choices array contains the response text you want to display.
        // You may need to adjust the index or property names based on the actual API response.
        const responseText = data.choices[0].message.content; // Adjust this line as needed.
        const resultElement = document.createElement('div');
        resultElement.textContent = responseText;
        resultsContainer.appendChild(resultElement);
    } catch (error) {
        console.error('Error displaying search results:', error);
        // Optionally, display a user-friendly error message in the UI.
    }
}
