import { Schema } from 'mongoose';
import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

let rolesValidos = {
    values: ["ADMIN_ROL", "USER_ROL"],
    message: "{VALUE} no es un rol permitido"
}

let usuarioSchema = new Schema( {
    nombre: { type:String, required: [true, "El nombre es del usuario es requerido" ]  },
    correo: { type:String, required:[true, "El correo es requerido"], unique:true  },
    password: { type:String, required:[true, "La contrasena es requerida"]  },
    img: { type:String, required:false },
    role: {  type:String, required:[true, "El rol es requerido"], default:"USER_ROL", enum: rolesValidos }
})

usuarioSchema.plugin(  uniqueValidator, { message: "{PATH} debe ser único"  } )

export const Usuario = mongoose.model("Usuario", usuarioSchema );
