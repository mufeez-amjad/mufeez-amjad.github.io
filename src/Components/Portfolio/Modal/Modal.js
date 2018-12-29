import React from 'react';

import './Modal.css';

const modal = (props) => {
    
    function importAll(r) {
        let images = {};
        r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
        return images;
    }
      
    const images = importAll(require.context('../projects', false, /\.(png|jpe?g|svg)$/));

    return (
        <div>
            <div className="wrapper"
                style={{
                    transform: props.show ? 'translateY(0vh)' : 'translateY(-100vh)',
                    opacity: props.show ? '1' : '0'
                }}>
                <img className="image" src={images[props.imageSrc]} />

                <div className="header">
                    <h3>{props.header}</h3>
                    <span className="close-btn" onClick={props.close}>×</span>
                </div>
                <div className="body">
                    <p>
                        {props.children}
                    </p>
                </div>
                <div className="footer">
                    <button className="cancel-btn" onClick={props.close}>CLOSE</button>
                    <button className="continue-btn">CONTINUE</button>
                </div>
            </div>
        </div>
    )
}

export default modal;