module.exports = (sequelize, Sequelize) => {
    const artikel = sequelize.define("artikel", {
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING
      }
    });
  
    return artikel;
  };
  