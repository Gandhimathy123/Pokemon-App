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
      <PokemonDetailsList/>
    </div>
  )
}

export default PokemonDetails;
