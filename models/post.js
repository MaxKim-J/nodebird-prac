// 게시글 테이블

module.exports = (sequelize, DataTypes) => (
  // 게시글 내용과 이미지 경로 저장
  sequelize.define('post', {
    content: {
      type: DataTypes.STRING(140),
      allowNull: false,
    },
    img: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
  }, {
    timestamps: true,
    paranoid: true,
  })
);