import { Router } from 'express';
import manifestRoutes from './manifest';
import dockerfileRoutes from './dockerfile';
import helmChartRoutes from './helmChart';
import cicdRoutes from './cicd';

const router = Router();

router.use('/manifest', manifestRoutes);
router.use('/dockerfile', dockerfileRoutes);
router.use('/helm-chart', helmChartRoutes);
router.use('/cicd', cicdRoutes);

export default router;
