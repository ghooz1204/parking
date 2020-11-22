import React from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import './App.scss';
import AuthPage from './pages/AuthPage';
import MainPage from './pages/MainPage';
import ErrorPage from './pages/ErrorPage';

// import DialogContainer from './containers/assets/DialogContainer';
// import LoadingContainer from './containers/assets/LoadingContainer';

import Header from './components/header/Header';

import { Paths, HeaderTitle } from './paths';

const App = () => {
    const location = useLocation();

    const renderHeader = () => {
        const { pathname } = location;

        // 로그인
        if (pathname === Paths.auth.signin) {
            return <Header title={HeaderTitle.auth.signin} />;
        }
        // 회원가입
        else if (pathname === Paths.auth.signup) {
            return <Header title={HeaderTitle.auth.signup} />;
        }
        // 회원가입 완료
        else if (pathname === Paths.auth.sign_complete) {
            return <Header title={HeaderTitle.auth.sign_complete} />;
        }
        // 결제정보 확인
        else if (pathname === Paths.main.payment.index) {
            return <Header title={HeaderTitle.main.payment.index} />;
        }
        // 결제정보 확인
        else if (pathname === Paths.main.payment.enrollment) {
            return <Header title={HeaderTitle.main.payment.enrollment} />;
        }
        // 적용 쿠폰 선택
        else if (pathname === Paths.main.payment.coupon) {
            return <Header title={HeaderTitle.main.payment.coupon} />;
        }
        // 결제 수단 선택
        else if (pathname === Paths.main.payment.type) {
            return <Header title={HeaderTitle.main.payment.type} />;
        }
        // 차량번호 등록
        else if (pathname === Paths.auth.enrollment) {
            return <Header title={HeaderTitle.auth.enrollment} />;
        }
        // 아이디/비밀번호 찾기
        else if (pathname === Paths.auth.find.index) {
            return <Header title={HeaderTitle.auth.find.index} />;
        }
        // 이용 내역
        else if (pathname === Paths.main.use.list) {
            return <Header title={HeaderTitle.main.use.list} />;
        } else if (pathname === Paths.main.use.extend) {
            return <Header title={HeaderTitle.main.use.extend} />;
        }
        // 내가 작성한 리뷰
        else if (pathname === Paths.main.review.list) {
            return <Header title={HeaderTitle.main.review.list} />;
        }
        // 리뷰 쓰기
        else if (pathname === Paths.main.review.write) {
            return <Header title={HeaderTitle.main.review.write} />;
        }
        // 리뷰 상세 보기
        else if (pathname === Paths.main.review.detail) {
            return <Header title={HeaderTitle.main.review.detail} />;
        }
        // 내 주차공간 관리
        else if (pathname === Paths.main.parking.manage) {
            return <Header title={HeaderTitle.main.parking.manage} />;
        }
        // 주차공간 등록
        else if (pathname === Paths.main.parking.enrollment) {
            return <Header title={HeaderTitle.main.parking.enrollment} />;
        }

        //알림함
        else if (pathname === Paths.main.notification) {
            return <Header title={HeaderTitle.main.notification} />;
        }
        //쿠폰
        else if (pathname === Paths.main.coupon) {
            return <Header title={HeaderTitle.main.coupon} />;
        }
        //이벤트 리스트
        else if (pathname === Paths.main.event.list) {
            return <Header title={HeaderTitle.main.event.list} />;
        }
        //이벤트 상세보기
        else if (pathname === Paths.main.event.detail) {
            return <Header title={HeaderTitle.main.event.detail} />;
        }
        //내 정보 수정
        else if (pathname === Paths.main.mypage.index) {
            return <Header title={HeaderTitle.main.mypage.index} />;
        }
        //이름 변경
        else if (pathname === Paths.main.mypage.update.name) {
            return <Header title={HeaderTitle.main.mypage.update.name} />;
        }
        //비밀번호 변경
        else if (pathname === Paths.main.mypage.update.password) {
            return <Header title={HeaderTitle.main.mypage.update.password} />;
        }
        //연락처 변경
        else if (pathname === Paths.main.mypage.update.hp) {
            return <Header title={HeaderTitle.main.mypage.update.hp} />;
        }
        //차량정보 등록
        else if (pathname === Paths.main.mypage.update.enrollment) {
            return <Header title={HeaderTitle.main.mypage.update.enrollment} />;
        }
        //생년월일 변경
        else if (pathname === Paths.main.mypage.update.birthday) {
            return <Header title={HeaderTitle.main.mypage.update.birthday} />;
        }
        //회원 탈퇴
        else if (pathname === Paths.main.mypage.withdraw) {
            return <Header title={HeaderTitle.main.mypage.withdraw} />;
        }
        //환경설정
        else if (pathname === Paths.main.setting) {
            return <Header title={HeaderTitle.main.setting} />;
        }
    };

    return (
        <div className="App">
            {renderHeader()}
            <Switch className="test">
                <Route path={Paths.auth.index} component={AuthPage} />
                <Route path={Paths.index} component={MainPage} />
                <Route component={ErrorPage} />
            </Switch>
        </div>
    );
};

export default App;
