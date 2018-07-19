import React, { Component } from 'react';

import './Design.css'
import Masonry from 'react-masonry-component';

const masonryOptions = {
    transitionDuration: 0
};

class Design extends Component {

    render() {

        function importAll(r) {
            let images = {};
            r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
            return images;
          }
          
          const images = importAll(require.context('./portfolio', false, /\.(png|jpe?g|svg)$/));

        return (
            <div className="design">
                <div className="row">
                    <div className="column">
                        <img src={images['crywolf.png']} />
                        <img src={images['feed.png']} />
                        <img src={images['april2017.png']} />
                        <img src={images['fractal.png']} />
                    </div>
                    <div className="column" style={{ flex: 1 }}>
                        <img src={images['nike.png']} />
                        <img src={images['app-actuator.png']} />
                        <img src={images['feedme.png']} />
                        <img src={images['fractal.png']} />
                    </div>
                </div>
            </div>
        );
    }
}

export default Design;