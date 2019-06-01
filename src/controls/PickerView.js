import React from 'react';
import { css } from 'styled-components';

import Globals from '../Globals';

const globalColours = Globals.constants.styles.colours;
const globalFontFamily = Globals.constants.styles.font.family;
const globalBorderProps = Globals.constants.styles.border;

const styles = css`
  .picker-view {
    display: block;
    max-height: 65px;
    min-width: 70px;

    background: none;
    background-image: url('/assets/icons/up_arrow.svg'), url('/assets/icons/down_arrow.svg');
    /* background-position: right 4px top 8px, right 4px bottom 8px; */
    background-position: center top, center bottom;
    background-repeat: no-repeat;
    color: ${globalColours.grey.contrast};

    border: ${globalBorderProps.size} solid ${globalColours.grey.contrast};
    border-radius: ${globalBorderProps.radius};

    font-family: ${globalFontFamily.default};
    font-size: 20px;
    font-weight: 500;

    padding: 0.8em;

    -webkit-appearance: none;
    appearance: none;
  }
`;

export const PickerView = ({ id=null, ref=null, options=[], placeholder, value, onChange=null, flex=1 }) => {
  return (
    <>
      <style type="text/css">{styles}</style>
      <select id={id} ref={ref} className="picker-view" name="picker-view" onChange={onChange} value={value}>
        {options.map((option, index) => {
          return (
            <option value={option} key={`${index}-${new Date().getTime()}`}>
              {option}
            </option>
          );
        })}
      </select>
    </>
  );
}