import { Router } from 'express';
import Alert from 'src/controllers/Alert';
import init from 'src/util/router';
import { auth } from './middlewares';
import makeExpressCallback from './util/make-express-callback';

const routes = Router();

init(routes);

routes.post(
  '/alert',
  auth.isAuthenticated,
  Alert.create.validation,
  makeExpressCallback(Alert.create.method),
);

routes.get(
  '/alerts',
  Alert.getNearbyAlerts.validation,
  makeExpressCallback(Alert.getNearbyAlerts.method),
);

export default routes;
