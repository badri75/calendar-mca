/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useRef, useEffect} from 'react';
import {
  Alert,
  Button,
  Dimensions,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';
import {Calendar} from 'react-native-calendars';

import {Header} from './components';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const App = () => {
  const D = new Date()
  const [selectedDate, setSelectedDate] = useState({dateString: D.toISOString().split('T')[0], day: D.getDate(), month: D.getMonth()});
  const [events, setEvents] = useState({});
  const [newEve, setNewEve] = useState('')
  const [markedDates, setMarkedDates] = useState({})


  useEffect(() => {
    console.log(events)
  }, [events]);

  const dateChange = e => {
    const {dateString, day, month, timestamp, year} = e;
    setSelectedDate(e);
    console.log(e);
  };

  const setNewEvent = () => {
    const old = events[selectedDate.dateString] || []
    console.log(old)
    const d = new Date()
    const is_pm = d.getHours() > 12
    const day = new Date().getDate()
    const month = new Date().getMonth()
    const n_event = {
      ...selectedDate,
    }
    n_event.str = `${MONTHS[month]} ${day}, ${is_pm ? d.getHours() - 12 : d.getHours()}:${d.getMinutes()} ${is_pm ? 'pm' : 'am'}`
    n_event.event = newEve
    old.push(n_event)
    setEvents({...events, [selectedDate.dateString]: old});
    setNewEve('')
    setMarkedDates({...markedDates, [selectedDate.dateString]: {selected: true, selectedColor: 'blue'}})
  };

  const vacation = {key: 'vacation', color: 'red', selectedDotColor: 'blue'};
  const massage = {key: 'massage', color: 'blue', selectedDotColor: 'blue'};
  const workout = {key: 'workout', color: 'green'};

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Header />

        <Calendar
          onDayPress={dateChange}
          current={selectedDate.dateString}
          enableSwipeMonths={true}
          hideExtraDays={true}
          marking={true}
          markingType={'multi-dot'}
          markedDates={{
            [selectedDate.dateString]: {selected: true, selectedColor: '#70d7c7'},
            ...markedDates
          }}
        />

        {/* <Button
          style={styles.btn}
          title="Set a event"
          onPress={() => setShowModal(true)}
        /> */}
        <View style={styles.line} />
        <Text style={styles.events}>Events</Text>


        <ScrollView contentContainerStyle={styles.eventsScroll}>
          {events?.[selectedDate.dateString] ? (
            [...events[selectedDate.dateString]].map((eve, i) => {
              console.log(events, events[selectedDate.dateString]);
              return (
                <View key={i}>
                  <Text style={styles.no}>
                    {eve.event}
                  </Text>
                </View>
              );
            })
          ) : (
            <Text style={styles.no_eve}>No events </Text>
          )}
        </ScrollView>
      </ScrollView>
      <View style={styles.addEventView}>
        <TextInput placeholder="Add a new one" value={newEve} onChange={e => setNewEve(e.nativeEvent.text)}  style={styles.txtInp} />
        <Pressable onPress={setNewEvent}>
          <Text style={styles.addBtn}>Add</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const height = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  no: {
    color: 'black',
    fontSize: 18,
    padding: 10,
    paddingLeft: 20,
    backgroundColor: 'lightgreen',
    margin: 10
  },
  no_eve:{
    fontSize: 18,
    padding: 10,
    paddingLeft: 20,
    backgroundColor: 'orangered',
    margin: 10,
    // color: 'black'

  },
  eventsScroll: {
    margin: 'auto',
  },
  events: {
    textAlign: 'center',
    fontSize: 20,
    color: '#000',
    fontWeight: 'bold',
  },
  txtInp: {
    color: 'white',
    width: '86%',
    backgroundColor: '#333',
    fontSize: 15,
    padding: 4,
  },
  addBtn: {
    color: 'black',
    backgroundColor: '#ccc',
    padding: 8,
    borderRadius: 2,
    paddingHorizontal: 12,
    width: '100%',
    fontWeight: 'bold',
    fontSize: 15,
  },
  addEventView: {
    position: 'absolute',
    bottom: 0,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  line: {
    backgroundColor: 'black',
    borderWidth: 0.2,
  },
});

export default App;
