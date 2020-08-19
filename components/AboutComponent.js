import React, { useState } from 'react';
import { ScrollView, View, Text, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';
import { Card } from 'react-native-elements';
import { LEADERS } from '../shared/leaders';

const LeadersCard = ({ leaders }) => {

    const RenderLeaders = ({ item, index}) => {
        return (
            <ListItem 
                key={index}
                title={item.name}
                subtitle={item.description}
                hideChevrom={true}
                leftAvatar={{ source: require('./images/alberto.png') }}
            />
        );
    }

    return (
        <Card title='Corporate Leadership'>
            <FlatList 
                data={leaders}
                renderItem={RenderLeaders}
                keyExtractor={item => item.id.toString()}
            />
        </Card>
    );
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

const About = () => {

    const [leaders, setLeaders] = useState(LEADERS)

    return (
        <ScrollView>
            <History />
            <LeadersCard leaders={leaders} />
        </ScrollView>
    );
}

export default About