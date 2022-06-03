import React from 'react';
import { Recipe } from 'rest/select';
import style from './style.module.scss';
import AddButton from 'components/AddButton';
import { Link } from "react-router-dom";

type Props = {
    recipe : Recipe
    handleAdd : (recipe : Recipe) => void;
}

const RecipeCard = ({recipe, handleAdd} : Props) => { 
    
    const onAdd = () => handleAdd(recipe);

    
    
    return (
    <div className={style.card}>
        <h2>{recipe.name}</h2>
        <p>
            {recipe.description}
        </p>
        <Link to={`/recipes/${recipe.id}`}>edit</Link>
        <AddButton text="add to ingredients" handleClick={onAdd} />
    </div>
)}

export default RecipeCard;