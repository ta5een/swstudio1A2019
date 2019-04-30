import React, { Component } from 'react';
import fire from '../config/Fire';
import styled, { css } from 'styled-components'

const Button = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid palevioletred;
  color: palevioletred;
  margin: 0.5em 1em;
  padding: 0.25em 1em;

  ${props => props.primary && css`
    background: palevioletred;
    color: white;
  `}
`;
const Wrapper = styled.section`
    padding: 4em;
    background: #5698FF;
    `;

class Home extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }


    logout() {
        fire.auth().signOut();
    }

    //GUI
    render() {
        return (
         <Wrapper>
            <div>
                <h1>Time-Aid</h1>
                <Button onClick={this.logout}>Logout</Button>
            </div>
        </Wrapper>   

        );

    }

}

export default Home;