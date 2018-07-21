import React, { Component } from 'react';

import './Development.css'

class Development extends Component {

    render() {

        function importAll(r) {
            let images = {};
            r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
            return images;
        }
          
        const images = importAll(require.context('./tech', false, /\.(png|jpe?g|svg)$/));
        
        return (
            <div className="portfolio-items">

                <div className="item">
                    <h1>GreenBox</h1>
                    <p>A social media app to make linking up with friends easy.</p>
                    <div className="icons" style={{alignContent: "center"}}>
                        <img style={{width: "30px", height: "30px", padding: "0 5px 0 5px"}} src={images['reactnative.png']} alt="reactnative" />
                        <img style={{width: "30px", height: "30px", padding: "0 5px 0 5px"}} src={images['node.png']} alt="node" />
                        <img style={{width: "30px", height: "30px", padding: "0 5px 0 5px"}} src={images['socket.png']} alt="socket" />
                        <img style={{width: "25px", height: "30px", padding: "0 5px 0 5px"}} src={images['firebase.png']} alt="firebase" />
                    </div>
                    <div className="links">
                    </div>
                </div>

                <div className="item">
                    <h1>DriveBack</h1>
                    <p style={{marginTop: "-10px"}}>An iOS app that allows communication through license plates.</p>
                    <div className="icons" style={{alignContent: "center"}}>
                        <img style={{width: "30px", height: "30px", padding: "0 5px 0 5px"}} src={images['ios.png']} alt="ios" />
                        <img style={{width: "30px", height: "30px", padding: "0 5px 0 5px"}} src={images['node.png']} alt="node" />
                        <img style={{width: "30px", height: "30px", padding: "0 5px 0 5px"}} src={images['socket.png']} alt="socket" />
                        <img style={{width: "25px", height: "30px", padding: "0 5px 0 5px"}} src={images['firebase.png']} alt="firebase" />
                    </div>
                    <div className="links">
                        <a target='blank' href="https://github.com/mufeez-amjad/DriveBack">Repo</a>
                    </div>
                </div>

                <div className="item">
                    <h1>Connect</h1>
                    <p>NFC-enabled Android app to expedite networking.</p>
                    <div className="icons">
                        <img style={{width: "30px", height: "30px", padding: "0 5px 0 5px"}} src={images['android.png']} alt="android" />
                        <img style={{width: "25px", height: "30px", padding: "0 5px 0 5px"}} src={images['firebase.png']} alt="firebase" />
                    </div>
                    <div className="links">
                        <a>Repo</a>
                        <a>Devpost</a>
                    </div>
                </div>

                <div className="item">
                    <h1>Bubble Burst</h1>
                    <p>An iOS arcade game for iPhone and iPods.</p>
                    <div className="icons">
                        <img style={{width: "30px", height: "30px"}} src={images['ios.png']} alt="ios" />
                    </div>
                    <div className="links">
                        <a>App Store</a>
                        <a>Repo</a>
                    </div>
                </div>
            </div> 
        );
    }
}


export default Development;