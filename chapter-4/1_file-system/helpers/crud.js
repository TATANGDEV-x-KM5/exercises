const fs = require('fs');
const posts = require('../database/posts');
const PostModel = require('../models/post');

function create(title, body) {
    return new Promise((resolve, reject) => {
        try {
            let newPost = new PostModel(posts.id++, title, body);
            posts.data.push(newPost);

            fs.writeFileSync('./database/posts.json', JSON.stringify(posts, null, 4));
            return resolve(newPost);
        } catch (err) {
            return reject(err);
        }
    });
}

function index() {
    return posts.data;
}

function show(id) {
    return new Promise((resolve, reject) => {
        let post = posts.data.filter(p => {
            return p.id == id;
        });

        if (!post.length) return reject(`post with id ${id} is doesn't exist!`);

        resolve(post[0]);
    });
}

function update(id, title, body) {
    return new Promise((resolve, reject) => {
        let postIndex = posts.data.findIndex(post => post.id === id);

        if (postIndex < 0) return reject(`post with id ${id} is doesn't exist!`);
        if (title) posts.data[postIndex].title = title;
        if (body) posts.data[postIndex].body = body;

        fs.writeFileSync('./database/posts.json', JSON.stringify(posts, null, 4));
        resolve(posts.data[postIndex]);
    });
}


function destroy(id) {
    return new Promise((resolve, reject) => {
        let postIndex = posts.data.findIndex(post => post.id === id);

        if (postIndex < 0) return reject(`post with id ${id} is doesn't exist!`);

        posts.data.splice(postIndex, 1);

        fs.writeFileSync('./database/posts.json', JSON.stringify(posts, null, 4));
        resolve(`post with id ${id} is deleted!`);
    });
}

module.exports = { create, index, show, update, destroy };