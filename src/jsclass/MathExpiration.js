
class MathExpration {

    _process_operation(stack, operation)
    {

        if (operation === '~' || operation === '#')
        {
            let l = stack[stack.length - 1]; stack.pop();

            switch (operation) {
                case '~': stack.push(-l); break;
                case '#': stack.push(l); break;
            }
        }
        else {
            let r = stack[stack.length - 1]; stack.pop();
            let l = stack[stack.length - 1]; stack.pop();
            switch (operation) {
                case '+': stack.push(l + r); break;
                case '-': stack.push(l - r); break;
                case '*': stack.push(l * r); break;
                case '/': stack.push(l / r); break;
            }
        }
    }


    _priority(operation)
    {
        if (operation === '~' || operation === '#')
            return 3;
        if (operation === '+' || operation === '-')
            return 1;
        if (operation === '*' || operation === '/')
            return 2;
        return -1;
    }

    evaluateString =  (s)=> {
        let stack = [];
        let operation = [];
        let is_op = "+-/*";
        let numbers = "1234567890.";
        let may_be_unary = true;
        let fixedNumber = false;


        for (let i = 0; i < s.length; i++) {
            if (s[i] === " ") {
                continue;
            }

            if(s[i] === '(')
            {
                operation.push(s[i]);
                may_be_unary = true;
            }
            else if (s[i] === ')')
            {
                while (operation[operation.length-1] !== '(')
                {
                    this._process_operation(stack, operation[operation.length-1]);
                    operation.pop();
                }
                operation.pop();
                may_be_unary = false;
            }
            else if (is_op.includes(s[i])) {
                let  cur_op = s[i];

                if (may_be_unary && (cur_op === '-' || cur_op === '+'))
                {
                    if (cur_op === '-')
                        cur_op = "~"; //unary minus
                    else if (cur_op === '+')
                        cur_op = '#'  //unary plus

                }

                while (operation.length !== 0 && (
                    (this._priority(operation[operation.length-1]) >= this._priority(cur_op)) ||
                    (this._priority(operation[operation.length-1]) > this._priority(cur_op))
                ))

                {
                    this._process_operation(stack, operation[operation.length-1]);
                    operation.pop();
                }
                operation.push(cur_op);
                may_be_unary = true;
            } else {
                let number = 0;
                let fl = 0;
                while (i < s.length && numbers.includes(s[i])) {

                    if(s[i] === '.')
                    {
                        fixedNumber = true;
                        i++;
                        fl = 1;
                    }

                    if (fixedNumber) {
                        let float = parseFloat(s[i++]) / Math.pow(10, fl);
                        number = number +  float;
                        fl++;
                    }
                    else
                        number = number*10 + parseFloat(s[i++]);
                }
                --i;



                fixedNumber = false;


                stack.push(number);
                may_be_unary = false;
            }

        }

        while (operation.length !== 0) {
            this._process_operation(stack, operation[operation.length-1]);
            operation.pop();
        }

        return (stack[stack.length -1]);
    }

}


export default MathExpration;