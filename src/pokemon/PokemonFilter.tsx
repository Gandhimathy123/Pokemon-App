import React, { useEffect, useState } from "react";
import { getPokemonTypes } from "./usePokemonApis";
import { Checkbox, Icon, Label } from "@fluentui/react";

interface PokemonFilterProps {
  AddType: (type: string[]) => void;
  selectedType: string[];
  onExpChange: (type: number) => void;
  experience: number;
}

const PokemonFilter = ({
  AddType,
  selectedType,
  onExpChange,
  experience,
}: PokemonFilterProps) => {
  const [typeNames, setTypeNames] = useState<Array<string>>([]);
  const [typeArrow, setTypeArrow] = useState(false);
  const [expArrow, setExpArrow] = useState(false);

  const fetchTypes = async () => {
    const types = await getPokemonTypes();
    setTypeNames(types!!.slice(8, 15));
  };

  useEffect(() => {
    fetchTypes();
  }, []);

  const toggleArrow = (name: string) => {
    name === "type" ? setTypeArrow(!typeArrow) : setExpArrow(!expArrow);
  };

  return (
    <div className="filterCard">
      <div className="filterHeaderDiv">
        <Icon className="filterIcon" iconName="Filter" />
        <h2>Filter</h2>
      </div>
      <div>
        <div className="flexClass">
          <Label htmlFor="typesCheckbox">By type</Label>
          {typeArrow ? (
            <Icon iconName="ChevronDownSmall" onClick={() => toggleArrow("type")} />
          ) : (
            <Icon iconName="ChevronRightSmall" onClick={() => toggleArrow("type")} />
          )}
        </div>
        {typeArrow && (
          <div id="typesCheckbox">
            {typeNames.map((type) => (
              <Checkbox
                key={type}
                className="checkBoxClass"
                label={type}
                checked={selectedType.includes(type)}
                onChange={(event, checked) => {
                  if (checked) {
                    AddType([...selectedType,type]);
                  } else {
                    const index = selectedType.indexOf(type);
                    const typesArray = [...selectedType];
                    typesArray.splice(index, 1);
                    AddType(typesArray);
                  }
                }}
                styles={{ root: { marginRight: 10 } }}
              />
            ))}
          </div>
        )}
      </div>
      <div>
        <div className="flexClass">
          <Label htmlFor="typesCheckbox">By Experience</Label>
          {expArrow ? (
            <Icon iconName="ChevronDownSmall" onClick={() => toggleArrow("exp")} />
          ) : (
            <Icon iconName="ChevronRightSmall" onClick={() => toggleArrow("exp")} />
          )}
        </div>
        {expArrow && (
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
        )}
      </div>
      <div
        className="clearFilter"
        onClick={() => {
          AddType([]);
          onExpChange(0);
        }}
      >
        <Icon iconName="ClearFilter" title="Clear All" />
        Clear All
      </div>
    </div>
  );
};

export default PokemonFilter;
