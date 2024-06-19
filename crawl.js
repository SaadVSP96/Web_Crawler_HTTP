// importing the requisite classes
const { JSDOM } = require('jsdom')

async function crawlPage(baseURL, currentURL, pages){
    const baseURLObj = new URL(baseURL)
    const currentURLObj = new URL(currentURL)
    // need to make sure if the link points to something outside 
    // the scope of baseURL or the current website, if so, we return
    // early. Pages is how we keep track of the page's we've already 
    // crawled, pretty standard recursion stuff.
    if (baseURL.hostname !== currentURL.hostname){
        return pages
    }
    // Now we need to check if we've already crawled this page. for this we
    // grab the normalized version of the current URL and then check if it 
    // exists within the pages object.
    // the pages object will contain the page URL against how many times 
    // we've seen that page.
    const normalizedCurrentURL = normalizeURL(currentURL)
    if (pages[normalizedCurrentURL] > 0){
        pages[normalizedCurrentURL] ++
        return pages
    }
    // if we've made it this far, pages should have an entry initialized for
    // this new page:
    pages[normalizedCurrentURL] = 1
    console.log(`actively crawling ${currentURL}`)
    // no need to specify method as fetch API uses GET by default
    // previously we were expecting response body to be formatted as json hence we used .json()
    // now we are expecting the response body to be HTML, hence we use .text(), and will 
    // parse it as text.
    try{
        const response = await fetch(currentURL)
        // must check for bad status responses, i.e., more than 200s or 300s
        if (response.status > 399){
            console.log(`error in fetch with status code: ${response.status} on page: ${currentURL}`)
            return null
        }
        // must also check and make sure we are recieving HTML from the fetch call
        const contentType = response.headers.get("content-type")
        if (!contentType.includes('text/html')){
            console.log(`not HTML response, content type: ${contentType} on page: ${currentURL}`)
            return null
        }
        // instead of logging all that HTML, lets save that in a variable:
        // console.log(await response.text())
        const htmlBody = await response.text()
        // the next step would be to extract the links from the HTML body we 
        // get from above line and we've  already got the function to do that:
        nextURLs = getURLsFromHTML(htmlBody, baseURL)
        // and now, you guessed it, we'll call the samme function recursively on
        // the nextURLs
        for (const nextURL of nextURLs){
            pages = await crawlPage(baseURL, nextURL, pages)
        }

    }catch(err){
        console.log(`error in fetch: ${err.message}, on page ${currentURL}`)
    }
    // when all the pages have been crawled, we just return the pages object:
    return pages
}


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
            try{
                const urlObj = new URL(`${baseURL}${linkElement.href}`)
                urls.push(urlObj.href)
            } catch(err){
                console.log(`error with relative URL: ${err.message}`)
            }
        }else{
            // absolute URL
            try{
                const urlObj = new URL(linkElement.href)
                urls.push(urlObj.href)
            } catch(err){
                console.log(`error with absolute URL: ${err.message}`)
            }
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
    crawlPage,
}
