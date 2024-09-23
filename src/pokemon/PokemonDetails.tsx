import { DefaultButton, Panel } from '@fluentui/react';
import React, { useState } from 'react'
import PokemonDetailsPanel from './PokemonDetailsPanel';
import PokemonDetailsList from './PokemonDetailsList';
import './pokemonDetails.scss';
import PokemonFilter from './PokemonFilter';

const PokemonDetails = () => {

    const[openPanel, setOpenPanel] = useState(false);

  return (
    <div>
      <Panel
        headerText="Sample panel"
        isOpen={openPanel}
        onDismiss={()=>setOpenPanel(false)}
        closeButtonAriaLabel="Close"
      >
        <PokemonDetailsPanel/>
      </Panel>
      <PokemonDetailsList/>
      <DefaultButton text="Open panel" onClick={()=>setOpenPanel(true)} />
      
        
    </div>
  )
}

export default PokemonDetails;
