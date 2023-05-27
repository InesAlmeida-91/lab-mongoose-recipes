const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://127.0.0.1/recipe-app';
mongoose.set('strictQuery', true);
// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    return Recipe.create({
      title: 'Carbonara', 
      level: 'Easy Peasy', 
      ingredients: ['spaghetti', 'pecorino cheese', 'pancetta', 'eggs'], 
      cuisine: 'Italian', 
      dishType: 'main_course', 
      image: 'https://images.media-allrecipes.com/images/75131.jpg', 
      duration: 15});
  })
  .then(newRecipe => {console.log('New recipe:', newRecipe.title)
  })
  .then(() => {
    return Recipe.insertMany(data)
  })
  .then(allRecipes => allRecipes.forEach(recipe => console.log('Recipes title:', recipe.title))
  )
  .then(() => {
  return Recipe.findOneAndUpdate({title:'Rigatoni alla Genovese'}, {duration: 100}, {new: true})
  })
  .then(uptadedRecipe => {console.log('Rigatoni alla Genovese', uptadedRecipe)
  })
  .then(() => {
    return Recipe.deleteOne({title: 'Carrot Cake'})
  })
  .then(deletedRecipe => {console.log('Deleted:', deletedRecipe)
  })
  .then(() => mongoose.connection.close())
  .then(() => console.log('Connection close'))
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
