import { createStore, createHook, StoreActionApi } from "react-sweet-state";
import API from "rest/index";
import { Unit, Ingredient, Recipe } from "rest/select";

type State = {
  units: Unit[];
  ingredients: Ingredient[];
  recipes: Recipe[];
  unitsLastLoaded: number;
  ingredientsLastLoaded: number;
  recipeMetaLastLoaded: number;
};

const initialState = {
  units: [],
  ingredients: [],
  recipes: [],
  unitsLastLoaded: 0,
  ingredientsLastLoaded: 0,
  recipeMetaLastLoaded: 0,
} as State;

type StoreApi = StoreActionApi<State>;

const shouldReload = (time: number) => Date.now() - time > 1000 * 60;


const actions = {
  loadUnits:
    () =>
    async ({ getState, setState }: StoreApi) => {
      if (!shouldReload(getState().unitsLastLoaded)) return Promise.resolve();
      setState({
        unitsLastLoaded: Date.now(),
      });
      const units = await API.select.selectUnit();
      setState({
        units,
      });
      return Promise.resolve();
    },

  loadIngredients:
    () =>
    async ({ getState, setState }: StoreApi) => {
      if (!shouldReload(getState().ingredientsLastLoaded))
        return Promise.resolve();
      setState({
        ingredientsLastLoaded: Date.now(),
      });
      const ingredients = await API.select.selectIngredient();
      setState({
        ingredients,
      });
    },

    loadRecipes:
    (override=false) =>
    async ({ getState, setState }: StoreApi) => {
      if (!shouldReload(getState().recipeMetaLastLoaded) && !override)
        return Promise.resolve();
      setState({
        recipeMetaLastLoaded: Date.now(),
      });
      const recipes = await API.select.selectRecipe();
      setState({
        recipes,
      });
    },

    loadRecipeIngredients:
    (id : number) =>
    async ({ getState, setState, dispatch }: StoreApi) => {
      await dispatch(actions.loadRecipes());

      const {recipes} = getState();
      //check if id is valid
      if (!recipes.find(r => r.id === id)) {
        throw Error("Invalid recipe id");
      }

      const ingredients = await API.select.selectRecipeIngredient(id);
      const updatedRecipes = [...recipes];
      for (let i=0; i<updatedRecipes.length; i+=1) {
        if (updatedRecipes[i].id === id) {
          updatedRecipes[i] = {
            ...updatedRecipes[i],
            ingredients
          }
        }
      }
      setState({
        recipes: updatedRecipes
      })
      
    },

  updateUnits:
    (unit: string) =>
    async ({ getState, setState }: StoreApi) => {
      await API.insert.addUnit(unit);
      setState({
        units: [...getState().units, { name: unit }],
      });
    },

  updateIngredients:
    (name: string, unit: string) =>
    async ({ getState, setState }: StoreApi) => {
      await API.insert.addIngredient(name, unit);
      setState({
        ingredients: [...getState().ingredients, { name, unit }],
      });
    },

    updateRecipes: (name: string, description: string) =>
    async ({dispatch}: StoreApi) => {
      await API.insert.addRecipe(name, description);
      await dispatch(actions.loadRecipes(true));
    }
};

const Store = createStore({
  initialState,
  actions 
});

const useStore = createHook(Store);

export { useStore };
