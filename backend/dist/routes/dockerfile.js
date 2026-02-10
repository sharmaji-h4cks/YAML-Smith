"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dockerfileController_1 = require("../controllers/dockerfileController");
const validateRequest_1 = require("../middleware/validateRequest");
const dockerfileSchemas_1 = require("../schemas/dockerfileSchemas");
const router = (0, express_1.Router)();
/**
 * @route   POST /api/dockerfile/generate
 * @desc    Generate a Dockerfile based on input configuration
 * @access  Public
 */
router.post('/generate', (0, validateRequest_1.validateRequest)(dockerfileSchemas_1.dockerfileSchema), dockerfileController_1.generateDockerfile);
/**
 * @route   POST /api/dockerfile/validate
 * @desc    Validate Dockerfile configuration and get warnings/suggestions
 * @access  Public
 */
router.post('/validate', (0, validateRequest_1.validateRequest)(dockerfileSchemas_1.dockerfileSchema), dockerfileController_1.validateDockerfile);
/**
 * @route   GET /api/dockerfile/templates
 * @desc    Get predefined Dockerfile templates for different languages
 * @access  Public
 */
router.get('/templates', dockerfileController_1.getDockerfileTemplates);
exports.default = router;
//# sourceMappingURL=dockerfile.js.map