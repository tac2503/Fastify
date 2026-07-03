import fp from 'fastify-plugin';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';

async function swaggerPlugin(fastify, options){

    await fastify.register(swagger,{
        openapi:{
            openapi: '3.0.0',
            info:{
                title:'API de autenticación y otp',
                description: ' Api para registro, login y gestión de otp',
                version:'1.0.0',
                contact: {
                    name:'api support',
                    email:'practicante@newinntech.com'
                }
            },
            servers:[
                {
                    url:'http://localhost:3000',
                    description: 'Servidor de desarrollo'
                }
            ],
            tags:[
                {
                    name: 'Auth',
                    description: 'Endpoints de autenticación, registro y gestión de OTP'
                }
            ]
        }
    });

    await fastify.register(swaggerUi,{
        routePrefix: '/documentation',
        uiConfig:{
            docExpansion:'list',
            deepLinking: true
        },
        staticCSP: true
    });
}

export default fp(swaggerPlugin);