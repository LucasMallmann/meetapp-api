class UserController {
  async index(req, res) {
    return res.json('oi');
  }

  async store(req, res) {
    return res.json({ message: 'stored' });
  }
}

export default new UserController();
