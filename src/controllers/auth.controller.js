import * as authService from "../services/auth.service.js";

export async function register(request, reply){
    try {
        const user = await authService.register(request.body);

        return reply.code(201).send({
            message: "Usuario registrdo correctamente",
            data: user
        });
    } catch (error) {

        return reply.code(400).send({
            message: error.message
        });
    }
}

export async function login(request, reply) {
    try{
        const user = await authService.login(request.body);

        return reply.code(200).send({
            message: " Inicio de sesion exitoso"
        });
    } catch (error) {
        return reply.code(401).send({
            message: error.message
        });
    }
}

