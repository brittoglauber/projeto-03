import { FastifyInstance } from "fastify";
import { verifyJWT } from "../../middlewares/verify-jwt";
import { search } from "./search";
import { nearby } from "./nearby";
import { create } from "./create";
import { verifyUserRole } from "../../middlewares/verify-user-role";

export async function gymRoutes(app: FastifyInstance) {
   app.addHook('onRequest', verifyJWT)

   app.get('/gym/search', search)
   app.get('/gym/nearby', nearby)

   app.post('/gyms', { onRequest: [verifyUserRole('ADMIN')]}, create)
} 