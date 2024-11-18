import pool from "../conexaoBd";
import TUser from "../@types/TUser";

export default class UserRepository {
    async findByEmail(email: string) {
        const query = 'SELECT * FROM users WHERE email = $1';
        const { rows } = await pool.query(query, [email]);
        return rows[0];  
    }

    async create(props: TUser) {
        const query = `
            INSERT INTO users (name, email, password)
            VALUES ($1, $2, $3)
            RETURNING id, name, email
        `;
        const result = await pool.query(query, [props.name, props.email, props.password]);
        const userCreated = result.rows[0];
        return userCreated;        
    }

    async update(id: number, props: TUser) {
        const query = `
            UPDATE users 
            SET name = $1, email = $2, password = $3
            WHERE id = $4
            RETURNING id, name, email
        `;
        const result = await pool.query(query, [props.name, props.email, props.password, id]);
        const userUpdated = result.rows[0];
        return userUpdated;
    }

    async delete(id: number) {
        const query = 'DELETE FROM users WHERE id = $1 RETURNING id, name, email';
        const result = await pool.query(query, [id]);
        return result.rows[0];  
    }

    async get() {
        const query = 'SELECT id, name, email FROM users';
        const { rows } = await pool.query(query);
        return rows;  
    }

    async getOne(id: number) {
        const query = 'SELECT id, name, email FROM users WHERE id = $1';
        const { rows } = await pool.query(query, [id]);
        return rows[0];  
    }
}
