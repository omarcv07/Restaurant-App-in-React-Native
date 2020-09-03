import React, { useState } from 'react';
import { Text, View, ScrollView, StyleSheet, Picker, Switch, Button, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import Moment from 'moment';
import * as Animatable from 'react-native-animatable';

const Reservation = () => {

    const [guests, setGuests] = useState(1);
    const [smoking, setSmoking] = useState(false);
    const [dateInfo, updateDateInfo] = useState({
      date: new Date(),
      show: false,
      mode: 'date',
    });
    const [showModal, setShowModal] = useState(false);

    const initialState = {
      guests,
      smoking,
      dateInfo
    };

    const changeShowMode = () => {
        updateInfo({ show: true, mode: 'date' });
    };

    const updateInfo = (info) => {
      updateDateInfo({ ...dateInfo, ...info });
    };
      
    const handleReservation = () => {
        confirmReservation();
        console.log(JSON.stringify(initialState));
        toggleModal();
    }

    const toggleModal = () => {
      setShowModal(!showModal);
    }

    const resetForm = () => {
      setGuests(1)
      setSmoking(false)
      updateDateInfo({
        date: new Date(),
        show: false,
        mode: 'date',
      })
    }

    const confirmReservation = () => {
      Alert.alert(
        'Your Reservation OK?',
        `Number of Guests: ${guests} \nSmoking? ${smoking} \nDate and Time: ${' ' + Moment(dateInfo.date).format('DD-MMM-YYYY h:mm A')}`,
        [
          {
            text: "Cancel",
            onPress: () => resetForm(),
            style: "cancel"
          },
          { text: "OK", onPress: () => resetForm() }
        ],
        { cancelable: false }
      );

    }

    return (
        <ScrollView>
          <Animatable.View animation='zoomIn' duration={2000} delay={1000}>
            <View style={styles.formRow}>
                <Text style={styles.formLabel}>Number of Guests</Text>
                <Picker
                    style={styles.formItem}
                    selectedValue={guests}
                    onValueChange={(itemValue, itemIndex) => setGuests(itemValue)}
                    >
                    <Picker.Item label='1' value='1' />
                    <Picker.Item label='2' value='2' />
                    <Picker.Item label='3' value='3' />
                    <Picker.Item label='4' value='4' />
                    <Picker.Item label='5' value='5' />
                    <Picker.Item label='6' value='6' />
                </Picker>
            </View>
            <View style={styles.formRow}>
                <Text style={styles.formLabel}>Smoking/Non-Smoking?</Text>
                <Switch
                    style={styles.formItem}
                    value={smoking}
                    trackColor='#512DA8'
                    onValueChange={(value) => setSmoking(value)}
                    >
                </Switch>
            </View>

            <View style={styles.formRow}>
              <Text style={styles.formLabel}>Date and Time</Text>
              <TouchableOpacity
                style={styles.formItem}
                style={{
                  padding: 7,
                  borderColor: '#512DA8',
                  borderWidth: 2,
                  flexDirection: "row"
                }}
                onPress={() => changeShowMode()}
              >
                <Icon type='font-awesome' name='calendar' color='#512DA8' />
                <Text>
                  {' ' + Moment(dateInfo.date).format('DD-MMM-YYYY h:mm A')}
                </Text>
              </TouchableOpacity>
              {dateInfo.show && (
                <DateTimePicker
                  value={dateInfo.date}
                  display="default"
                  mode={dateInfo.mode}
                  minimumDate={new Date()}
                  minuteInterval={60}
                  onChange={(event, dateTime) => {
                    if (dateTime === undefined) {
                      updateInfo({ show: false });
                    } else if (dateInfo.mode === 'time') {
                      let timeDate = Moment(dateTime);
                      updateInfo({
                        show: false,
                        mode: 'date',
                        date: Moment(dateInfo.date)
                          .set('hour', timeDate.get('hour'))
                          .set('minute', timeDate.get('minute'))
                          .set('minute', timeDate.get('second'))
                          .toDate(),
                      });
                    } else {
                      updateInfo({ mode: 'time', date: dateTime });
                    }
                  }}
                />
              )}
            </View>
            <View style={styles.formRow}> 
              <Button
                title="reserve"
                color="#512DA8"
                onPress={() => handleReservation()}
                accessibilityLabel="Learn more about this purple button"
              />
            </View>
          </Animatable.View>    
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    formRow: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      flexDirection: 'row',
      margin: 20
    },
    formLabel: {
      fontSize: 18,
      flex: 2
    },
    formItem: {
      flex: 1
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

export default Reservation;