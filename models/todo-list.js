module.exports = function(sequelize, DataTypes) {
    const Todos = sequelize.define("Todo", {
      todo: {
        type: DataTypes.STRING,
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
    return Todos;
  };