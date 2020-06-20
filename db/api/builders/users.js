class EditUserBuilder {
    constructor(id) {
        this.query = `UPDATE users SET updated_in = ?`;
        this.id = id
        const date = Date();
        this.params = [date];
    }
    role_id(role_id) {
        if (role_id) {
            this.params.push(role_id);
            this.query += ', role_id = ?';
        }
        return this;
    }
    first_name(first_name) {
        if (first_name) {
            this.params.push(first_name);
            this.query += ', first_name = ?';
        }
        return this;
    }
    last_name(last_name) {
        if (last_name) {
            this.params.push(last_name);
            this.query += ', last_name = ?';
        }
        return this;
    }
    email(email) {
        if (email) {
            this.params.push(email);
            this.query += ', email = ?';
        }
        return this;
    }
    password(password) {
        if (password) {
            this.params.push(password);
            this.query += ', password = ?';
        }
        return this;
    }
    phone(phone) {
        if (phone) {
            this.params.push(phone);
            this.query += ', phone = ?';
        }
        return this;
    }
    status(status) {
        if (status) {
            this.params.push(status);
            this.query += ', status = ?';
        }
        return this;
    }
    build() {
        this.params.push(this.id);
        this.query += ' WHERE id = ?'
        return { query: this.query, params: this.params };
    }
}

class Builder {
    static editSingleUser(id) {
        return new EditUserBuilder(id);
    }
}

module.exports = Builder;