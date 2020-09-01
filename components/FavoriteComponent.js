import React, { useState } from 'react';
import { View, FlatList, Text, Alert } from 'react-native';
import { ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';
import Swipeout from 'react-native-swipeout';
import { deleteFavorite } from '../redux/ActionCreators';

const Favorites = (props) => {

    const { dishes, favorites, deleteFavorite } = props;
    const { navigate } = props.navigation

    const renderMenuItem = ({ item, index }) => {

        const rightButton = [
            {
                text: 'Delete',
                type: 'delete',
                onPress: () => {
                    Alert.alert(
                        'Delete Favorite?',
                        `Are you sure you wish to delete the favorite dish ${item.name}?`,
                        [
                            { 
                                text: 'Cancel', 
                                onPress: () => console.log(`${item.name} was not Deleted`),
                                style: 'cancel'
                            },
                            {
                                text: 'OK',
                                onPress: () => deleteFavorite(item.id)
                            }
                        ],
                        { cancelable: false }
                    )
                }
            }
        ];

        return (
            <Swipeout right={rightButton} autoClose={true}> 
                <ListItem 
                    key={index}
                    title={item.name}
                    subtitle={item.description}
                    hideChevron={true}
                    onPress={() => navigate('Dishdetail', { dishId: item.id })}
                    leftAvatar={{ source: { uri: baseUrl + item.image }}}
                    />
            </Swipeout>
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

const mapDispatchToProps = dispatch => ({
    deleteFavorite: (dishId) => dispatch(deleteFavorite(dishId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Favorites)