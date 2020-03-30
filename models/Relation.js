let { Model, snakeCaseMappers } = require('objection');

class Relation extends Model {
  static get columnNameMappers() {
    return snakeCaseMappers();
  }

  static get tableName() {
    return 'relations';
  }

  static get jsonSchema() {

  }

  static get relationMappings() {

  }
}

module.exports = Relation;
