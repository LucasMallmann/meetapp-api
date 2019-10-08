import Sequelize, { Model } from 'sequelize';

class Subscription extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        description: Sequelize.STRING,
        location: Sequelize.STRING,
        date: Sequelize.DATE,
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    this.hasMany(models.User, { foreignKey: 'file_id', as: 'wallpaper' });
    this.hasMany(models.User, { foreignKey: 'user_id', as: 'user' });
  }
}

export default Subscription;
