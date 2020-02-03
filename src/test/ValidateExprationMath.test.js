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


test('ckeck validation for variable', ()=>{
    assert.ok(ValidateEXMath.isMathOperation("x+3*x+3"));
});


test('ckeck validation for variable', ()=>{
    assert.ok(ValidateEXMath.isMathOperation("(x*x+3)/(x)"));
});


test('ckeck with Parentheses', ()=>{
    assert.ok(ValidateEXMath.isMathOperation("2*(-x+3*(x+3))"));
});

test('Error Validation', ()=>{
    assert.ok(!ValidateEXMath.isMathOperation("2x"));
});

test('Error Validation', ()=>{
    assert.ok(!ValidateEXMath.isMathOperation("x2"));
});

test('Error Validation', ()=>{
    assert.ok(!ValidateEXMath.isMathOperation("-x+3x"));
});




