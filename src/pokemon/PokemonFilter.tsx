import React, { useEffect, useState } from "react";
import { getPokemonList, getPokemonTypes } from "./usePokemonApis";
import { Checkbox } from "@fluentui/react";

interface PokemonFilterProps{
    changeType:  React.Dispatch<React.SetStateAction<string>>;
}

const PokemonFilter = ({changeType}:PokemonFilterProps) => {
    const [typeNames, setTypeNames] = useState<Array<string>>([]);
    const[typeSelected,setTypeSelected] = useState("");
    const [filterOptions, setFilterOptions] = useState<{ [key: string]: boolean }>({
        below100: false,
        above100: false,
        optionC: false,
        fire: false,
        water: false,
        land: false,
      });
      const fetchTypes = async () => {
        const types = await getPokemonTypes();
        setTypeNames((types!!).slice(8,15));
        console.log(types);
      };

      useEffect(() => {
        fetchTypes();
      }, []);

     const handleFilterChange = ()=>{

     }

  return (
    <div>
        
        { typeNames.map(type => (
            <Checkbox
            key={type}
            label={type}
            checked={typeSelected === type}
            onChange={(event,checked) => {
                console.log(type)
                if(checked){
                    changeType(type);
                    setTypeSelected(type);
                    console.log(type)
                }else  {
                    setTypeSelected('')
                    changeType('')};
            }}
            styles={{ root: { marginRight: 10 } }}
          />
        )) }

    </div>
  );
};

export default PokemonFilter;
