"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const manifestController_1 = require("../controllers/manifestController");
const validateRequest_1 = require("../middleware/validateRequest");
const k8sSchemas_1 = require("../schemas/k8sSchemas");
const router = (0, express_1.Router)();
router.post('/generate', (0, validateRequest_1.validateRequest)(k8sSchemas_1.manifestSchema), manifestController_1.generateManifest);
router.post('/validate', (0, validateRequest_1.validateRequest)(k8sSchemas_1.manifestSchema), manifestController_1.validateManifest);
router.get('/templates', manifestController_1.getTemplates);
exports.default = router;
//# sourceMappingURL=manifest.js.map