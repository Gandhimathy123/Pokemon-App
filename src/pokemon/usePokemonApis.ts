import axios from "axios";

export const covertToUppercase = (item: string) => {
    return item[0].toUpperCase() + item.slice(1);
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
      return null; 
    }
  };