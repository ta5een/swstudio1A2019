import React from 'react';
import { css } from 'styled-components';

import Globals from '../Globals';

const globalColours = Globals.constants.styles.colours;
const globalFontFamily = Globals.constants.styles.font.family;
const globalBorderProps = Globals.constants.styles.border;

const styles = css`
  .picker-view-container {
    display: block;
    position: relative;
  }

  .picker-view {
    display: block;
    max-height: 65px;
    min-width: 70px;

    background: none;
    background-image: url('/assets/icons/up_arrow.svg'), url('/assets/icons/down_arrow.svg');
    background-position: center top, center bottom;
    background-repeat: no-repeat;
    color: rgba(0, 0, 0, 0);

    border: ${globalBorderProps.size} solid ${globalColours.grey.contrast};
    border-radius: ${globalBorderProps.radius};

    font-family: ${globalFontFamily.default};
    font-size: 20px;
    font-weight: 500;

    padding: 0.8em;

    -webkit-appearance: none;
    appearance: none;
  }

  .picker-view p {
    background: red;
  }

  .picker-view-text-container {
    display: block;
    position: absolute;

    height: 100%;
    width: 100%;

    top: 48%;
    left: 50%;
    transform: translate(-50%, -50%);

    background: none;

    pointer-events: none;
  }

  .picker-view-text-container p {
    font-family: ${globalFontFamily.default};
    font-size: 20px;
    font-weight: 500;

    color: ${globalColours.grey.contrast};

    text-align: center;
  }
`;

export const PickerView = ({ id=null, options=[], value, onChange=null }) => {
  return (
    <>
      <style type="text/css">{styles}</style>
      <div className="picker-view-container">
        <select id={id} className="picker-view" name="picker-view" onChange={onChange} value={value}>
          {options.map((option, index) => {
            return (
              <option value={option} key={`${index}-${new Date().getTime()}`}>
                {option}
              </option>
            );
          })}
        </select>
        <div className="picker-view-text-container">
          <p>{value}</p>
        </div>
      </div>
    </>
  );
}