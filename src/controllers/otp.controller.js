import * as otpService from "../services/otp.service.js";

export async function generateOtp(request, reply){
    try {
        const {otp} = await otpService.generateOtp(request.body);

        return reply.code(200).send({
            message:"OTP generado correctamente. Revisa el correo",
            
        });
    } catch (error) {
        return reply.code(400).send({
            message: error.message
        });
    }
}

export async function verifyOtp(request, reply){
    try {
        await otpService.verifyOtp(request.body);

        return reply.code(200).send({
            message: "OTP verificado correctamente"
        });
    } catch (error) {
        return reply.code(401).send({
            message: error.message
        });
    }
}

export async function resetPassword(request, reply) {
    try {
        await otpService.resetPassword(request.body);

        return reply.code(200).send({
            message: "Contraseña restablecida correctamente"
        });
    } catch (error) {
        return reply.code(400).send({
            message: error.message
        });
    }
}