let Router = require('express-promise-router');
let router = new Router();

let Word = require('./models/Word');
let Relation = require('./models/Relation');


router.get('/', async(request, response) => {
  let allWords = await Word.query()
    .orderBy('word');

  response.render('main', { allWords });
})

router.get('/search', async(request, response) => {
  // Gather search term from page request
  let searchTerm = request.body.term;

  // Query similar results from database
  let results = await Word.query()
    .where('word', 'ilike', `%${searchTerm}%`);

  // Check if there is an exact result in the database
  let exactResult = await Word.query()
    .where('word', searchTerm);

  // If not, add the searched word as a new word
  if (exactResult.length === 0) {
    await Word.query().insert({
      word: newWord
    });
  }

  // Query all words in the database, for the sidebar
  let allWords = await Word.query()
    .orderBy('word');

  // Render the page with the results
  response.render('main', { results, searchTerm, allWords });
});

router.post('/new', async(request, response) => {
  let newWord = request.body.new;

  await Word.query().insert({
    word: newWord
  });

  response.redirect('/');
});

module.exports = router;
