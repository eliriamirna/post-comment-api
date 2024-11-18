import { Request, Response } from "express";
import UserRepository from "../repositories/user-repository";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export default class LoginController {
    async login(req: Request, res: Response) {
        const { email, password } = req.body

		if (!email || !password) {
			return res.status(400).json({
				mensagem: 'Todos os campos são obrigatórios'
			})
		}

		try {
			const userRepository = new UserRepository()

			const user = await userRepository.findByEmail(email)

			if (!user) {
				return res.status(400).json({
					mensagem: 'E-mail ou password inválidos'
				})
			}

			const validatepassword = await bcrypt.compare(password, user.password)

			if (!validatepassword) {
				return res.status(400).json({
					mensagem: 'E-mail ou password inválidos'
				})
			}

			const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || '', {
				expiresIn: '1h'
			})
		
			return res.json({
                mensagem: 'Login realizado com sucesso!',
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                },
                token,
            });
		} catch (error) {
			const erro = error as Error
			return res.status(400).json({
				mensagem: erro.message
			})
		}
	}
}
