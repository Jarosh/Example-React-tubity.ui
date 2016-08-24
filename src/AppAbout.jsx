import React from 'react';
import ReactDOM from 'react-dom';


export class AppAbout extends React.Component {


    render() {
        return  <div>
            <p>
                <b>tubity-ui</b> is a front-end part of a <a href="https://github.com/ababich/tubity-roda" target="_blank">tubity-roda</a> URL shortener.
            </p>
            <p>
                A URL shortener is an online application that converts a regular URL (the web address that starts with <i>http://</i>)
                into its condensed format. The user only has to copy the full URL of a website and paste it into the URL
                shortening tool to come up with an abbreviated version that is around 10 to 20 characters long.
            </p>
        </div>
    }


}
