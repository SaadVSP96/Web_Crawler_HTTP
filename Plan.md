# 1-Week Plan for Building a Web Crawler

## Day 1: Setup and Fundamentals
- **Morning**
  - Set up your environment (code editor, command line, install Node.js with NVM).
- **Afternoon**
  - Ensure everything works by running a basic Node.js script.
- **Evening**
  - Review JavaScript fundamentals (variables, loops, conditionals, functions, objects).

## Day 2: Web Basics and Fetching
- **Morning**
  - Learn the basics of HTTP, URLs, and the basic structure of an HTML document.
- **Afternoon**
  - Start with simple fetch requests using `axios` or `node-fetch`.
- **Evening**
  - Experiment with fetching a page and logging its HTML content in the console.

## Day 3: Parsing and Extracting Links
- **Morning**
  - Dive into HTML parsing with `cheerio`—learn how to load a page and extract links.
- **Afternoon**
  - Write a script to find and log all links on a given page.
- **Evening**
  - Test your script on a few different web pages.

## Day 4: Core Crawler Logic
- **Morning**
  - Write the logic to follow extracted links and fetch new pages.
- **Afternoon**
  - Implement a mechanism to avoid revisiting the same pages (use a Set for this).
- **Evening**
  - Test your basic crawler on a small, simple website.

## Day 5: Enhancements
- **Morning**
  - Add depth control to the crawler to limit how many levels of links it follows.
- **Afternoon**
  - Introduce basic error handling (e.g., handling broken links and non-HTML content).
- **Evening**
  - Implement a simple reporting feature to aggregate and display found links.

## Day 6: Performance and Edge Cases
- **Morning**
  - Improve performance with concurrent requests and retries for failed requests.
- **Afternoon**
  - Address more complex edge cases, such as various HTTP errors and redirections.
- **Evening**
  - Conduct thorough testing on larger and more complex websites.

## Day 7: Final Testing and Polishing
- **Morning**
  - Perform final testing to ensure reliability and robustness.
- **Afternoon**
  - Clean up your code, add comments, and improve documentation.
- **Evening**
  - Final review of your project. Ensure the code is well-documented and readable.
  - Add any finishing touches to the reporting functionality.

# General Tips
1. **Stay Focused**: Try to eliminate distractions during your dedicated coding time.
2. **Take Breaks**: Short, regular breaks can help keep your mind fresh.
3. **Set Milestones**: Aim to complete specific tasks by certain times to stay on track.
4. **Utilize Resources**: Look up documentation, forums, and tutorials if you get stuck, but try to understand and implement solutions on your own.

# Sticking Points
If you encounter any significant obstacles:
- **Break Down Problems**: Split large problems into smaller, more manageable pieces.
- **Ask Questions**: Feel free to reach out for hints or nudges if you find yourself stuck on a particular problem for too long.

# Example Breakdown
To give you a bit more detail, if you are stuck on extracting links, you might do the following:
1. **Isolate Issue**: Run a basic `cheerio` script to load and log the document structure.
2. **Understand Basics**: Ensure you understand how `cheerio` selectors work (similar to jQuery).
3. **Test Selectors**: Start with simple selectors to grab links, and incrementally build to more complex ones.

