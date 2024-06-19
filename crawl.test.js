// this is how you import stuff for CJS - common JavaScript
const {normalizeURL, getURLsFromHTML} = require('./crawl.js')
const {test, expect} = require('@jest/globals')

// Tests for the normalizeURL function:
test('normalizeURL strips protocol', () => {
    const input = 'https://blog.boot.dev/path/';
    const expected = 'blog.boot.dev/path';
    const actual = normalizeURL(input);
    expect(actual).toEqual(expected);
});

test('normalizeURL handles no trailing hash', () => {
    const input = 'https://blog.boot.dev/path';
    const expected = 'blog.boot.dev/path';
    const actual = normalizeURL(input);
    expect(actual).toEqual(expected);
});

test('normalizeURL strips trailing hash', () => {
    const input = 'http://blog.boot.dev/path/';
    const expected = 'blog.boot.dev/path';
    const actual = normalizeURL(input);
    expect(actual).toEqual(expected);
});

test('normalizeURL handles mixed case', () => {
    const input = 'https://Blog.boot.Dev/PaTh/';
    const expected = 'blog.boot.dev/path';
    const actual = normalizeURL(input);
    expect(actual).toEqual(expected);
});

test('normalizeURL handles query parameters', () => {
    const input = 'https://blog.boot.dev/path?query=123';
    const expected = 'blog.boot.dev/path';
    const actual = normalizeURL(input);
    expect(actual).toEqual(expected);
});
  
  test('normalizeURL handles different protocols', () => {
    let input = 'http://blog.boot.dev/path';
    let expected = 'blog.boot.dev/path';
    let actual = normalizeURL(input);
    expect(actual).toEqual(expected);
  
    input = 'https://blog.boot.dev/path';
    expected = 'blog.boot.dev/path';
    actual = normalizeURL(input);
    expect(actual).toEqual(expected);
});


// Tests for the getURLsFromHTML function:
// An absolute URL has protocol and domain in addition to path
test('getURLsFromHTML gets absolute URLs ', () => {
    const inputHTMLBody = `
<html>
    <body>
        <a href = "https://blog.boot.dev/path/">
            Boot.dev Blog
        </a>
    </body>
</html>
`
    const inputBaseURL = "https://blog.boot.dev/path/";
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
    const expected = ["https://blog.boot.dev/path/"];
    expect(actual).toEqual(expected);
});

// A Relative URL does not have protocol and domain, but only path
// the relative URL here is the same as the absolute URL in above test.
// the browser, if it finds a relative URL like /path/ will assume that the 
// same domain as the page preceeds the first slash in /path/

// we dont however want a relative URL but we want to extract it as a full
// absolute URL. This will allow requests to be made to the extracted URL later.
test('getURLsFromHTML gets relative URLs ', () => {
    const inputHTMLBody = `
<html>
    <body>
        <a href = "/path/">
            Boot.dev Blog
        </a>
    </body>
</html>
`
    const inputBaseURL = "https://blog.boot.dev";
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
    const expected = ["https://blog.boot.dev/path/"];
    expect(actual).toEqual(expected);
});

// Now lets have it do both a relative and an absolute URL
test('getURLsFromHTML gets relative and absolute URLs ', () => {
    const inputHTMLBody = `
<html>
    <body>
        <a href = "/path1/">
            Boot.dev Blog
        </a>
        <a href = "https://blog.boot.dev/path2/">
            Boot.dev Blog
        </a>
    </body>
</html>
`
    const inputBaseURL = "https://blog.boot.dev";
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
    const expected = ["https://blog.boot.dev/path1/", "https://blog.boot.dev/path2/"];
    expect(actual).toEqual(expected);
});

// Finally, lets make sure the code doesn't include a bad URL into the array.
test('getURLsFromHTML gets Invalid URLs ', () => {
    const inputHTMLBody = `
<html>
    <body>
        <a href = "invalid">
            Invalid URL
        </a>
    </body>
</html>
`
    const inputBaseURL = "https://blog.boot.dev";
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
    const expected = [];
    expect(actual).toEqual(expected);
});

