module.exports = {
    generateHTMLPost: (post) => {
        return `
        <li>
            <a href="${post.url}" target="_blank">${post.title}</a>
        </li>`;
    },
};
