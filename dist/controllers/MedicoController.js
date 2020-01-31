"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const medico_1 = require("../models/medico");
class MedicoController {
    static getMedicos(req, res) {
        let desde = req.query.desde || 0;
        let limit = req.query.limite || 10;
        desde = Number(desde);
        limit = Number(limit);
        medico_1.Medico.find({})
            .skip(desde)
            .limit(limit)
            .populate('usuario', 'nombre email')
            .populate('hospital')
            .exec((error, medicos) => {
            if (error) {
                return res.status(500).json({
                    ok: false,
                    mensaje: "Error al cargar medicos",
                    error: error.message
                });
            }
            res.status(200).json({
                ok: true,
                medicos: medicos
            });
        });
    }
    static crearMedico(req, res) {
        let body = req.body;
        let medico = new medico_1.Medico({
            nombre: body.nombre,
            usuario: req.body.usuario.id,
            hospital: body.hospital
        });
        medico.save((error, medicoGuardado) => {
            if (error) {
                return res.status(500).json({
                    ok: false,
                    mensaje: "Error al crear medico",
                    error: error
                });
            }
            res.status(200).json({
                ok: true,
                mensaje: "Medico guardado correctamente",
                medico: medicoGuardado
            });
        });
    }
    static actualizarMedico(req, res) {
        let id = req.params.id;
        let body = req.body;
        medico_1.Medico.findById(id, (error, medico) => {
            if (error) {
                return res.status(500).json({
                    ok: false,
                    mensaje: "Error al actualizar medico",
                    error: error
                });
            }
            if (!medico) {
                return res.status(400).json({
                    ok: false,
                    mensaje: `Medico con id ${id} no existe`,
                    error: { message: 'No existe medico con el id enviado' }
                });
            }
            medico.nombre = body.nombre;
            medico.usuario = body.usuario.id;
            medico.hospital = body.hospital;
            medico.save((error, medicoActualizado) => {
                if (error) {
                    return res.status(400).json({
                        ok: false,
                        mensaje: "Error al actualizar medico",
                        error: error
                    });
                }
                res.status(201).json({
                    ok: true,
                    mensaje: "Medico actualizado correctamente",
                    medico: medicoActualizado
                });
            });
        });
    }
    static borrarMedico(req, res) {
        let id = req.params.id;
        medico_1.Medico.findByIdAndRemove(id, (error, medicoEliminado) => {
            if (error) {
                return res.status(500).json({
                    ok: false,
                    mensaje: "Error al borrar medico",
                    error: error
                });
            }
            if (!medicoEliminado) {
                return res.status(400).json({
                    ok: false,
                    mensaje: "No existe medico con id ingresado",
                    error: { message: "No existe medico con id ingresado" }
                });
            }
            res.status(200).json({
                ok: true,
                mensaje: "Medico borrado correctamente",
                medico: medicoEliminado
            });
        });
    }
}
exports.default = MedicoController;
