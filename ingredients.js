var firebaseConfig = {
  apiKey: "AIzaSyCGH3zSNTZwRihAf0LvIuiJXiQlE7twdIs",
  authDomain: "g2cookapp.firebaseapp.com",
  databaseURL: "https://g2cookapp.firebaseio.com",
  projectId: "g2cookapp",
  storageBucket: "g2cookapp.appspot.com",
  messagingSenderId: "972446916588",
  appId: "1:972446916588:web:baa59c7447ee9b158e6ac9"
};

var main_ingredient;

//Main function
function main() {
  var main_ingredient = getMainIngredient();
  showDiv();
  retrieveData(main_ingredient);
}

//Function to get main ingredient
function getMainIngredient() {
  main_ingredient = document.getElementById("ingredients").value;
  console.log(main_ingredient);
  return main_ingredient;
}

//Making the recipes and filters appear below the
function showDiv() {
  document.getElementById("recipes").style.display = "block";
}

//Retrieving data functions
function retrieveData(main_ingredient) {
  var database = firebase.database();
  var ref = database.ref(main_ingredient);
  ref.on("value", gotData, errData);
}

function gotData(data) {
  console.log(data.val());
  var main_ingredient_recipes = data.val();
  console.log(main_ingredient_recipes);
  var keys = Object.keys(main_ingredient_recipes);
  console.log(keys);
  var recipes = [];
  for (var i = 0; i < keys.length; i++) {
    var k = keys[i];
    var RecipeName = main_ingredient_recipes[k].RecipeName;
    console.log(name);
    var Ingredients = main_ingredient_recipes[k].Ingredients;
    var Time = main_ingredient_recipes[k].Time;
    var Difficulty = main_ingredient_recipes[k].Difficulty;
    var Recipe = main_ingredient_recipes[k].Recipe;
    var RecipePicture = main_ingredient_recipes[k].RecipePicture;
    recipes[i] = {
      RecipeName: RecipeName,
      Ingredients: Ingredients,
      Time: Time,
      Difficulty: Difficulty,
      Recipe: Recipe,
      RecipePicture: RecipePicture
    };
  }
  for (var i = 1; i <= 5; i++) {
    document.getElementById("recipe_synopsis" + i).innerHTML = "";
    document.getElementById("recipe_full" + i).innerHTML = "";
  }
  var time_constraint = document.getElementById("time").value;
  var difficulty_constraint = document.getElementById("difficulty").value;
  i = 1;
  var count = 0;
  while (i <= 5) {
    if ((time_constraint === recipes[count].Time || time_constraint === "All")&&(difficulty_constraint === recipes[count].Difficulty || difficulty_constraint === "All")) {
      addToPage(recipes[count],i);
      count++;
      i++;
    } else {
      count++;
    }
  }
  console.log(recipes);
}

function errData(err) {
  console.log("Error!");
  console.log(err);
}

//Dynamically adding recipes to dropdown bars
function addToPage(recipe, id) {
    document.getElementById(
      "recipe_synopsis" + (id)
    ).innnerHTML = recipeHeader(recipe, id);
    document.getElementById("recipe_full" + id).innerHTML =
      "Ingredients: " +
      recipe.Ingredients +
      "<br>" +
      "Recipe: <br>" +
      recipe.Recipe;
    document.getElementById("recipe_img" + id).src =
      recipe.RecipePicture;
    console.log(recipe);
}

function recipeHeader(recipe, id_number) {
  document.getElementById("recipe_synopsis" + id_number).innerHTML =
    "Recipe Name: " +
    recipe.RecipeName +
    "<br>           Time: " +
    recipe.Time +
    "<br>           Difficulty: " +
    recipe.Difficulty;
}


//Function to show recipe on click
function revealRecipe(id) {
  var recipes = document.getElementsByClassName("collapsible_button");
  var i;
  for (i = 0; i < recipes.length; i++) {
    recipes[i].addEventListener("click", function() {
      //Toggle between adding and removing the active class. to highlight the button that controls the panel
      this.classList.toggle("active");
      var content = this.nextElementSibling;
      if (content.style.display === "block") {
        content.style.display = "none";
      } else {
        content.style.display = "block";
      }
    });
  }
}

function ingredients_array(ingredients_string) {
  var ingredients = ingredients_string.split(" ,");
  return ingredients;
}
