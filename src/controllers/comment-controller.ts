import { Request, Response } from "express";
import CommentRepository from "../repositories/comment-repository";  

export default class CommentController {
    async create(req: Request, res: Response) {
        const { user_id, post_id, description } = req.body;

        try {
            const commentRepository = new CommentRepository();

            const commentCreated = await commentRepository.create({
                user_id,
                post_id,
                description,
            });

            return res.status(201).json({
                comment: commentCreated,
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
            const commentRepository = new CommentRepository();
            const comments = await commentRepository.get();

            return res.json({
                comments,
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
            const commentRepository = new CommentRepository();
            const comment = await commentRepository.getOne(Number(id));

            if (!comment) {
                return res.status(404).json({
                    mensagem: 'Comentário não encontrado',
                });
            }

            return res.json({
                comment,
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
        const { description } = req.body;
        const userId = req.user_id;

        try {
            const commentRepository = new CommentRepository();
            const comment = await commentRepository.getOne(Number(id));

            if (!comment) {
                return res.status(404).json({
                    mensagem: 'Comentário não encontrado',
                });
            }

            if (comment.user_id !== userId) {
                return res.status(403).json({
                    mensagem: 'Você não tem permissão para editar este comentário',
                });
            }

            const commentUpdated = await commentRepository.update(Number(id), {
                description,
            });

            return res.json({
                comment: commentUpdated,
                mensagem: 'Comentário atualizado com sucesso',
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
            const commentRepository = new CommentRepository();
            const comment = await commentRepository.getOne(Number(id));

            if (!comment) {
                return res.status(404).json({
                    mensagem: 'Comentário não encontrado',
                });
            }

            if (comment.user_id !== userId) {
                return res.status(403).json({
                    mensagem: 'Você não tem permissão para excluir este comentário',
                });
            }

            await commentRepository.delete(Number(id));

            return res.json({
                mensagem: 'Comentário excluído com sucesso',
            });
        } catch (error) {
            const erro = error as Error;
            return res.status(400).json({
                mensagem: erro.message,
            });
        }
    }
}
