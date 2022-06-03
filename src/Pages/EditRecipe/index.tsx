import ListItemWrapper from 'components/ListItemWrapper';
import List from 'components/List';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Recipe } from 'rest/select';
import { useStore } from 'store';
import AddButton from 'components/AddButton';
import Input from 'components/Input';

type Props = {
    recipe : Recipe;
}

type Params = {
    id : string;
}

type IngredientRowProps = {
    name : string,
    unit : string,
    handleAdd : () => void;
}
const ingredientRow = ({name, unit, handleAdd} : IngredientRowProps) => {

    const [amount, setAmount] = useState("0");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(e.target.value);
    }


    return [{content : name},
        {content : unit},
        {content : "amount", element : <Input id="amount" value={amount} handleChange={handleChange} />},
        {content: "Add", element : <AddButton text="add" handleClick={handleAdd}/>}
    
    ]
}



const SingleRecipe = () => {

    const {id} = useParams<Params>();
    const [{recipes, ingredients}, {loadRecipeIngredients, loadIngredients}] = useStore();

    useEffect(() => {
        loadRecipeIngredients(parseInt(id));
        loadIngredients();
    }, [loadRecipeIngredients, id, loadIngredients])


    const handleAddExistingIngredient = () => {}

    const handleAddNewIngredient = (q : string) => {

    }

    if (!recipes) return null;
    const recipe = recipes.find(r => r.id === parseInt(id));
    if (!recipe) return null;

    const { name, description, ingredients : recipeIngredients=[]} = recipe;


    const columns = ['Ingredient', 'Amount'];
    const items = recipeIngredients.map(({ingredient, amount}) => [{content : ingredient, }, {content : amount.toString()}]);

    const ingredientsItems = ingredients.map(({name, unit}) => ingredientRow({name, unit, handleAdd:handleAddExistingIngredient}));

    return (
        <div>
            <h2>{name}</h2>
            <p>{description}</p>
            { ingredients && <List query="" title="" columns={columns} items={items} />}


            <ListItemWrapper id="add_ingredient"  label="Add ingredient" items={ingredientsItems} columns={["Ingredients", "Unit", "Amount", "Add"]} handleAdd={handleAddNewIngredient} />
        </div>
    )
}


export default SingleRecipe;