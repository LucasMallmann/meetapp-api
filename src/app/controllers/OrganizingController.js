import Meetup from '../models/Meetup';
import File from '../models/File';
import User from '../models/User';

class OrganizingController {
  async list(req, res) {
    const meetups = await Meetup.findAll({
      where: {
        user_id: req.userId,
      },
      include: [
        {
          model: File,
          as: 'wallpaper',
          attributes: ['id', 'url', 'path'],
        },
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'email'],
        },
      ],
    });

    return res.json(meetups);
  }
}

export default new OrganizingController();
