import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom'

import { numberFormat } from '../../lib/formatter';

import BasicButton from '../../components/button/BasicButton';

import { useDialog } from '../../hooks/useDialog'

import { requestPutCancelRental } from '../../api/rental'

import {Paths} from '../../paths'

import classNames from 'classnames/bind';
import { Backdrop } from '@material-ui/core';
import styles from './Refund.module.scss';

const cx = classNames.bind(styles);

const Info = ({ attribute, value, black }) => {
    return (
        <div className={cx('attribute-wrapper')}>
            <div
                className={cx('attribute', { black: black })}
                style={{ fontSize: '14px' }}
            >
                {attribute}
            </div>
            <div className={cx('value', { black: black })}>{value}원</div>
        </div>
    );
};

const Refund = ({ open, handleClose, rentalID, paymentPrice, deposit, couponPrice, pointPrice }) => {
    let price = paymentPrice + deposit
    if(couponPrice !== '-') price -= couponPrice
    if(pointPrice !== '-') price -= pointPrice

    const openDialog = useDialog()
    const history = useHistory()

    const cancelRental = useCallback(async() => {
        const token = localStorage.getItem('user_id')
        const {data} = await requestPutCancelRental(token, rentalID)

        openDialog(data.msg)
        history.push(Paths.main.use.list)
    }, [history, openDialog, rentalID])

    return (
        <>
            <div className={cx('bottom-modal', { on: open })}>
                <div className={cx('title')}>대여 취소 신청</div>
                <Info attribute={'대여비'} value={numberFormat(paymentPrice)} />
                <Info attribute={'보증금'} value={numberFormat(deposit)} />
                <Info attribute={'쿠폰 할인'} value={numberFormat(couponPrice)} />
                <Info attribute={'포인트 할인'} value={numberFormat(pointPrice)} />
                <Info
                    attribute={'최종 환불금액'}
                    value={numberFormat(price)}
                    black={true}
                />

                <div className={cx('button-area')}>
                    <BasicButton
                        button_name={`${numberFormat(price)}원 환불신청`}
                        disable={false}
                        onClick={cancelRental}
                    />
                </div>
            </div>

            <Backdrop open={open} className={cx('dim')} onClick={handleClose} />
        </>
    );
};

export default Refund;