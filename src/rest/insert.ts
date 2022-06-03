import { API } from "rest/common";

const api = {
  addUnit: (unit: string) => {
    return API("insert", {
      table: "units",
      params: [unit],
    });
  },

  addIngredient: (name: string, unit: string) => {
    return API("insert", {
      table: "ingredients",
      params: [name, unit],
    });
  },

  addRecipe: (recipe: string, description: string) => {
    return API("insert", {
      table: "recipes",
      params: [recipe, description],
    });
  },

  addRecipeIngredient: (
    recipe_id: number,
    ingredient: string,
    amount: number
  ) => {
    return API("insert", {
      table: "recipe_ingredients",
      params: [recipe_id, ingredient, amount],
    });
  },
};

export default api;
