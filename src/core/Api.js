import React from 'react';
import ReactDOM from 'react-dom';


export class Api extends React.Component {


    api(api, options={credentials: 'include'}) {

        api = api.replace(/^\/*/, '');

        return {

            get: function (data={}) {
                this.setDataAsQueryString(data);
                return this.call();
            },

            delete: function (data={}) {
                this.setDataAsQueryString(data);
                return this.call('DELETE');
            },

            post: function (data={}) {
                return this.call('POST', data);
            },

            put: function (data={}) {
                return this.call('PUT', data);
            },

            setDataAsQueryString: function(api, data) {
                var arg = [];
                for (let k in data) {
                    if (data.hasOwnProperty(k))
                        arg.push(k+'='+data[k]);
                }
                if (arg.length) {
                    if (api.indexOf('?')<0)
                        api += '?';
                    api += ((api.slice(-1)!='?' && api.slice(-1)!='&') ? '&' : '') + arg.join('&');
                }
            },

            call: function (method='GET', data={}, json=true) {
                options['method'] = method.toUpperCase().trim();
                options['headers'] = {
                    'Accept': 'application/json'
                };

                if (json)
                    options['headers']['Content-Type'] = 'application/json';

                var ret = null;

                if (options['method']=='POST' || options['method']=='PUT') {
                    if (json) {
                        options['body'] = JSON.stringify(data);
                    } else {
                        var form = new FormData();
                        for (var k in data) {
                            form.append(k, data[k]);
                        }
                        options['body'] = form;
                    }
                }

                ret = fetch('//'+APP.CONF.api_host+'/'+api, options)
                    .then((res) => {
                        if (res.status<200 || res.status>=300)
                            throw Promise.resolve(res);
                        return res.json();
                    })
                    .then((res) => {
                        return (res instanceof Object)
                            ? res
                            : Promise.reject('Malformed JSON received.');
                    })
                    .catch((exc) => {
                        if (!(exc instanceof Promise))
                            exc = null;

                        if (!exc) {
                            alert( window.location.protocol.match(/^https?:?$/)
                                    ? 'Your browser is outdated.'
                                    : 'It seems that application was lauched locally as file://\r\nPlease put it under control of the webserver (e.g. nginx or Apache).'
                            );
                        }

                        return Promise.reject(exc);
                    });

                return ret ? ret : Promise.reject(600);
            }

        };
    }


}
