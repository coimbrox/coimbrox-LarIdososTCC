const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {
  //listar
  async index(request, response) {
    const ongs = await connection('ongs').select('*');

    return response.json(ongs);

  },

  //criar
  async create(request, response) {
    const { nome, email, whatsapp, cidade, uf } = request.body;

    //gerar caracteres aleatorios para o id
    const id = crypto.randomBytes(4).toString('hex');

    //conexão
    await connection('ongs').insert({
      id,
      nome,
      email,
      whatsapp,
      cidade,
      uf,
    })

    return response.json({ id });
  }


}