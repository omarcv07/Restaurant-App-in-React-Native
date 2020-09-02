import React, { useState, useEffect } from 'react';
import { View, Text, Animated, Easing } from 'react-native';
import { Card } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent'

const RenderItem = (props) => {
    const {isLoading, errMess, item} = props

    if (isLoading) {
        return (
            <Loading />
        );
    } 
    else if (errMess) {
        return (
            <View>
                <Text>{errMess}</Text>
            </View>
        );
    }
    else {
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
}

const Home = (props) => {

    const { dishes, promotions, leaders} = props
    const [animatedValue, setAnimatedValue] = useState(new Animated.Value(0));

    useEffect(() => {
        animate();
    }, [])

    const animate = () => {
        animatedValue.setValue(0);
        Animated.timing(
            animatedValue,
            {
                toValue: 8,
                duration: 8000,
                easing: Easing.linear
            }
        ).start(() => animate())
    }

    const xpos1 = animatedValue.interpolate({
        inputRange: [0, 1, 3, 5, 8],
        outputRange: [1200, 600, 0, -600, -1200]
    });

    const xpos2 = animatedValue.interpolate({
        inputRange: [0, 2, 4, 6, 8],
        outputRange: [1200, 600, 0, -600, -1200]
    });

    const xpos3 = animatedValue.interpolate({
        inputRange: [0, 3, 5, 7, 8],
        outputRange: [1200, 600, 0, -600, -1200]
    });

    return (
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
            <Animated.View style={{ width: '100%', transform: [{ translateX: xpos1 }]}}>
                <RenderItem 
                    item={dishes.dishes.find(dish => dish.featured)}
                    isLoading={dishes.isLoading}
                    errMess={dishes.errMess}
                />
            </Animated.View>
            <Animated.View style={{ width: '100%', transform: [{ translateX: xpos2 }]}}>
                <RenderItem 
                    item={promotions.promotions.find(promo => promo.featured)}
                    isLoading={promotions.isLoading}
                    errMess={promotions.errMess}
                />
            </Animated.View>
            <Animated.View style={{ width: '100%', transform: [{ translateX: xpos3 }]}}>
                <RenderItem 
                    item={leaders.leaders.find(leader => leader.featured)}
                    isLoading={leaders.isLoading}
                    errMess={leaders.errMess}
                />
            </Animated.View>
        </View>
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