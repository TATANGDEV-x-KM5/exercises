const pool = require('../database/postgres');

function create(title, body) {
    return new Promise(async (resolve, reject) => {
        try {
            let result = await pool.query("INSERT INTO posts (title, body) values ($1, $2) RETURNING *;", [title, body]);
            resolve(result.rows[0]);
        } catch (err) {
            return reject(err);
        }
    });
}

function index() {
    return new Promise(async (resolve, reject) => {
        try {
            let result = await pool.query("SELECT * FROM posts;");
            resolve(result.rows);
        } catch (err) {
            return reject(err);
        }
    });
}

function show(id) {
    return new Promise(async (resolve, reject) => {
        try {
            let result = await pool.query("SELECT * FROM posts WHERE id = $1;", [id]);
            if (!result.rows.length) return reject(`post with id ${id} is doesn't exist!`);
            resolve(result.rows[0]);
        } catch (err) {
            return reject(err);
        }
    });
}

function update(id, title, body) {
    return new Promise(async (resolve, reject) => {
        let result = await pool.query("UPDATE posts SET title = $1, body = $2 WHERE id = $3;", [title, body, id]);
        if (!result.rowCount) return reject(`post with id ${id} is doesn't exist!`);
        resolve(`post with id ${id} updated!`);
    });
}

function destroy(id) {
    return new Promise(async (resolve, reject) => {
        let result = await pool.query("DELETE FROM posts WHERE id = $1;", [id]);
        if (!result.rowCount) return reject(`post with id ${id} is doesn't exist!`);
        resolve(`post with id ${id} is deleted!`);
    });
}

module.exports = { create, index, show, update, destroy };