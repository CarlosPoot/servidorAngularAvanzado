"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const usuario_1 = require("../models/usuario");
const hospital_1 = require("../models/hospital");
const medico_1 = require("../models/medico");
class BusquedaController {
    static buscarTodo(req, res) {
        let busqueda = req.params.concepto;
        let expresion = new RegExp(busqueda, 'i');
        Promise.all([
            BusquedaController.getHospitales(expresion),
            BusquedaController.getMedicos(expresion),
            BusquedaController.getUsuarios(expresion)
        ]).then((respuestas) => {
            res.status(200).json({
                ok: true,
                usuarios: respuestas[2],
                hospitales: respuestas[0],
                medicos: respuestas[1]
            });
        }).catch(errro => {
            res.status(500).json({
                ok: false,
                mensaje: 'Ocurrio un error al realizar la busqueda',
                error: errro
            });
        });
    }
    static buscarTabla(req, res) {
        let concepto = req.params.concepto;
        let tabla = req.params.tabla;
        let expresion = new RegExp(concepto, 'i');
        let promesa;
        switch (tabla) {
            case 'usuario':
                promesa = BusquedaController.getUsuarios(expresion);
                break;
            case 'hospital':
                promesa = BusquedaController.getHospitales(expresion);
                break;
            case 'medico':
                promesa = BusquedaController.getMedicos(expresion);
                break;
            default:
                // bad request
                return res.status(400).json({
                    ok: false,
                    mensaje: "Tabla recibida incorrecta"
                });
                break;
                promesa.then(data => {
                    res.status(200).json({
                        ok: true,
                        [tabla]: data
                    });
                }).catch(error => {
                    // error interno
                    return res.status(500).json({
                        ok: false,
                        mensaje: "Error inesperado al realizar busqueda"
                    });
                });
        }
    }
    static getHospitales(expresion) {
        return new Promise((reject, resolve) => {
            hospital_1.Hospital.find({ 'nombre': expresion })
                .populate('usuario', 'nombre email')
                .exec((error, hospitales) => {
                if (error) {
                    reject("Error al buscar hospitales", error);
                }
                resolve(hospitales);
            });
        });
    }
    static getMedicos(expresion) {
        return new Promise((reject, resolve) => {
            medico_1.Medico.find({ 'nombre': expresion })
                .populate('usuario', 'nombre email')
                .populate('hospital')
                .exec((error, medicos) => {
                if (error) {
                    reject("Error al buscar medicos", error);
                }
                resolve(medicos);
            });
        });
    }
    static getUsuarios(expresion) {
        return new Promise((reject, resolve) => {
            usuario_1.Usuario.find({}, 'nombre email role')
                .or([{ 'nombre': expresion }, { 'email:': expresion }])
                .exec((error, usuarios) => {
                if (error) {
                    reject("Error al buscar usuarios", error);
                }
                resolve(usuarios);
            });
        });
    }
}
exports.default = BusquedaController;
