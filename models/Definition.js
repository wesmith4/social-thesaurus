let { Model, snakeCaseMappers } = require('objection');


class Definition extends Model {
  static get columnNameMappers() {
    return snakeCaseMappers();
  }

  static get tableName() {
    return 'definitions';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: [],
      properties: {
        id: {type: 'integer'},
        wordId: {type: 'integer'},
        definition: {type: 'string'},
        partOfSpeech: {type: ['string', 'null']}
      }
    }
  }
}

module.exports = Definition;
