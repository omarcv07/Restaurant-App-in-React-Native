import React, { useState } from 'react';
import { View, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';
import { DISHES } from '../shared/dishes'

const Menu = (props) => {

  const [dishes, setDishes] = useState(DISHES)

    const renderMenuItem = ({ item, index }) => {
        return (
            <ListItem
                key={index}
                title={item.name}
                subtitle={item.description}
                hideChevron={true}
                onPress={() => navigate('Dishdetail', { dishId: item.id })}
                leftAvatar={{ source: require('./images/uthappizza.png') }}
                />
        ); 
    }

    const { navigate } = props.navigation

    return (
        <FlatList 
            data={dishes}
            renderItem={renderMenuItem}
            keyExtractor={item => item.id.toString()}
            />
    );
}

export default Menu; 