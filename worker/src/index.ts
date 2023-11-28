import { withAccelerate } from '@prisma/extension-accelerate';
import { PrismaClient } from '@prisma/client/edge';

export interface Env {
	DATABASE_URL: string;
}

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		const prisma = new PrismaClient({
			datasourceUrl: env.DATABASE_URL,
		}).$extends(withAccelerate());

		const { data, info } = await prisma.task.findFirst({}).withAccelerateInfo();

		console.log(JSON.stringify({ data, info }));

		return new Response(`request method: ${request.method}!`);
	},
};
