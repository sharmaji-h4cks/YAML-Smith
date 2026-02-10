import { Router } from 'express';
import {
  generateDockerfile,
  validateDockerfile,
  getDockerfileTemplates,
} from '../controllers/dockerfileController';
import { validateRequest } from '../middleware/validateRequest';
import { dockerfileSchema } from '../schemas/dockerfileSchemas';

const router = Router();

/**
 * @route   POST /api/dockerfile/generate
 * @desc    Generate a Dockerfile based on input configuration
 * @access  Public
 */
router.post('/generate', validateRequest(dockerfileSchema), generateDockerfile);

/**
 * @route   POST /api/dockerfile/validate
 * @desc    Validate Dockerfile configuration and get warnings/suggestions
 * @access  Public
 */
router.post('/validate', validateRequest(dockerfileSchema), validateDockerfile);

/**
 * @route   GET /api/dockerfile/templates
 * @desc    Get predefined Dockerfile templates for different languages
 * @access  Public
 */
router.get('/templates', getDockerfileTemplates);

export default router;
