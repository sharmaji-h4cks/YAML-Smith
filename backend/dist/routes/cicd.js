"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cicdController_1 = require("../controllers/cicdController");
const validateRequest_1 = require("../middleware/validateRequest");
const cicdSchemas_1 = require("../schemas/cicdSchemas");
const router = (0, express_1.Router)();
/**
 * @route   POST /api/cicd/generate
 * @desc    Generate CI/CD pipeline configuration based on input
 * @access  Public
 */
router.post('/generate', (0, validateRequest_1.validateRequest)(cicdSchemas_1.cicdPipelineSchema), cicdController_1.generateCICDPipeline);
/**
 * @route   POST /api/cicd/validate
 * @desc    Validate CI/CD pipeline configuration and get warnings/suggestions
 * @access  Public
 */
router.post('/validate', (0, validateRequest_1.validateRequest)(cicdSchemas_1.cicdPipelineSchema), cicdController_1.validateCICDPipeline);
/**
 * @route   GET /api/cicd/templates
 * @desc    Get predefined CI/CD pipeline templates
 * @access  Public
 */
router.get('/templates', cicdController_1.getCICDTemplates);
exports.default = router;
//# sourceMappingURL=cicd.js.map