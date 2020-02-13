// 모델 관계 정의하는 index.js

const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];

// 큰 하나의 db가 객체이고, 프로퍼티로 테이블이 들어간다
const db = {};

// 여긴 무슨의미지
const sequelize = new Sequelize(
  config.database, config.username, config.password, config,
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// 테이블 불러오기
db.User = require('./user')(sequelize, Sequelize);
db.Post = require('./post')(sequelize, Sequelize);
db.Hashtag = require('./hashtag')(sequelize, Sequelize);

// 1:n 관계 정의, post 테이블에 usedId 칼럼을 추가
db.User.hasMany(db.Post);
db.Post.belongsTo(db.User);

// n:m 관계 정의, post와 해시태그 모델
// 게시글 하나는 해시태그 여러개, 해시태그도 게시글 여러개
// 장고처럼 다대다 관계에서는 중간에 관계 테이블이 생성되는데, through로 인자를 준다
// 이경우에는 PostHashtag라는 매개 테이블에 postid와 hashTagid라는 칼럼을 자동으로 생성한다
db.Post.belongsToMany(db.Hashtag, { through: 'PostHashtag' });
db.Hashtag.belongsToMany(db.Post, { through: 'PostHashtag' });

// 같은 테이블끼리도 다대다 관계를 가질 수 있음, 팔로잉 기능이 그런데
// 사용자 한명이 팔로워를 여러 명 가질수도 있고, 여러명을 팔로잉할 수도 있음 - 유저와 유저 사이의 n:m관계
// 같은 테이블의 n:m관계에서는 모델 이름과 컬럼 이름을 따로 정해주어야 함 - through옵션
db.User.belongsToMany(db.User, {
  // 외래키를 줘서 두 테이블의 userid를 식별한다
  foreignKey: 'followingId',
  // join작업에 사용하는 이름, 이를 바탕으로 메서드를 자동으로 추가하게 됨
  as: 'Followers',
  through: 'Follow',
});
db.User.belongsToMany(db.User, {
  foreignKey: 'followerId',
  as: 'Followings',
  through: 'Follow',
});

//총 테이블은 모두 5개 (user, hashtag, post와 through테이블 posthashtag, follow)
module.exports = db;