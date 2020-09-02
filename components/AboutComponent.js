import React, { useState } from 'react';
import { ScrollView, View, Text, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';
import { Card } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';
import * as Animatable from 'react-native-animatable';

const LeadersCard = ({ leaders }) => {

    const RenderLeaders = ({ item, index}) => {
        return (
            <ListItem 
                key={index}
                title={item.name}
                subtitle={item.description}
                hideChevrom={true}
                leftAvatar={{ source: { uri: baseUrl + item.image } }}
            />
        );
    }

    if (leaders.isLoading) {
        return (
            <ScrollView>
                <History />
                    <Card title='Corporate Leadership'>
                    <Loading />
                </Card>
            </ScrollView>
        );
    }
    else if (leaders.errMess) {
        return (
            <ScrollView>
                <Animatable.View animation='fadeInDown' duration={2000} delay={1000}>
                    <History />
                        <Card title='Corporate Leadership'>
                        <Text>{leaders.errMess}</Text>
                    </Card>
                </Animatable.View>
            </ScrollView>
        );
    } 
    else {
        return (
            <ScrollView>
                <Animatable.View animation='fadeInDown' duration={2000} delay={1000}>
                    <History />
                    <Card title='Corporate Leadership'>
                        <FlatList 
                            data={leaders.leaders}
                            renderItem={RenderLeaders}
                            keyExtractor={item => item.id.toString()}
                        />
                    </Card>
                </Animatable.View>
            </ScrollView>
        );
    }
}

const History = () => {
    return (
        <Card
            title="Our History"
        >
            <Text>
                Started in 2010, Ristorante con Fusion quickly established itself as a culinary icon par excellence in Hong Kong. 
                With its unique brand of world fusion cuisine that can be found nowhere else, it enjoys patronage from the A-list clientele in Hong Kong.  
                Featuring four of the best three-star Michelin chefs in the world, you never know what will arrive on your plate the next time you visit us.
            </Text>
            <Text>
                The restaurant traces its humble beginnings to The Frying Pan,
                a successful chain started by our CEO, Mr. Peter Pan, that featured for 
                the first time the world's best cuisines in a pan.
            </Text>
        </Card>
    );
}

const About = (props) => {

    const { leaders } = props;

    return (
        <LeadersCard leaders={leaders} />
    );
}

const mapStateToProps = state => {
    return {
        leaders: state.leaders
    }
}

export default connect(mapStateToProps)(About);