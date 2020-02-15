// 라우터를 정의해줌, 링크에 탬플릿 파일을 맵핑하고 템플릿 엔진에서 사용할 데이터들을 내려준다
const express = require('express');

// 로그인 여부에 따라 라우팅 분기
const { isLoggedIn, isNotLoggenIn } = require('./middlewares');
const router = express.Router();

// 중간에 미들웨어를 끼워놓을 수 있다. 요청하면 콜백처럼 함수 실행

// 여기는 로그인 여부에 따라 분기되는 것
router.get('/profile', isLoggedIn, (req, res) => {
  res.render('profile', { title: '내 정보 - NodeBird', user: req.user });
});

// 회원가입은 로그인 상태가 없을때 접근 가능하게
router.get('/join', isNotLoggenIn, (req, res) => {
  res.render('join', {
    title: '회원가입 - NodeBird',
    user: req.user,
    joinError: req.flash('joinError'),
  });
});

router.get('/', (req, res, next) => {
  res.render('main', {
    title: 'NodeBird',
    // 게시글 배열
    twits: [],
    user: req.user,
    loginError: req.flash('loginError'),
  });
});

module.exports = router;