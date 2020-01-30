import ValidateExprationMath from "../jsclass/ValidateExprationMath";
import render from 'react-test-renderer'
import assert from "assert";

let ValidateEXMath = new ValidateExprationMath();

test('ValidateExpration', ()=>{
    assert.ok(ValidateEXMath.isMathOperation("2+3*2"));
});

test('ValidateExpirationWithParentheses', ()=>{
    assert.ok(ValidateEXMath.isMathOperation("2*(2+2)"));
});


test('ValidationErrorExpiration', ()=>{
    assert.ok(!ValidateEXMath.isMathOperation("2**2+2"));
});


test('ValidationUnclosedParentheses', ()=>{
    assert.ok(!ValidateEXMath.isMathOperation("2*(2+2"));
});



