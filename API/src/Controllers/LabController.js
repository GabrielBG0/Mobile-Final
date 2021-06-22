const connection = require('../Database/conection')

module.exports = {
  async create(req, res) {
    const { cnpj, password, adress } = req.body

    try {
      const id = await connection('labs').insert({
        cnpj,
        password,
        adress
      }).returning('id')
      return res.status(201).json(id)
    } catch (e) {
      return res.status(400).send('couldnt create lab')
    }
  },

  async login(req, res) {
    const { cnpj, password } = req.body

    const id = await connection('lab').select('id').where({
      cnpj,
      password
    }).first()

    if (id == null) {
      return res.status(404).send('lab not found')
    }

    return res.json(id)
  },

  async tagPatient(req, res) {
    const { user_id, lab_id } = req.body

    const auth = await connection('labs_users').select('id').where({
      lab_id,
      user_id
    }).first()

    if (auth == null) {
      return res.status(403).send('you dont have the authorisation to do this')
    }

    try {
      await connection('users').where('id', user_id).update({
        infected: true
      })
    } catch (e) {
      return res.status(404).send('user not found')
    }

    try {
      await connection('tag_log').insert({
        tagged: true,
        user_id,
        lab_id
      })
    } catch (e) {
      return res.status(404).send('Patient was tagged but system failed to create log')
    }

    return res.status(200).send()
  },
  async untagPatient(req, res) {
    const { user_id, lab_id } = req.body

    const auth = await connection('labs_users').select('id').where({
      lab_id,
      user_id
    }).first()

    if (auth == null) {
      return res.status(403).send('you dont have the authorisation to do this')
    }

    try {
      await connection('users').where('id', user_id).update({
        infected: false
      })
    } catch (e) {
      return res.status(404).send('user not found')
    }

    try {
      await connection('tag_log').insert({
        tagged: false,
        user_id,
        lab_id
      })
    } catch (e) {
      return res.status(404).send('Patient was tagged but system failed to create log')
    }

    return res.status(200).send()
  }
}