import Otp from "../models/Otp.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import { sendOtpEmail } from "../config/email.js";

export function generateOtpCode(){
    return Math.floor(100000 + Math.random() * 900000).toString();

}

export async function generateOtp(data){
    const {email }= data;

    const user = await User.findOne({
        where: {email}
    });

    if (!user) {
        throw new Error("El correo no está registrado.");

    } 

    await Otp.destroy({
        where:{email}
    });

    const otpCode = generateOtpCode();

    await Otp.create({
        otp:otpCode,
        email:email,
    });

    try {
        await sendOtpEmail(email, otpCode);
    } catch (error){
        await Otp.destroy({where: {email}});
        throw new Error("Error al enviar el email. Intente nuevamente")
    }
    return {otp:otpCode};
}

export async function verifyOtp(data){
    const {email, otp} = data;
    const otpRecord = await Otp.findOne({
        where: {
            email,
            otp
        },
        order: [['createdAt','DESC']]
    });

    if (!otpRecord){
        throw new Error("OTP invalido");
    }

    await Otp.destroy({
        where: {id:otpRecord.id}
    });

    return true;
}

export async function resetPassword(data){
    const {email,otp, newPassword} = data;

    const otpRecord = await Otp.findOne({
        where: { 
            email,
            otp 
        },
        order: [['createdAt', 'DESC']]
    });

    if (!otpRecord) {
        throw new Error("OTP inválido o expirado.");
    }

    const user = await User.findOne({
        where: { email }
    });

    if (!user) {
        throw new Error("Usuario no encontrado.");
    }

     const hashedPassword = await bcrypt.hash(newPassword, 10);

     await user.update({
        password: hashedPassword
    });

    await Otp.destroy({
        where: { id: otpRecord.id }
    });

    return true;
}

