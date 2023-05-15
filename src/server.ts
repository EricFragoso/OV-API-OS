import fastify from 'fastify';
import { env } from './env';
import { osRoutes } from './routes/os';
import { ativoRoutes } from './routes/ativo';
import { historicoRoutes } from './routes/historico';
import { imagesRoutes } from './routes/images';
import cors from '@fastify/cors';

const app = fastify();
app.register(cors);

app.register(osRoutes, {
  prefix: 'os',
})
app.register(ativoRoutes, {
  prefix: 'ativo',
})
app.register(historicoRoutes, {
  prefix: 'historico',
})
app.register(imagesRoutes, {
  prefix: 'images',
})

app.listen({
  port: env.PORT,
}).then(() => {
  console.log('Http Servidor Rodando!')
})
