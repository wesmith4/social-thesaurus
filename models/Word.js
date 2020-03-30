let { Model, snakeCaseMappers } = require('objection');

class Word extends Model {
  static get columnNameMappers() {
    return snakeCaseMappers();
  }

  static get tableName() {
    return 'words';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: [
        'word'
      ],
      properties: {
        id: {type: 'integer'},
        word: {type: 'string'},
      }
    }
  }

  static get relationMappings() {
    let Relation = require('./Relation');
    return {
      relations: {
        relation: Model.HasManyRelation,
        modelClass: Relation,
        join: {
          from: 'words.id',
          to: 'relations.first_word_id'
        }
      }
    }
  }
}

module.exports = Word;
