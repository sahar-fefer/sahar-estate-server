const joi = require('@hapi/joi');

const apartmentScheme = {
    user_id: joi.number().integer().greater(0).required(),
    city_id: joi.number().integer().greater(0).required(),
    address: joi.string().required(),
    price: joi.number().integer().greater(0).required(),
    number_of_room: joi.number().integer().greater(0),
    number_of_bath: joi.number().integer().greater(0),
    sqft: joi.number().integer().greater(0).required(),
    created_on: joi.date().required(),
    description: joi.string(),
    sale_status: joi.string().required(),
    availability: joi.string().required(),
    property_type: joi.string().required(),
    main_image: joi.string(),
    status: joi.string().required()
};

const validate = apartment => joi.validate(apartment, apartmentScheme, {abortEarly:false});

module.exports = validate;