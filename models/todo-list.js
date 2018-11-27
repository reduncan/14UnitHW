module.exports = function(sequelize, DataTypes) {
    const Todo = sequelize.define("Todo", {
      todo: {
        type: DataTypes.STRING(140),
        allowNull: false,
        validate: {
          len: [1,140]
        }
      },
      complete: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    });
    return Todo;
  };