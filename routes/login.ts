import { Router } from 'express';
import LoginController from '../controllers/LoginController';

export const rutasLogin = Router();

rutasLogin.get("/login", LoginController.loginUsuario )