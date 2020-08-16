import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Card } from 'react-native-elements';
import { DISHES } from '../shared/dishes'

const RenderDish = (props) => {
    const dish = props.dish;

    if (dish != null) {
        return (
            <Card
                featuredTitle={dish.name}
                image={require('./images/uthappizza.png')}
                >
                <Text style={{ margin: 10 }}>
                    {dish.description}
                </Text>
            </Card>
        );
    }
    else {
        return(
            <View></View>
        )
    }
}

const Dishdetail = (props) => {

    const [dishes, setDishes] = useState(DISHES)

    const dishId = props.route.params.dishId

    return (
        <RenderDish dish={dishes[+dishId]} />
    );
}   

export default Dishdetail;