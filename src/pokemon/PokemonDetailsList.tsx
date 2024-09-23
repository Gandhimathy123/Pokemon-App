import {
  DetailsList,
  DetailsListLayoutMode,
  IColumn,
  SelectionMode,
  TooltipHost,
  Selection,
} from "@fluentui/react";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { AttributeType, DataStructureType, TableRow } from "../utils";
import PokemonFilter from "./PokemonFilter";

interface PokemonListProps {
  type: string;
}

const PokemonDetailsList = () => {
  const [listData, setListData] = useState<TableRow[]>([]);
  const [pokemonList, setPokemonList] = useState<string[]>([]);
  const [typeSelected, setTypeSelected] = useState("");
  const [columns, setColumns] = useState<IColumn[]>([
    {
      key: "key1",
      name: "Persona",
      fieldName: "persona",
      minWidth: 150,
      maxWidth: 170,
      onRender: (item: TableRow) => (
        <TooltipHost content={item.name}>
          <img
            src={item.icon}
            style={{ height: "100%", width: "50%" }}
            alt={`${item.icon} file icon`}
          />
        </TooltipHost>
      ),
    },
    {
      key: "key2",
      name: "Name",
      fieldName: "name",
      minWidth: 70,
      maxWidth: 90,
      isPadded: true,
      data: "string",
      sortAscendingAriaLabel: "Sorted A to Z",
      sortDescendingAriaLabel: "Sorted Z to A",
      onColumnClick: (ev, column) => onColumnClick(column),
      onRender: (item: TableRow) => (
        <TooltipHost content={item.name}>{item.name}</TooltipHost>
      ),
    },
    {
      key: "key3",
      name: "Height",
      fieldName: "height",
      minWidth: 70,
      maxWidth: 90,
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
      maxWidth: 90,
      isPadded: true,
      onColumnClick: (ev, column) => onColumnClick(column),
      onRender: (item: TableRow) => item.weight,
    },
    {
      key: "key5",
      name: "Experience",
      fieldName: "experience",
      minWidth: 70,
      maxWidth: 90,
      isPadded: true,
      data: "number",
      onColumnClick: (ev, column) => onColumnClick(column),
      onRender: (item: TableRow) => item.experience,
    },
    {
      key: "key6",
      name: "Type",
      fieldName: "type",
      minWidth: 70,
      maxWidth: 90,
      isPadded: true,
      onRender: (item: TableRow) => item.type,
    },
    {
      key: "key7",
      name: "Ability",
      fieldName: "ability",
      minWidth: 70,
      maxWidth: 90,
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
    console.log(newItems);
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
    getPokemonList();
  }, []);

  useEffect(() => {
    getPokemonList(typeSelected);
    // setListData(lists);
    console.log(typeSelected);
  }, [typeSelected]);

  const covertToUppercase = (item: string) => {
    return item[0].toUpperCase() + item.slice(1);
  };

  // const getPokemonDetails = async (
  //   listData: TableRow[],
  //   name: string,
  //   isSearch: boolean = false
  // ) => {
  //   try {
  //     const response = await axios.get(
  //       `${process.env.REACT_APP_API_URL}/pokemon/${name}`
  //     );

  //     if (response.data) {
  //       // const data:any = [];
  //       if (response.status === 200 && response.data) {
  //         const dataDetail = isSearch ? [] : listData;
  //         const alreadyInArray = dataDetail.some(
  //           (item) => item.name === covertToUppercase(name)
  //         );

  //         if (!alreadyInArray) {
  //           // const abilities: string[] = [];
  //           // (response.data as any).abilities.forEach((element: any) => {
  //           //   abilities.push(covertToUppercase(element.ability.name));
  //           // });
  //           const abilities = (response.data as any).abilities.map(
  //             (element: any) => covertToUppercase(element.ability.name)
  //           );
  //           const typeName = (response.data as any).types[0].type;
  //           const data = {
  //             name: covertToUppercase((response.data as any).name),
  //             key: (response.data as any).id,
  //             icon: (response.data as any).sprites.front_default,
  //             height: (response.data as any).height,
  //             weight: (response.data as any).weight,
  //             abilities: abilities,
  //             experience: (response.data as any).base_experience,
  //             type: typeName.name,
  //           };

  //           return data;
  //           // setListData(dataDetail);
  //         }
  //       } else {
  //         return null;
  //         console.log("else data");
  //       }
  //       //   console.log(data,"consoled")
  //       // return data;
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     return null;
  //   }
  // };

  // const getPokemonList = async (
  //   listData: TableRow[],
  //   typeName: string = ""
  // ) => {
  //   try {
  //     const response = await axios.get<Array<Object>>(
  //       typeName !== ""
  //         ? `${process.env.REACT_APP_API_URL}/type/${typeName}? `
  //         : `${process.env.REACT_APP_API_URL}/pokemon?limit=5&&offset=0`
  //     );

  //     if (response.data) {
  //       console.log(typeName, response.data);
  //       if (typeName === "") {
  //         const value = response.data as any;
  //         const newData = value.results.map((element: AttributeType) => {
  //           console.log(element.name);
  //           return getPokemonDetails(listData, element.name);
  //         });
  //         const newDatas = await Promise.all(newData);
  //         console.log(newDatas)
  //         setListData(newDatas);
  //       } else {
  //         const value = response.data as any;
  //         value.pokemon.map((element: any) => {
  //           getPokemonDetails(listData, element.pokemon.name);
  //         });
  //        console.log(value)
  //       }
  //     } else return null;
  //   } catch (error) {
  //     console.error(error);
  //     return null; // or handle the error appropriately
  //   }
  // };

  const getPokemonDetails = useCallback(
    async (name: string, isSearch: boolean = false) => {
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
              const abilities = (response.data as any).abilities.map(
                (element: any) => covertToUppercase(element.ability.name)
              );
              const typeName = (response.data as any).types[0].type.name;
              const data = {
                name: covertToUppercase((response.data as any).name),
                key: (response.data as any).id,
                icon: (response.data as any).sprites.front_default,
                height: (response.data as any).height,
                weight: (response.data as any).weight,
                abilities: abilities,
                experience: (response.data as any).base_experience,
                type: typeName,
              };

              dataDetail.push(data);
              console.log(dataDetail);
              // setListData(dataDetail);
            }
          } else {
            console.log("else data");
          }
          //   console.log(data,"consoled")
          // return data;
        })
        .catch((error) => {
          console.log(error);
          return error;
        });
    },
    [pokemonList]
  );

  const getPokemonList = useCallback(
    async (typeName: string = "") => {
      Promise.resolve(
        axios.get<Array<Object>>(
          typeName !== ""
            ? `${process.env.REACT_APP_API_URL}/type/${typeName}? `
            : `${process.env.REACT_APP_API_URL}/pokemon?limit=5&&offset=0`
        )
      )
        .then((response) => {
          if (response.data) {
            if (typeName === "") {
              const value = response.data as unknown as DataStructureType;
              console.log();
              const list = value.results.map((element: any) =>
                covertToUppercase(element.name)
              );
              if (list !== pokemonList) setPokemonList(list);

              value.results.forEach((element) => {
                getPokemonDetails((element as any).name);
                //   detailList.push(detailsData);
              });
            } else {
              const value = response.data as any;
              setListData([]);
              setPokemonList([]);
              value.pokemon.map((element: any) => {
                getPokemonDetails(element.pokemon.name);
              });
              console.log(value);
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    [pokemonList]
  );

  const _selection = new Selection({
    onSelectionChanged: () => {
      let newSelectedItem = _selection.getSelection();
      console.log(newSelectedItem);
    },
  });

  const _onItemInvoked = (item: any): void => {
    alert(`Item invoked: ${item.name}`);
  };

  return (
    <div>
      <div style={{ height: "100%" }}>
        <PokemonFilter changeType={setTypeSelected} />
        <DetailsList
          items={listData}
          compact={false}
          columns={columns}
          selectionMode={SelectionMode.multiple}
          isHeaderVisible={true}
          // onItemInvoked={_onItemInvoked}
          setKey="single"
          // selection={_selection}
        />
      </div>
    </div>
  );
};

export default PokemonDetailsList;
