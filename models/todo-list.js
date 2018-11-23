module.exports = function(sequelize, DataTypes) {
    var Todos = sequelize.define("Todo", {
      body: {
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