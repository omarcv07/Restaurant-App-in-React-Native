import React, { useState } from 'react';
import { View, Text, ScrollView, FlatList } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';

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
                <Icon 
                    raised
                    reverse 
                    name={ props.favorite ? 'heart' : 'heart-o' }
                    type='font-awesome'
                    color='#f50'
                    onPress={() => props.favorite ? console.log('Already favorite') : props.onPress()}
                />
            </Card>
        );
    }
    else {
        return(
            <View></View>
        )
    }
}

const RenderComments = (props) => {

    const comments = props.comments 

    const renderCommentItem = ({ item, index }) => {
        return (
            <View key={index} style={{ margin: 10 }}>
                <Text style={{ fontSize: 14 }}>{item.comment}</Text>
                <Text style={{ fontSize: 12 }}>{item.rating} Stars</Text>
                <Text style={{ fontSize: 12 }}>{`-- ${item.author}, ${item.date}`}</Text>
            </View>
        );
    }

    return (
        <Card title="Comments">
            <FlatList 
                data={comments}
                renderItem={renderCommentItem}
                keyExtractor={item => item.id.toString()}
            />
        </Card>
    );
}

const Dishdetail = (props) => {

    const [dishes, setDishes] = useState(DISHES);
    const [comments, setComments] = useState(COMMENTS);
    const [favorites, setFavorites] = useState([])

    const markFavorite = (dishId) => setFavorites(favorites.concat(dishId))

    const dishId = props.route.params.dishId;

    return (
        <ScrollView>
            <RenderDish dish={dishes[+dishId]} 
            favorite={favorites.some(el => el === dishId)}
            onPress={() => markFavorite(dishId)}
                />
            <RenderComments comments={comments.filter(comment => comment.dishId === dishId)} />
        </ScrollView>
    );
}   

export default Dishdetail;