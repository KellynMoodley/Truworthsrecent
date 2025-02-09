async function fetchSummary() {
    const accountNumber = document.getElementById('accountNumber').value;
    if (!accountNumber) {
        alert('Please enter an account number.');
        return;
    }
    try {
        const response = await fetch(`/fetch-summary?account=${encodeURIComponent(accountNumber)}`);
        const data = await response.json();
        
        // Parse the string into an array by splitting on numbered points
        const points = data.toString().split(/\d+\.\s*"/).filter(point => point.trim());
        
        // Format each point
        const formattedText = points.map((point, index) => {
            // Clean up the point by removing extra quotes and commas
            const cleanPoint = point.replace(/^"|"$|",$/g, '').trim();
            return `${index + 1}. ${cleanPoint}`;
        }).join('<br><br>');
        
        document.getElementById('summary').innerHTML = formattedText;
        
    } catch (error) {
        document.getElementById('summary').innerHTML = 'No data for account number: ' + accountNumber;
    }
}
