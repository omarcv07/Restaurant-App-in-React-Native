import React, { useState } from 'react';
import { View, FlatList } from 'react-native';
import { Tile } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';

const Menu = (props) => {

  const { dishes } = props
  const { navigate } = props.navigation

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

    if (dishes.isLoading) {
        return (
            <Loading />
        );
    }
    else if (dishes.errMess) {
        return (
            <View>
                <Text>{dishes.errMess}</Text>
            </View>
        );
    }
    else {
        return (
            <FlatList 
                data={dishes.dishes}
                renderItem={renderMenuItem}
                keyExtractor={item => item.id.toString()}
                />
        );
    }
}

const mapStateToProps = state => {
    return {
        dishes: state.dishes
    }
}

export default connect(mapStateToProps)(Menu); 