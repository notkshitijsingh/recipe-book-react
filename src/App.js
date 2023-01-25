import React, { useState } from "react";
import Axios from "axios";
import styled from "styled-components";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";

const APP_ID = "ab7ee179";
const APP_KEY = "08721d8f9ab32a147222806a8267369f";

const RecipeContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  width: 300px;
  border-radius: 10px;
`;
const CoverImage = styled.img`
  object-fit: cover;
  height: 200px;
  border-radius: 6px;
`;
const RecipeName = styled.span`
  font-size: 18px;
  font-weight: 600;
  color: black;
  margin: 10px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const SeeMoreText = styled.span`
  color: white;
  font-size: 18px;
  text-align: center;
  border: solid 1px #eb3300;
  background-color: #eb3300;
  border-radius: 50px;
  padding: 10px 15px;
  cursor: pointer;
`;
const IngredientsText = styled(SeeMoreText)`
  color: white;
  border: solid 1px green;
  background-color: green;
  margin-bottom: 12px;
`;
const SeeNewTab = styled(SeeMoreText)`
  color: white;
  border: solid 1px green;
  background-color: green;
`;
const RecipeComponent = (props) => {
  const [show, setShow] = useState("");

  const { label, image, ingredients, url } = props.recipe;
  return (
    <RecipeContainer>
      <Dialog
        onClose={() => console.log("closed")}
        aria-labelledby="simple-dialog-title"
        open={!!show}
      >
        <DialogTitle>Ingredients</DialogTitle>
        <DialogContent>
          <RecipeName>{label}</RecipeName>
          <table>
            <thead>
              <th>Ingredient</th>
              <th>Weight</th>
            </thead>
            <tbody>
              {ingredients.map((ingredient, index) => (
                <tr key={index} className="ingredient-list">
                  <td>{ingredient.text}</td>
                  <td>{ingredient.weight}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </DialogContent>
        <DialogActions>
          <SeeNewTab onClick={() => window.open(url)}>See More</SeeNewTab>
          <SeeMoreText onClick={() => setShow("")}>Close</SeeMoreText>
        </DialogActions>
      </Dialog>
      <CoverImage src={image} alt={label} />
      <RecipeName>{label}</RecipeName>
      <IngredientsText onClick={() => setShow(!show)}>
        Ingredients
      </IngredientsText>
      <SeeMoreText onClick={() => window.open(url)}>
        See Complete Recipe
      </SeeMoreText>
    </RecipeContainer>
  );
};
const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const Header = styled.div`
  color: white;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  padding: 20px;
  padding-left: 10%;
  font-size: 25px;
`;
const SearchBox = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 10px;
  border-radius: 6px;
  margin-left: 20px;
  width: 80%;
  background-color: white;
  border: 1px solid black;
  border-radius: 50px;
`;
const SearchIcon = styled.img`
  width: 32px;
  height: 32px;
`;
const Placeholder = styled.img`
  height: 300px;
  margin: 200px;
`;
const SearchInput = styled.input`
  color: black;
  font-size: 16px;
  border: none;
  outline: none;
  margin-left: 15px;
  width: 100%;
`;
const RecipeListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 30px;
  gap: 20px;
  justify-content: space-evenly;
`;
const AppComponent = () => {
  const [searchQuery, updateSearchQuery] = useState("");
  const [recipeList, updateRecipeList] = useState([]);
  const [timeoutId, updateTimeoutId] = useState();
  const fetchData = async (searchString) => {
    const response = await Axios.get(
      `https://api.edamam.com/search?q=${searchString}&app_id=${APP_ID}&app_key=${APP_KEY}`,
    );
    updateRecipeList(response.data.hits);
  };

  const onTextChange = (e) => {
    clearTimeout(timeoutId);
    updateSearchQuery(e.target.value);
    const timeout = setTimeout(() => fetchData(e.target.value), 500);
    updateTimeoutId(timeout);
  };

  return (
    <Container>
      <Header>
        <SearchBox>
          <SearchIcon src="./search-icon.svg" alt="O" />
          <SearchInput
            placeholder="Search"
            value={searchQuery}
            onChange={onTextChange}
          />
        </SearchBox>
      </Header>
      <RecipeListContainer>
        {recipeList?.length ? (
          recipeList.map((recipe, index) => (
            <RecipeComponent key={index} recipe={recipe.recipe} />
          ))
        ) : (
          <Placeholder src="./club_logo - icon.png" alt="The Purrfect Plate" />
        )}
      </RecipeListContainer>
    </Container>
  );
};

export default AppComponent;
