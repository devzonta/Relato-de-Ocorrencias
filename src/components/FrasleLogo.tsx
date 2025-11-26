import React from 'react';
// @ts-ignore
import logoImage from '../../images/Marca_FrasleMobility_FundoGrafite.png';

const FrasleLogo: React.FC = () => (
    <div className="flex items-center space-x-2">
        {/* SUBSTITUA o componente Image pela tag <img> */}
        <img
            src={logoImage}
            alt="Frasle Logo"
            width={120}
            height={120}
        />
    </div>
);

export default FrasleLogo;