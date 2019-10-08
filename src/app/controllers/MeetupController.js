import * as Yup from 'yup';
import { isBefore, parseISO } from 'date-fns';
import Meetup from '../models/Meetup';
import User from '../models/User';

class MeetupController {
  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      description: Yup.string().required(),
      location: Yup.string().required(),
      date: Yup.date().required(),
      file_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ message: 'Validation fails' });
    }

    const { date } = req.body;

    const parsedDate = parseISO(date);

    if (isBefore(parsedDate, new Date())) {
      return res
        .status(400)
        .json({ error: 'You cannot create meetups in past date' });
    }

    const meetup = await Meetup.create({
      ...req.body,
      user_id: req.userId,
    });

    return res.json(meetup);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string(),
      description: Yup.string(),
      location: Yup.string(),
      date: Yup.date(),
      file_id: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ message: 'Validation fails' });
    }

    const meetup = await Meetup.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'email'],
        },
      ],
    });

    if (req.userId !== meetup.user.id) {
      return res
        .status(401)
        .json({ error: 'You can only update meetups you created' });
    }

    if (meetup.past) {
      return res.status(400).json({
        error: 'You cannot update past meetups',
      });
    }

    const { id, title, description, file_id } = await meetup.update(req.body);

    return res.json({
      id,
      title,
      description,
      file_id,
    });
  }

  async delete(req, res) {
    const { id } = req.params;

    const meetup = await Meetup.findByPk(id, {
      include: [
        {
          model: User,
          as: 'user',
        },
      ],
    });

    if (!meetup) {
      return res.status(400).json({ error: 'Meetup does not exist' });
    }

    const date = parseISO(meetup.date);

    if (isBefore(date, new Date())) {
      return res
        .status(400)
        .json({ error: 'You cannot cancel meetups that already happened' });
    }

    if (meetup.user.id !== req.userId) {
      return res
        .status(401)
        .json({ error: 'You can only cancel your own meetups' });
    }

    await meetup.destroy();

    return res.send();
  }
}

export default new MeetupController();
