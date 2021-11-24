import React from 'react';

import {
    DotWrapper,
    Dot
} from './styles';

// eslint-disable-next-line react/prop-types
const LoadingDots = ({ dotsColor }) => {
    return (
        <DotWrapper>
            <Dot dotsColor={ dotsColor } delay='0s' />
            <Dot dotsColor={ dotsColor } delay='.1s' />
            <Dot dotsColor={ dotsColor } delay='.2s' />
        </DotWrapper>
    );
};

export default LoadingDots;
