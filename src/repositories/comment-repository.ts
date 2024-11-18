import pool from "../conexaoBd";
import TComment from "../@types/TComment"; 

export default class CommentRepository {
    async create(props: TComment) {
        const query = `
            INSERT INTO comments (user_id, post_id, description)
            VALUES ($1, $2, $3)
            RETURNING id, user_id, post_id, description
        `;
        const result = await pool.query(query, [
            props.user_id,
            props.post_id,
            props.description,
        ]);
        const commentCreated = result.rows[0];
        return commentCreated;
    }

    async update(id: number, props: TComment) {
        const query = `
            UPDATE comments
            SET description = $1
            WHERE id = $2
            RETURNING id, user_id, post_id, description
        `;
        const result = await pool.query(query, [
            props.description,
            id,
        ]);
        const commentUpdated = result.rows[0];
        return commentUpdated;
    }

    async delete(id: number) {
        const query = 'DELETE FROM comments WHERE id = $1 RETURNING id, user_id, post_id, description';
        const result = await pool.query(query, [id]);
        return result.rows[0];
    }

    async get() {
        const query = `
            SELECT id, user_id, post_id, description
            FROM comments
        `;
        const { rows } = await pool.query(query);
        return rows;
    }

    async getOne(id: number) {
        const query = `
            SELECT id, user_id, post_id, description
            FROM comments
            WHERE id = $1
        `;
        const { rows } = await pool.query(query, [id]);
        return rows[0];
    }

    async getByPostId(post_id: number) {
        const query = `
            SELECT id, user_id, post_id, description
            FROM comments
            WHERE post_id = $1
        `;
        const { rows } = await pool.query(query, [post_id]);
        return rows;
    }

    async getByUserId(user_id: number) {
        const query = `
            SELECT id, user_id, post_id, description
            FROM comments
            WHERE user_id = $1
        `;
        const { rows } = await pool.query(query, [user_id]);
        return rows;
    }
}
