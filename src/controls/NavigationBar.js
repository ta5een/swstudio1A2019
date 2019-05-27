import React from 'react';
import styled, { css } from 'styled-components';
import Globals from '../Globals';

const globalFontFamily = Globals.constants.styles.font.family;
const globalFontSizes = Globals.constants.styles.font.sizes;

const styles = css`
  .navigation-bar {
    height: 76px;

    display: flex;
    align-items: center;

    background: #FBFBFB;
    border-top: 1.5px solid #DEDEE3;

    -webkit-touch-callout: none;
    -webkit-user-select: none;
    user-select: none;
  }

  .navigation-bar-content {
    width: 100%;
    margin-left: 40px;
    margin-right: 40px;
  }

  .navigation-bar-icons {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

export const NavigationBar = ({ currentIndex }) => {
  return (
    <>
      <style type="text/css">{styles}</style>
      <div className="navigation-bar">
        <div className="navigation-bar-content">
          <div className="navigation-bar-icons">
            <img src="assets/icons/navigation/selected/home.svg" alt="home page"/>
            <img src="assets/icons/navigation/bookings.svg" alt="bookings page"/>
            <img src="assets/icons/navigation/favourites.svg" alt="favourites page"/>
            <img src="assets/icons/navigation/profile.svg" alt="profile page"/>
          </div>
        </div>
      </div>
    </>
  );
}