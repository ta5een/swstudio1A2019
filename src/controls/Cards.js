import React from 'react';
import styled, { css } from 'styled-components';
import Globals from '../Globals';

const globalFontFamily = Globals.constants.styles.font.family;

const RoleLabel = styled.h3`
  font-family: ${globalFontFamily.default};
  font-size: 18px;
  font-weight: 500;

  -webkit-touch-callout: none;
  -webkit-user-select: none;
  user-select: none;
`;

const RoleDescription = styled.p`
  font-family: ${globalFontFamily.default};
  font-size: 14px;

  color: #9492A0;

  -webkit-touch-callout: none;
  -webkit-user-select: none;
  user-select: none;
`;

const styles = css`
  .role-card {
    display: flex;
    flex-direction: column;
    border-radius: 5px;
    background: #F3F3F7;
    box-shadow: 0 5px 45px 0 rgba(0,0,0,0.25);
  }

  .role-card > * {
    margin: 0px;
  }

  .role-image {
    display: block;
    height: 118px;
    width: 334px;
    border-radius: 5px 5px 0 0;
    object-fit: cover;
  }

  .role-card-description {
    padding: 15px;
  }

  .role-card-description > * {
    margin-top: 0px;
    margin-bottom: 6px;
  }

  .role-card-description > *:last-child {
    margin-bottom: 0px;
  }
`;

export const RoleCard = ({ label, description, image, alt=label, onClick }) => {
  return (
    <>
      <style type="text/css">{styles}</style>
      <div className="role-card" onClick={onClick}>
        <div className="role-image-container">
          <img className="role-image" src={image} alt={alt}/>
        </div>
        <div className="role-card-description">
          <RoleLabel>{label}</RoleLabel>
          <RoleDescription>{description}</RoleDescription>
        </div>
      </div>
    </>
  );
};