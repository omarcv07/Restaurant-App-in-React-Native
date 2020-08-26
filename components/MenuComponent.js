import React, { useState } from 'react';
import { View, FlatList } from 'react-native';
import { Tile } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';

const Menu = (props) => {

  const { dishes } = props

    const renderMenuItem = ({ item, index }) => {
        return (
            <Tile
                key={index}
                title={item.name}
                caption={item.description}
                featured
                onPress={() => navigate('Dishdetail', { dishId: item.id })}
                imageSrc={{ uri: baseUrl + item.image }}
                />
        ); 
    }

    const { navigate } = props.navigation

    return (
        <FlatList 
            data={dishes.dishes}
            renderItem={renderMenuItem}
            keyExtractor={item => item.id.toString()}
            />
    );
}

const mapStateToProps = state => {
    return {
        dishes: state.dishes
    }
}

export default connect(mapStateToProps)(Menu); 