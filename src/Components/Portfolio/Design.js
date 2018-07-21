import React, { Component } from 'react';

import './Design.css'

class Design extends Component {

    render() {

        function importAll(r) {
            let images = {};
            r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
            return images;
        }
          
        const images = importAll(require.context('./images', false, /\.(png|jpe?g|svg)$/));

        return (
            <div className="design">
                <div className="row">
                    <div className="column">
                        <img src={images['crywolf.png']} alt="logo" />
                        <img src={images['feed.png']} alt="ui"/>
                        <img src={images['pickering2.png']} alt="illustration"/>
                        <img src={images['fractal.png']} alt="logo"/>
                        <img src={images['budgeting.png']} alt="print"/>
                        <img src={images['wisseo.png']} alt="logo"/>
                    </div>
                    <div className="column" style={{ flex: 1 }}>
                        <img src={images['waterloo2.png']} alt="illustration"/>
                        <img src={images['nike.png']} alt="illustration"/>
                        <img src={images['app-actuator.png']} alt="logo"/>
                        <img src={images['flipd.png']} alt="ui"/>
                        <img src={images['trialsloop.png']} alt="logo"/>
                        <img src={images['tesla2.png']} alt="illustration"/>
                        <img src={images['phs2.png']} alt="illustration"/>
                        <img src={images['science-phd.png']} alt="logo"/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Design;