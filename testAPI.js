let fetch = require('node-fetch');


async function loadDefinitions(word) {
  // let obj;
  let data = await fetch(`https://wordsapiv1.p.rapidapi.com/words/${word}/definitions`, {
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
      "x-rapidapi-key": "b10667d4a5mshf835a0dbd702cbfp16d05ejsn02b01fe3136f"
    }
  }).then(response => response.json()).catch(err => {
    console.log(err);
  });

  // console.log('data type: ', typeof data);
  // console.log('data: ', data);


  // console.log(typeof data);
  // console.log(data);

  /* for (let def of data.definitions) {
    await Definition.query().insert({
      wordId: word.id,
      definition: def.definition,
      partOfSpeech: def.partOfSpeech
    });
  } */
  // console.log(' from fetch: ', data);
  // return obj;
  return data;
}


async function run() {
  let result = await loadDefinitions('greet');
  console.log('RESULT: ',result);
}
run();
