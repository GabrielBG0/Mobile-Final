const connection = require('../Database/conection')

module.exports = {
  async create(req, res) {
    const { name, cnpj, adress, password } = req.body

    try {
      const id = await connection('establishments').insert({
        name,
        cnpj,
        adress,
        password
      }).returning('id')
      return res.status(201).json(id)
    } catch (e) {
      return res.status(400).send('couldnt create user')
    }
  },

  async login(res, req) {
    const { cnpj, password } = req.body

    const id = await connection('establishments').select('id').where({
      cnpj, password
    }).first()

    if (id == null) {
      return res.status(404).send('establishment not found')
    }

    return res.json(id)
  },

  async getInfo(req, res) {
    const { id } = req.params

    const info = await connection('establishments').select('*').where('id', id)

    return res.json(info)
  }
}