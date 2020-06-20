const connection = require('../config');

const validate = require('../api/validations/apartment');
const Builder = require('./builders/apartments');

function getApartments({ id, sale_status, city_id, min_price, max_price, property_type, min_baths, max_baths, min_rooms, max_rooms, page = 1, size = 12 }) {
    return new Promise((resolve, reject) => {
        try {
            const { query, params } = Builder.allApartments(page, size)
                .apartment_id(id)
                .sale_status(sale_status)
                .city_id(city_id)
                .min_price(min_price)
                .max_price(max_price)
                .property_type(property_type)
                .min_baths(min_baths)
                .max_baths(max_baths)
                .min_rooms(min_rooms)
                .max_rooms(max_rooms)
                .build();
            console.log(query, params);
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

function getApartmentImages(apartment_id) {
    return new Promise((resolve, reject) => {
        try {
            connection.query('SELECT url FROM images WHERE apartment_id = ?', [apartment_id], (error, results, fields) => {
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

function getApartmentsUser(user_id) {
    return new Promise((resolve, reject) => {
        try {
            connection.query('SELECT * FROM apartments WHERE user_id = ?', [user_id], (error, results, fields) => {
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

function getApartmentsUserByStatus(user_id, status) {
    return new Promise((resolve, reject) => {
        try {
            connection.query('SELECT * FROM apartments WHERE user_id = ? AND status = ?', [user_id, status], (error, results, fields) => {
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

function addApartment({ address, price, number_of_room, number_of_bath, sqft, description, sale_status, property_type, main_image }) {
    return new Promise((resolve, reject) => {
        try {
            const createApartment = {
                user_id: 4,
                city_id: 1102076,
                address,
                price,
                number_of_room,
                number_of_bath,
                sqft,
                created_on: new Date(),
                description,
                sale_status,
                availability: "available",
                property_type,
                main_image,
                status: "pending"
            };

            // const result = validate(createApartment);
            // // console.log(result.error, 'details', result.error.details);
            // if (result.error) {
            //     const validationErrors = new Error(`${result.error.details.map(err => err.message)}`);
            //     validationErrors.isValidationError = true;
            //     reject(validationErrors);
            //     return;
            // }

            connection.query('INSERT INTO apartments SET ?', createApartment, (error, results, fields) => {
                if (error) {
                    // console.log('insert error', error);
                    reject(error);
                    return;
                }
                resolve({ id: results.insertId });
            });
        } catch (e) {
            console.log(e);
            reject(e.message);
        }
    });
}

function updateApartmentStatus(newStatus, apartment_id) {
    return new Promise((resolve, reject) => {
        try {
            connection.query('UPDATE apartments SET status = ? WHERE id = ?', [newStatus, apartment_id], (error, results, fields) => {
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

function availabilityApartment(availability, apartment_id) {
    return new Promise((resolve, reject) => {
        try {
            connection.query('UPDATE apartments SET availability = ? WHERE id = ?', [availability, apartment_id], (error, results, fields) => {
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

// function allCitiesOfApartments() {
//     return new Promise((resolve, reject) => {
//         connection.query('SELECT city_id FROM apartments A JOIN cities C on A.city_id = C.id GROUP BY city_id;', (error, results, fields) => {
//             if (error) {
//                 reject(error);
//                 return;
//             }
//             resolve(results);
//         });
//     });
// }

module.exports = {
    getApartments,
    getApartmentImages,
    getApartmentsUser,
    getApartmentsUserByStatus,
    addApartment,
    updateApartmentStatus,
    availabilityApartment,
    // editApartment,
    // allCitiesOfApartments
};