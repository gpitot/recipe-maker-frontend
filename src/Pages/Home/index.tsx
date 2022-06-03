import RecipeCard from 'components/RecipeCard';
import React, { useEffect } from 'react';
import { Recipe } from 'rest/select';
import { useStore } from 'store';



const Home = () => {
    const [{recipes}, {loadRecipes}] = useStore();
    useEffect(() => {
        loadRecipes();
    }, [loadRecipes])


    const onAdd = (recipe : Recipe) => {}



    return (
        <div>
            {recipes.map((recipe) => (
                <RecipeCard recipe={recipe} handleAdd={onAdd} />
            ))}
        </div>
    )
}

export default Home;