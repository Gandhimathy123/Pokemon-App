import axios from "axios";
import { AttributeType, DataStructureType, TableRow } from "../utils";

export const covertToUppercase = (item: string) => {
    return item[0].toUpperCase() + item.slice(1);
};

export const getPokemonDetails = async (listData:TableRow[],name: string,isSearch:boolean=false) => {
   
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/pokemon/${name}`);

        if (response.data) {
        // const data:any = [];
        if (response.status === 200 && response.data) {
          const dataDetail = isSearch?[]:listData;
          const alreadyInArray = dataDetail.some(
            (item) => item.name === covertToUppercase(name)
          );

          if (!alreadyInArray) {
            // const abilities: string[] = [];
            // (response.data as any).abilities.forEach((element: any) => {
            //   abilities.push(covertToUppercase(element.ability.name));
            // });
            const abilities = (response.data as any).abilities.map((element: any) => covertToUppercase(element.ability.name));
            const typeName = (response.data as any).types[0].type;
            const data = {
              name: covertToUppercase((response.data as any).name),
              key: (response.data as any).id,
              icon: (response.data as any).sprites.front_default,
              height: (response.data as any).height,
              weight: (response.data as any).weight,
              abilities: abilities,
              experience: (response.data as any).base_experience,
              type: typeName.name
            };

            
            return data;
            // setListData(dataDetail);
          }
        } else {
            return null;
          console.log("else data");
        }
        //   console.log(data,"consoled")
        // return data;
      }}
      catch(error)  {
        console.log(error);
        return null;
      };
    }

 export const getPokemonList = async (listData:TableRow[],typeName:string='') :Promise<TableRow[] | null> => {
    try {
        const response = await axios.get<Array<Object>>(
        typeName !== ''? `${process.env.REACT_APP_API_URL}/type/${typeName}? `:
        `${process.env.REACT_APP_API_URL}/pokemon?limit=5&&offset=0`
      );
     
        if (response.data) {
            console.log(typeName,response.data)
            if(typeName === ''){
                const value = response.data as any ;
                const newData = value.results.map((element:AttributeType) => {
                    console.log(element.name)
                  return getPokemonDetails(listData,element.name);
                });
                const newDatas = await Promise.all(newData);
                console.log(newData);
                return newDatas;
            }else{
                const value = response.data as any;
                const newData =  value.pokemon.map((element:any) => {
                   return getPokemonDetails(listData,element.pokemon.name);
                });
                const newDatas = await Promise.all(newData);
                console.log(newDatas);
                return newData!!;
            }
          
        }
        else return null;
    }
    catch (error) {
        console.error(error);
        return null; // or handle the error appropriately
    }
  };

  export const getPokemonTypes = async (): Promise<string[] | null> => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/type`
      );
  
      if (response.data) {
        const types: string[] = response.data.results.map((element:any) => element.name);
        return types;
      } else {
        return null;
      }
    } catch (error) {
      console.error(error);
      return null; // or handle the error appropriately
    }
  };