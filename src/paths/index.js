// const API_SERVER ='http://localhost:8080';
const API_SERVER = 'https://intospace.kr';
export const Paths = {
    index: '/',
    main: {
        index: '/main',
        detail: '/detail',
        payment: '/payment',
        payment_complete: '/payment_complete',
        use: {
            index: '/use',
            list: '/use/list',
            detail: '/use/detail',
            cancel: '/use/cancel',
            extend: '/use/extend',
        },
        review: {
            index: '/review',
            list: '/review/list',
            write: '/review/write',
            detail: '/review/detail',
        },
        mypage: {
            index: '/mypage',
            point: '/mypage/point',
            update: {
                index: '/mypage/update',
                name: '/mypage/update/name',
                password: '/mypage/update/password',
                hp: '/mypage/update/hp',
                enrollment: '/mypage/update/enrollment',
                birthday: '/mypage/update/birthday',
                profile: '/mypage/update/profile',
            },
            withdraw: '/mypage/withdraw',
        },
        parking: {
            index: '/parking',
            manage: '/parking/manage',
            enrollment: '/parking/enrollment',
        },
        notification: '/notification',
        setting: '/setting',
        coupon: '/coupon',
        event: {
            index: '/event',
            list: '/event/list',
            detail: '/event/detail',
        },
        support: {
            index: '/support',
            notice: '/support/notice',
            notice_detail: '/support/notice_detail',
            faq: '/support/faq',
            qna: '/support/qna',
            qna_detail: '/support/qna_detail',
            qna_write: '/support/qna_write',
        },
    },
    auth: {
        index: '/auth',
        login: '/auth/login',
        signin: '/auth/signin',
        signup: '/auth/signup',
        enrollment: '/auth/enrollment',
        sign_complete: '/auth/sign_complete',
        find: {
            index: '/auth/find',
            email: '/auth/find/email',
            password: '/auth/find/password',
            email_complete: '/auth/find/email_complete',
            password_complete: '/auth/find/password_complete',
        },
    },
    api: API_SERVER + '/api/',
    storage: API_SERVER + '/uploads/',
};

export const HeaderTitle = {
    main: {
        index: '/',
        detail: '/detail',
        payment: '결제정보 확인',
        payment_complete: '/payment_complete',
        use: {
            index: '',
            list: '이용 내역',
            detail: '',
            cancel: '',
            extend: '연장 신청',
        },
        review: {
            index: '/review',
            list: '내가 작성한 리뷰',
            write: '리뷰 쓰기',
            detail: '리뷰 상세보기',
        },
        mypage: {
            index: '내 정보 수정',
            point: '',
            update: {
                index: '',
                name: '이름 변경',
                password: '비밀번호 변경',
                hp: '연락처 변경',
                enrollment: '차량정보 등록',
                birthday: '생년월일 변경',
                profile: '',
            },
            withdraw: '회원 탈퇴',
        },
        parking: {
            index: '',
            manage: '내 주차공간 관리',
            enrollment: '주차공간 등록',
            preview: '/parking/preview',
        },
        notification: '알림함',
        setting: '환경설정',
        coupon: '쿠폰',
        event: {
            index: '',
            list: '이벤트',
            detail: '이벤트',
        },
        support: {
            index: '',
            notice: '고객센터',
            notice_detail: '고객센터',
            faq: '고객센터',
            qna: '고객센터 ',
            qna_detail: '고객센터',
            qna_write: '1:1 문의 작성',
        },
    },
    auth: {
        index: '',
        login: '',
        signin: '로그인',
        signup: '회원가입',
        enrollment: '차량번호 등록',
        sign_complete: '회원가입 완료',
        find: {
            index: '아이디/비밀번호 찾기',
            email: '아이디 찾기',
            password: '비밀번호 찾기',
            email_complete: '',
            password_complete: '비밀번호 재설정',
        },
    },
};
