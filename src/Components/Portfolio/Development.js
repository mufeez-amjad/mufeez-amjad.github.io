import React, { Component } from 'react';
import ReactGA from 'react-ga';

// import Modal from './Modal/Modal';

import './Development.css'

class Development extends Component {

    constructor() {
		super();

		this.state = {
			isShowing: false
		}
    }
    
    handleClick(target) {
        ReactGA.event({
            category: 'Projects',
            action: 'Clicked ' + target,
        });
    }

	openModalHandler = () => {
		this.setState({
			isShowing: true
		});
	}

	closeModalHandler = () => {
		this.setState({
			isShowing: false
		});
}

    render() {

        function importAll(r) {
            let images = {};
            r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
            return images;
        }
          
        const images = importAll(require.context('./tech', false, /\.(png|jpe?g|svg)$/));
        
        return (
            <div className="portfolio-items">

            {/* { this.state.isShowing ? <div onClick={this.closeModalHandler} className="back-drop"></div> : null } */}

            {/* <button className="open-modal-btn" onClick={this.openModalHandler}>Open Modal</button> */}
{/* TODO:Add modal */}
                {/* <Modal
                    style={{'z-index': 100}}
                    className="modal"
                    header="Nocturnal"
                    imageSrc="arduino.jpeg"
                    show={this.state.isShowing}
                    close={this.closeModalHandler}>
                        Maybe aircrafts fly very high because they don't want to be seen in plane sight?
                </Modal> */}


                <div className="item">
                    <a>
                        <h1>GreenBox</h1>
                        <p>A social media app to make linking up with friends easy.</p>
                        <div className="icons" style={{alignContent: "center"}}>
                            <img style={{width: "30px", height: "30px", padding: "0 5px 0 5px"}} src={images['reactnative.png']} alt="reactnative" />
                            <img style={{width: "30px", height: "30px", padding: "0 5px 0 5px"}} src={images['node.png']} alt="node" />
                            <img style={{width: "30px", height: "30px", padding: "0 5px 0 5px"}} src={images['socket.png']} alt="socket" />
                            <img style={{width: "25px", height: "30px", padding: "0 5px 0 5px"}} src={images['firebase.png']} alt="firebase" />
                        </div>
                    </a>
                    <div className="inProgress">
                        <p>In progress!</p>
                    </div>
                </div>

                <div className="item">
                    {/* <button type="button" onClick={this.openModalHandler}>
                        OPEN
                    </button> */}
                    <a onClick={()=>{this.handleClick('Nocturnal')}} target='blank' href="https://github.com/mufeez-amjad/Nocturnal">
                        <h1>Nocturnal</h1>
                        <p>An Arduino-based sleep tracker with an analytics dashboard.</p>
                        <div className="icons" style={{alignContent: "center"}}>
                            <img style={{width: "25px", height: "30px", padding: "0 5px 0 5px"}} src={images['flask.png']} alt="flask" />
                            <img style={{width: "30px", height: "30px", padding: "0 5px 0 5px"}} src={images['python.png']} alt="python" />
                            <img style={{width: "30px", height: "30px", padding: "0 5px 0 5px"}} src={images['cplusplus.png']} alt="c++" />
                        </div>
                    </a>
                </div>

                <div className="item">
                    <a onClick={()=>{this.handleClick('Pyro')}} target='blank' href="https://devpost.com/software/pyro">
                        <h1>Pyro</h1>
                        <p>A playlist collaboration app to liven social occasions.</p>
                        <div className="icons" style={{alignContent: "center"}}>
                            <img style={{width: "30px", height: "30px", padding: "0 5px 0 5px"}} src={images['reactnative.png']} alt="react" />
                            <img style={{width: "30px", height: "30px", padding: "0 5px 0 5px"}} src={images['node.png']} alt="node" />
                        </div>
                    </a>
                </div>

                <div className="item trophy">
                    <a onClick={()=>{this.handleClick('FightVR')}} target='blank' href="https://devpost.com/software/fightvr">
                        <h1>🏆 FightVR</h1>
                        <p>A VR game that uses a Myo and a phone as controllers.</p>
                        <div className="icons" style={{alignContent: "center"}}>
                            <img style={{width: "30px", height: "30px", padding: "0 5px 0 5px"}} src={images['unity.png']} alt="unity" />
                            <img style={{width: "30px", height: "30px", padding: "0 5px 0 5px"}} src={images['csharp.png']} alt="c#" />
                            <img style={{width: "30px", height: "30px", padding: "0 5px 0 5px"}} src={images['android.png']} alt="android" />
                        </div>
                    </a>
                </div>

                <div className="item">
                    <a onClick={()=>{this.handleClick('DriveBack')}} target='blank' href="https://github.com/mufeez-amjad/DriveBack">
                        <h1>DriveBack</h1>
                        <p>An iOS app for communicating through license plates.</p>
                        <div className="icons" style={{alignContent: "center"}}>
                            <img style={{width: "30px", height: "30px", padding: "0 5px 0 5px"}} src={images['ios.png']} alt="ios" />
                            <img style={{width: "30px", height: "30px", padding: "0 5px 0 5px"}} src={images['node.png']} alt="node" />
                            <img style={{width: "30px", height: "30px", padding: "0 5px 0 5px"}} src={images['socket.png']} alt="socket" />
                            <img style={{width: "25px", height: "30px", padding: "0 5px 0 5px"}} src={images['firebase.png']} alt="firebase" />
                        </div>
                    </a>
                </div>


                {/* <div className="item">
                    <a target='blank' href="https://devpost.com/software/connect-spxadl">
                        <h1>Connect</h1>
                        <p>NFC-enabled Android app to expedite networking.</p>
                        <div className="icons">
                            <img style={{width: "30px", height: "30px", padding: "0 5px 0 5px"}} src={images['android.png']} alt="android" />
                            <img style={{width: "25px", height: "30px", padding: "0 5px 0 5px"}} src={images['firebase.png']} alt="firebase" />
                        </div>
                    </a>
                </div> */}

                <div className="item">
                    <a onClick={()=>{this.handleClick('Bubble Burst')}} target='blank' href="https://github.com/mufeez-amjad/BubbleBurst-iOS">
                        {/* TODO: make a modal with youtube link + github link  */}
                        <h1>Bubble Burst</h1>
                        <p>An iOS arcade game for iPhone and iPods testing reflexes.</p>
                        <div className="icons">
                            <img style={{width: "30px", height: "30px", padding: "0 5px 0 5px"}} src={images['ios.png']} alt="iOS" />
                            <img style={{width: "25px", height: "30px", padding: "0 5px 0 5px"}} src={images['firebase.png']} alt="firebase" />
                        </div>
                    </a>
                </div>

                {/* <div className="item">
                    <a target='blank' href="https://github.com/mufeez-amjad/GoogleDoodle-Canada150">
                        <h1>Google Doodle</h1>
                        <p>My submission to the Doodle 4 Google Canada contest.</p>
                        <div className="icons">
                            <img style={{width: "30px", height: "30px", padding: "0 5px 0 5px"}} src={images['java.png']} alt="java" />
                        </div>
                    </a>
                </div> */}
            </div> 
        );
    }
}


export default Development;