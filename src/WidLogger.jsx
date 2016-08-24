import React from 'react';
import {IncLoggerItem} from './IncLoggerItem.jsx';


export class WidLogger extends React.Component {


    constructor(props, context) {
        super(props, context);

        this.state = {
            log: JSON.parse(localStorage.getItem('history'))
        };

        if (!localStorage.getItem('history'))
            localStorage.setItem('history', JSON.stringify([]));
    }


    render() {
        return <div>
            {this.state.test}
            <table className="table table-bordered table-striped table-hover">
                <thead>
                    <tr>
                        <td></td>
                        <td>Original URL</td>
                        <td>Created</td>
                        <td>Short URL</td>
                    </tr>
                </thead>
                <tbody>
                { this.state.log.reverse().map((v,i)=>{
                    return <IncLoggerItem key={i} item={v} onDelete={ (item)=>{ this.props.app.dropHistory(item); } } />
                }) }
                </tbody>
            </table>
        </div>
    }


}
