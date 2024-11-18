import { Request, Response } from "express";
import PostRepository from "../repositories/post-repository";

export default class PostController {
    async create(req: Request, res: Response) {
        const { user_id, title, description } = req.body;

        try {
            const postRepository = new PostRepository();

            const postCreated = await postRepository.create({
                user_id,
                title,
                description,
            });

            return res.status(201).json({
                post: postCreated,
            });
        } catch (error) {
            const erro = error as Error;
            return res.status(400).json({
                mensagem: erro.message,
            });
        }
    }

    async get(req: Request, res: Response) {
        try {
            const postRepository = new PostRepository();
            const posts = await postRepository.get();

            return res.json({
                posts,
            });
        } catch (error) {
            const erro = error as Error;
            return res.status(400).json({
                mensagem: erro.message,
            });
        }
    }

    async getOne(req: Request, res: Response) {
        const { id } = req.params;

        try {
            const postRepository = new PostRepository();
            const post = await postRepository.getOne(Number(id));

            if (!post) {
                return res.status(404).json({
                    mensagem: 'Post não encontrado',
                });
            }

            return res.json({
                post,
            });
        } catch (error) {
            const erro = error as Error;
            return res.status(400).json({
                mensagem: erro.message,
            });
        }
    }

    async update(req: Request, res: Response) {
        const { id } = req.params;
        const { title, description } = req.body;
        const userId = req.user_id;

        try {
            const postRepository = new PostRepository();
            const post = await postRepository.getOne(Number(id));

            if (!post) {
                return res.status(404).json({
                    mensagem: 'Post não encontrado',
                });
            }

            if (post.user_id !== userId) {
                return res.status(403).json({
                    mensagem: 'Você não tem permissão para editar este post',
                });
            }

            const postUpdated = await postRepository.update(Number(id), {
                title,
                description,
            });

            return res.json({
                post: postUpdated,
                mensagem: 'Post atualizado com sucesso',
            });
        } catch (error) {
            const erro = error as Error;
            return res.status(400).json({
                mensagem: erro.message,
            });
        }
    }

    async delete(req: Request, res: Response) {
        const { id } = req.params;
        const userId = req.user_id;

        try {
            const postRepository = new PostRepository();
            const post = await postRepository.getOne(Number(id));

            if (!post) {
                return res.status(404).json({
                    mensagem: 'Post não encontrado',
                });
            }

            if (post.user_id !== userId) {
                return res.status(403).json({
                    mensagem: 'Você não tem permissão para excluir este post',
                });
            }

            await postRepository.delete(Number(id));

            return res.json({
                mensagem: 'Post excluído com sucesso',
            });
        } catch (error) {
            const erro = error as Error;
            return res.status(400).json({
                mensagem: erro.message,
            });
        }
    }

    async getPostsReport(req: Request, res: Response) {
        try {
            const postRepository = new PostRepository();

            const postsReport = await postRepository.getPostsWithCommentCount();

            return res.status(200).json({
                posts: postsReport,
            });
        } catch (error) {
            const erro = error as Error;

            return res.status(500).json({
                mensagem: erro.message,
            });
        }
    }
}
