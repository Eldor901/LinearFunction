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
            number: null,
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

        if (mathOperation !== '')
            mathOperation = mathOperation.replace(/\s*/g,'');

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
        this.setState({number: event.target.value});
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
        const number = this.state.number;
        const mathOpiration = this.state.mathOperations;

        let PlotFunction;

        if(this.state.selected === "Own")
        {
            if (this.state.isSubmitted) {
                if(mathOpiration === '')
                    PlotFunction = <h1>Didnt Filled All Forms</h1>;
                else {
                    PlotFunction = <PlotLinerFunction number={number} operationResult={mathOpiration}/>
                }
            }
        }
        else
        {
            if (this.state.isSubmitted) {
                PlotFunction = <WolframLinerFunction number = {number} operationResult={mathOpiration} />
            }
        }


        return (
            <div>
                <div className='formRadio'>

                   <label> <input name="dzen" type="radio" value='Wolfram'
                              checked={this.state.selected === 'Wolfram'} onChange={this.onCheckChange}/> Wolfram</label>
                   <label> <input name="dzen" type="radio" value='Own'
                              checked={this.state.selected ===  'Own'} onChange={this.onCheckChange}/> Own</label>
                </div>

                <div className="centerForm">
                    <form onSubmit={this.handleSubmit} className="linerFunctionForm">
                        <p className='formLeft mathOperTop'><input className='formNum'  type='number' step="0.01" value={this.state.number} onChange={this.handleChangeNumber}
                                  placeholder='number'
                        />
                            x</p>
                        <input className='formLeft  formOper' type='text' value={this.state.mathOperations} onChange={this.handleChangeMathOperation} placeholder='math operations'/>
                        <button>Calc</button>
                    </form>
                    {PlotFunction}
                </div>
            </div>
        )
    }
}