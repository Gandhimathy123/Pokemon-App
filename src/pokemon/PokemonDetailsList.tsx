import {
  DetailsList,
  IColumn,
  SelectionMode,
  TooltipHost,
  getTheme,
  IDetailsRowStyles,
  IDetailsListProps,
  DetailsRow,
  CommandBar,
  TextField,
  Label,
  SearchBox,
  PrimaryButton,
} from "@fluentui/react";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { AttributeType, DataStructureType, TableRow } from "../utils";
import PokemonFilter from "./PokemonFilter";
import Alert from "../Alert.component";
import PokemonImage from '../images/pokemon.png'

const theme = getTheme();

const PokemonDetailsList = () => {
  const [listData, setListData] = useState<TableRow[]>([]);
  const [pokemonList, setPokemonList] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [experienceSelected, setExperienceSelected] = useState<number>(0);
  const [typeSelected, setTypeSelected] = useState<string[]>([]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertData, setAlertData] = useState<AttributeType>();
  const [comment, setComment] = useState('');

  const [columns, setColumns] = useState<IColumn[]>([
    {
      key: "key1",
      name: "Persona",
      fieldName: "persona",
      minWidth: 150,
      maxWidth: 150,
      onRender: (item: TableRow) => (
        <TooltipHost content={item.name}>
          <img
            src={item.icon}
            style={{ width: "50px" }}
            alt={`${item.name} icon`}
          />
        </TooltipHost>
      ),
    },
    {
      key: "key2",
      name: "Name",
      fieldName: "name",
      minWidth: 90,
      maxWidth: 100,
      isPadded: true,
      data: "string",
      sortAscendingAriaLabel: "Sorted A to Z",
      sortDescendingAriaLabel: "Sorted Z to A",
      onColumnClick: (ev, column) => onColumnClick(column),
      onRender: (item: TableRow) => (
        <div style={{ cursor: "pointer" }} onClick={() => onRowClick(item)}>
          <TooltipHost content={item.name}>{item.name}</TooltipHost>
        </div>
      ),
    },
    {
      key: "key3",
      name: "Height",
      fieldName: "height",
      minWidth: 70,
      maxWidth: 100,
      isPadded: true,
      data: "number",
      onColumnClick: (ev, column) => onColumnClick(column),
      onRender: (item: TableRow) => item.height,
    },
    {
      key: "key4",
      name: "Weight",
      fieldName: "weight",
      minWidth: 70,
      data: "number",
      maxWidth: 100,
      isPadded: true,
      onColumnClick: (ev, column) => onColumnClick(column),
      onRender: (item: TableRow) => item.weight,
    },
    {
      key: "key5",
      name: "Experience",
      fieldName: "experience",
      minWidth: 70,
      maxWidth: 100,
      isPadded: true,
      data: "number",
      onColumnClick: (ev, column) => onColumnClick(column),
      onRender: (item: TableRow) => item.experience,
    },
    {
      key: "key6",
      name: "Type",
      fieldName: "type",
      minWidth: 100,
      maxWidth: 130,
      isPadded: true,
      onRender: (item: TableRow) => item.type.toString(),
    },
    {
      key: "key7",
      name: "Ability",
      fieldName: "ability",
      minWidth: 100,
      maxWidth: 150,
      isPadded: true,
      onRender: (item: TableRow) => (
        <TooltipHost content={item.name}>
          {item.abilities.toString()}
        </TooltipHost>
      ),
    },
  ]);

  const onColumnClick = (column: IColumn) => {
    const newSortDirection = !column.isSortedDescending;
    const newItems = listData.sort((a, b) => {
      if (
        a[column.fieldName as keyof TableRow] <
        b[column.fieldName as keyof TableRow]
      ) {
        return newSortDirection ? 1 : -1;
      }
      if (
        a[column.fieldName as keyof TableRow] >
        b[column.fieldName as keyof TableRow]
      ) {
        return newSortDirection ? -1 : 1;
      }
      return 0;
    });
    setListData(newItems);

    const updatedColumns = columns.map((col) => {
      col.isSorted = col.key === column.key;
      col.isSortedDescending =
        col.key === column.key ? newSortDirection : false;
      return col;
    });

    setColumns(updatedColumns);
  };

  useEffect(() => {
    setListData([]);
    setPokemonList([]);
    getPokemonList();
  }, []);

  useEffect(() => {
    if(searchValue){
      getPokemonDetails(searchValue.toLowerCase(), 0, true)
    }
     else{
      setListData([]);
      setPokemonList([]);
      getPokemonList();
     } 
  }, [searchValue]);

  const covertToUppercase = (item: string) => {
    return item?.[0].toUpperCase() + item?.slice(1);
  };

  const getPokemonDetails = useCallback(
    async (name: string, exp: number = 0, isSearch: boolean = false) => {
      Promise.resolve(
        axios.get<Array<Object>>(
          `${process.env.REACT_APP_API_URL}/pokemon/${name}`
        )
      )
        .then((response) => {
          if (response.status === 200 && response.data) {
            const dataDetail = isSearch ? [] : listData;

            const alreadyInArray = dataDetail.some(
              (item) => item.name === covertToUppercase(name)
            );

            if (!alreadyInArray) {
              if (
                (exp === 100 &&
                  (response.data as any).base_experience <= 100) ||
                (exp !== 100 && (response.data as any).base_experience > exp)
              ) {
                const abilities = (response.data as any).abilities.map(
                  (element: any) => covertToUppercase(element.ability.name)
                );
                const typeName = (response.data as any).types.map(
                  (element: any) => element.type.name
                );
                const data = {
                  name: covertToUppercase((response.data as any).name),
                  key: (response.data as any).id,
                  icon: (response.data as any).sprites.front_default,
                  height: (response.data as any).height,
                  weight: (response.data as any).weight,
                  abilities: abilities,
                  experience: (response.data as any).base_experience ?? 0,
                  type: typeName,
                };

                dataDetail.push(data);
                setListData(dataDetail);
              }
            }
          } else {
            console.log("else data");
          }
        })
        .catch((error) => {
          console.log(error);
          return error;
        });
    },
    [pokemonList]
  );

  const getPokemonList = useCallback(
    async (typeName: string = "", exp: number = 0) => {
      Promise.resolve(
        axios.get<Array<Object>>(
          typeName !== ""
            ? `${process.env.REACT_APP_API_URL}/type/${typeName} `
            : `${process.env.REACT_APP_API_URL}/pokemon?limit=10&&offset=0`
        )
      )
        .then((response) => {
          if (response.data) {
            if (typeName === "") {
              const value = response.data as unknown as DataStructureType;
              const list = value.results.map((element: any) => {
                return  covertToUppercase(element.name)
              });
              if (list !== pokemonList) setPokemonList(list);
              value.results.forEach((element) => {
                getPokemonDetails((element as any).name, exp);
              });
            } else {
              const value = response.data as any;
              const list = value.pokemon.map((element: any) => {
                return covertToUppercase(element.name)
              });
              setPokemonList(list);
              value.pokemon.map((element: any) => {
                getPokemonDetails(element.pokemon.name, exp);
              });
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    [pokemonList]
  );

  const _onRenderRow: IDetailsListProps["onRenderRow"] = (props) => {
    const customStyles: Partial<IDetailsRowStyles> = {};
    if (props) {
      if (props.itemIndex % 2 === 0) {
        // Every other row renders with a different background color
        customStyles.root = { backgroundColor: theme.palette.themeLighterAlt };
      }

      return <DetailsRow {...props} styles={customStyles} />;
    }
    return null;
  };

  const onSearchValueChange = (newValue: string) => {
    setSearchValue(newValue ?? "");
    setTypeSelected([]);
    setExperienceSelected(0);
  };
  const OnTypeSelected = (types: string[]) => {
    setTypeSelected(types);
    setListData([]);
    setPokemonList([]);
    if(!types.length){
      getPokemonList('', experienceSelected);
    }else{
      types.forEach(type => {
        getPokemonList(type, experienceSelected); 
      });
    }
  };

  const onExpChange = (value: number) => {
    setExperienceSelected(value);
    setListData([]);
    setPokemonList([]);
    typeSelected.forEach(type => {
      getPokemonList(type, value); 
    });
  };

  const onRowClick = (item: TableRow) => {
    if (item) {
      setAlertData({
        name: item.name,
        value: `Pokemon ${item.name} has abilities ${item.abilities.toString()}`,
      });
      handleShowAlert();
    }
  };
  const submitComment = ()=>{
    setAlertData({
      name: "Thank you for your comment",
      value: `Your comment ${comment} has been noted`,
    });
    handleShowAlert();
  }

  const handleShowAlert = () => setShowAlert(true);
  const handleCloseAlert = () => {
    setComment("");
    setShowAlert(false);
  };

  return (
    <>
      {showAlert && <Alert data={alertData} onClose={handleCloseAlert} />}
      <div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <PokemonFilter
            AddType={OnTypeSelected}
            selectedType={typeSelected}
            onExpChange={onExpChange}
            experience={experienceSelected}
          />
          <div
            style={{
              height: "100%",
              marginLeft: "350px",
              width: "75vw",
            }}
          >
           <div style={{display:"flex",alignItems:'center'}}> <h1 className="TableHeading">Pokemon List  </h1>
           <img src={PokemonImage} alt="pokemon" style={{ width: '50px', height: 'auto' }} /> 
           </div>
            <CommandBar
              items={[]}
              farItems={[
                {
                  key: "searchBox",
                  onRender: () => (
                    <>
                      {/* <Label htmlFor="searchId">Search</Label> */}
                      <SearchBox
                        styles={{ root: { width: 300, paddingLeft: "10px" } }}
                        placeholder="Search by name..."
                        onClear={(ev) => {
                          setSearchValue("");
                        }}
                        onSearch={onSearchValueChange}
                      />
                    </>
                  ),
                },
              ]}
            />
            <DetailsList
              className="detailsListClass"
              items={listData}
              compact={false}
              columns={columns}
              selectionMode={SelectionMode.none}
              isHeaderVisible={true}
              onRenderRow={_onRenderRow}
              onItemInvoked={onRowClick}
              setKey="single"
            />
          </div>
        </div>
        <div className="paddingClass">
          <div>
          <Label htmlFor="commentId">
            Please provide your feedback on Pokemon Table
          </Label>
          <TextField id="commentId" value={comment} multiline rows={3} onChange={(e)=>setComment(e.currentTarget.value)}/>
          </div>
          <PrimaryButton onClick={submitComment}>Submit</PrimaryButton>
        </div>
      </div>
    </>
  );
};

export default PokemonDetailsList;
