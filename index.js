const fs = require("fs").promises;
const CONFIG = require("./src/config");

const getData = require("./src/getData");
const generateStatics = require("./src/generateStatics");

const GHOST_API_KEY = process.env.GHOST_API_KEY;

console.log(process.env);

console.log(`Test: ${GHOST_API_KEY}`);

(async () => {
    const markdownTemplate = fs.readFile("./README.md.tpl", {
        encoding: "utf-8",
    });

    const posts = await getData.getPosts(
        `${CONFIG.BLOG_URL}posts/?key=${GHOST_API_KEY}&include=tags&filter=${CONFIG.POSTS_FILTER}&limit=${CONFIG.POSTS_NUM}`
    );

    const HTMLPosts = posts
        .map((post) => {
            return generateStatics.generateHTMLPost(post);
        })
        .join("");

    const newMarkdown = (await markdownTemplate).replace(
        CONFIG.LATEST_ARTICLE_PLACEHOLDER,
        `<ul>${HTMLPosts}</ul>`
    );

    fs.writeFile("./README.md", newMarkdown);
})();
