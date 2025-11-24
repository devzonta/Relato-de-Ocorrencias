import React from 'react';

const FrasleLogo: React.FC = () => (
    <div className="flex items-center space-x-2">
        {/* SUBSTITUA o componente Image pela tag <img> */}
        <img 
            src="images/Marca_FrasleMobility_FundoGrafite.png" 
            alt="Frasle Logo" 
            width={120} 
            height={120} 
        />
    </div>
);

export default FrasleLogo;