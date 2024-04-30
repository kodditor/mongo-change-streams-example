import { ApolloServer, BaseContext } from '@apollo/server';
import { fastifyApolloDrainPlugin, fastifyApolloHandler } from '@as-integrations/fastify';
import Fastify from 'fastify'
import { SchemaResolvers } from './resolvers'
import { readFileSync } from 'fs';
import path from 'path';
import { connect } from 'mongoose';
import { config } from './config';
import { startLogging } from './logs';
import cors from '@fastify/cors'

const fastify = Fastify({
  logger: true
})

const resolvers = SchemaResolvers;
const typeDefs = readFileSync(path.join(__dirname, 'schema.graphql'), { encoding: 'utf-8'});

const apollo = new ApolloServer<BaseContext>({
    typeDefs,
    resolvers,
    plugins: [fastifyApolloDrainPlugin(fastify)],
  });
  

fastify.register(cors, {origin: '*'})

fastify.get('/health', function (request, reply) {
  reply.send({ ping: 'pong' })
});

(async () => {
    await apollo.start();

    fastify.route({
        url: '/graphql',
        method: ['GET', 'POST', 'OPTIONS'],
        handler: fastifyApolloHandler(apollo)
    })

    try {
        await connect(config.db.uri)
        await startLogging()
        await fastify.listen({ port: 3000 })
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
})();