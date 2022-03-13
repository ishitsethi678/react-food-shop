import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import ButtonAddRemoveItem from '../ButtonAddRemoveItem';
import './styles.css';

const ToppiingsPopup = (props) => {
    const {
        item,
        handleQuantity,
        cartRemoveItem,
        cartAddItem,
    } = props;

    const { id, img_url, isVeg, name, price, description, rating } = item;

    const [isModalVisible, setIsModalVisible] = useState(false);

    const [cartItem, setItem] = useState({
        id,
        img_url,
        isVeg,
        name,
        price,
        description,
        rating,
        selectedTopping: [],
        selectedSide: 'Regular'
    })

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleToppingClick = (selectedTopping) => {
        const existingTopping = cartItem.selectedTopping.find(topping => topping === selectedTopping);
        let updatedTopping = [];
        if (existingTopping) {
            updatedTopping = cartItem.selectedTopping.filter(topping => topping !== selectedTopping);
        } else {
            updatedTopping = cartItem.selectedTopping;
            updatedTopping.push(selectedTopping);
        }
        setItem({ ...cartItem, selectedTopping: updatedTopping });
    }

    const handleSizeClick = (size) => {
        setItem({...cartItem, selectedSide: size});
    }

    const isToppingSelected = (toppingName) => {
        if (cartItem.selectedTopping.findIndex(topping => topping === toppingName) > -1) {
            return true;
        }
        return false;
    }

    const isSizeSelected = (size) => {
        if (cartItem.selectedSide === size) {
            return true;
        }
        return false;
    }

    return (
        <>
            <Button type="primary" className='addButton' onClick={showModal}>
                Add Item
            </Button>
            <Modal
                title="Select Topping & Size"
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={[
                    <ButtonAddRemoveItem
                        quantity={handleQuantity()}
                        handleRemoveItem={() => cartRemoveItem(cartItem)}
                        handleAddItem={() => cartAddItem(cartItem)}
                    />
                ]}
            >
                {
                    item.toppings.length > 0 && item.toppings[0].items &&
                    <>
                        <h4>Add Your Toppings</h4>
                        <ul style={{ listStyleType: 'none' }}>
                            {item.toppings[0].items.map((topping, index) => {
                                return <li key={index}>
                                    <input
                                        type='checkbox'
                                        name={topping.name}
                                        checked={isToppingSelected(topping.name)}
                                        onClick={() => handleToppingClick(topping.name)}
                                    /> {topping.name}
                                </li>
                            })}
                        </ul>
                    </>
                }

                {
                    item.size.length > 0 && item.size[0].items &&
                    <>
                        <h4>Select Size</h4>
                        <ul style={{ listStyleType: 'none' }}>
                            {item.size[0].items.map((sizeOption, index) => {
                                return <li key={index}>
                                    <input
                                        type='radio'
                                        name={sizeOption.size}
                                        checked={isSizeSelected(sizeOption.size)}
                                        onClick={() => handleSizeClick(sizeOption.size)}
                                    /> {sizeOption.size}
                                </li>
                            })}
                        </ul>
                    </>
                }

            </Modal>
        </>
    )
}

export default ToppiingsPopup;
