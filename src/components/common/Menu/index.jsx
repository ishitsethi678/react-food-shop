import React, { forwardRef } from 'react';
import MenuItem from './MenuItem';
import './styles.css';

const Menu = forwardRef(({ list, isHome }, ref) => (
  <main ref={ref}>
    {list.map((item) => (
      <MenuItem item={item} key={item.id} isHome={isHome} />
    ))}
  </main>
));

export default Menu;
