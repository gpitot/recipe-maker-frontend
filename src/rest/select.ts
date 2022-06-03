import { API } from "rest/common";

export type Unit = {
  name: string;
};

export type Ingredient = {
  name: string;
  unit: string;
};

export type Recipe = {
  id : number;
  name : string;
  description : string;
  ingredients? : RecipeIngredients[];
}

export type RecipeIngredients = {
  ingredient : string;
  amount : number;
}

const api = {
  selectUnit: (): Promise<Unit[]> => {
    return API("select", {
      table: "units",
    });
  },

  selectIngredient: (): Promise<Ingredient[]> => {
    return API("select", {
      table: "ingredients",
    });
  },

  selectRecipe: (): Promise<Recipe[]> => {
    return API("select", {
      table: "recipes",
    });
  },

  selectRecipeIngredient: (recipe_id: number): Promise<RecipeIngredients[]> => {
    return API("select", {
      table: "recipe_ingredients",
      params: [recipe_id],
    });
  },
};

export default api;
