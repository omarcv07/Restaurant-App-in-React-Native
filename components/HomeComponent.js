import React, { useState } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { Card } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';

const RenderItem = (props) => {
    const item = props.item;

    if (item != null) {
        return (
            <Card
                featuredTitle={item.name}
                featuredSubtitle={item.designation}
                image={{ uri: baseUrl + item.image}}
            >
                <Text style={{ margin: 10 }}>
                    {item.description}
                </Text>
            </Card>
        );
    } else {
        return (
            <View></View>
        );
    }
}

const Home = (props) => {

    const { dishes, promotions, leaders} = props

    return (
        <ScrollView>
            <RenderItem 
                item={dishes.dishes.find(dish => dish.featured)}
            />
            <RenderItem 
                item={promotions.promotions.find(promo => promo.featured)}
            />
            <RenderItem 
                item={leaders.leaders.find(leader => leader.featured)}
            />
        </ScrollView>
    );
}

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        promotions: state.promotions,
        leaders: state.leaders
    }
}

export default connect(mapStateToProps)(Home);