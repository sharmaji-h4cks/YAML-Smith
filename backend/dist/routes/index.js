"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const manifest_1 = __importDefault(require("./manifest"));
const dockerfile_1 = __importDefault(require("./dockerfile"));
const helmChart_1 = __importDefault(require("./helmChart"));
const cicd_1 = __importDefault(require("./cicd"));
const router = (0, express_1.Router)();
router.use('/manifest', manifest_1.default);
router.use('/dockerfile', dockerfile_1.default);
router.use('/helm-chart', helmChart_1.default);
router.use('/cicd', cicd_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map