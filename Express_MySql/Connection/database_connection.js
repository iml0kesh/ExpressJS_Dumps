import mysql from "mysql";

const db = mysql.createConnection({
    host: '<HOSTTYPE>',
    user: '<USERNAME>',
    password: '<PASSWORD>',
})

db.connect((err) => {
    if (err) {
        console.error(err.stack);
    } else {
        console.log('connection established with mysql');
    }
});


