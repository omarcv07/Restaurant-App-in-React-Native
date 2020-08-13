import React, { useState } from 'react';
import Menu from './MenuComponent';
import Dishdetail from './DishDetailComponent';
import { View } from 'react-native';
import { DISHES } from '../shared/dishes';

const Main = () => {
  const [dishes, setDishes] = useState(DISHES)
  const [selectedDish, setSelectedDish] = useState(null)
 
  const onDishSelect = (dishId) => setSelectedDish(dishId)

  return (
    <View>
      <Menu dishes={dishes} onPress={(dishId) => onDishSelect(dishId)} />
      <Dishdetail dish={dishes.find((dish) => dish.id === selectedDish)} />
    </View>
  );
}
  
export default Main;