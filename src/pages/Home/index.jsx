import React, { useRef, useEffect, useState } from 'react';
import ButtonCartCount from '../../components/common/ButtonCartCount';
import Footer from '../../components/common/Footer';
import Banner from '../../components/Home/Banner';
import Menu from '../../components/common/Menu';
import axios from 'axios';

const Home = () => {
  const menuRef = useRef();

  const [pizzas, setPizzas] = useState([]);
  const [filteredPizzas, setFilteredPizzas] = useState([]);
  const [isVeg, setIsVeg] = useState(true);

  useEffect(() => {
    axios.get('https://run.mocky.io/v3/ec196a02-aaf4-4c91-8f54-21e72f241b68')
      .then(res => {
        setPizzas(res.data);
        setFilteredPizzas(res.data.filter(pizza => pizza.isVeg === isVeg))
      })
  }, []);

  useEffect(() => {
    setFilteredPizzas(pizzas.filter(pizza => pizza.isVeg === isVeg))
  }, [isVeg])

  const handleIsVegToggle = () => {
    setIsVeg(!isVeg);
  }

  const handleScrollMenu = () => {
    menuRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const getVegNonVegToggle = () => {
    return (
      <>
        <input
          type='radio'
          name='Veg'
          checked={isVeg}
          onChange={handleIsVegToggle}
        /> Veg
        <br />
        <input
          type='radio'
          name='Veg'
          checked={!isVeg}
          onChange={handleIsVegToggle}
        /> Non-Veg
      </>
    )
  }

  return (
    <div>
      <Banner handleScrollMenu={handleScrollMenu} />
      {getVegNonVegToggle()}
      <Menu list={filteredPizzas} ref={menuRef} isHome={true} />
      <Footer />
      <ButtonCartCount />
    </div>
  );
};

export default Home;
