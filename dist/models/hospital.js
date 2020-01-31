"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
let hospitalSchema = new mongoose_1.Schema({
    nombre: { type: String, required: [true, 'El	nombre	es	necesario'] },
    img: { type: String, required: false },
    usuario: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Usuario' }
});
exports.Hospital = mongoose_2.default.model("Hospital", hospitalSchema);
