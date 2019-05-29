import React from 'react';
import styled, { css } from 'styled-components';
import Globals from '../Globals';

const globalFontFamily = Globals.constants.styles.font.family;
const globalFontSizes = Globals.constants.styles.font.sizes;

const styles = css`
  .title-bar {
    height: 102px;

    display: flex;
    align-items: flex-start;
    background: #FBFBFB;
    border-bottom: 1.5px solid #DEDEE3;

    -webkit-touch-callout: none;
    -webkit-user-select: none;
    user-select: none;

    transition: all 300ms cubic-bezier(0.23, 1.25, 0.46, 1);
  }

  .title-bar-searching {
    height: 100vh;
  }

  .title-bar-content {
    width: 100%;
    margin-top: 40px;
    margin-left: 40px;
    margin-right: 40px;
    padding-bottom: 10px;
  }

  .title-bar-text-and-search {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  // .title-bar-text-and-search-searching {
  //   // display: flex;
  //   // justify-content: space-between;
  //   // align-items: center;
  // }

  .title-bar-heading {
    opacity: 1;
    transition: all 300ms cubic-bezier(0.23, 1.25, 0.46, 1);
  }

  .title-bar-heading-searching {
    opacity: 0;
  }

  .title-bar-search-icon {
    height: 26px;
    width: 26px;
    transition: all 300ms cubic-bezier(0.23, 1.25, 0.46, 1);
  }

  .title-bar-search-icon-searching {
    position: fixed;
    animation: slide-left 10000ms cubic-bezier(0.23, 1.25, 0.46, 1);
  }

  @keyframes slide-left {
    0% {
      // right: 40px;
      transform: translateX(100%);
    }
    100% {
      // left: 40px;
      transform: translateX(0%);
    }
  }
`;

const TitleBarHeading = styled.h1`
  font-family: ${globalFontFamily.default};
  font-size: ${globalFontSizes.huge};
  font-weight: 700;

  margin: 0px;
`;

export const TitleBar = ({ title, hasSearchIcon=false }) => {
  let isSearching = false;

  const toggleSearch = () => {
    isSearching = !isSearching;
    console.log(isSearching);

    if (isSearching) {
      document.getElementById('titleBar').classList.add('title-bar-searching');
      document.getElementById('titleBarHeading').classList.add('title-bar-heading-searching');
      document.getElementById('titleBarSearchIcon').classList.add('title-bar-search-icon-searching');
    } else {
      document.getElementById('titleBar').classList.remove('title-bar-searching');
      document.getElementById('titleBarHeading').classList.remove('title-bar-heading-searching');
      document.getElementById('titleBarSearchIcon').classList.remove('title-bar-search-icon-searching');
    }
  }

  return (
    <>
      <style type="text/css">{styles}</style>
      <div id="titleBar" className="title-bar">
        <div className="title-bar-content">
          <div className="title-bar-text-and-search">
            <TitleBarHeading id="titleBarHeading" className="title-bar-heading">{title}</TitleBarHeading>
            {hasSearchIcon ? <img id="titleBarSearchIcon" className="title-bar-search-icon" src="/assets/icons/search.svg" alt="search" onClick={() => toggleSearch()}/> : null}
          </div>
        </div>
      </div>
    </>
  );
}