// importing the requisite classes
const { JSDOM } = require('jsdom')

// this function allows the web crawler to extract the 
// links from the webpage's full HTML
// the HTML will be an obvious first input
// the baseURL is the URL of the website we are in the 
// process of crawling. there is the obvious recursive 
// potential here as well as internal links get reused 
// base URLs
function getURLsFromHTML(htmlBody, baseURL){
    const urls = []
    const dom = new JSDOM(htmlBody)
    const linkElements = dom.window.document.querySelectorAll('a')
    for (const linkElement of linkElements){
        // check if its a relative URL
        if (linkElement.href.slice(0,1) === '/'){
            // relative URL
            urls.push(`${baseURL}${linkElement.href}`)
        }else{
            // absolute URL
            urls.push(linkElement.href)
        }
    }
    return urls 
}

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

// this is how you export stuff for CJS - common JavaScript
module.exports = {
    normalizeURL,
    getURLsFromHTML,
}
