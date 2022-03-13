import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  cartAddItem,
  cartRemoveItem,
} from '../../../../redux/cart/cart.action';
import {
  selectCartItems,
  selectCartItemsCount,
} from '../../../../redux/cart/cart.selector';
import ButtonAddRemoveItem from '../../ButtonAddRemoveItem';
import ToppiingsPopup from '../../ToppingsPopup';
import './styles.css';

const MenuItem = ({
  item,
  cartCount,
  cartList,
  cartAddItem,
  cartRemoveItem,
  isHome
}) => {
  const { id, img_url, isVeg, name, price, description, rating } = item;

  const handleQuantity = () => {
    let quantity = 0;
    if (cartCount !== 0) {
      const foundItemInCart = cartList.find((item) => item.id === id);
      if (foundItemInCart) {
        quantity = foundItemInCart.quantity;
      }
    }
    return quantity;
  };

  return (
    <div className='item'>
      <img src={img_url} alt='food' />
      <div className='item-head_desc'>
        <p className='head_desc-name'>{name}</p>
        <p className='head_desc-info'>
          <small>{description}</small>
        </p>
        <p className='head_ratings'>
          Ratings: {`${rating}/5`}
        </p>
        <div className='type_container'>
          <p>
            <div className={isVeg ? 'container_veg' : 'container_nonveg'} />
          </p>
        </div>
      </div>
      <div className='item-foot_desc'>
        <span className='foot_desc-price'>${price}</span>
      </div>
      <div className='item-button_container item-foot_desc'>
      {isHome ?
          (
            <ToppiingsPopup
              item={item}
              handleQuantity={handleQuantity}
              cartRemoveItem={cartRemoveItem}
              cartAddItem={cartAddItem}
            />
          )
          :
          (
            <ButtonAddRemoveItem
              quantity={handleQuantity()}
              handleRemoveItem={() => cartRemoveItem(item)}
              handleAddItem={() => cartAddItem(item)}
            />
          )
        }
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  cartCount: selectCartItemsCount,
  cartList: selectCartItems,
});

const mapDispatchToProps = (dispatch) => ({
  cartAddItem: (item) => dispatch(cartAddItem(item)),
  cartRemoveItem: (item) => dispatch(cartRemoveItem(item)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MenuItem);
