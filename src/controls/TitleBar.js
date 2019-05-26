import React from 'react';
import styled, { css } from 'styled-components';
import Globals from '../Globals';

const globalFontFamily = Globals.constants.styles.font.family;
const globalFontSizes = Globals.constants.styles.font.sizes;

const styles = css`
  .title-bar {
    height: 102px;
    display: flex;
    align-items: flex-end;
    background: #FBFBFB;
    border-bottom: 1.5px solid #DEDEE3;

    -webkit-touch-callout: none;
    -webkit-user-select: none;
    user-select: none;
  }

  .title-bar-content {
    width: 100%;
    margin-left: 40px;
    margin-right: 40px;
    padding-bottom: 10px;
  }

  .title-text-and-search {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .title-search-icon {
    height: 26px;
    width: 26px;
  }
`;

const TitleBarHeading = styled.h1`
  font-family: ${globalFontFamily.default};
  font-size: ${globalFontSizes.huge};
  font-weight: 700;

  margin: 0px;
`;

export const TitleBar = ({ title, hasSearchIcon=false }) => {
  return (
    <>
      <style type="text/css">{styles}</style>
      <style type="text/css">{styles}</style>
      <div className="title-bar">
        <div className="title-bar-content">
          <div className="title-text-and-search">
            <TitleBarHeading>{title}</TitleBarHeading>
            {hasSearchIcon ? <img className="title-search-icon" src="/assets/icons/search.svg" alt="search"/> : null}
          </div>
        </div>
      </div>
    </>
  );
}