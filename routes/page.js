// 라우터를 정의해줌, 링크에 탬플릿 파일을 맵핑하고 템플릿 엔진에서 사용할 데이터들을 내려준다

const express = require('express');

const router = express.Router();

router.get('/profile', (req, res) => {
  res.render('profile', { title: '내 정보 - NodeBird', user: null });
});

router.get('/join', (req, res) => {
  res.render('join', {
    title: '회원가입 - NodeBird',
    user: null,
    joinError: req.flash('joinError'),
  });
});

router.get('/', (req, res, next) => {
  res.render('main', {
    title: 'NodeBird',
    // 게시글 배열
    twits: [],
    user: null,
    loginError: req.flash('loginError'),
  });
});

module.exports = router;