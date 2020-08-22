// Creating our School model
module.exports = function(sequelize, DataTypes) {
  const School = sequelize.define("School", {
    acaraSMLID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    },
    schoolName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    latitude: {
      type: DataTypes.DECIMAL(10, 6),
      allowNull: false
    },
    longitude: {
      type: DataTypes.DECIMAL(10, 6),
      allowNull: false
    },
    schoolType: {
      type: DataTypes.STRING,
      allowNull: false
    },
    schoolSector: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  return School;
};
