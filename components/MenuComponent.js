import React, { useState } from 'react';
import { View, FlatList, Text } from 'react-native';
import { Tile } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';
import * as Animatable from 'react-native-animatable';

const Menu = (props) => {

  const { dishes } = props
  const { navigate } = props.navigation

    const renderMenuItem = ({ item, index }) => {
        return (
            <Animatable.View animation='fadeInRightBig' duration={2000}>
                <Tile
                    key={index}
                    title={item.name}
                    caption={item.description}
                    featured
                    onPress={() => navigate('Dishdetail', { dishId: item.id })}
                    imageSrc={{ uri: baseUrl + item.image }}
                    />
            </Animatable.View>
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