import React, { useState } from 'react';
import Menu from './MenuComponent';
import { DISHES } from '../shared/dishes';

const Main = () => {
    const [dishes, setDishes] = useState(DISHES)

    return (
        <Menu dishes={dishes} />
    );
}

export default Main;