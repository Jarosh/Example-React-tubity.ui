import React from 'react';
import {IncLoggerItem} from './IncLoggerItem.jsx';


export class WidLogger extends React.Component {


    constructor(props, context) {
        super(props, context);

        var hasLocalStorage = (function() {
            var tst = 'tubity-ui';
            try {
                var tmp = null;
                localStorage.setItem(tst, tst);
                tmp = localStorage.getItem(tst);
                localStorage.removeItem(tst);
                return (tmp==tst);
            }
            catch(e) {
                return false;
            }
        })();

        if (hasLocalStorage && !localStorage.getItem('history'))
            localStorage.setItem('history', JSON.stringify([]));

        this.state = {
            log: hasLocalStorage ? JSON.parse(localStorage.getItem('history')) : undefined
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
                        { this.state.log.reverse().map((v, i)=> {
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
