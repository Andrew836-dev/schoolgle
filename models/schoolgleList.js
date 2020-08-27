// Creating our SchoolgleList model

module.exports = function(sequelize) {
  // const School = sequelize.define("School", {
  //   acaraSMLID: {
  //     type: DataTypes.INTEGER,
  //     allowNull: false,
  //     unique: true
  //   },
  //   ageID: {
  //     type: DataTypes.INTEGER,
  //     allowNull: false
  //   },
  //   schoolName: {
  //     type: DataTypes.STRING,
  //     allowNull: false
  //   },
  //   suburb: {
  //     type: DataTypes.STRING,
  //     allowNull: false
  //   },
  //   state: {
  //     type: DataTypes.STRING,
  //     allowNull: false
  //   },
  //   postcode: {
  //     type: DataTypes.INTEGER,
  //     allowNull: false
  //   },
  //   schoolSector: {
  //     type: DataTypes.STRING,
  //     allowNull: false
  //   },
  //   schoolType: {
  //     type: DataTypes.STRING,
  //     allowNull: false
  //   },
  //   campusType: {
  //     type: DataTypes.STRING,
  //     allowNull: false
  //   },
  //   reportingType: {
  //     type: DataTypes.STRING,
  //     allowNull: false
  //   },
  //   latitude: {
  //     type: DataTypes.DECIMAL(10, 6),
  //     allowNull: false
  //   },
  //   longitude: {
  //     type: DataTypes.DECIMAL(10, 6),
  //     allowNull: false
  //   },
  //   remotenessCode: {
  //     type: DataTypes.INTEGER,
  //     allowNull: false
  //   },
  //   remotenessName: {
  //     type: DataTypes.STRING,
  //     allowNull: false
  //   },
  //   meshBlock: {
  //     type: DataTypes.BIGINT,
  //     allowNull: false
  //   },
  //   statisticArea1: {
  //     type: DataTypes.BIGINT,
  //     allowNull: false
  //   },
  //   statisticArea2: {
  //     type: DataTypes.BIGINT,
  //     allowNull: false
  //   },
  //   statisticArea2Name: {
  //     type: DataTypes.STRING,
  //     allowNull: false
  //   },
  //   statisticArea3: {
  //     type: DataTypes.INTEGER,
  //     allowNull: false
  //   },
  //   statisticArea3Name: {
  //     type: DataTypes.STRING,
  //     allowNull: false
  //   },
  //   statisticArea4: {
  //     type: DataTypes.INTEGER,
  //     allowNull: false
  //   },
  //   statisticArea4Name: {
  //     type: DataTypes.STRING,
  //     allowNull: false
  //   },
  //   localGovernmentArea: {
  //     type: DataTypes.INTEGER,
  //     allowNull: false
  //   },
  //   localGovernmentAreaName: {
  //     type: DataTypes.STRING,
  //     allowNull: false
  //   },
  //   schoolURL: {
  //     type: DataTypes.STRING,
  //     defaultValue: ""
  //   },
  //   governingBody: {
  //     type: DataTypes.STRING,
  //     defaultValue: ""
  //   },
  //   governingBodyURL: {
  //     type: DataTypes.STRING,
  //     defaultValue: ""
  //   },
  //   yearRange: {
  //     type: DataTypes.STRING,
  //     defaultValue: ""
  //   },
  //   ICSEA: {
  //     type: DataTypes.INTEGER,
  //     defaultValue: 0
  //   },
  //   ICSEAPercent: {
  //     type: DataTypes.INTEGER,
  //     defaultValue: 0
  //   },
  //   bottomSEA: {
  //     type: DataTypes.INTEGER,
  //     defaultValue: 0
  //   },
  //   lowerMiddleSEA: {
  //     type: DataTypes.INTEGER,
  //     defaultValue: 0
  //   },
  //   upperMiddleSEA: {
  //     type: DataTypes.INTEGER,
  //     defaultValue: 0
  //   },
  //   topSEA: {
  //     type: DataTypes.INTEGER,
  //     defaultValue: 0
  //   },
  //   teachingStaff: {
  //     type: DataTypes.INTEGER,
  //     defaultValue: 0
  //   },
  //   teachingStaffFTE: {
  //     type: DataTypes.FLOAT,
  //     defaultValue: 0
  //   },
  //   nonTeachingStaff: {
  //     type: DataTypes.INTEGER,
  //     defaultValue: 0
  //   },
  //   nonTeachingStaffFTE: {
  //     type: DataTypes.FLOAT,
  //     defaultValue: 0
  //   },
  //   enrolmentsTotal: {
  //     type: DataTypes.INTEGER,
  //     defaultValue: 0
  //   },
  //   enrolmentsGirls: {
  //     type: DataTypes.INTEGER,
  //     defaultValue: 0
  //   },
  //   enrolmentsBoys: {
  //     type: DataTypes.INTEGER,
  //     defaultValue: 0
  //   },
  //   enrolmentsFTE: {
  //     type: DataTypes.FLOAT,
  //     defaultValue: 0
  //   },
  //   enrolmentsIndigenous: {
  //     type: DataTypes.INTEGER,
  //     defaultValue: 0
  //   },
  //   enrolmentsLOTE: {
  //     type: DataTypes.INTEGER,
  //     defaultValue: 0
  //   }
  // });
  // const User = sequelize.define("User", {
  //   // The email cannot be null, and must be a proper email before creation
  //   email: {
  //     type: DataTypes.STRING,
  //     allowNull: false,
  //     unique: true,
  //     validate: {
  //       isEmail: true
  //     }
  //   },
  //   // The password cannot be null
  //   password: {
  //     type: DataTypes.STRING,
  //     allowNull: false
  //   },
  //   firstName: {
  //     type: DataTypes.STRING,
  //     allowNull: false
  //   },
  //   lastName: {
  //     type: DataTypes.STRING,
  //     defaultValue: ""
  //   },
  //   address: {
  //     type: DataTypes.STRING,
  //     defaultValue: ""
  //   },
  //   suburb: {
  //     type: DataTypes.STRING,
  //     defaultValue: ""
  //   },
  //   state: {
  //     type: DataTypes.STRING,
  //     allowNull: false
  //   },
  //   postcode: {
  //     type: DataTypes.STRING,
  //     allowNull: false
  //   },
  //   roleID: {
  //     type: DataTypes.INTEGER,
  //     defaultValue: 200
  //   },
  //   schoolgleList: {
  //     type: DataTypes.STRING,
  //     defaultValue: ""
  //   }
  // });
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
  // User.belongsToMany(School, { through: "SchoolgleList" });
  // School.belongsToMany(User, { through: "SchoolgleList" });

  SchoolgleList.associate = function(models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
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
