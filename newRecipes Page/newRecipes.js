var firebaseConfig = {
  apiKey: "AIzaSyCGH3zSNTZwRihAf0LvIuiJXiQlE7twdIs",
  authDomain: "g2cookapp.firebaseapp.com",
  databaseURL: "https://g2cookapp.firebaseio.com",
  projectId: "g2cookapp",
  storageBucket: "g2cookapp.appspot.com",
  messagingSenderId: "972446916588",
  appId: "1:972446916588:web:baa59c7447ee9b158e6ac9"
};

//Main
function main(){
  create_recipe();
  congrats();
}

//function to pull data from the document and put it in an object
function create_recipe() {
  var main_ingredient = document.getElementById("main_ingredient_list").value;
  var name = document.getElementById("name").value;
  var ingredients = document.getElementById("ingredients").value;
  var time = document.getElementById("time").value;
  var difficulty = document.getElementById("difficulty").value;
  var recipe = document.getElementById("recipe").value;
  var recipePicture = document.getElementById("recipePicture").value;
  //This part pushes the collected data into firebase, sorted by main_ingredient
  firebase
    .database()
    .ref(main_ingredient)
    .push({
      RecipeName: name,
      Ingredients: ingredients,
      Time: time,
      Difficulty: difficulty,
      Recipe: recipe,
      RecipePicture: recipePicture
    });
}

function congrats(){
  document.getElementById("name").value = "";
  document.getElementById("ingredients").value = "";
  document.getElementById("recipe").value = "";
  document.getElementById("recipePicture").value = "";
  document.getElementById("recipe_added").style.display = "block";
}