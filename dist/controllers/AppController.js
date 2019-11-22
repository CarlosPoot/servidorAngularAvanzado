"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AppController {
    static getIndex(req, res) {
        res.status(200).json({
            ok: true,
            mensaje: "Servidor principal"
        });
    }
}
exports.default = AppController;
