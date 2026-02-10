import { Router } from 'express';
import {
  generateCICDPipeline,
  validateCICDPipeline,
  getCICDTemplates,
} from '../controllers/cicdController';
import { validateRequest } from '../middleware/validateRequest';
import { cicdPipelineSchema } from '../schemas/cicdSchemas';

const router = Router();

/**
 * @route   POST /api/cicd/generate
 * @desc    Generate CI/CD pipeline configuration based on input
 * @access  Public
 */
router.post('/generate', validateRequest(cicdPipelineSchema), generateCICDPipeline);

/**
 * @route   POST /api/cicd/validate
 * @desc    Validate CI/CD pipeline configuration and get warnings/suggestions
 * @access  Public
 */
router.post('/validate', validateRequest(cicdPipelineSchema), validateCICDPipeline);

/**
 * @route   GET /api/cicd/templates
 * @desc    Get predefined CI/CD pipeline templates
 * @access  Public
 */
router.get('/templates', getCICDTemplates);

export default router;
