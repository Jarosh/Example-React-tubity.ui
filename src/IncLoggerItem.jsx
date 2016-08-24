import React from 'react';


export class IncLoggerItem extends React.Component {


    static get defaultProps() {
        return {
            onDelete: ()=>{}
        }
    }


    render() {
        return <tr>
            <td className="text-center">
                <span className="btn btn-xs btn-warning" onClick={ ()=>{ this.props.onDelete(this.props.item); } }>&times;</span>
            </td>
            <td>
                <a href={this.props.item['url']} target="_blank">{this.props.item['url']}</a>
            </td>
            <td>
                { (new Date(this.props.item['ts'])).toLocaleDateString() + ' ' + (new Date(this.props.item['ts'])).toLocaleTimeString() }
            </td>
            <td>
                <a href={this.props.item['shorten_url']} target="_blank">{this.props.item['shorten_url']}</a>
            </td>
        </tr>
    }


}
