"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const helmChartController_1 = require("../controllers/helmChartController");
const validateRequest_1 = require("../middleware/validateRequest");
const helmChartSchemas_1 = require("../schemas/helmChartSchemas");
const router = (0, express_1.Router)();
/**
 * @route   POST /api/helm-chart/generate
 * @desc    Generate a Helm chart based on input configuration
 * @access  Public
 */
router.post('/generate', (0, validateRequest_1.validateRequest)(helmChartSchemas_1.helmChartSchema), helmChartController_1.generateHelmChart);
/**
 * @route   POST /api/helm-chart/validate
 * @desc    Validate Helm chart configuration and get warnings/suggestions
 * @access  Public
 */
router.post('/validate', (0, validateRequest_1.validateRequest)(helmChartSchemas_1.helmChartSchema), helmChartController_1.validateHelmChart);
/**
 * @route   GET /api/helm-chart/templates
 * @desc    Get predefined Helm chart templates
 * @access  Public
 */
router.get('/templates', helmChartController_1.getHelmChartTemplates);
exports.default = router;
//# sourceMappingURL=helmChart.js.map