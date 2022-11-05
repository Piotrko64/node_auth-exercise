import { prisma } from '../app';

export async function getUserIdBySessionId(sessionId: string) {
   const findSession = await prisma.session.findUnique({
      where: { sessionId },
   });

   return findSession?.userId;
}
