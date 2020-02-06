import React, {Component} from 'react';
import  "../style/PlotLinerFunction.css";
import MathExpration from "../jsclass/MathExpiration";




class PlotLinerFunction extends Component {

    constructor(props) {
        super(props);

        this.width = 600;
        this.height = 600;
        this.xCords = [];
    }

    drawOrdinate(ctx)
    {
        ctx.moveTo(this.width/2,  0);
        ctx.lineTo(this.width/2, this.height);
        ctx.stroke();
        ctx.save();
        ctx.font = "20px arial";
        ctx.fillText('Y', this.width / 2, 20);
        ctx.save();
    }

    drawAbscissa(ctx)
    {
        ctx.moveTo(0,  this.width/2);
        ctx.lineTo(this.width, this.height/2);
        ctx.stroke();
        ctx.save();
        ctx.font = "20px arial";
        ctx.fillText('X', this.width - 20,this.height / 2);
        ctx.save();

    }


    drawZeroCordinate(ctx)
    {
        ctx.font = "10px arial";
        ctx.fillText('0', this.width/2 + 5,this.height / 2 + 10);
        ctx.save();
    }

    drawXCordinateNumbers(ctx)
    {
        let xCordsStep = parseInt(this.width / this.xCords.length);
        let intention = this.width - xCordsStep * this.xCords.length;
        let step = intention/2;

        let xCordinatePlace = [];

        ctx.moveTo(step+xCordsStep,  this.height/2 - 5);
        ctx.lineTo(step+xCordsStep, this.height/2 + 5);
        ctx.font = "10px arial";
        ctx.fillText(this.xCords[0],step+xCordsStep, this.height/2  - 10 );
        step = step+xCordsStep;
        xCordinatePlace.push(step);
        for(let i = 1; i < this.xCords.length ; i++)
        {
            if (this.xCords[i] !== 0 ) {

                if (Number.isInteger(this.xCords[i])){
                    ctx.moveTo(step + xCordsStep, this.height / 2 - 5);
                    ctx.lineTo(step + xCordsStep, this.height / 2 + 5);
                    ctx.fillText(this.xCords[i], step + xCordsStep, this.height / 2 - 10);
                    ctx.stroke();
                }
                step += xCordsStep;

                xCordinatePlace.push(step);
            }

            if (this.xCords[i] === 0)
            {
                xCordinatePlace.push(this.width/2);
            }

        }
        ctx.save();


        return xCordinatePlace
    }

    FillXCordinates(ctx, range)
    {
        if (range <= 10)
        {
            let num = -10;
            for (let i = 0; i < 21; i += 0.1)
            {

                if (num <= 10) {

                    let IntNum = Math.trunc(num);
                    let DoubleNum;

                    DoubleNum = (IntNum - num).toFixed(1);


                    if (DoubleNum == 0 || DoubleNum == -1)
                    {
                        if (DoubleNum == -1)
                            this.xCords.push(IntNum + 1);
                        else
                            this.xCords.push(IntNum);
                    }
                    else
                    {
                        this.xCords.push(num.toFixed(1));
                    }

                  num += 0.1;
                }
            }
        }
        else if (range <= 20)
        {
            let num = -range;

            for (let i = 0; i < 2*range + 1; i++)
            {
                this.xCords.push(Math.round(num));
                ++num;
            }
        }

        else
        {
            let num = -range;
            let sum  = range / 10;
            for (let i = 0; i < 21 ; i++)
            {
                this.xCords.push(Math.round(num));
                num = num + sum;
            }
        }
    }


    DrawYCordinateNumbers(ctx)
    {
        let Ycordinate =  this.height ;
        let BeginCord = - this.height / 2;
        let step = 20;
        ctx.font = "10px arial";
        for (let i = 0; i < 57; i++) {
            if (BeginCord !== -20) {
                ctx.moveTo(300 + 5, Ycordinate - step);
                ctx.lineTo(300 - 5, Ycordinate - step);
                ctx.fillText(BeginCord + step, 300 - 25, Ycordinate - step);
                ctx.stroke();
                Ycordinate -= step;
                BeginCord += step;
            }else
            {
                Ycordinate -= step;
                BeginCord += step;
            }
        }

    }

    drawFunction(ctx, result, xCordinatePlace)
    {
        let YCords = [];


        for(let i = 0; i < this.xCords.length; i++)
        {
            let math = new MathExpration();
            let number = result.replace(/x/g, '+' + this.xCords[i]);
            number  = math.evaluateString(number);

            if (isFinite(number))
            {
                YCords.push(300 - number);
            }
            else
            {
                console.log(number);
                YCords.push('-');
            }
        }

        ctx.moveTo(xCordinatePlace[0], YCords[0]);
        for(let i = 1; i < this.xCords.length; i++)
        {
            if (YCords[i] === '-') {

                ctx.moveTo(xCordinatePlace[i + 1], YCords[i + 1]);
            }
            ctx.lineTo(xCordinatePlace[i], YCords[i]);
        }
        ctx.stroke();
        ctx.save();

    }


    updateCanvas() {
        let result = this.props.operationResult;
        let range = this.props.range;

        const ctx = this.refs.canvas.getContext('2d');
        ctx.beginPath();
        this.drawOrdinate(ctx);
        this.drawAbscissa(ctx);
        this.drawZeroCordinate(ctx);
        this.FillXCordinates(ctx, range);
        this.DrawYCordinateNumbers(ctx);

        console.log(this.xCords);

        let xCordinatePlace =  this.drawXCordinateNumbers(ctx);

        console.log(xCordinatePlace);

       this.drawFunction(ctx, result, xCordinatePlace);

    }

    componentDidMount() {
        this.updateCanvas();
    }


    render() {

        let stringResult = this.props.operationResult;


        return (
            <div>
                <h6 className="text-justify inputResult">f(x) =  {stringResult}  </h6>
                <h6 className="text-left">x∈ from - {this.props.range} to {this.props.range}</h6>
                <canvas ref="canvas" width={this.width} height={this.height} className="canvas"/>
            </div>
        );
    }
}

export default PlotLinerFunction;