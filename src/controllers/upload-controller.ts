import { Request, Response } from 'express';
import PostRepository from '../repositories/post-repository';
import path from 'path';

export default class UploadController {
    async uploadFile(req: Request, res: Response) {
        try {
            const file = req.file;

            if (!file) {
                return res.status(400).json({ message: 'Nenhum arquivo enviado' });
            }

            const fileName = file.filename; 
            const filePath = path.posix.join('public', 'uploads', file.filename);


            const postId = req.body.post_id;

            if (!postId) {
                return res.status(400).json({ message: 'ID do post não fornecido' });
            }

            const postRepository = new PostRepository();

            const postUpdated = await postRepository.updateFile(Number(postId), fileName, filePath);

            return res.status(200).json({
                message: 'Arquivo enviado com sucesso',
                filePath: `/uploads/${file.filename}`,
                fileName,
                post: postUpdated,
            });

        } catch (error) {
            const erro = error as Error;
            return res.status(500).json({ 
                message: 'Erro ao processar o upload de arquivo', 
                error: erro.message 
            });
        }
    }
}
