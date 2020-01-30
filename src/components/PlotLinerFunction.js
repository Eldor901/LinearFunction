import React, {Component} from 'react';
import  "../style/PlotLinerFunction.css";
import MathExpration from "../jsclass/MathExpration";




class PlotLinerFunction extends Component {

    constructor(props) {
        super(props);
    }

    drawOrdinate(ctx)
    {
        ctx.moveTo(200,  0);
        ctx.lineTo(200, 400);
        ctx.stroke();
        ctx.save();
        ctx.font = "20px arial";
        ctx.fillText('X', 380,200);
        ctx.save();
    }

    drawAbscissa(ctx)
    {
        ctx.moveTo(0,  200);
        ctx.lineTo(400, 200);
        ctx.stroke();
        ctx.save();
        ctx.font = "20px arial";
        ctx.fillText('Y', 200,20);
        ctx.save();
    }


    drawZeroCordinate(ctx)
    {
        ctx.font = "20px arial";
        ctx.fillText('0', 203,218);
        ctx.save();
    }

    drawLinerFunction(a, b, ctx)
    {
       const x = -b/a;
       const y = b;

       ctx.beginPath();
       ctx.strokeStyle = '#ff0000';
       ctx.fillStyle = "blue";
       ctx.font = "20px arial";



     if (parseInt(a) !== 0) {
         if (x > 0 && y > 0) {
             ctx.moveTo(400, 250);
             ctx.lineTo(0, 50);
             ctx.stroke();
             ctx.save();
             ctx.fillText(x.toFixed(2), 300, 198);
             ctx.save();
             ctx.fillText(y.toFixed(2), 205, 150);
             ctx.save();
         } else if (x > 0 && y < 0) {
             ctx.moveTo(400, 50);
             ctx.lineTo(120, 400);
             ctx.stroke();
             ctx.save();
             ctx.fillText(x.toFixed(2), 280, 198);
             ctx.save();
             ctx.fillText(y.toFixed(2), 205, 300);
             ctx.save();
         } else if (x < 0 && y > 0) {
             ctx.moveTo(300, 0);
             ctx.lineTo(0, 350);
             ctx.stroke();
             ctx.save();
             ctx.fillText(x.toFixed(2), 80, 198);
             ctx.save();
             ctx.fillText(y.toFixed(2), 205, 110);
             ctx.save();
         } else if (x < 0 && y < 0) {
             ctx.moveTo(320, 400);
             ctx.lineTo(0, 80);
             ctx.stroke();
             ctx.save();
             ctx.fillText(x.toFixed(2), 120, 198);
             ctx.save();
             ctx.fillText(y.toFixed(2), 205, 280);
             ctx.save();
         }

         if(a > 0 && y === 0)
         {
             ctx.moveTo(0, 400);
             ctx.lineTo(400, 0);
             ctx.stroke();
             ctx.save();
         }

         if(a < 0 && y === 0)
         {
             ctx.moveTo(0,  0);
             ctx.lineTo(400, 400);
             ctx.stroke();
             ctx.save();
         }

     }
     else {
         if (y > 0) {
             ctx.moveTo(0, 100);
             ctx.lineTo(400, 100);
             ctx.stroke();
             ctx.save();
             ctx.fillText(y, 205, 90);
             ctx.save();
         }
         else
         {
             ctx.moveTo(0, 300);
             ctx.lineTo(400, 300);
             ctx.stroke();
             ctx.save();
             ctx.fillText(y, 205, 290);
             ctx.save();
         }
     }

    }

    updateCanvas() {
        let mathString = new MathExpration();
        const xNumber =  this.props.number;
        const YOperRes =  mathString.evaluateString(this.props.operationResult);

        const ctx = this.refs.canvas.getContext('2d');
        ctx.beginPath();
        this.drawOrdinate(ctx);
        this.drawAbscissa(ctx);
        this.drawZeroCordinate(ctx);
        this.drawLinerFunction(xNumber, YOperRes, ctx);
    }

    componentDidMount() {
        this.updateCanvas();
    }


    render() {

        let mathString = new MathExpration();

        let stringResult = mathString.evaluateString(this.props.operationResult);

        if(isNaN(stringResult))
        {
            stringResult = "Unsupported operation"
        }

        return (
            <div>
                <h1>{this.props.number}x + {stringResult}</h1>
                <canvas ref="canvas" width={400} height={400} className="canvas"/>
            </div>
        );
    }
}

export default PlotLinerFunction;