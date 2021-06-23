const connection = require('../Database/connection')

module.exports = {
  async create(req, res) {
    const { name, cnpj, adress, password } = req.body

    try {
      const id = await connection('establishments').insert({
        name,
        cnpj,
        adress,
        password
      })
      return res.status(201).json({ id: id[0] })
    } catch (e) {
      return res.status(400).send('couldnt create user')
    }
  },

  async login(req, res) {
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