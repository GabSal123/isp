import React from 'react';
import { useState } from 'react';
import '../styles/FilmStyles.css';

const DisplayCoupon = ({priceValue, buyerUsername}) => {
    return (
        <div className='coupon-container'>
            <strong>Kupono vertė</strong>
            <p className='coupon-p'>{priceValue}$</p>
            <strong>Pirkėjo slapyvardis</strong>
            <p className='coupon-p'>{buyerUsername}</p>               
        </div>
    )
}

export default DisplayCoupon