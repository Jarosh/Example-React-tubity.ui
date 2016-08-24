import React from 'react';
import ReactDOM from 'react-dom';
import {WidNewUrl} from './WidNewUrl.jsx';
import {WidLogger} from './WidLogger.jsx';


export class AppIndex extends React.Component {


    hasLocalStorage() {
        var tst = 'tubity-ui';

        if ( typeof this.hasLocalStorage.ret === 'undefined' ) {
            try {
                var tmp = null;
                localStorage.setItem(tst, tst);
                tmp = localStorage.getItem(tst);
                localStorage.removeItem(tst);
                this.hasLocalStorage.ret = (tmp==tst);
            }
            catch(e) {
                this.hasLocalStorage.ret = false;
            }
        }

        return this.hasLocalStorage.ret;
    }


    findHistory(item) {
        return this.hasLocalStorage()
            ? _.findWhere(
                JSON.parse(localStorage.getItem('history')),
                item
            )
            : [];
    }


    pushHistory(item) {
        var tmp = this.hasLocalStorage()
            ? JSON.parse(localStorage.getItem('history'))
            : [];

        if (!tmp)
            tmp = [];

        var has = this.findHistory(_.pick(item,'url'));

        if (has)
            has = _.findWhere(
                tmp,
                this.findHistory(_.pick(item,'url'))
            );

        if (has)
            has['ts'] = (new Date()).getTime();
        else
            tmp.push({
                ts: (new Date()).getTime(),
                url: item.url,
                shorten_url: item.shorten_url
            });

        this.refs.wid__Logger.setState({ log: tmp });

        if (this.hasLocalStorage())
            localStorage.setItem('history', JSON.stringify(tmp));
    }


    dropHistory(item) {
        var tmp = this.hasLocalStorage()
            ? JSON.parse(localStorage.getItem('history'))
            : [];

        tmp = _.without( tmp, _.findWhere(tmp,item) );

        this.refs.wid__Logger.setState({ log: tmp });

        if (this.hasLocalStorage())
            localStorage.setItem('history', JSON.stringify(tmp));
    }


    render() {
        return  <div className={'tubity-'+this.constructor.name}>
            <WidNewUrl app={this}></WidNewUrl>
            <WidLogger ref="wid__Logger" app={this}></WidLogger>
        </div>
    }


}
