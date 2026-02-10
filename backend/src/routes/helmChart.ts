import { Router } from 'express';
import {
  generateHelmChart,
  validateHelmChart,
  getHelmChartTemplates,
} from '../controllers/helmChartController';
import { validateRequest } from '../middleware/validateRequest';
import { helmChartSchema } from '../schemas/helmChartSchemas';

const router = Router();

/**
 * @route   POST /api/helm-chart/generate
 * @desc    Generate a Helm chart based on input configuration
 * @access  Public
 */
router.post('/generate', validateRequest(helmChartSchema), generateHelmChart);

/**
 * @route   POST /api/helm-chart/validate
 * @desc    Validate Helm chart configuration and get warnings/suggestions
 * @access  Public
 */
router.post('/validate', validateRequest(helmChartSchema), validateHelmChart);

/**
 * @route   GET /api/helm-chart/templates
 * @desc    Get predefined Helm chart templates
 * @access  Public
 */
router.get('/templates', getHelmChartTemplates);

export default router;
