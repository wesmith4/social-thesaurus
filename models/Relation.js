let { Model, snakeCaseMappers } = require('objection');

class Relation extends Model {
  static get columnNameMappers() {
    return snakeCaseMappers();
  }

  static get tableName() {
    return 'relations';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: [
        'first_word_id',
        'second_word_id'
      ],
      properties: {
        id: {type: 'integer'},
        firstWordId: {type: 'integer'},
        secondWordId: {type: 'integer'}
      }
    }
  }

  static get relationMappings() {
    let Word = require('./Word');
    return {
      firstWord: {
        relation: Model.HasOneRelation,
        modelClass: Word,
        join: {
          from: 'relations.first_word_id',
          to: 'words.id'
        }
      },
      secondWord: {
        relation: Model.HasOneRelation,
        modelClass: Word,
        join: {
          from: 'relations.second_word_id',
          to: 'words.id'
        }
      }
    }
  }
}

module.exports = Relation;
