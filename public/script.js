document.getElementById('imageForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const formData = new FormData();
    const imageInput = document.getElementById('imageInput').files[0];
    formData.append('image', imageInput);

    // Show loading spinner
    document.getElementById('loading').style.display = 'block';
    document.getElementById('textOutput').value = ''; // Clear any previous text

    fetch('/image', {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            // Hide loading spinner
            document.getElementById('loading').style.display = 'none';

            if (data.error) {
                document.getElementById('textOutput').value = 'Error: ' + data.error;
            } else {
                document.getElementById('textOutput').value = data.text;
            }
        })
        .catch(error => {
            // Hide loading spinner
            document.getElementById('loading').style.display = 'none';

            console.error('Error:', error);
            document.getElementById('textOutput').value = 'An error occurred while generating text.';
        });
});
