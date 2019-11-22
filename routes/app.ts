import {  Router ,Request, Response  } from 'express';
import AppController from '../controllers/AppController';

export const rutaIndex = Router();

rutaIndex.get("/",  AppController.getIndex )
