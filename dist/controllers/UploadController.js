"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const usuario_1 = require("../models/usuario");
const fs_1 = __importDefault(require("fs"));
class UploadController {
    static subirImagen(req, res) {
        let tipo = req.params.tipo;
        let id = req.params.id;
        let tiposValidos = ["hospitales", "usuarios", "medicos"];
        if (tiposValidos.indexOf(tipo) < 0) {
            return res.status(400).json({
                ok: false,
                mensaje: "Tipo de colección no valida",
                error: { message: "Tipo de coleccion no es valida" }
            });
        }
        if (!req.files) {
            return res.status(500).json({
                ok: false,
                mensaje: "No se recibieron archivos",
                error: { message: "Debe seleccionar una imagen" }
            });
        }
        // obtener nombre de archivo
        let archivo = req.files.imagen;
        let nombreCortado = archivo.name.split(".");
        let extensionArchivo = nombreCortado[nombreCortado.length - 1];
        // extension permitidad
        let extensionesValidas = ["png", "jpg", "gif", "jpeg"];
        if (extensionesValidas.indexOf(extensionArchivo) < 0) {
            return res.status(500).json({
                ok: false,
                mensaje: "Extesión no valida",
                error: { message: "Las extensiones validas son " + extensionesValidas.join(", ") }
            });
        }
        // Nombre de archivo personalizado
        let nombreArchivo = `${id}-${new Date().getMilliseconds()}`;
        let path = `./upload/${tipo}/${nombreArchivo}`;
        archivo.mv(path, (error) => {
            if (error) {
                return res.status(500).json({
                    ok: false,
                    mensaje: "Error al mover archivo",
                    error: error
                });
            }
            res.status(200).json({
                ok: true,
                mensaje: "Archivo movido"
            });
        });
    }
    subirPorTipo(tipo, id, nombreArchivo, res) {
        if (tipo == "usuarios") {
            usuario_1.Usuario.findById(id, (error, usuarioBD) => {
                if (error) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: "Error actualizar imagen del usuario",
                        error: error
                    });
                }
                let patViejo = `./upload/usuarios/${usuarioBD.img}`;
                if (fs_1.default.existsSync(patViejo)) {
                    fs_1.default.unlink(patViejo, (err) => {
                        return res.status(500).json({
                            ok: false,
                            mensaje: "Error actualizar imagen del usuario",
                            error: error
                        });
                    });
                }
                usuarioBD.img = nombreArchivo;
                usuarioBD.save((error, usuarioActualizado) => {
                    if (error) {
                        return res.status(500).json({
                            ok: false,
                            mensaje: "Error actualizar información del usuario",
                            error: error
                        });
                    }
                    res.status(200).json({
                        ok: true,
                        mensaje: "Imagen  de usuario actualizado",
                        usuario: usuarioActualizado
                    });
                });
            });
        }
        if (tipo == "medicos") {
        }
        if (tipo == "hospitales") {
        }
    }
}
exports.default = UploadController;
