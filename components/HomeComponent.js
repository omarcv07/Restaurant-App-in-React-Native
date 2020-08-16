import React, { useState } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { Card } from 'react-native-elements';
import { DISHES } from '../shared/dishes'
import { PROMOTIONS } from '../shared/promotions'
import { LEADERS } from '../shared/leaders'

const RenderItem = (props) => {
    const item = props.item;

    if (item != null) {
        return (
            <Card
                featuredTitle={item.name}
                featuredSubtitle={item.designation}
                image={require('./images/uthappizza.png')}
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

const Home = () => {

    const [dishes, setDishes] = useState(DISHES);
    const [promotions, setPromotions] = useState(PROMOTIONS);
    const [leaders, setLeaders] = useState(LEADERS)

    return (
        <ScrollView>
            <RenderItem 
                item={dishes.find(dish => dish.featured)}
            />
            <RenderItem 
                item={promotions.find(promo => promo.featured)}
            />
            <RenderItem 
                item={leaders.find(leader => leader.featured)}
            />
        </ScrollView>
    );
}

export default Home;