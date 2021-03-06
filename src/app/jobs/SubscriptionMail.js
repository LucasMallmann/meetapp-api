import Mail from '../../lib/Mail';

class SubscriptionMail {
  get key() {
    return 'SubscriptionMail';
  }

  /**
   * The handle method will be executed when this job is called
   * @param {Object} data
   */
  async handle({ data }) {
    const { user, organizer, meetup } = data;

    // setTimeout(() => console.log(data), 2000);
    await Mail.sendMail({
      to: 'Lucas Mallmann <lucasmallmann@email.com>',
      subject: 'Inscrição confirmada',
      template: 'subscription',
      context: {
        organizer: organizer.name,
        user: user.name,
        meetup: meetup.title,
      },
    });
  }
}

export default new SubscriptionMail();
