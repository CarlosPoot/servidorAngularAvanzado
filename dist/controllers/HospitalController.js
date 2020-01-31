"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hospital_1 = require("../models/hospital");
class HospitalController {
    static getHospitales(req, res) {
        let desde = req.query.desde || 0;
        let limit = req.query.limite || 10;
        desde = Number(desde);
        limit = Number(limit);
        hospital_1.Hospital.find({})
            .skip(desde)
            .limit(limit)
            .populate('usuario', 'nombre email')
            .exec((error, hospitales) => {
            if (error) {
                return res.status(500).json({
                    ok: false,
                    mensaje: "Error al cargar hospitales",
                    error: error.message
                });
            }
            hospital_1.Hospital.count((error, total) => {
                if (error) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: "Error al cargar hospitales",
                        error: error.message
                    });
                }
                res.status(200).json({
                    ok: true,
                    hospitales: hospitales,
                    total: total
                });
            });
        });
    }
    static crearHospital(req, res) {
        let body = req.body;
        let hospital = new hospital_1.Hospital({
            nombre: body.nombre,
            usuario: req.body.usuario.id
        });
        hospital.save((error, hospitalGuardado) => {
            if (error) {
                return res.status(500).json({
                    ok: false,
                    mensaje: "Error al cargar hospitales",
                    error: error
                });
            }
            res.status(200).json({
                ok: true,
                mensaje: "Hospital guardado correctamente",
                hospotal: hospitalGuardado
            });
        });
    }
    static actualizarHospital(req, res) {
        let id = req.params.id;
        let body = req.body;
        hospital_1.Hospital.findById(id, (error, hospital) => {
            if (error) {
                return res.status(500).json({
                    ok: false,
                    mensaje: "Error al actualizar hospital",
                    error: error
                });
            }
            if (!hospital) {
                return res.status(400).json({
                    ok: false,
                    mensaje: `Hospital con id ${id} no existe`,
                    error: { message: 'No existe hospital con el id enviado' }
                });
            }
            hospital.nombre = body.nombre;
            hospital.usuario = body.usuario.id;
            hospital.save((error, hospitalActualizado) => {
                if (error) {
                    return res.status(400).json({
                        ok: false,
                        mensaje: "Error al actualizar hospital",
                        error: error
                    });
                }
                res.status(201).json({
                    ok: true,
                    mensaje: "Hospital actualizado correctamente",
                    hospital: hospitalActualizado
                });
            });
        });
    }
    static borrarHospital(req, res) {
        let id = req.params.id;
        hospital_1.Hospital.findByIdAndRemove(id, (error, hospitalEliminado) => {
            if (error) {
                return res.status(500).json({
                    ok: false,
                    mensaje: "Error al borrar hospital",
                    error: error
                });
            }
            if (!hospitalEliminado) {
                return res.status(400).json({
                    ok: false,
                    mensaje: "No existe hospital con id ingresado",
                    error: { message: "No existe hospital con id ingresado" }
                });
            }
            res.status(200).json({
                ok: true,
                mensaje: "Hospital borrado correctamente",
                hospital: hospitalEliminado
            });
        });
    }
}
exports.default = HospitalController;
