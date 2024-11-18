import { Request, Response } from "express";
import UserRepository from "../repositories/user-repository";
import User from "../models/user";
import bcrypt from 'bcrypt';

export default class UserController {
    async create(req: Request, res: Response) {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                mensagem: 'Todos os campos são obrigatórios'
            });
        }

        try {
            const userRepository = new UserRepository();
            
            const existEmail = await userRepository.findByEmail(email);

            if (existEmail) {
                return res.status(400).json({
                    mensagem: 'E-mail já cadastrado'
                });
            }

            const user = new User({
                name,
                email,
                password
            });

            const encryptedPassword = await bcrypt.hash(password, 10);
            user.password = encryptedPassword;
            
            const userCreated = await userRepository.create(user);

            return res.status(201).json({
                user: userCreated
            });

        } catch (error) {
            const erro = error as Error;
            return res.status(400).json({
                mensagem: erro.message
            });
        }
    }

    async getOne(req: Request, res: Response) {
        const { id } = req.params;
        const userId = req.user_id;

        try {
            const userRepository = new UserRepository();
            const user = await userRepository.getOne(Number(id));

            if (!user) {
                return res.status(404).json({
                    mensagem: 'Usuário não encontrado'
                });
            }

            if (user.id !== userId) {
                return res.status(403).json({
                    mensagem: 'Você não tem permissão para acessar este usuário'
                });
            }

            return res.json({
                user
            });
        } catch (error) {
            const erro = error as Error;
            return res.status(400).json({
                mensagem: erro.message
            });
        }
    }

    async update(req: Request, res: Response) {
        const { id } = req.params;
        const { name, email, password } = req.body;
        const userId = req.user_id;

        if (!name || !email || !password) {
            return res.status(400).json({
                mensagem: 'Todos os campos são obrigatórios'
            });
        }

        try {
            const userRepository = new UserRepository();
            
            const user = await userRepository.getOne(Number(id));

            if (!user) {
                return res.status(404).json({
                    mensagem: 'Usuário não encontrado'
                });
            }

            if (user.id !== userId) {
                return res.status(403).json({
                    mensagem: 'Você não tem permissão para editar este usuário'
                });
            }

            const encryptedPassword = await bcrypt.hash(password, 10);
            const updatedUser = await userRepository.update(Number(id), { name, email, password: encryptedPassword });

            return res.json({
                user: updatedUser,
                mensagem: 'Usuário atualizado com sucesso'
            });
        } catch (error) {
            const erro = error as Error;
            return res.status(400).json({
                mensagem: erro.message
            });
        }
    }

    async delete(req: Request, res: Response) {
        const { id } = req.params;
        const userId = req.user_id;

        try {
            const userRepository = new UserRepository();
            const user = await userRepository.getOne(Number(id));

            if (!user) {
                return res.status(404).json({
                    mensagem: 'Usuário não encontrado'
                });
            }

            if (user.id !== userId) {
                return res.status(403).json({
                    mensagem: 'Você não tem permissão para excluir este usuário'
                });
            }

            await userRepository.delete(Number(id));

            return res.json({
                mensagem: 'Usuário excluído com sucesso'
            });
        } catch (error) {
            const erro = error as Error;
            return res.status(400).json({
                mensagem: erro.message
            });
        }
    }
}
