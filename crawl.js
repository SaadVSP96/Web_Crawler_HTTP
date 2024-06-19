// create a file crawl.js
// Inside the file, define the funciton stub

function normalizeURL(urlString){
    // Parse the URL
    const url = new URL(urlString);

    // Combine the Hostname and pathname
    let normalized = `${url.hostname}${url.pathname}`;

    // Remove the trailing slash if its not the only character in the pathname
    if (normalized.endsWith('/') && normalized !== `${url.hostname}/`){
        normalized = normalized.slice(0, -1);
    }
    return normalized.toLowerCase();
}

// expoting the function:
export { normalizeURL };