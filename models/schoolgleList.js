// Creating our SchoolgleList model

module.exports = function(sequelize) {
  const SchoolgleList = sequelize.define("SchoolgleList", {
    // schoolID: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false
    //   // references: {
    //   //   model: School, // 'school' refers to table name
    //   //   key: "id" // 'id' refers to column name in school table
    //   // }
    // },
    // userID: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false
    // references: {
    //   model: User, // 'User' refers to table name
    //   key: "id" // 'id' refers to column name in User table
    // }
    // }
  });

  SchoolgleList.associate = function(models) {
    SchoolgleList.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
    SchoolgleList.belongsTo(models.School, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return SchoolgleList;
};
