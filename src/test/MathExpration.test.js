import assert from "assert";
import MathExpration from "../jsclass/MathExpiration";


let mathExpiration = new MathExpration();

test('SimpleMathEquation', ()=>{
    assert.deepEqual( 2 ,mathExpiration.evaluateString("2+2-2"));
});


test('EquationWithPriority', ()=>{
    assert.deepEqual( 8 ,mathExpiration.evaluateString("2+2*2+4/2"));
});


test('EquationWithParentheses', ()=>{
    assert.deepEqual( 16 ,mathExpiration.evaluateString("2*(2+2) + 2*(2+2)"));
});


test('EquationWithUnaryMinus', ()=>{
    assert.deepEqual( 1 ,mathExpiration.evaluateString("-2+3"));
});


test('EquationWithUnaryMinusAfterParentheses', ()=>{
    assert.deepEqual( 1 ,mathExpiration.evaluateString("-2+4+(-2/2)"));
});


test('EquationWithNestedParentheses', ()=>{
    assert.deepEqual( -2 ,mathExpiration.evaluateString("48/(3*(2+2*(-2-3)))"));
});

test('unaryPlus', ()=>{
    assert.deepEqual( 4 ,mathExpiration.evaluateString("2*(+3*(+2-3)+3-2)*(+2-3)"));
});


