const connection = require('../Database/connection')
const knexfile = require('../../knexfile')
const knex = require('knex')(knexfile.development)

module.exports = {
  async create(req, res) {
    const { name, email, password, adress } = req.body

    try {
      const id = await connection('users').insert({
        name,
        email,
        password,
        adress
      })
      return res.status(201).json({ id: id[0] })
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
    const { id } = req.params

    const establishments = await connection('log')
      .join('establishments', 'log.establishment_id', '=', 'establishments.id')
      .where('log.user_id', id)
      .select('log.id', 'establishments.name', 'establishments.adress', 'log.check_in_time', 'log.check_out_time', 'establishments.risk')

    return res.json(establishments)
  },

  async getInfo(req, res) {
    const { id } = req.params

    const info = await connection('users').select('name', 'email', 'adress', 'infected').where('id', id).first()

    return res.json(info)
  },
  async authoriseLab(req, res) {
    const { lab_id, user_id } = req.body

    try {
      await connection('lab_user').insert({
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
      await connection('lab_user').delete({
        user_id,
        lab_id
      })
    } catch (e) {
      return res.status(400).send('couldnt unathorise the lab')
    }

    return res.status(202).send()
  },

  async checkIn(req, res) {
    const { user_id, establishment_id } = req.body

    try {
      const id = await connection('log').insert({
        user_id,
        establishment_id
      })
      return res.json({ checkIn_id: id[0] })
    } catch (e) {
      return res.status(400).send('couldnt check in')
    }
  },

  async checkOut(req, res) {
    const { id } = req.body


    await connection('log').where('id', id).update({
      check_out_time: knex.raw('CURRENT_TIMESTAMP')
    })

    return res.status(200).send()
  },
  async getLabs(req, res) {
    const { id } = req.params

    const labs = await connection('lab_user').join('labs', 'labs.id', '=', 'lab_user.lab_id')
      .where('lab_user.user_id', id).select('labs.name', 'labs.id')

    return res.json(labs)
  }
}