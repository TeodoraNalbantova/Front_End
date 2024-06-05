async function fetchData(url) {
    return fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Network response was not ok');
        })
        .then(data => data)
        .catch(error => `${error.message}`);
}

async function fake_delay(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

module.exports = {
    fetchData,
    fake_delay
};
