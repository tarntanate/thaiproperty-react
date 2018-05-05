// import React from 'react';
import { openNotification } from '../../components/Shared/Notification';

describe('Notification Components', () => {
  it('Should run without error', () => {
    openNotification({ message: 'test', description: 'desc'});
  });
});