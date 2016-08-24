import React from 'react';
import Clipboard from 'react-clipboard.js';
import {Api as CoreApi} from './core/Api';


export class WidNewUrl extends CoreApi {


    constructor(props, context) {
        super(props, context);

        this.state = {
            url: '',
            shorten_url: null,
        };
    }


    onClear() {
        this.setState({
            url: '',
            shorten_url: null
        });
    }


    onShorten() {
        var url = this.refs.txt__Url.value;

        var tmp = this.props.app.findHistory({ url: url });

        if (tmp) {
            this.setState(tmp);
            this.props.app.pushHistory(tmp);
        } else {
            this.api('/s').post({
                "url": url
            })
                .then((res) => {
                    if (res.shorten_url.match(new RegExp('^https?\:\/\/'+APP.CONF.api_host+'\/?$','g')))
                        throw 'Passed URL can\'t be shortened.';
                    this.setState(res);
                    this.props.app.pushHistory(res);
                })
                .catch((exc) => {
                    if (exc instanceof Promise)
                        exc
                            .then((v) => {
                                switch (v.status) {
                                    case 404:
                                        alert('Backend endpoint not found. Please check latest updates of the tubity-roda documentation.');
                                        break;
                                    case 500:
                                        alert('Internal server error. Please try again later.');
                                        break;
                                    default:
                                        throw 'An unexpected error occured.';
                                }
                            })
                            .catch((exc) => {
                                alert(exc);
                            });
                    else if (exc)
                        alert(exc);
                });
        }
    }


    onChange(evt) {
        this.setState({ url: evt.target.value });
    }


    onKeyDown(evt) {
        if (evt.keyCode == 13)
            this.onShorten();
    }


    render() {
        return <div className={'tubity-'+this.constructor.name+' input-group'}>
            <input
                ref="txt__Url"
                className="url form-control"
                type="text"
                value={ this.state.shorten_url ? this.state.shorten_url : this.state.url }
                placeholder="Your original URL here"
                disabled={!!this.state.shorten_url}
                onChange={this.onChange.bind(this)}
                onKeyDown={this.onKeyDown.bind(this)}
                />
            { !this.state.shorten_url
                ?
                <button
                    className={'btn '+(this.state.url?'btn-primary':'')}
                    disabled={!this.state.url}
                    onClick={this.onShorten.bind(this)}
                    >
                    Shorten URL
                </button>
                :
                <Clipboard
                    className={'btn '+(this.state.url?'btn-success':'')}
                    data-clipboard-text={this.state.shorten_url}
                    onSuccess={this.onClear.bind(this)}
                    >
                    Copy &amp; Clean
                </Clipboard>
            }
        </div>
    }


}
