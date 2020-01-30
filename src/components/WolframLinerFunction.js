import React, {Component} from 'react';


class WolframLinerFunction extends Component {
    constructor(props) {
        super(props);
    }

    async componentDidMount() {

        const xNumber =  this.props.number + "x" + "+";
        const OperRes =  this.props.operationResult;

        const linerFunction = xNumber + OperRes;
        const id = process.env.Wolfram_app_id;

        const url = `http://api.wolframalpha.com/v2/query?input=${linerFunction}&appid=${id}&output=json`;
        console.log(url);
        let response;
        try {
             response =  await fetch(url, {
                method: 'Get',
                headers: {
                    'Cache-Control': 'no-cache',
                    'Host': 'api.wolframalpha.com',
                    'Accept-Encoding': 'gzip, deflate, br',
                    'Cookie': 'WR_SID=7bef8677.59d43a898eb05',
                    'Connection': 'keep-alive',
                    'Access-Control-Allow-Origin': '*',
                },
                mode: 'no-cors'
            });
        }catch (e) {
            console.log(e);
        }

        console.log(response);

    }

    render() {
        return (
            <div>
                <h1>Result:</h1>
            </div>
        );
    }
}

export default WolframLinerFunction;