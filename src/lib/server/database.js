// @ts-nocheck
import * as edgedb from "edgedb"
import e from "../../../dbschema/edgeql-js/index.mjs"
import { IsReadonlyMode } from "$lib/config.js"
export { e }

export let edbc = edgedb.createClient()

class Database {
  static async select(params) {
    const query = e.select(this.type, params)
    return await query.run(edbc)
  }
  static select_query(params) {
    return e.select(this.type, params)
  }
  static select_query_by_ids(ids) {
    return e.select(this.type, (item) => ({
      id: true,
      filter: e.op(item.id, "in", e.set(...ids.map((id) => e.uuid(id)))),
    }))
  }
  static async insert(params) {
    if (IsReadonlyMode()) {
      return {}
    }
    const query = e.insert(this.type, params)
    return await query.run(edbc)
  }
  static async insert_in_readonly_mode(params) {
    const query = e.insert(this.type, params)
    return await query.run(edbc)
  }
  static async update(params) {
    if (IsReadonlyMode()) {
      return {}
    }
    const query = e.update(this.type, params)
    return await query.run(edbc)
  }
  static async delete(params) {
    if (IsReadonlyMode()) {
      return {}
    }
    const query = e.delete(this.type, params)
    return await query.run(edbc)
  }
}

export class Comment extends Database {
  static type = e.Comment
}

export class Tag extends Database {
  static type = e.Tag
}

export class Post extends Database {
  static type = e.Post
}

export class User extends Database {
  static type = e.User
}

export class Client extends Database {
  static type = e.Client
}

export class Job extends Database {
  static type = e.Job
}
