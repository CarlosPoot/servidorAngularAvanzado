"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
const mongoose_unique_validator_1 = __importDefault(require("mongoose-unique-validator"));
let rolesValidos = {
    values: ["ADMIN_ROL", "USER_ROL"],
    message: "{VALUE} no es un rol permitido"
};
let usuarioSchema = new mongoose_1.Schema({
    nombre: { type: String, required: [true, "El nombre es del usuario es requerido"] },
    correo: { type: String, required: [true, "El correo es requerido"], unique: true },
    password: { type: String, required: [true, "La contrasena es requerida"] },
    img: { type: String, required: false },
    role: { type: String, required: [true, "El rol es requerido"], default: "USER_ROL", enum: rolesValidos }
});
usuarioSchema.plugin(mongoose_unique_validator_1.default, { message: "{PATH} debe ser único" });
exports.Usuario = mongoose_2.default.model("Usuario", usuarioSchema);
