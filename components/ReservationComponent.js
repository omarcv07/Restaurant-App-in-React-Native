import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, StyleSheet, Picker, Switch, Button, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import Moment from 'moment';
import * as Animatable from 'react-native-animatable';
import * as Permissions from 'expo-permissions';
import { Notifications } from 'expo';
import * as Calendar from 'expo-calendar';

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
        addReservationToCalendar(dateInfo.date);
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
          { text: "OK", onPress: () => {
              presentLocalNotifications(Moment(dateInfo.date).format('DD-MMM-YYYY h:mm A'))
              resetForm()
            } 
          }
        ],
        { cancelable: false }
      );

    }

    const obtainNotificationPermission = async () => {
      let permission = await Permissions.getAsync(Permissions.USER_FACING_NOTIFICATIONS);
      if (permission.status !== 'granted') {
        permission = await Permissions.askAsync(Permissions.USER_FACING_NOTIFICATIONS);
        if (permission.status !== 'granted') {
          Alert.alert('Permission not granted to show notifications')
        }
      }
      return permission;
    }

    const presentLocalNotifications = async (date) => {
      await obtainNotificationPermission();
      Notifications.presentLocalNotificationAsync({
        title: 'Your Reservation',
        body: `Reservation for ${date} requested`,
        ios: {
          sound: true,
          vibrate: true,
          color: '#512DA8'
        },
        android: {
          channelId: 'reservation',
          color: "#512DA8"
        }
      });
      if (Platform.OS === 'android') {
        Notifications.createChannelAndroidAsync('reservation', {        
          name: 'Confusion',        
          sound: true,        
          vibrate: [0, 250, 250, 250],
          priority: 'max',
        });
      }
    }

    const obtainCalendarPermission = async () => {
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      if (status === 'granted') {
        const calendars = await Calendar.getCalendarsAsync();
        console.log('Here are all your calendars:');
        console.log({ calendars });
      }
    }

    const getDefaultCalendarSource = async () => {
      const calendars = await Calendar.getCalendarsAsync();
      const defaultCalendars = calendars.filter(each => each.source.name === 'Default');
      return defaultCalendars[0].source;
    }

    const addReservationToCalendar = async (date) => {
      await obtainCalendarPermission();
      
      const dateMs = Date.parse(date);
      const startDate = new Date(dateMs);
      const endDate = new Date(dateMs + 2 * 60 * 60 * 1000);

      const defaultCalendarSource =
        Platform.OS === 'ios'
          ? await getDefaultCalendarSource()
          : { isLocalAccount: true, name: 'Expo Calendar' };
      
      const details = {
        title: 'Expo Calendar',
        color: 'blue',
        entityType: Calendar.EntityTypes.EVENT,
        sourceId: defaultCalendarSource.id,
        source: defaultCalendarSource,
        name: 'internalCalendarName',
        ownerAccount: 'personal',
        accessLevel: Calendar.CalendarAccessLevel.OWNER,
      }

      const calendarId = await Calendar.createCalendarAsync(details);

      await Calendar.createEventAsync(calendarId, {
        title: 'Con Fusion Table Reservation',
        startDate: startDate,
        endDate: endDate,
        timeZone: 'Asia/Hong_Kong',
        location: '121, Clear Water Bay Road, Clear Water Bay, Kowloon, Hong Kong'
      });
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