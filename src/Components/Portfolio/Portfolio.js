import React, { Component } from 'react';

import Tabs from '../Tabs/Tabs';
import Development from './Development'
import Design from './Design'

import './Portfolio.css'

class Portfolio extends Component {

    constructor(){
        super();
        this.state = {
            active: 'aTab',
        };
    }

    render() {
        const content = {
            aTab: <Development />,
            bTab: <Design />
        };
        return (
            <div className="portfolio">
                <h2>Portfolio</h2>         
                <Tabs
                    active={this.state.active}
                    onChange={active => this.setState({active})}
                >
                    <div key="aTab">Development</div>
                    <div key="bTab">Design</div>
                </Tabs>
                <p>{content[this.state.active]}</p>
                <div> {content[this.state.active]} </div>
            </div>
        );
    }
}


export default Portfolio;