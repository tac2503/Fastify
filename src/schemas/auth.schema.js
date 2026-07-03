const registerSchema = {
    description: "Registrar un usuario",
    tags: ["Auth"],

    body: {
        type: "object",
        required: ["name","email","password"],

        properties: {
            name:{
                type:"string",
                minLength: 3,
            },
            email: {
                type: "string",
                format: "email",
            },
            password: {
                type: "string",
                minLength: 8,
            },
        },
    },

    response: {
        201: {
            type: "object",
            properties: {
                message: {type: "string"},
            },
        },

        400: {
            type:"object",
            properties: {
                message: {type:"string"},
            },
        },
    },
};


const loginSchema = {
    description: "Iniciar Sesión",

    tags: ["Auth"],

    body: {
        type: "object",

        required: ["email","password"],

        properties: {
            email: {
                type:"string",
                format:"email",
            },
            password: {
                type:"string",
            },
        },
    },

    response: {
        200: {
            type: "object",
            properties: {
                message: {
                    type:"string"
                },
            },
        },
        401: {
            type:"object",
            properties: {
                message: {type:"string"},
            },
        },
    },

};

const forgotPasswordSchema = {
    description: "Restablecer contraseña",
    tags: ["Auth"],

    body: {
        type:"object",
        required:["email","otp","newPassword"],
        properties: {
            email:{
                type:"string",
                format:"email",
            },
            otp: {
                type:"string",
                minLength:6,
                maxLength:6,
            },
            newPassword: {
                type: "string",
                minLength:8,
            },
        },
    },

    response: {
        200: {
            type: "object",
            properties: {
                message: { type: "string" },
            },
        },
        400: {
            type: "object",
            properties: {
                message: { type: "string" },
            },
        },
        401: {
            type: "object",
            properties: {
                message: { type: "string" },
            },
        },
    },
};

export {
    registerSchema,
    loginSchema,
    forgotPasswordSchema
};