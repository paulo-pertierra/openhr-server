"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
const chai_1 = require("chai");
const event_validation_1 = require("../event.validation");
describe('Validation for event fields using eventFieldIsValid()', () => {
    it('should return true if field from the schema exists.', () => {
        const data = 'title';
        console.log(data);
        (0, chai_1.expect)((0, event_validation_1.eventFieldIsValid)(data)).to.equal(true);
    });
    it('should return false if field from the schema does not exist.', () => {
        const data = 'asdf';
        console.log(data);
        (0, chai_1.expect)((0, event_validation_1.eventFieldIsValid)(data)).to.equal(false);
    });
});
