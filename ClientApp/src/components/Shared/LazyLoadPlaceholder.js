import React from 'react';
import { Spinner } from '../Shared/Spinner';

export const PlaceHolder = (props) => (
    <div style={{margin:20}}>
        <Spinner size="small" style={{marginRight:10}} {...props} /> 
        <span className="text-muted">Loading image...</span>
    </div>
)