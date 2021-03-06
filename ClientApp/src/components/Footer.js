import React from 'react';
import { CenterContent } from '../components/Shared/CenterContent';
import { SITE_NAME } from '../config';

export const PageFooter = props => (
  <CenterContent usePanel>
    <span>&copy;2018 {SITE_NAME} - By Tarntanate M.</span>
  </CenterContent>
);
