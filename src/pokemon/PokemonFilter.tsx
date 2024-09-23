import React, { useEffect, useState } from "react";
import { getPokemonList, getPokemonTypes } from "./usePokemonApis";
import { Checkbox, CommandBar, Label, TextField } from "@fluentui/react";

interface PokemonFilterProps {
  changeType: (type: string) => void;
  selectedType:string;
  onExpChange: (type: number) => void;
  experience:number;
}

const PokemonFilter = ({ changeType,selectedType,onExpChange,experience }: PokemonFilterProps) => {
  const [typeNames, setTypeNames] = useState<Array<string>>([]);
  const [showFilter, setshowFilter] = useState(false);

  const fetchTypes = async () => {
    const types = await getPokemonTypes();
    setTypeNames(types!!.slice(8, 15));
    console.log(types);
  };


  useEffect(() => {
    fetchTypes();
  }, []);

  return (
    <div className="filterCard">
        <h2 className="filterHeader">Filter</h2>
          <div>
            <Label htmlFor="typesCheckbox">By type</Label>
            <div id="typesCheckbox">
              {typeNames.map((type) => (
                <Checkbox
                  key={type}
                  className="checkBoxClass"
                  label={type}
                  checked={selectedType === type}
                  onChange={(event, checked) => {
                    console.log(type);
                    if (checked) {
                      changeType(type);
                      console.log(type);
                    } else {
                      changeType("");
                    }
                  }}
                  styles={{ root: { marginRight: 10 } }}
                />
              ))}
            </div>
          </div>
          <div>
            <Label htmlFor="experienceCheckbox">By Experience</Label>
            <div id="experienceCheckbox">
              <Checkbox
                key={100}
                className="checkBoxClass"
                label="Less than 100"
                checked={experience === 100}
                onChange={(event, checked) => {
                  if (checked) {
                    onExpChange(100);
                  } else {
                    onExpChange(0);
                  }
                }}
                styles={{ root: { marginRight: 10 } }}
              />
              <Checkbox
                key={101}
                className="checkBoxClass"
                label="Greater than 100"
                checked={experience === 101}
                onChange={(event, checked) => {
                  if (checked) {
                    onExpChange(101);
                  } else {
                    onExpChange(0);
                  }
                }}
                styles={{ root: { marginRight: 10 } }}
              />
            </div>
          </div>
    </div>
  );
};

export default PokemonFilter;
