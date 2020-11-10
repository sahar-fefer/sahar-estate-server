const connection = require('../config');

// const validate = require('../api/validations/user');
const Builder = require('./builders/users');

function allUsers() {
    return new Promise((resolve, reject) => {
        try {
            connection.query('SELECT * FROM users', (error, results, fields) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(results);
            });
        } catch (e) {
            console.log(e);
        }
    });
}

function byId(id) {
    return new Promise((resolve, reject) => {
        try {
            connection.query('SELECT * FROM users WHERE id = ?', [id], (error, results, fields) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(results[0]);
            });
        } catch (e) {
            console.log(e);
        }
    });
}

function logIn(email, password) {
    return new Promise((resolve, reject) => {
        try {
            connection.query(`SELECT * FROM users WHERE status = 'active' and email = ? and password = ?`, [email, password], (error, results, fields) => {
                if (error) {
                    console.log('login error', error);
                    reject(error);
                    return;
                }
                console.log('results', results[0]);
                resolve(results[0]);
            });
        } catch (e) {
            console.log(e);
        }
    });
}

function apartmentsOfUser(userId) {
    return new Promise((resolve, reject) => {
        try {
            connection.query('SELECT * FROM apartments WHERE user_id = ?', [userId], (error, results, fields) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(results);
            });
        } catch (e) {
            console.log(e);
        }
    });
}

function userPassword(userId) {
    return new Promise((resolve, reject) => {
        try {
            connection.query('SELECT password FROM users WHERE id = ?', [userId], (error, results, fields) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(results);
            });
        } catch (e) {
            console.log(e);
        }
    });
}

function addUser({ role_id, first_name, last_name, email, password }) {
    return new Promise((resolve, reject) => {
        try {
            //TODO: Validations
            const createUser = {
                first_name,
                last_name,
                email,
                password,
                role_id
            };

            // const result = validate(createUser);
            // console.log(result);

            connection.query('INSERT INTO users SET ?', createUser, (error, results, fields) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve({ id: results.insertId });
            });
        } catch (e) {
            console.log(e);
        }
    });
}

function editUser(id, role_id, first_name, last_name, email, password, phone, status) {
    return new Promise((resolve, reject) => {
        try {
            const { query, params } = Builder.editSingleUser(id)
                .role_id(role_id)
                .first_name(first_name)
                .last_name(last_name)
                .email(email)
                .password(password)
                .phone(phone)
                .status(status)
                .build();

            connection.query(query, params, (error, results, fields) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(results);
            });
        } catch (e) {
            console.log(e);
        }
    });
}

module.exports = {
    allUsers,
    byId,
    logIn,
    apartmentsOfUser,
    userPassword,
    addUser,
    editUser
};