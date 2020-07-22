const fs = require("fs").promises;
let Parser = require("rss-parser");
let parser = new Parser();

const LATEST_ARTICLE_PLACEHOLDER = "%{{latest_Article}}%";

(async () => {
    const markdownTemplate = fs.readFile("./README.md.tpl", { encoding: "utf-8" });
    const { items } = await parser.parseURL("https://filisantillan.com/rss/");
    const [{ title, link }] = items;
    const latestArticleMarkdown = `[${title}](${link})`;
    const newMarkdown = (await markdownTemplate).replace(
        LATEST_ARTICLE_PLACEHOLDER,
        latestArticleMarkdown
    );

    fs.writeFile("./README.md", newMarkdown);
})();
