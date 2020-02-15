const local = require('./localStrategy');
const kakao = require('./kakaoStrategy');
const { User } = require('../models');

module.exports = (passport) => {
  // req.session 객체에 어떤 데이터를 저장할지 선택
  // 매개변수로 user을 받아서 done함수에 두번째 인자로 user.id 넘김
  // 세션에 user.id만 저장하는 것
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    // 매 요청시 실행
    // passport.session 미들웨어가 이 메서드를 호출함
    // 좀 전에 serialise user에서 세션에 저장했던 아이디를 받아 데이터베이스에서 사용자 정보 조회
    // 조회한 정보를 req.user에 저장, 앞으로 req.user를 통해 로그인한 사용자의 정보를 가져올 수 있음
    User.find({ where: { id } })
      .then(user => done(null, user))
      .catch(err => done(err));
  });


  // 정보 객체를 세션에 아이디로 저장,
  // 세션에 저장한 아이디를 통해 사용자 정보 객체를 불러옴
  local(passport);
  kakao(passport);
};