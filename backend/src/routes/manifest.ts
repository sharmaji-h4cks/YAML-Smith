import { Router } from 'express';
import { generateManifest, validateManifest, getTemplates } from '../controllers/manifestController';
import { validateRequest } from '../middleware/validateRequest';
import { manifestSchema } from '../schemas/k8sSchemas';

const router = Router();

router.post('/generate', validateRequest(manifestSchema), generateManifest);
router.post('/validate', validateRequest(manifestSchema), validateManifest);
router.get('/templates', getTemplates);

export default router;
