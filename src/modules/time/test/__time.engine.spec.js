"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
const chai_1 = require("chai");
const time_engine_1 = require("../time.engine");
describe('Timing Engine Test', () => {
    it('should return timeInAm for 8am', () => {
        const date = new Date().setHours(8);
        const result = (0, time_engine_1.timingEngine)(new Date(date)); // Lousy conversion!
        console.log(result);
        (0, chai_1.expect)(result).to.have.nested.property('timeInAm');
    });
    it('should return timeOutAm for 10am', () => {
        const date = new Date().setHours(10);
        const result = (0, time_engine_1.timingEngine)(new Date(date)); // Lousy conversion!
        console.log(result);
        (0, chai_1.expect)(result).to.have.nested.property('timeOutAm');
    });
    it('should return timeInPm for 12:35pm', () => {
        const date = new Date().setHours(12, 35);
        const result = (0, time_engine_1.timingEngine)(new Date(date));
        console.log(result);
        (0, chai_1.expect)(result).to.have.nested.property('timeInPm');
    });
    it('should return timeOutPm for 4:35pm', () => {
        const date = new Date().setHours(16, 35);
        const result = (0, time_engine_1.timingEngine)(new Date(date));
        console.log(result);
        (0, chai_1.expect)(result).to.have.nested.property('timeOutPm');
    });
    it('should return errror for 6:35pm', () => {
        const date = new Date().setHours(18, 35);
        const result = (0, time_engine_1.timingEngine)(new Date(date));
        console.log(result);
        (0, chai_1.expect)(result).to.have.nested.property('error');
    });
});
