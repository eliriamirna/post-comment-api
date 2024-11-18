import pool from "../conexaoBd";
import TPost from "../@types/TPost";

export default class PostRepository {
    async create(props: TPost) {
        const query = `
            INSERT INTO posts (user_id, title, description)
            VALUES ($1, $2, $3)
            RETURNING id, user_id, title, description
        `;
        const result = await pool.query(query, [
            props.user_id,
            props.title,
            props.description,
        ]);
        const postCreated = result.rows[0];
        return postCreated;
    }

    async update(id: number, props: TPost) {
        const query = `
            UPDATE posts 
            SET  title = $1, description = $2
            WHERE id = $3
            RETURNING id, user_id, title, description
        `;
        const result = await pool.query(query, [
            props.title,
            props.description,
            id,
        ]);
        const postUpdated = result.rows[0];
        return postUpdated;
    }

    async delete(id: number) {
        const query = 'DELETE FROM posts WHERE id = $1 RETURNING id, user_id, title, description';
        const result = await pool.query(query, [id]);
        return result.rows[0];
    }

    async get() {
        const query = `
            SELECT id, user_id, title, description, file_name, file_path
            FROM posts
        `;
        const { rows } = await pool.query(query);
        return rows;
    }

    async getOne(id: number) {
        const query = `
            SELECT id, user_id, title, description, file_name, file_path
            FROM posts
            WHERE id = $1
        `;
        const { rows } = await pool.query(query, [id]);
        return rows[0];
    }

    async getByUserId(user_id: number) {
        const query = `
            SELECT id, user_id, title, description, file_name, file_path
            FROM posts
            WHERE user_id = $1
        `;
        const { rows } = await pool.query(query, [user_id]);
        return rows;
    }

    async updateFile(id: number, fileName: string, filePath: string) {
        const query = `
            UPDATE posts 
            SET file_name = $1, file_path = $2 
            WHERE id = $3 
            RETURNING id, file_name, file_path
        `;

        const result = await pool.query(query, [fileName, filePath, id]);
        const postUpdated = result.rows[0];
        return postUpdated;
    }

    async getPostsWithCommentCount() {
        const query = `
            SELECT 
                p.id, 
                p.title, 
                COUNT(c.id) AS comment_count
            FROM 
                posts p
            LEFT JOIN 
                comments c
            ON 
                p.id = c.post_id
            GROUP BY 
                p.id
        `;
        const { rows } = await pool.query(query);
        return rows; 
    }
}
