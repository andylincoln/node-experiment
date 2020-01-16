import Model from 'objection'

class TodoItem extends Model {
  static get tableName() {
    return 'persons'
  }
}
