class ApartmentsBuilder {
    constructor(page, size) {
        this.query = 'Select * from apartments where status = "approved" and availability  = "available"';
        this.params = [];
        this.page = page;
        this.size = size;
    }
    apartment_id(id) {
        if (id) {
            console.log('id', id);
            this.params.push(parseInt(id));
            this.query += ' and id = ?';
        }
        return this;
    }
    city_id(city_id) {
        if (city_id) {
            console.log('city_id', city_id);
            this.params.push(parseInt(city_id));
            this.query += ' and city_id = ?';
        }
        return this;
    }
    sale_status(sale_status) {
        if (sale_status) {
            console.log('sale_status', sale_status);
            this.params.push(sale_status);
            this.query += ' and sale_status = ?';
        }
        return this;
    }
    min_price(min_price) {
        if (min_price) {
            console.log('min_price', min_price);
            this.params.push(parseInt(min_price));
            this.query += ' and price >= ?';
        }
        return this;
    }
    max_price(max_price) {
        if (max_price) {
            console.log('max_price', max_price);
            this.params.push(parseInt(max_price));
            this.query += ' and price <= ?';
        }
        return this;
    }
    property_type(property_type) {
        if (property_type) {
            console.log('property_type', property_type);
            this.params.push(property_type);
            this.query += ' and property_type = ?';
        }
        return this;
    }
    min_baths(min_baths) {
        if (min_baths) {
            console.log('min_baths', min_baths);
            this.params.push(parseInt(min_baths));
            this.query += ' and number_of_bath >= ?';
        }
        return this;
    }
    max_baths(max_baths) {
        if (max_baths) {
            console.log('max_baths', max_baths);
            this.params.push(parseInt(max_baths));
            this.query += ' and number_of_bath <= ?';
        }
        return this;
    }
    min_rooms(min_rooms) {
        if (min_rooms) {
            console.log('min_rooms', min_rooms);
            this.params.push(parseInt(min_rooms));
            this.query += ' and number_of_room >= ?';
        }
        return this;
    }
    max_rooms(max_rooms) {
        if (max_rooms) {
            console.log('max_rooms', max_rooms);
            this.params.push(parseInt(max_rooms));
            this.query += ' and number_of_room <= ?';
        }
        return this;
    }
    build() {
        this.query += ` limit ${(this.page - 1) * this.size}, ${this.size};`;
        // console.log("this.query", this.query, "this.params", this.params);
        return { query: this.query, params: this.params };
    }
}

class Builder {
    static allApartments(page, size) {
        return new ApartmentsBuilder(page, size);
    }
}

module.exports = Builder;