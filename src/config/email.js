import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT),
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
});

export async function sendOtpEmail(email, otp){
    const mailOptions = {
        from: `"Tu app" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Tu código OTP",
        html: `
            <div style="font-family: Arial, sans-serif; padding: 20px;">
                <h2>Código de verificación OTP</h2>
                <p>Tu código OTP es:</p>
                <h1 style="background-color: #f0f0f0; padding: 15px; text-align: center; letter-spacing: 5px;">
                    ${otp}
                </h1>
                <p>Este código expirará en 5 minutos.</p>
                <p>Si no solicitaste este código, ignora este mensaje.</p>
            </div>
        `,
    };
    await transporter.sendMail(mailOptions);
}