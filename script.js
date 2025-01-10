document.getElementById('summarizeBtn').addEventListener('click', async function() {
    const url = document.getElementById('youtubeUrl').value;
    const summaryDiv = document.getElementById('summary');

    // Clear previous summary
    summaryDiv.innerHTML = '';

    // Validate URL (basic validation)
    if (!url.includes('youtube.com/watch?v=') && !url.includes('youtu.be/')) {
        summaryDiv.innerHTML = 'Please enter a valid YouTube URL.';
        return;
    }

    // Call the backend API to get the summary
    try {
        const response = await fetch('http://localhost:5000/summarize', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url: url }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        summaryDiv.innerHTML = data.summary || 'No summary available.';
    } catch (error) {
        summaryDiv.innerHTML = 'Error fetching summary: ' + error.message;
    }
});