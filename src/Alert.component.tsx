import React from 'react';
import './alert.scss';
import { AttributeType } from './utils';
import { PrimaryButton } from '@fluentui/react';

interface AlertProps {
    data: AttributeType | undefined;
    onClose: () => void;
}

const Alert: React.FC<AlertProps> = ({ data, onClose }) => {
    return (
        <div className="alert">
            {data && <>
            <h3 className='centerClass'>Pokemon</h3>
            <p> Pokemon <strong>{data.name} :</strong> has abilities: {data.value} .</p>
            </>}
           <PrimaryButton className='closebtn' onClick={onClose}> Close</PrimaryButton>
        </div>
    );
};

export default Alert;
