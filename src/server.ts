import fastify from 'fastify';
import { env } from './env';
import { osRoutes } from './routes/os';
import { ativoRoutes } from './routes/ativo';
import { historicoRoutes } from './routes/historico';
import { imagesRoutes } from './routes/images';
import cors from '@fastify/cors';
import { testRoutes } from './routes/test';

const app = fastify();
app.register(cors);

app.register(testRoutes, {
  prefix: 'test',
})
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

app.listen(env.PORT || 3000, '0.0.0.0', (err) => {
  if (err) {
    app.log.error(err);
   process.exit(1);
  }
  console.log(`server running at ${env.PORT}`)
 })