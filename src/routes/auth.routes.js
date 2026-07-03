import * as authController from "../controllers/auth.controller.js";
import * as otpController from "../controllers/otp.controller.js";
import {
    registerSchema,
    loginSchema,
    forgotPasswordSchema
} from "../schemas/auth.schema.js";

import {
    generateOtpSchema,
    verifyOtpSchema
} from "../schemas/otp.schema.js";

async function routes(fastify) {
    fastify.post(
        "/register",
        {schema: registerSchema},
        authController.register
    );

    fastify.post(
        "/login",
        {schema: loginSchema},
        authController.login
    );

    fastify.post(
        "/forgot-password",
        {schema: forgotPasswordSchema},
        otpController.resetPassword
    );

    fastify.post(
        "/verify-otp",
        {schema: verifyOtpSchema},
        otpController.verifyOtp
    );

    fastify.post(
        "/generate-otp",
        {schema: generateOtpSchema},
        otpController.generateOtp
    );
}

export default routes;