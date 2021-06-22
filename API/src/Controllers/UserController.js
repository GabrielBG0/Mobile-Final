const connection = require('../Database/conection')

module.exports = {
  async create(req, res) {
    const { name, email, password, adress } = req.body

    try {
      const id = await connection('users').insert({
        name,
        email,
        password,
        adress
      }).returning('id')

      return res.status(201).json(id)
    } catch (e) {
      return res.status(400).send('couldnt create user')
    }
  },

  async login(req, res) {
    const { email, password } = req.body

    const id = await connection('users').select('id').where({
      email,
      password
    }).first()

    if (id == null) {
      return res.status(404).send('user not found')
    }

    return res.json(id)
  },

  async getEstablishmentsStatus(req, res) {
    const { user_id } = req.body

    const establishments = await connection('log')
      .join('establishments', 'log.establishment_id', '=', 'establishments.id')
      .where('log.user_id', user_id)
      .select('establishments.*', 'log.check_in_time', 'log.check_out_time')

    return res.json(establishments)
  },

  async getInfo(req, res) {
    const { id } = req.params

    const info = await connection('users').select('*').where('id', id)

    return res.json(info)
  },
  async authoriseLab(req, res) {
    const { lab_id, user_id } = req.body

    try {
      await connection('labs_users').insert({
        user_id,
        lab_id
      })
    } catch (e) {
      return res.status(400).send('couldnt athorise the lab')
    }

    return res.status(202).send()
  },

  async unauthoriseLab(req, res) {
    const { lab_id, user_id } = req.body

    try {
      await connection('labs_users').delete({
        user_id,
        lab_id
      })
    } catch (e) {
      return res.status(400).send('couldnt unathorise the lab')
    }

    return res.status(202).send()
  }
}