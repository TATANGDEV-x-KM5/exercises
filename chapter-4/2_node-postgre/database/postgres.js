const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'tatangdev',
    database: 'new_blog',
    password: '',
    port: 5432,
    host: 'localhost'
});

module.exports = pool;