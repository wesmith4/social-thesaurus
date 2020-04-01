let Router = require('express-promise-router');
let router = new Router();

let Word = require('./models/Word');
let Relation = require('./models/Relation');


router.get('/', async(request, response) => {
  let allWords = await Word.query()
    .select('words.id', 'words.word')
    .count('relations.id', {as: 'num_relations'})
    .leftJoin('relations', 'relations.first_word_id', 'words.id')
    .groupBy('words.id')
    .orderBy('words.word');

  console.log(allWords);
  response.render('main', { allWords });
});

router.get('/search', async(request, response) => {
  // Gather search term from page request
  let searchTerm = request.query.term;

  // Query similar results from database
  results = await Word.query()
    .where('word', 'ilike', `%${searchTerm}%`);

  // Check if there is an exact result in the database
  let exactResult = await Word.query()
    .where('word', searchTerm);

  // If not, add the searched word as a new word (probably won't use this)
  /* if (exactResult.length === 0) {
    await Word.query().insert({
      word: searchTerm
    });
  } */

  // Query all words in the database, for the sidebar
  let allWords = await Word.query()
    .orderBy('word');

  for (let word of results) {
    let relatedWords = await Relation.query()
      .select('word')
      .where('first_word_id', word.id)
      .join('words', 'words.id', 'relations.second_word_id')

    word['relatedWords'] = relatedWords;
  }

  results = (results.length > 0 ? results : false);


  // Render the page with the results
  if (results) {
    response.render('main', { results, searchTerm, allWords });
  } else {
    let noResults = true;
    response.render('main', { noResults, allWords, searchTerm });
  }

});

router.post('/new', async(request, response) => {
  let newWord = request.body.new.toLowerCase().trim();
  try {
    await Word.query().insert({
      word: newWord
    });
    response.redirect(`/search?term=${newWord}`);
  } catch {
    response.redirect('/');
  }
});

router.post('/words/:wordId/relate', async(request, response) => {
  let thisWord = await Word.query()
    .where('id', Number(request.params.wordId));
  let relatedWord = request.body.relatedWord.trim();

  let inDB = await Word.query()
    .where('word', relatedWord.toLowerCase());

  if (inDB.length > 0) {
    // Insert the relation both ways
    console.log('Trying to insert relations...')
    await Relation.query().insert(
    {
      firstWordId: thisWord[0].id,
      secondWordId: inDB[0].id
    });
    console.log('First relation inserted...');
    await Relation.query().insert(
      {
        firstWordId: inDB[0].id,
        secondWordId: thisWord[0].id
      }
    );

  } else {
    await Word.query().insert({
      word: relatedWord.toLowerCase()
    });

    inDB = await Word.query()
    .where('word', relatedWord.toLowerCase());

    await Relation.query().insert(
    {
      firstWordId: thisWord[0].id,
      secondWordId: inDB[0].id
    });
    await Relation.query().insert(
      {
        firstWordId: inDB[0].id,
        secondWordId: thisWord[0].id
      }
    );

  }

  response.redirect(`/search?term=${thisWord[0].word}`);
})

module.exports = router;
