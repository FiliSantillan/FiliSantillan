const fetch = require("node-fetch");

module.exports = {
    getPosts: async (url) => {
        const request = await fetch(url);
        let data = await request.json();

        return data.posts
            .map((post) => {
                return {
                    title: post.title,
                    url: post.url,
                    tag: post.tags[1].name,
                };
            })
            .filter((post) => {
                return post.tag !== "newsletter";
            });
    },
};
