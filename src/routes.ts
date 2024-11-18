import { Router } from "express";
import upload from './middlewares/multerConfig';
import authMiddleware from "./middlewares/auth-middleware";

import UserController from '../src/controllers/user-controller';
import LoginController from '../src/controllers/login-controller';
import PostController from "./controllers/post-controller";
import UploadController from "./controllers/upload-controller";
import CommentController from "./controllers/comment-controller";

const routes = Router()

// @ts-ignore
routes.post('/users', new UserController().create)

// @ts-ignore
routes.post('/posts', new PostController().create)

// @ts-ignore
routes.get('/posts', new PostController().get)

// @ts-ignore
routes.get('/posts/:id', new PostController().getOne)

// @ts-ignore
routes.post('/comments', new CommentController().create)

// @ts-ignore
routes.get('/comments', new CommentController().get)

// @ts-ignore
routes.get('/comments/:id', new CommentController().getOne)

// @ts-ignore
routes.post('/upload', upload.single('file'), new UploadController().uploadFile);

// @ts-ignore
routes.get('/posts-report', new PostController().getPostsReport)

// @ts-ignore
routes.post('/login', new LoginController().login)

// @ts-ignore
routes.use(authMiddleware)

// @ts-ignore
routes.get('/users/:id', new UserController().getOne)

// @ts-ignore
routes.put('/users/:id', new UserController().update)

// @ts-ignore
routes.delete('/users/:id', new UserController().delete)

// @ts-ignore
routes.put('/posts/:id', new PostController().update)

// @ts-ignore
routes.delete('/posts/:id', new PostController().delete)

// @ts-ignore
routes.put('/comments/:id', new CommentController().update)

// @ts-ignore
routes.delete('/comments/:id', new CommentController().delete)

export default routes