import React, { useState } from 'react';
import { View, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';
// import { favorites } from '../redux/favorite';

const Favorites = (props) => {

    const { dishes, favorites } = props;
    const { navigate } = props.navigation

    const renderMenuItem = ({ item, index }) => {
        return (
            <ListItem 
                key={index}
                title={item.name}
                subtitle={item.description}
                hideChevron={true}
                onPress={() => navigate('Dishdetail', { dishId: item.id })}
                leftAvatar={{ source: { uri: baseUrl + item.image }}}
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
                data={dishes.dishes.filter(dish => favorites.some(el => el === dish.id))}
                renderItem={renderMenuItem}
                keyExtractor={item => item.id.toString()}
                />
        );
    }
}

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        favorites: state.favorites
    }
}

export default connect(mapStateToProps)(Favorites)