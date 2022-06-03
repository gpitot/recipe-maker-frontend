import AddButton from "components/AddButton";
import Input from "components/Input";
import React, { useEffect, useState } from "react";
import { useStore } from "store";
import RecipeCard from "components/RecipeCard";
import style from './style.module.scss';

const Recipes = () => {

    const [recipeName, setRecipeName] = useState('');
    const [recipeDesc, setRecipeDesc] = useState('');
    const [showDesc, setShowDesc] = useState(false);
  const [{ recipes }, { loadRecipes, updateRecipes }] = useStore();

  useEffect(() => {
    loadRecipes();
  }, [loadRecipes]);

  const handleAddName = (query: string) => {
    setRecipeName(query);
    setShowDesc(true);
  };

  const handleAdd = async () => {
    await updateRecipes(recipeName, recipeDesc);
    setShowDesc(false);
  }


  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRecipeDesc(e.target.value);
  }


  if (showDesc) return (
      <>
        <Input value={recipeDesc} id="recipe-desc" handleChange={handleDescriptionChange} />
        <AddButton text="Add" disabled={recipeDesc.trim().length < 1} handleClick={handleAdd}/>
      </>
  )

  return (
    <div className={style.wrapper}>
   
   </div>
  );
};

export default Recipes;
