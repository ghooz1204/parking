import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import classnames from 'classnames/bind';
import { ButtonBase, Backdrop, makeStyles } from '@material-ui/core';
/* Library */

import InputBox from '../../../components/inputbox/InputBox';
import BasicButton from '../../../components/button/BasicButton';
/* Components */

import styles from './MyPointContainer.module.scss';
import XIcon from '../../../static/asset/svg/X_button';
/* stylesheets */

import useInput from '../../../hooks/useInput';
import { useDialog } from '../../../hooks/useDialog';
import useToken from '../../../hooks/useToken';
/* Hooks */

import { getFormatDateDetailTime } from '../../../lib/calculateDate';
import { numberFormat } from '../../../lib/formatter';
/* Lib */

import { updateUser } from '../../../store/user';
/* Store */

import { Paths } from '../../../paths';
/* Paths */

import { requestGetMyPoint } from '../../../api/point';
import { requestPostWithdraw } from '../../../api/withdraw';
/* api */

const cn = classnames.bind(styles);
const card = [
    'KB국민은행',
    '신한은행',
    '하나은행',
    '우리은행',
    'IBK기업은행',
    'NH농협은행',
    'KDB산업은행',
    'SC제일은행',
];

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: "#fff",
        height: "100vh",
    },
}));

const WithdrawModal = ({ click, setClick, point }) => {

    const classes = useStyles();
    const openDialog = useDialog();
    const reduxDispatch = useDispatch();

    const [bank, onChangeBank] = useInput('');
    const [account, onChangeAccount] = useInput('');
    const [price, onChangePrice] = useInput('');

    const withdrawPrice = useRef();
    const [check, setCheck] = useState(false);

    const onClickButton = useCallback(async () => {
        const JWT_TOKEN = localStorage.getItem('user_id');
        if (parseInt(price) <= 0) {
            openDialog("0포인트 이하 액수를 출금할 수 없습니다.");
        }
        const response = await requestPostWithdraw(JWT_TOKEN, bank, account, price);
        if (response.msg === 'success') {
            reduxDispatch(updateUser('point', point - price));
            openDialog("출금이 완료되었습니다.", "", () => { setClick(false); onChangeBank(); onChangeAccount(); onChangePrice(); });
        } else {
            openDialog(response.msg);
        }
    }, [bank, account, price, openDialog, setClick, onChangeBank, onChangeAccount, onChangePrice, point, reduxDispatch]);

    useEffect(() => {
        if (account && price) setCheck(true);
        else setCheck(false);
    }, [account, price])

    return (
        <>
            <div className={cn('withdraw-container', { on: click })}>
                <div className={styles['withdraw-wrap']}>
                    <div className={styles['withdraw-text']}>출금 신청</div>
                </div>
                <div className={styles['account-wrap']}>
                    <div className={styles['account-text']}>계좌 정보</div>
                    <div className={styles['account-area']}>
                        <div className={styles['account-select']}>
                            <select className={styles['select']} onChange={onChangeBank} defaultValue={'defalut'}>
                                <option disabled value='defalut'>은행 선택</option>
                                {card.map((item) => (
                                    <option key={item}>{item}</option>
                                ))}
                            </select>
                        </div>
                        <div className={styles['account-text']}>
                            <InputBox
                                className={'input-box'}
                                type={'text'}
                                value={account}
                                placeholder={'계좌번호 입력'}
                                onChange={onChangeAccount}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') withdrawPrice.current.focus();
                                }}
                            />
                        </div>
                    </div>
                </div>
                <div className={styles['price-wrap']}>
                    <div className={styles['price-text']}>출금 금액</div>
                    <div className={styles['price-area']}>
                        <InputBox
                            className={'input-box'}
                            type={'number'}
                            value={price}
                            onChange={onChangePrice}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') onClickButton();
                            }}
                            reference={withdrawPrice}
                        />
                        <span>원</span>
                    </div>
                </div>
                <BasicButton button_name="출금 신청" disable={!check} onClick={onClickButton} />
            </div>
            <Backdrop className={classes.backdrop} open={click} onClick={() => { setClick(!click); onChangeBank(); onChangeAccount(); onChangePrice(); }} />
        </>
    )
}

const PointItem = ({ item }) => {
    const { use_type, updatedAt, point_text, use_point } = item;
    return (
        <>
            {!use_type
                ? <div className={styles['point-wrap']}>
                    <div className={cn('status-text', 'plus')}>적립</div>
                    <div className={styles['time']}>{getFormatDateDetailTime(updatedAt)}</div>
                    <div className={styles['text']}>{point_text}<span></span></div>
                    <div className={cn('point', 'plus')}>+ {numberFormat(use_point)}P</div>
                </div>
                : <div className={styles['point-wrap']}>
                    <div className={cn('status-text', 'minus')}>차감</div>
                    <div className={styles['time']}>{getFormatDateDetailTime(updatedAt)}</div>
                    <div className={styles['text']}>출금신청 <span>{point_text}</span></div>
                    <div className={cn('point', 'minus')}>- {numberFormat(use_point)}P</div>
                </div>
            }
        </>
    );
};


const MyPointContainer = () => {

    const history = useHistory();
    const TOKEN = useToken();

    const getUserInfo = useSelector(state => state.user);

    const allPointList = useRef([]);
    const dataLength = useRef(0);

    const [click, setClick] = useState(false);
    const [pointList, setPointList] = useState([]);

    const fetchPointList = useCallback(() => {
        const allLength = allPointList.current.length;
        const length = dataLength.current;
        if (length >= allLength) return;

        const fetchData = allPointList.current.slice(length, length + 10);
        setPointList((pointList) => pointList.concat(fetchData));
        dataLength.current += 10;
    }, []);

    useEffect(() => {
        if (TOKEN !== null) {
            const handleScroll = () => {
                const endPoint =
                    Math.ceil(
                        window.innerHeight + document.documentElement.scrollTop,
                    ) === document.documentElement.offsetHeight;
                if (endPoint) {
                    fetchPointList();
                }
            };

            window.addEventListener('scroll', handleScroll);
            const getPointList = async () => {
                const JWT_TOKEN = localStorage.getItem('user_id');
                const response = await requestGetMyPoint(JWT_TOKEN);
                allPointList.current = response;
                fetchPointList();
            }
            getPointList();
            return () => window.removeEventListener('scroll', handleScroll);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            {TOKEN !== null &&
                <>
                    <div className={styles['container']}>
                        <div className={styles['fixed']}>
                            <div className={styles['show-area']}>
                                <div className={styles['button']}>
                                    <ButtonBase component='div' className={styles['btn']} onClick={() => history.replace(Paths.main.index)}>
                                        <XIcon />
                                    </ButtonBase>
                                </div>
                                <div className={styles['content']}>
                                    <div className={styles['mypoint']}>나의 수익금</div>
                                    <div className={styles['total_point']}>{numberFormat(getUserInfo.point)} P</div>
                                </div>
                                <ButtonBase className={styles['withdraw']} onClick={() => setClick(true)}>출금 신청</ButtonBase>
                            </div>
                        </div>
                        <div className={styles['point-area']}>
                            <div className={styles['point-text']}>
                                수익금 내역
                        <div className={styles['under-line']}></div>
                            </div>
                            <ul>
                                {pointList.map((item) => (
                                    <li className={styles['point-item']} key={item.plog_id}>
                                        <PointItem item={item} />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <WithdrawModal click={click} setClick={setClick} point={getUserInfo.point} />
                </>
            }
        </>
    );
};

export default MyPointContainer;