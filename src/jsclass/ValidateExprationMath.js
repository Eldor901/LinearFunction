
class ValidateExprationMath {
    isMathOperation = (mathOperation) =>
    {

        mathOperation.toLowerCase();

        const  mathOperStates = {
            mathOperState: 'mathOperState',Integer: 'Integer', Operations: 'operations', Variable: 'variable',
            LeftParenthesis:'LeftParenthesis', RightParenthesis: 'RightParenthesis', Error: 'Error'};
        let operations = "+-/*";
        let numbers = "1234567890";
        let state = mathOperStates.mathOperState;
        let paranthessCounter = 0;
        let letters = "x";

        for (let i = 0; i < mathOperation.length; i++)
        {

            if(mathOperation[i] === '(')
            {
                paranthessCounter++;

            }
            else if (mathOperation[i] === ')')
            {
                paranthessCounter--;
            }

            if (state === mathOperStates.mathOperState)
            {
                if (numbers.includes(mathOperation[i]))
                {
                    state = mathOperStates.Integer;
                }

                else if(operations.includes(mathOperation[i]))
                {
                    state = mathOperStates.Operations;
                }

                else if (mathOperation[i] === '(')
                {
                    state = mathOperStates.LeftParenthesis;
                }

                else if (mathOperation[i].includes(mathOperation[i]))
                {
                    state = mathOperStates.Variable;
                }

                else
                {
                    state = mathOperStates.Error;
                }
            }

            else  if (state === mathOperStates.Integer)
            {
                if (numbers.includes(mathOperation[i]))
                {
                    state = mathOperStates.Integer;
                }
                else if (mathOperation[i] === ')')
                {
                    state = mathOperStates.RightParenthesis;
                }

                else if(operations.includes(mathOperation[i]))
                {
                    state = mathOperStates.Operations;
                }
                else
                {
                    state = mathOperStates.Error;
                }
            }

            else  if (state === mathOperStates.Operations)
            {
                if (mathOperation[i] === '(')
                {
                    state = mathOperStates.LeftParenthesis;
                }

                else if (numbers.includes(mathOperation[i]))
                {
                    state = mathOperStates.Integer;
                }

                else if (letters.includes(mathOperation[i]))
                {
                    state = mathOperStates.Variable;
                }

                else
                {
                    state = mathOperStates.Error;
                }
            }

            else  if (state === mathOperStates.LeftParenthesis)
            {
                if (numbers.includes(mathOperation[i]))
                {
                    state = mathOperStates.Integer;
                }
                else if (mathOperation[i] === '(')
                {
                    state = mathOperStates.LeftParenthesis;
                }

                else if (operations.includes(mathOperation[i]))
                {
                    state = mathOperStates.Operations;
                }

                else if (letters.includes(mathOperation[i]))
                {
                    state = mathOperStates.Variable;
                }

                else
                {
                    state = mathOperStates.Error;
                }
            }

            else  if (state === mathOperStates.RightParenthesis)
            {
                if (operations.includes(mathOperation[i]))
                {
                    state = mathOperStates.Operations;
                }
                else if (mathOperation[i] === ')')
                {
                    state = mathOperStates.RightParenthesis;
                }
                else
                {
                    state = mathOperStates.Error;
                }
            }

            else  if (state === mathOperStates.Variable)
            {

                if (operations.includes(mathOperation[i]))
                {
                    state = mathOperStates.Operations;
                }

                else if (mathOperation[i] === ')')
                {
                    state = mathOperStates.RightParenthesis;
                }

                else
                {
                    state = mathOperStates.Error;
                }
            }


            else
            {
                state =  mathOperStates.Error;
            }

        }


        if(state === mathOperStates.Error)
        {
            return false;
        }

        if(paranthessCounter !== 0)
        {
            return false;
        }

        return true;
    };
}

export default ValidateExprationMath;