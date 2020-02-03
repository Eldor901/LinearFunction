import React from 'react';
import PlotLinerFunction from "./PlotLinerFunction";
import ValidateExprationMath from '../jsclass/ValidateExprationMath';

import  "../style/Calc.css";
import WolframLinerFunction from "./WolframLinerFunction";


export default class Calc extends React.Component {

    constructor(props)
    {
        super(props);
        this.state = {
            range: 10,
            mathOperations: null,
            isSubmited: false,
            selected: "Own",
        };

        this.handleChangeNumber = this.handleChangeNumber.bind(this);
        this.handleChangeMathOperation = this.handleChangeMathOperation.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onCheckChange = this.onCheckChange.bind(this);
    }


    handleSubmit(event){
        event.preventDefault();

        let mathOperation = this.state.mathOperations;

        if (mathOperation !== null)
            if (mathOperation !== '')
                mathOperation = mathOperation.replace(/\s*/g,'');
            else
                mathOperation = " ";
         else
            mathOperation = " ";

        let validate = new ValidateExprationMath();
        let isMathoperation =  validate.isMathOperation(mathOperation);


        if(isMathoperation)
        {
            this.setState({isSubmitted: true});
        }
        else
        {
            alert("Written Math Operation is Wrong");
        }
    }


    handleChangeNumber(event) {
        this.setState({range: event.target.value});
        this.setState({isSubmitted: false});
    }


    handleChangeMathOperation(event) {

        this.setState({mathOperations: event.target.value});
        this.setState({isSubmitted: false});
    }


    onCheckChange(event)
    {
        this.setState({selected: event.target.value});
        this.setState({isSubmitted: false});
    }

    render() {
        const mathOpiration = this.state.mathOperations;


        let PlotFunction;

        if(this.state.selected === "Own")
        {
            if (this.state.isSubmitted) {
                if(mathOpiration === '' || mathOpiration === null)
                    PlotFunction = <h3>You did not filed the form please check your input </h3>;
                else {
                    PlotFunction = <PlotLinerFunction operationResult={mathOpiration} range={this.state.range}/>
                }
            }
        }
        else
        {
            if (this.state.isSubmitted) {
                PlotFunction = <WolframLinerFunction operationResult={mathOpiration} />
            }
        }


        let range =  parseInt(this.state.range);


        return (
            <div className='container'>


                <div className='formRadio'>
                    <div className="custom-control custom-radio custom-control-inline">
                        <input type="radio" id="Wolfram" name="customRadioInline1"
                               className="custom-control-input" value='Wolfram'
                               checked={this.state.selected === 'Wolfram'} onChange={this.onCheckChange}/>
                        <label className="custom-control-label" htmlFor="Wolfram">Wolfram</label>
                    </div>


                    <div className="custom-control custom-radio custom-control-inline">
                        <input type="radio" id="Own" name="customRadioInline1"
                               className="custom-control-input" value='Own'
                               checked={this.state.selected ===  'Own'} onChange={this.onCheckChange}/>
                        <label className="custom-control-label" htmlFor="Own">Own</label>
                    </div>
                </div>

                <form   onSubmit={this.handleSubmit} className=" ">
                    <div className=" input-group  input-group-lg">
                        <span className="input-group-addon functionfx" id="sizing-addon1">f(x)</span>
                        <input className='formOper form-control' type='text' value={this.state.mathOperations} onChange={this.handleChangeMathOperation} placeholder='x*x +2*x +4'/>
                        <button>Calc</button> <br/>
                    </div>

                    <div className="input-group-lg text-right fromRange">
                        <span>x∈ from </span>
                        <span> - </span>
                        <input className='formNum'  type='number'  value={range} onChange={this.handleChangeNumber}
                               placeholder="10"
                        />
                        <span className="spanTo">to</span>
                        <input className='formNum'  type='number'  value={range} onChange={this.handleChangeNumber}
                               placeholder='10'
                        />
                    </div>
                </form>

                <div className="centerForm">
                    {PlotFunction}
                </div>
            </div>
        )
    }
}