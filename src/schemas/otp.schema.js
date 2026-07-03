const generateOtpSchema = {
    description : "Generar código OTP",

    tags: ["Auth"],

    body: {
        type:"object",
        required:["email"],
        properties: {
            email:{
                type:"string",
                format:"email",
            },
        },
    },

    response: {
        200: {
            type:"object",
            properties: {
                message: {type:"string"},
                
            },
        },

        400: {
            type: "object",
            properties: {
                message: {type:"string"},
            },
        },
    },
}

const verifyOtpSchema = {

    description: "Verificar código OTP",
    tags: ["Auth"],

    body: {
        type:"object",
        required: ["email","otp"],
        properties: {
            email: {
                type:"string",
                format:"email",
            },
            otp: {
                type: "string",
                minLength: 6,
                maxLength: 6,
            },
        },
    },

    response: {
        200: {
            type:"object",
            properties: {
                message:{type:"string"},
            },
        },
        401: {
            type:"object",
            properties: {
                message:{type:"string"},
            },
        },
    },
}

export {
    generateOtpSchema,
    verifyOtpSchema
}