import React, { useState } from 'react';
import { View, Text, ScrollView, FlatList, Button, Modal, StyleSheet, Alert, PanResponder } from 'react-native';
import { Card, Icon, Rating, Input } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite, postComment } from '../redux/ActionCreators'
import * as Animatable from 'react-native-animatable';

const RenderDish = (props) => {
    const dish = props.dish;

    const recognizeDrag = ({ moveX, moveY, dx, dy }) => {
        if (dx < -200) {
            return true;
        }
        else {
            return false;
        }
    }

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (e, gestureState) => {
            return true;
        },  
        onPanResponderEnd: (e, gestureState) => {
            console.log("pan responder end", gestureState);
            if (recognizeDrag(gestureState)) 
                Alert.alert(
                    'Add to Favorites?',
                    `Are you sure you wish to add ${dish.name} to your favorites?`,
                    [
                        {
                            text: 'Cancel',
                            onPress: () => console.log('Cancel pressed'),
                            style: 'cancel',
                        },
                        {
                            text: 'OK',
                            onPress: () => props.favorite ? console.log('Already favorite') : props.onPress()
                        }
                    ],
                    { cancelable: false }
                )
            return true;
        }
    });

    if (dish != null) {
        return (
            <Animatable.View animation='fadeInDown' duration={2000} delay={1000}
                    {...panResponder.panHandlers}>
                <Card
                    featuredTitle={dish.name}
                    image={{ uri: baseUrl + dish.image }}
                    >
                    <Text style={{ margin: 10 }}>
                        {dish.description}
                    </Text>
                    <View style={styles.containerIcons}>
                        <Icon 
                            raised
                            reverse 
                            name={ props.favorite ? 'heart' : 'heart-o' }
                            type='font-awesome'
                            color='#f50'
                            onPress={() => props.favorite ? console.log('Already favorite') : props.onPress()}
                        />
                        <Icon 
                            raised
                            reverse 
                            name={'pencil'}
                            type='font-awesome'
                            color='#512DA8'
                            onPress={() => props.onPressModal()}
                        />
                    </View>
                </Card>
            </Animatable.View>
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
            <View key={index} style={{ margin: 10, flexDirection: 'column', justifyContent: 'flex-start' }}>
                <Text style={{ fontSize: 14 }}>{item.comment}</Text>
                <Rating imageSize={12}  readonly startingValue={item.rating} type='star'  /> 
                <Text style={{ fontSize: 12 }}>{`-- ${item.author}, ${item.date}`}</Text>
            </View>
        );
    }

    return (
        <Animatable.View animation='fadeInUp' duration={2000} delay={1000}>
            <Card title="Comments">
                <FlatList 
                    data={comments}
                    renderItem={renderCommentItem}
                    keyExtractor={item => item.id.toString() }
                />
            </Card>
        </Animatable.View>
    );
}

const Dishdetail = (props) => {
    
    const  { dishes, comments, favorites, postComment } = props;
    const [showModal, setShowModal] = useState(false);

    const [rating, setRating] = useState(5);
    const [author, setAuthor] = useState('');
    const [comment, setComment] = useState('');

    const dishId = props.route.params.dishId;

    const markFavorite = (dishId) => props.postFavorite(dishId);

    const toggleModal = () => setShowModal(!showModal);

    const handleSubmit = () => {
        postComment(dishId, rating, author, comment);
        toggleModal();
    }

    return (
        <ScrollView>
            <RenderDish dish={dishes.dishes[+dishId]} 
            favorite={favorites.some(el => el === dishId)}
            onPress={() => markFavorite(dishId)}
            onPressModal={() => toggleModal()}    />
            <RenderComments comments={comments.comments.filter(comment => comment.dishId === dishId)} />
            <Modal
                animationType={'slide'}
                transparent={false}
                visible={showModal}
                onDismiss={() => toggleModal()}
                onRequestClose={() => toggleModal()}
            >
                <View style={styles.modal}>
                    <Rating 
                        ratingCount={5}
                        showRating 
                        startingValue={rating} type='star' fractions={1} 
                        defaultRating={5}
                        onFinishRating={(rating) => setRating(rating)}
                    /> 
                    <Input
                        placeholder="Author"
                        leftIcon={{ type: 'font-awesome', name: 'user' }}
                        onChangeText={(value) => setAuthor(value)}
                    />
                    <Input
                        placeholder="Comment"
                        leftIcon={{ type: 'font-awesome', name: 'comment-o' }}
                        onChangeText={(value) => setComment(value)}
                    />
                    <Button 
                        title="Submit"
                        onPress={() => handleSubmit() }
                        color='#512DA8'
                        style={styles.btnStyle}
                    />
                    <Button 
                        title="Close"
                        onPress={() => toggleModal() }
                        color='gray'
                    />
                </View>
            </Modal>
        </ScrollView>
    );
}   

const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
    postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment))
})

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        favorites: state.favorites
    }
}

const styles = StyleSheet.create({
    containerIcons: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    modal: {
        justifyContent: 'center',
        margin: 2
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: '#512DA8',
        textAlign: 'center',
        color: 'white',
        marginBottom: 20
    },
    modalText: {
        fontSize: 18,
        margin: 10
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);

// const Dishdetail = (props) => {
    
//     const  { dishes, comments, favorites, postComment } = props;

//     const [showModal, setShowModal] = useState(false);
//     const toggleModal = () => setShowModal(!showModal)

//     const handleSubmit = (values) => {
//         toggleModal();
//         postComment(dishId, values.rating, values.author, values.comment)
//     }

//     const markFavorite = (dishId) => props.postFavorite(dishId);

//     const dishId = props.route.params.dishId;

//     return (
//         <ScrollView>
//             <RenderDish dish={dishes.dishes[+dishId]} 
//                 favorite={favorites.some(el => el === dishId)}
//                 onPress={() => markFavorite(dishId)}
//                 toggleModal={() => toggleModal()}
//             />
//             <RenderComments comments={comments.comments.filter(comment => comment.dishId === dishId)} dishId={dishId} />
//             <Modal
//                 animationType={'slide'}
//                 transparent={false}
//                 visible={showModal}
//                 onDismiss={() => { toggleModal() }}
//                 onRequestClose={() => { toggleModal() }}
//             >
//                 <View style={styles.modal}>
//                     <Rating showRating startingValue={0} type='star' fractions={1} /> 
//                     <Input
//                         placeholder="Author"
//                         leftIcon={{ type: 'font-awesome', name: 'user' }}
//                     />
//                     <Input
//                         placeholder="Comment"
//                         leftIcon={{ type: 'font-awesome', name: 'paper-plane' }}
//                     />
//                     <Button 
//                         title="Submit"
//                         onPress={(values) => handleSubmit(values) }
//                         color='#512DA8'
//                         style={styles.btnStyle}
//                     />
//                     <Button 
//                         title="Close"
//                         onPress={() => toggleModal() }
//                         color='gray'
//                     />
//                 </View>
//             </Modal>
//         </ScrollView>
//     );
// }   