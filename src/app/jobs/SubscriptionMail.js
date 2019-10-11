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
    // const { organizer } = data;
    // await Mail.sendMail({});
    console.log(data);
  }
}

export default new SubscriptionMail();
