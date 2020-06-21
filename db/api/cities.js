const connection = require('../config');

function allCities() {
    return new Promise((resolve, reject) => {
        try {
            connection.query('Select * from cities', (error, results, fields) => {
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

function allCitiesWithApartments() {
    return new Promise((resolve, reject) => {
        try {
            connection.query('SELECT C.id, C.name FROM cities C JOIN apartments A on A.city_id = C.id group by C.id;', (error, results, fields) => {
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

function getCityById(cityId) {
    return new Promise((resolve, reject) => {
        try {
            connection.query('Select * from cities where id = ?', [cityId], (error, results, fields) => {
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
    allCities,
    allCitiesWithApartments,
    getCityById
};