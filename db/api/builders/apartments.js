class ApartmentsBuilder {
    constructor(page, size) {
        this.query = 'Select * from apartments where status = "approved"';
        this.params = [];
        this.page = page;
        this.size = size;
    }
    apartment_id(apartment_id) {
        if (apartment_id) {
            this.params.push(apartment_id);
            this.query += ' and id = ?';
        }
        return this;
    }
    city_id(city_id) {
        if (city_id) {
            this.params.push(city_id);
            this.query += ' and city_id = ?';
        }
        return this;
    }
    sale_status(sale_status) {
        if (sale_status) {
            this.params.push(sale_status);
            this.query += ' and sale_status = ?';
        }
        return this;
    }
    min_price(min_price) {
        if (min_price) {
            this.params.push(min_price);
            this.query += ' and price >= ?';
        }
        return this;
    }
    max_price(max_price) {
        if (max_price) {
            this.params.push(max_price);
            this.query += ' and price <= ?';
        }
        return this;
    }
    property_type(property_type) {
        if (property_type) {
            this.params.push(property_type);
            this.query += ' and property_type = ?';
        }
        return this;
    }
    min_baths(min_baths) {
        if (min_baths) {
            this.params.push(min_baths);
            this.query += ' and number_of_bath >= ?';
        }
        return this;
    }
    max_baths(max_baths) {
        if (max_baths) {
            this.params.push(max_baths);
            this.query += ' and number_of_bath <= ?';
        }
        return this;
    }
    min_rooms(min_rooms) {
        if (min_rooms) {
            this.params.push(min_rooms);
            this.query += ' and number_of_room >= ?';
        }
        return this;
    }
    max_rooms(max_rooms) {
        if (max_rooms) {
            this.params.push(max_rooms);
            this.query += ' and number_of_room <= ?';
        }
        return this;
    }
    build() {
        this.query += ` limit ${(this.page - 1) * this.size}, ${this.size};`;
        console.log("this.query", this.query, "this.params", this.params);
        return { query: this.query, params: this.params };
    }
}

class Builder {
    static allApartments(page, size) {
        return new ApartmentsBuilder(page, size);
    }
}

module.exports = Builder;