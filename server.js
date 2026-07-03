import Fastify from "fastify";
import { initializeDatabase } from "./src/config/database.js";
import swaggerPlugin from "./src/plugins/swagger.js";
import authRoutes from "./src/routes/auth.routes.js";

const app = Fastify();

await initializeDatabase();
await app.register(swaggerPlugin);
await app.register(authRoutes, {prefix: "/api/auth"});

await app.listen({
    port: 3000
});

console.log("Servidor corriendo en http://localhost:3000");
console.log("Documentación disponible en http://localhost:3000/documentation");
