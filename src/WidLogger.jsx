import React from 'react';
import {IncLoggerItem} from './IncLoggerItem.jsx';


export class WidLogger extends React.Component {


    constructor(props, context) {
        super(props, context);

        if ( this.props.app.hasLocalStorage() && !localStorage.getItem('history') )
            localStorage.setItem('history', JSON.stringify([]));

        this.state = {
            log: this.props.app.hasLocalStorage() ? JSON.parse(localStorage.getItem('history')) : undefined
        };
    }


    render() {
        return <div className={'tubity-'+this.constructor.name}>
            { ( typeof this.state.log !== 'undefined' )
                ?
                ( this.state.log.length
                    ?
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
                        { _.sortBy(this.state.log, function(i) { return i.ts; }).reverse().map((v, i)=> {
                            return <IncLoggerItem key={i} item={v} onDelete={ (item)=>{ this.props.app.dropHistory(item); } }/>
                        }) }
                        </tbody>
                    </table>
                    :
                    null
                )
                :
                <b>dddddd</b>
            }
        </div>
    }


}
