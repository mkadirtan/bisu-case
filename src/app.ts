import express from 'express';
import routes from './routes';
import expressErrorHandler from './middlewares/express-error-handler';

const app = express();

app.use('/api', routes);
app.use(expressErrorHandler);

export default app;
