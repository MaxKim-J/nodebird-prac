// js파일 하나가 하나의 테이블, 여기는 유저 테이블
// django orm과 비슷하다

module.exports = (sequelize, DataTypes) => (
  sequelize.define('user', {
    email: {
      type: DataTypes.STRING(40),
      allowNull: true,
      unique: true,
    },
    nick: {
      type: DataTypes.STRING(15),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    provider: {
      type: DataTypes.STRING(10),
      allowNull: false,
      // 로컬 로그인 상태 정의
      defaultValue: 'local',
    },
    snsId: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
  }, {
    // 기본 칼럼설정 - createdAt, updatedAt, deletedAt
    timestamps: true,
    paranoid: true,
  })
);