const connection = require('../Database/connection')

module.exports = {
  async create(req, res) {
    const { cnpj, name, password, adress } = req.body

    try {
      const id = await connection('labs').insert({
        cnpj,
        name,
        password,
        adress
      })
      return res.status(201).json({ id: id[0] })
    } catch (e) {
      return res.status(400).send('couldnt create lab')
    }
  },

  async getInfo(req, res) {
    const { id } = req.params

    const info = await connection('labs').select('*').where('id', id)

    return res.json(info)
  },

  async login(req, res) {
    const { cnpj, password } = req.body

    const id = await connection('labs').select('id').where({
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

    const auth = await connection('lab_user').select('id').where({
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
      await connection('user_tag_log').insert({
        tagged: true,
        user_id,
        lab_id
      })
      const userLogs = await connection('log')
        .join('establishments', 'log.establishment_id', '=', 'establishments.id')
        .where('log.user_id', user_id)
        .select('establishments.id')

      userLogs.map(async log => {
        await connection('establishments').where('id', log.id).update({
          risk: true
        })
        await connection('est_tag_log').insert({
          tagged: true,
          establishment_id: log.id,
          lab_id: lab_id
        })
      })
    } catch (e) {
      return res.status(404).send('Patient was tagged but system failed to create log')
    }

    return res.status(200).send()
  },
  async untagPatient(req, res) {
    const { user_id, lab_id } = req.body

    const auth = await connection('lab_user').select('id').where({
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
      await connection('user_tag_log').insert({
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