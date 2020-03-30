let { Model, snakeCaseMappers } = require('objection');

class Word extends Model {
  static get columnNameMappers() {
    return snakeCaseMappers();
  }

  static get tableName() {
    return 'words';
  }

  static get jsonSchema() {

  }

  static get relationMappings() {

  }
}

module.exports = Word;
