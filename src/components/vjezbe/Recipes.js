import React, { useState, useEffect } from 'react';
function Recipes() {
    const [recipes, setRecipes] = useState([]);
    useEffect(() => {
             fetch("https://dummyjson.com/recipes")
            .then(res => res.json())
            .then(data => setRecipes(data.recipes))
            .catch(err => console.error(err));
         }, []);
     return(
        <div className="container">
            <h1>Recipes</h1>
            {
               recipes.map(recept => {
                    return (<>
                        <img src={recept.image} alt={recept.name} width="200" height="200" />
                        <h2>Instructions</h2>
                        {recept.instructions.map(instruction => {
                            return <p>{instruction}</p>
                        })}
                    )
                    </>
               
               )})
            }
        </div>
    );
}
export default Recipes;