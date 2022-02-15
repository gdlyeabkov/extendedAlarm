import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Switch, Button, Alert, BackHandler, CheckBox } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import * as SQLite from 'expo-sqlite'
import { TextInput } from 'react-native-gesture-handler'
import { Entypo } from '@expo/vector-icons'
import { AntDesign, Ionicons, MaterialIcons } from '@expo/vector-icons'
import {
  Paragraph,
  Dialog,
  Portal,
  Provider
} from 'react-native-paper'
import DateTimePicker from '@react-native-community/datetimepicker'

var db = null

export default function App() {
  const Stack = createStackNavigator();

  const testActivity = 'MainActivity'

  db = SQLite.openDatabase('alarmsdatabase.db')
  db.transaction(transaction => {
    let sqlStatement = "CREATE TABLE IF NOT EXISTS alarms (_id INTEGER PRIMARY KEY AUTOINCREMENT, time TEXT, date TEXT, isEnabled BOOLEAN);"
    transaction.executeSql(sqlStatement, [], (tx, receivedTable) => {
      sqlStatement = "CREATE TABLE IF NOT EXISTS cities (_id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT);"
      transaction.executeSql(sqlStatement, [], (tx, receivedTable) => {
        sqlStatement = "CREATE TABLE IF NOT EXISTS timers (_id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, hours TEXT, minutes TEXT, seconds TEXT);"
        transaction.executeSql(sqlStatement, [], (tx, receivedTable) => {
          
        })  
      })  
    })
  })

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={ testActivity }>
        <Stack.Screen name="MainActivity" component={ MainActivity } />
        <Stack.Screen name="AddAlarmActivity" component={ AddAlarmActivity } />
        <Stack.Screen
          name="AddWorldTimeActivity"
          component={ AddWorldTimeActivity }
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export function MainActivity({ navigation }) {
  
  const [repeatedHoursTimeLabels, setRepeatedHoursTimeLabels] = useState([
    '00',
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '21',
    '22',
    '23',
    '00',
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '21',
    '22',
    '23',
    '00',
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '21',
    '22',
    '23',
    '00',
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '21',
    '22',
    '23',
    '00',
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '21',
    '22',
    '23'
  ])
  
  const [repeatedMinutesTimeLabels, setRepeatedMinutesTimeLabels] = useState([
    '00',
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '21',
    '22',
    '23',
    '24',
    '25',
    '26',
    '27',
    '28',
    '29',
    '30',
    '31',
    '32',
    '33',
    '34',
    '35',
    '36',
    '37',
    '38',
    '39',
    '40',
    '41',
    '42',
    '43',
    '44',
    '45',
    '46',
    '47',
    '48',
    '49',
    '50',
    '51',
    '52',
    '53',
    '54',
    '55',
    '56',
    '57',
    '58',
    '59',
    '00',
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '21',
    '22',
    '23',
    '24',
    '25',
    '26',
    '27',
    '28',
    '29',
    '30',
    '31',
    '32',
    '33',
    '34',
    '35',
    '36',
    '37',
    '38',
    '39',
    '40',
    '41',
    '42',
    '43',
    '44',
    '45',
    '46',
    '47',
    '48',
    '49',
    '50',
    '51',
    '52',
    '53',
    '54',
    '55',
    '56',
    '57',
    '58',
    '59',
    '00',
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '21',
    '22',
    '23',
    '24',
    '25',
    '26',
    '27',
    '28',
    '29',
    '30',
    '31',
    '32',
    '33',
    '34',
    '35',
    '36',
    '37',
    '38',
    '39',
    '40',
    '41',
    '42',
    '43',
    '44',
    '45',
    '46',
    '47',
    '48',
    '49',
    '50',
    '51',
    '52',
    '53',
    '54',
    '55',
    '56',
    '57',
    '58',
    '59',
    '00',
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '21',
    '22',
    '23',
    '24',
    '25',
    '26',
    '27',
    '28',
    '29',
    '30',
    '31',
    '32',
    '33',
    '34',
    '35',
    '36',
    '37',
    '38',
    '39',
    '40',
    '41',
    '42',
    '43',
    '44',
    '45',
    '46',
    '47',
    '48',
    '49',
    '50',
    '51',
    '52',
    '53',
    '54',
    '55',
    '56',
    '57',
    '58',
    '59',
    '00',
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '21',
    '22',
    '23',
    '24',
    '25',
    '26',
    '27',
    '28',
    '29',
    '30',
    '31',
    '32',
    '33',
    '34',
    '35',
    '36',
    '37',
    '38',
    '39',
    '40',
    '41',
    '42',
    '43',
    '44',
    '45',
    '46',
    '47',
    '48',
    '49',
    '50',
    '51',
    '52',
    '53',
    '54',
    '55',
    '56',
    '57',
    '58',
    '59'
  ])

  const [repeatedSecondsTimeLabels, setRepeatedSecondsTimeLabels] = useState([
    '00',
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '21',
    '22',
    '23',
    '24',
    '25',
    '26',
    '27',
    '28',
    '29',
    '30',
    '31',
    '32',
    '33',
    '34',
    '35',
    '36',
    '37',
    '38',
    '39',
    '40',
    '41',
    '42',
    '43',
    '44',
    '45',
    '46',
    '47',
    '48',
    '49',
    '50',
    '51',
    '52',
    '53',
    '54',
    '55',
    '56',
    '57',
    '58',
    '59',
    '00',
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '21',
    '22',
    '23',
    '24',
    '25',
    '26',
    '27',
    '28',
    '29',
    '30',
    '31',
    '32',
    '33',
    '34',
    '35',
    '36',
    '37',
    '38',
    '39',
    '40',
    '41',
    '42',
    '43',
    '44',
    '45',
    '46',
    '47',
    '48',
    '49',
    '50',
    '51',
    '52',
    '53',
    '54',
    '55',
    '56',
    '57',
    '58',
    '59',
    '00',
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '21',
    '22',
    '23',
    '24',
    '25',
    '26',
    '27',
    '28',
    '29',
    '30',
    '31',
    '32',
    '33',
    '34',
    '35',
    '36',
    '37',
    '38',
    '39',
    '40',
    '41',
    '42',
    '43',
    '44',
    '45',
    '46',
    '47',
    '48',
    '49',
    '50',
    '51',
    '52',
    '53',
    '54',
    '55',
    '56',
    '57',
    '58',
    '59',
    '00',
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '21',
    '22',
    '23',
    '24',
    '25',
    '26',
    '27',
    '28',
    '29',
    '30',
    '31',
    '32',
    '33',
    '34',
    '35',
    '36',
    '37',
    '38',
    '39',
    '40',
    '41',
    '42',
    '43',
    '44',
    '45',
    '46',
    '47',
    '48',
    '49',
    '50',
    '51',
    '52',
    '53',
    '54',
    '55',
    '56',
    '57',
    '58',
    '59',
    '00',
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '21',
    '22',
    '23',
    '24',
    '25',
    '26',
    '27',
    '28',
    '29',
    '30',
    '31',
    '32',
    '33',
    '34',
    '35',
    '36',
    '37',
    '38',
    '39',
    '40',
    '41',
    '42',
    '43',
    '44',
    '45',
    '46',
    '47',
    '48',
    '49',
    '50',
    '51',
    '52',
    '53',
    '54',
    '55',
    '56',
    '57',
    '58',
    '59'
  ])

  const [ currentTab, setCurrentTab ] = useState([
    'Будильник'
  ])

  let initialAlarms = [
    {
      time: '11:00',
      date: '2022-01-01',
      isEnabled: true
    },
    {
      time: '12:00',
      date: '2022-01-05',
      isEnabled: false
    },
    {
      time: '17:30',
      date: '2022-01-07',
      isEnabled: true
    },
    {
      time: '22:35',
      date: '2022-01-10',
      isEnabled: false,
    }    
  ]
  initialAlarms = []
  
  const [alarmsTogglers, setAlarmsTogglers] = useState([])
  
  const [alarms, setAlarms] = useState(initialAlarms)

  let initialCities = [
    {
      id: 1,
      name: 'Лондон',
      minutes: '11',
      seconds: '00'
    },
    {
      id: 2,
      name: 'Пекин',
      minutes: '12',
      seconds: '00'
    }
  ]
  initialCities = []
  const [cities, setCities] = useState(initialCities)

  const [isStart, setIsStart] = useState(false)
  const millisecondsInSecond = 1000
  const [title, setTitle] = useState('00:00:00')
  const timePartsSeparator = ':'
  const initialSeconds = 0
  const initialMinutes = 0
  const countSecondsInMinute = 60
  const countMinutesInHour = 60
  const oneCharPrefix = 0
  const [startBtnBackgroundColor, setStartBtnBackgroundColor] = useState('rgb(0, 0, 255)')
  const stopColorBtn = 'rgb(255, 0, 0)'
  const stopBtnLabel = 'Стоп'
  const [startBtnContent, setStartBtnContent] = useState('Начать')
  const startColorBtn = 'rgb(0, 0, 255)'
  const resumeBtnLabel = 'Продолжить'
  const [isIntervalBtnDisabled, setIsIntervalBtnDisabled] = useState(true)
  const intervalBtnLabel = 'Интервал'
  const [intervalBtnContent, setIntervalBtnContent] = useState('Интервал')
  const [intervals, setIntervals] = useState([]) 
  const [startTimerTitle, setStartTimerTitle] = useState('00:00:00')
  const [isStartedTimerPause, setIsStartedTimerPause] = useState(false)
  let initialCustomTimers = [
    {
      name: 'my_custom_timer',
      minutes: '00',
      seconds: '00'
    },
    {
      name: '',
      minutes: '00',
      seconds: '00'
    },
    {
      name: '',
      minutes: '00',
      seconds: '00'
    },
    {
      name: '',
      minutes: '00',
      seconds: '00'
    },
    {
      name: '',
      minutes: '00',
      seconds: '00'
    }
  ]
  initialCustomTimers = []
  const [customTimers, setCustomTimers] = useState(initialCustomTimers)
  
  db.transaction(transaction => {
    const sqlStatement = "SELECT * FROM alarms;"
    transaction.executeSql(sqlStatement, [], (tx, receivedAlarms) => {
      let tempReceivedAlarms = []
      Array.from(receivedAlarms.rows).forEach((remoteAlarmRow, remoteAlarmRowIdx) => {
        const alarm = Object.values(receivedAlarms.rows.item(remoteAlarmRowIdx))
        tempReceivedAlarms = [
          ...tempReceivedAlarms,
          {
            id: alarm[0],
            name: '',
            time: alarm[1],
            date: alarm[2],
            isEnabled: alarm[3],
          }
        ]
      })
      setAlarms(tempReceivedAlarms)
    })
  })

  db.transaction(transaction => {
    const sqlStatement = "SELECT * FROM cities;"
    transaction.executeSql(sqlStatement, [], (tx, receivedCities) => {
      let tempReceivedCities = []
      Array.from(receivedCities.rows).forEach((remoteCityRow, remoteCityRowIdx) => {
        const city = Object.values(receivedCities.rows.item(remoteCityRowIdx))
        tempReceivedCities = [
          ...tempReceivedCities,
          {
            id: city[0],
            name: city[1]
          }
        ]

      })
      setCities(tempReceivedCities)
    })
  })
  
  db.transaction(transaction => {
    const sqlStatement = "SELECT * FROM timers;"
    transaction.executeSql(sqlStatement, [], (tx, receivedCities) => {
      let tempReceivedCities = []
      Array.from(receivedCities.rows).forEach((remoteCityRow, remoteCityRowIdx) => {
        const city = Object.values(receivedCities.rows.item(remoteCityRowIdx))
        tempReceivedCities = [
          ...tempReceivedCities,
          {
            id: city[0],
            name: city[1],
            hours: city[2],
            minutes: city[3],
            seconds: city[4]
          }
        ]

      })
      setCustomTimers(tempReceivedCities)
    })
  })

  const [timersTogglers, setTimersTogglers] = useState([])
  
  const [alarmsCheckboxes, setAlarmsCheckboxes] = useState([])

  const [citiesCheckboxes, setCitiesCheckboxes] = useState([])

  const [stopWatchTimer, setStopWatchTimer] = useState(null)
  
  const [stopWatchIntervalTimer, setStopWatchIntervalTimer] = useState(null)

  const [circleSeconds, setCircleSeconds] = useState(0)

  const [circleMinutes, setCircleMinutes] = useState(0)

  const [circleHours, setCircleHours] = useState(0)

  const [isDialogVisible, setIsDialogVisible] = useState(false)

  const [newCustomTimerTime, setNewCustomTimerTime] = useState('')
  
  const [newCustomTimerName, setNewCustomTimerName] = useState('')

  const pauseBtnColor = 'rgb(255, 0, 0)'

  const resumeBtnColor = 'rgb(0, 0, 255)'

  const pauseBtnContent = 'Пауза'

  const resumeBtnContent = 'Продолжить'
  
  const [startedTimerPauseBtnColor, setStartedTimerPauseBtnColor] = useState(pauseBtnColor)

  const [startedTimerPauseBtnСontent, setStartedTimerPauseBtnСontent] = useState(pauseBtnContent)

  const [startedTimer, setStartedTimer] = useState(null)

  const [startedTimerInitialHoursScroll, setStartedTimerInitialHoursScroll] = useState(null)

  const [startedTimerInitialMinutesScroll, setStartedTimerInitialMinutesScroll] = useState(null)

  const [startedTimerInitialSecondsScroll, setStartedTimerInitialSecondsScroll] = useState(null)

  const [startedTimerHoursTime, setStartedTimerHoursTime] = useState('00')

  const [startedTimerMinutesTime, setStartedTimerMinutesTime] = useState('00')

  const [startedTimerSecondsTime, setStartedTimerSecondsTime] = useState('00')

  const [isSelection, setIsSelection] = useState(false)
  
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', function () {
      const isAlarmsActivity = currentTab == 'Будильник'
      const isWorldTimeActivity = currentTab == 'Мировое время'
      const isSelectionActivities = isAlarmsActivity || isWorldTimeActivity
      if (isSelectionActivities) {
        setIsSelection(false)
        return true;
      }
      return false;
    })
  }, [])

  const startStopWatchTimer = () => {
    const isNotStart = !isStart
    if (isNotStart) {
      setIsIntervalBtnDisabled(false)
      setIntervalBtnContent()
      setStartBtnBackgroundColor(stopColorBtn)
      setStartBtnContent(stopBtnLabel)
      let lastStopWatchTimerTitle = title
      setStopWatchTimer(
        setInterval(() => {
          const timeParts = lastStopWatchTimerTitle.split(timePartsSeparator)
          const rawHours = timeParts[0]
          const rawMinutes = timeParts[1]
          const rawSeconds = timeParts[2]
          let hours = Number(rawHours)
          let minutes = Number(rawMinutes)
          let seconds = Number(rawSeconds)
          seconds = seconds + 1
          const isToggleSecond = seconds == countSecondsInMinute
          if (isToggleSecond) {
            seconds = initialSeconds
            minutes = minutes + 1
            const isToggleHour = minutes == countMinutesInHour
            if (isToggleHour) {
              minutes = initialMinutes
              hours = hours + 1
            }
          }
          let updatedHoursText = hours.toString()
          const countHoursChars = updatedHoursText.length
          const isAddHoursPrefix = countHoursChars == 1
          if (isAddHoursPrefix) {
            updatedHoursText = oneCharPrefix + updatedHoursText
          }
          let updatedMinutesText = minutes.toString()
          const countMinutesChars = updatedMinutesText.length
          const isAddMinutesPrefix = countMinutesChars == 1
          if (isAddMinutesPrefix) {
            updatedMinutesText = oneCharPrefix + updatedMinutesText
          }
          let updatedSecondsText = seconds.toString()
          const countSecondsChars = updatedSecondsText.length
          const isAddSecondsPrefix = countSecondsChars === 1
          if (isAddSecondsPrefix) {
            updatedSecondsText = oneCharPrefix + updatedSecondsText
          }
          const currentTime = `${updatedHoursText}:${updatedMinutesText}:${updatedSecondsText}`
          setTitle(currentTime)
          lastStopWatchTimerTitle = currentTime
        }, millisecondsInSecond)
      )
    } else {
      setStartBtnBackgroundColor(startColorBtn)
      setStartBtnContent(resumeBtnLabel)
      clearInterval(stopWatchTimer)
      setStopWatchTimer(null)
    }
    setIsStart(!isStart)
  }

  const runStartedTimer = () => {
    const initialStartedTitle = `${startedTimerHoursTime}:${startedTimerMinutesTime}:${startedTimerSecondsTime}`
    setStartTimerTitle(initialStartedTitle)
    let lastStartedTimerTitle = `${startedTimerHoursTime}:${startedTimerMinutesTime}:${startedTimerSecondsTime}`
    setStartedTimer(
      setInterval(() => {
        const timeParts = lastStartedTimerTitle.split(timePartsSeparator)
        const rawHours = timeParts[0]
        const rawMinutes = timeParts[1]
        const rawSeconds = timeParts[2]
        let hours = Number(rawHours)
        let minutes = Number(rawMinutes)
        let seconds = Number(rawSeconds)
        console.log(`hours: ${hours}, minutes: ${minutes}, seconds: ${seconds}; ${startedTimerHoursTime}:${startedTimerMinutesTime}:${startedTimerSecondsTime}`)
        if (minutes >= 0) {
          seconds = seconds - 1
        }
        const isToggleSecond = seconds == -1
        if (isToggleSecond) {
          seconds = 59
          minutes = minutes - 1
          const isToggleHour = minutes == -1
          if (isToggleHour) {
            minutes = 59
            hours = hours - 1
          }
        }
        let updatedHoursText = hours.toString()
        const countHoursChars = updatedHoursText.length
        const isAddHoursPrefix = countHoursChars == 1
        if (isAddHoursPrefix) {
          updatedHoursText = oneCharPrefix + updatedHoursText
        }
        let updatedMinutesText = minutes.toString()
        const countMinutesChars = updatedMinutesText.length
        const isAddMinutesPrefix = countMinutesChars == 1
        if (isAddMinutesPrefix) {
          updatedMinutesText = oneCharPrefix + updatedMinutesText
        }
        let updatedSecondsText = seconds.toString()
        const countSecondsChars = updatedSecondsText.length
        const isAddSecondsPrefix = countSecondsChars === 1
        if (isAddSecondsPrefix) {
          updatedSecondsText = oneCharPrefix + updatedSecondsText
        }
        const currentTime = `${updatedHoursText}:${updatedMinutesText}:${updatedSecondsText}`
        setStartTimerTitle(currentTime)
        lastStartedTimerTitle = currentTime
      
        // const isTimerOver = seconds <= 0 && hours <= 0 && minutes <= 0
        // const isTimerOver = hours < 0
        // const isTimerOver = lastStartedTimerTitle === '00:00:00'
        const isTimerOver = false
        if (isTimerOver) {
          resetStartedTimer()
          setCurrentTab('Таймер')
          return;
        }

      }, millisecondsInSecond)
    )
  }

  const resetStartedTimer = () => {
    setStartedTimerPauseBtnСontent(resumeBtnContent)
    setStartedTimerPauseBtnColor(resumeBtnColor)

    clearInterval(startedTimer)
    setStartedTimer(null)
  }

  return (
    <View style={styles.backDrop}>
      {
        currentTab == 'Будильник' ?
          <View>
            <Text style={styles.alarmsTabTitle}>
              {'Все будильники\nотключены'}
            </Text>
            <View style={styles.alarmsTabBtns}>
              <TouchableOpacity style={styles.footerTabLabel} onPress={() => {
                console.log('создаю Будильник')
                navigation.navigate('AddAlarmActivity')
              }}>
                <Feather style={styles.alarmsTabBtn} name="plus" size={24} color="black" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.footerTabLabel} onPress={() => {
                console.log('открываю контекстное меню Будильников')
              }}>
                <Feather style={styles.alarmsTabBtn} name="more-vertical" size={24} color="black" />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.alarms}>
              {
                alarms.length >= 1 ?
                  alarms.map((alarm, alarmIndex) => {
                    return (
                      <View
                        style={styles.alarm} key={alarmIndex}
                        onPress={() => {
                          console.log('создаю Будильник')
                          navigation.navigate('AddAlarmActivity')
                        }}
                        onLongPress={() => {
                          console.log('создаю дополнительное меню Будильника')
                          /*
                            пока выделение не получется
                            alarmsCheckboxes[alarmIndex] = true
                          */
                          setIsSelection(true)
                        }}
                      >
                        {
                          isSelection ?
                            <CheckBox
                              value={alarmsCheckboxes[alarmIndex]}
                              onValueChange={() => {
                                alarmsCheckboxes[alarmIndex] = !alarmsCheckboxes[alarmIndex]
                              }}  
                            />
                          :
                          <View>
                            
                          </View>
                        }
                        <TouchableOpacity
                          style={styles.alarm} key={alarmIndex}
                          onPress={() => {
                            console.log('создаю Будильник')
                            navigation.navigate('AddAlarmActivity')
                          }}
                          onLongPress={() => {
                            console.log('создаю дополнительное меню Будильника')
                            setIsSelection(true)
                          }}
                        >
                          <Text style={styles.alarmTime}>
                            {
                              alarm.time
                            }
                          </Text>
                        </TouchableOpacity>
                        <View style={styles.alarmAside}>
                          <Text style={styles.alarmDate}>
                            {
                              alarm.date
                            }
                          </Text>
                          <Switch
                            onValueChange={() => {
                              alarmsTogglers[alarmIndex] = !alarmsTogglers[alarmIndex]
                              console.log(alarmsTogglers)
                            }}
                            value={alarmsTogglers[alarmIndex]}
                          />
                        </View>
                      </View>
                    )
                  })
                :
                  <View>
                    <Text style={styles.notFoundAlarms}>
                      Нет установленных будильников
                    </Text>
                  </View>
              }
            </ScrollView>
          </View>
        : currentTab == 'Мировое время' ?
          <View>
            <View style={styles.worldTimeTabHeader}>
              <Text style={styles.worldTimeTabTitle}>
                10:06:25
              </Text>
              <Text style={styles.worldTimeTabSubTitle}>
                Москва, стандартное время
              </Text>
            </View>
            <View style={styles.alarmsTabBtns}>
              <TouchableOpacity style={styles.footerTabLabel} onPress={() => {
                console.log('создаю Будильник')
                navigation.navigate('AddWorldTimeActivity', {
                  action: 'add',
                  id: 0
                })
              }}>
                <Feather style={styles.alarmsTabBtn} name="plus" size={24} color="black" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.footerTabLabel} onPress={() => {
                console.log('открываю контекстное меню Будильников')
              }}>
                <Feather style={styles.alarmsTabBtn} name="more-vertical" size={24} color="black" />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.alarms}>
              {
                cities.length >= 1 ?
                cities.map((city, cityIndex) => {
                    return (
                      <View
                        style={styles.alarm}
                        key={cityIndex}
                        onPress={() => {
                          navigation.navigate('AddWorldTimeActivity', {
                            action: 'change',
                            id: city.id
                          })
                        }}
                        onLongPress={() => {
                          console.log('создаю дополнительное меню города')
                          setIsSelection(true)
                        }}
                      >
                        {
                          isSelection ?
                            <CheckBox
                              value={citiesCheckboxes[cityIndex]}
                              onValueChange={() => {
                                citiesCheckboxes[cityIndex] = !citiesCheckboxes[cityIndex]
                              }}  
                            />
                          :
                          <View>
                            
                          </View>
                        }
                        <TouchableOpacity
                          style={styles.alarm}
                          key={cityIndex}
                          onPress={() => {
                            navigation.navigate('AddWorldTimeActivity', {
                              action: 'change',
                              id: city.id
                            })
                          }}
                          onLongPress={() => {
                            console.log('создаю дополнительное меню города')
                            setIsSelection(true)
                          }}
                        >
                          <View>
                            <Text style={styles.cityName}>
                              {
                                city.name
                              }
                            </Text>
                            <Text style={styles.alarmDate}>
                              На 5 ч. позже
                            </Text>
                          </View>
                        </TouchableOpacity>
                        <Text style={styles.alarmTime}>
                          {
                            city.time
                          }
                        </Text>
                      </View>
                    )
                  })
                :
                  <View>
                    <Text style={styles.notFoundAlarms}>
                      Нет установленного мирового времени
                    </Text>
                  </View>
              }
            </ScrollView>
          </View>
        : currentTab == 'Секундомер' ?
        <View>
          <View style={styles.alarmsTabBtns}>
            <TouchableOpacity style={styles.footerTabLabel} onPress={() => {
              console.log('открываю контекстное меню Будильников')
            }}>
              <Feather style={styles.alarmsTabBtn} name="more-vertical" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <Text style={styles.stopwatchTitle}>
            {
              title
            }
          </Text>
          <View style={{
            display: intervals.length <= 0 ? 'none' : 'block'
          }}>
            <View style={styles.intervalsItem}>
              <Text style={styles.intervalsItemLabel}>
                Круг
              </Text>
              <Text style={styles.intervalsItemLabel}>
                Время круга
              </Text>
              <Text style={styles.intervalsItemLabel}>
                Общее время
              </Text>
            </View>
            {
              intervals.map((interval, intervalIndex) => {
                return (
                  <View key={intervalIndex} style={styles.intervalsItem}>
                    <Text style={styles.intervalsItemLabel}>
                      {
                        interval.circle
                      }
                    </Text>
                    <Text style={styles.intervalsItemLabel}>
                      {
                        interval.circleTime
                      }
                    </Text>
                    <Text style={styles.intervalsItemLabel}>
                      {
                        interval.totalTime
                      }
                    </Text>
                  </View>
                )
              })
            }
          </View>
          <View style={styles.stopwatchBtns}>
            <View  style={styles.stopwatchBtn}>
              <Button
                title="Интервал"
                style={styles.stopwatchIntervalBtn}
                color={'rgb(200, 200, 200)'}
                disabled={isIntervalBtnDisabled}
                onPress={() => {
                  const circlesCount = intervals.length + 1
                  let circleLabelContent = circlesCount.toString() 
                  const isCirclesTop9 = circlesCount <= 9
                  if (isCirclesTop9) {
                    circleLabelContent = oneCharPrefix + circleLabelContent
                  }
                  
                  let parsedCircleSeconds = circleSeconds.toString()
                  const countSecondsChars = parsedCircleSeconds.length
                  const isAddSecondsPrefix = countSecondsChars === 1
                  if (isAddSecondsPrefix) {
                    parsedCircleSeconds = oneCharPrefix + parsedCircleSeconds
                  }
                  let parsedCircleMinutes = circleMinutes.toString()
                  const countMinutesChars = parsedCircleMinutes.length
                  const isAddMinutesPrefix = countMinutesChars === 1
                  if (isAddMinutesPrefix) {
                    parsedCircleMinutes = oneCharPrefix + parsedCircleMinutes
                  }
                  let parsedCircleHours = circleHours.toString()
                  const countHoursChars = parsedCircleHours.length
                  const isAddHoursPrefix = countHoursChars == 1
                  if (isAddHoursPrefix) {
                    parsedCircleHours = oneCharPrefix + parsedCircleHours
                  }
                  
                  const circlTimeLabel = parsedCircleHours + timePartsSeparator + parsedCircleMinutes + timePartsSeparator + parsedCircleSeconds
                  const interval = {
                    circle: circleLabelContent,
                    circleTime: circlTimeLabel,
                    totalTime: title
                  }
                  setIntervals([
                    interval,
                    ...intervals
                  ])
                  if (stopWatchIntervalTimer !== null) {
                    clearInterval(stopWatchIntervalTimer)
                    setStopWatchIntervalTimer(null)
                    setCircleHours(0)
                    setCircleMinutes(0)
                    setCircleSeconds(0)  
                  }
                  let newCircleHours = 0
                  let newCircleMinutes = 0
                  let newCircleSeconds = 0
                  setStopWatchIntervalTimer(
                    setInterval(() => {
                      
                      newCircleSeconds++
                      setCircleSeconds(newCircleSeconds)
                      const isToggleSecond = circleSeconds === countSecondsInMinute
                      if (isToggleSecond) {
                        newCircleSeconds = initialSeconds
                        setCircleSeconds(newCircleSeconds)
                        newCircleMinutes++
                        setCircleMinutes(newCircleMinutes)
                        const isToggleHour = circleMinutes === countMinutesInHour
                        if (isToggleHour) {
                          newCircleMinutes = initialMinutes
                          setCircleMinutes(newCircleMinutes)
                          newCircleHours++
                          setCircleHours(newCircleHours)
                        }
                      }
                      
                    }, millisecondsInSecond)
                  )
                }}
              />
            </View>
            <View  style={styles.stopwatchBtn}>
              <Button onPress={() => {
                startStopWatchTimer()
              }} color={startBtnBackgroundColor} title={startBtnContent} />
            </View>
          </View>
        </View>
        : currentTab == 'Таймер' ?
        <View>
          <View style={styles.alarmsTabBtns}>
            <TouchableOpacity
              style={styles.footerTabLabel}
              onPress={() => {
                setIsDialogVisible(true)
              }}
            >
              <Feather style={styles.alarmsTabBtn} name="plus" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.footerTabLabel} onPress={() => {
              console.log('открываю контекстное меню Таймера')
            }}>
              <Feather style={styles.alarmsTabBtn} name="more-vertical" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <View style={styles.timerTable}>
            <ScrollView
              style={styles.timerTableItem}
              ref={(ref) => {
                setStartedTimerInitialHoursScroll(ref)
              }}
              onScroll={(ref) => {
                const event = ref.nativeEvent
                const offset = event.contentOffset
                const verticalOffset = offset.y
                const correctScrollOffset = verticalOffset / 45
                const repeatedHoursTimeLabelsIndex = Number.parseInt(correctScrollOffset)
                const hoursTime = repeatedHoursTimeLabels[repeatedHoursTimeLabelsIndex]
                setStartedTimerHoursTime(hoursTime)
                console.log(`verticalOffset: ${verticalOffset}; hoursTime: ${hoursTime}`)
              }}
            >
              <Text style={styles.timerTableItemHeader}>
                ч.
              </Text>
              <Text style={styles.timerTableItemLabel}>
                00
              </Text>
              <Text style={styles.timerTableItemLabel}>
                01
              </Text>
              <Text style={styles.timerTableItemLabel}>
                02
              </Text>
              <Text style={styles.timerTableItemLabel}>
                03
              </Text>
              <Text style={styles.timerTableItemLabel}>
                04
              </Text>
              <Text style={styles.timerTableItemLabel}>
                05
              </Text>
              <Text style={styles.timerTableItemLabel}>
                06
              </Text>
              <Text style={styles.timerTableItemLabel}>
                07
              </Text>
              <Text style={styles.timerTableItemLabel}>
                08
              </Text>
              <Text style={styles.timerTableItemLabel}>
                09
              </Text>
              <Text style={styles.timerTableItemLabel}>
                10
              </Text>
              <Text style={styles.timerTableItemLabel}>
                11
              </Text>
              <Text style={styles.timerTableItemLabel}>
                12
              </Text>
              <Text style={styles.timerTableItemLabel}>
                13
              </Text>
              <Text style={styles.timerTableItemLabel}>
                14
              </Text>
              <Text style={styles.timerTableItemLabel}>
                15
              </Text>
              <Text style={styles.timerTableItemLabel}>
                16
              </Text>
              <Text style={styles.timerTableItemLabel}>
                17
              </Text>
              <Text style={styles.timerTableItemLabel}>
                18
              </Text>
              <Text style={styles.timerTableItemLabel}>
                19
              </Text>
              <Text style={styles.timerTableItemLabel}>
                20
              </Text>
              <Text style={styles.timerTableItemLabel}>
                21
              </Text>
              <Text style={styles.timerTableItemLabel}>
                22
              </Text>
              <Text style={styles.timerTableItemLabel}>
                23
              </Text>
              <Text style={styles.timerTableItemLabel}>
                24
              </Text>
            </ScrollView>
            <ScrollView
              style={styles.timerTableItem}
              ref={(ref) => {
                setStartedTimerInitialMinutesScroll(ref)
              }}
              onScroll={(ref) => {
                const event = ref.nativeEvent
                const offset = event.contentOffset
                const verticalOffset = offset.y
                const correctScrollOffset = verticalOffset / 45
                const repeatedMinutesTimeLabelsIndex = Number.parseInt(correctScrollOffset)
                const minutesTime = repeatedMinutesTimeLabels[repeatedMinutesTimeLabelsIndex]
                setStartedTimerMinutesTime(minutesTime)
                console.log(`verticalOffset: ${verticalOffset}; minutesTime: ${minutesTime}`)
              }}
            >
              <Text style={styles.timerTableItemHeader}>
                мин.
              </Text>
              <Text style={styles.timerTableItemLabel}>
                00
              </Text>
              <Text style={styles.timerTableItemLabel}>
                01
              </Text>
              <Text style={styles.timerTableItemLabel}>
                02
              </Text>
              <Text style={styles.timerTableItemLabel}>
                03
              </Text>
              <Text style={styles.timerTableItemLabel}>
                04
              </Text>
              <Text style={styles.timerTableItemLabel}>
                05
              </Text>
              <Text style={styles.timerTableItemLabel}>
                06
              </Text>
              <Text style={styles.timerTableItemLabel}>
                07
              </Text>
              <Text style={styles.timerTableItemLabel}>
                08
              </Text>
              <Text style={styles.timerTableItemLabel}>
                09
              </Text>
              <Text style={styles.timerTableItemLabel}>
                10
              </Text>
              <Text style={styles.timerTableItemLabel}>
                11
              </Text>
              <Text style={styles.timerTableItemLabel}>
                12
              </Text>
              <Text style={styles.timerTableItemLabel}>
                13
              </Text>
              <Text style={styles.timerTableItemLabel}>
                14
              </Text>
              <Text style={styles.timerTableItemLabel}>
                15
              </Text>
              <Text style={styles.timerTableItemLabel}>
                16
              </Text>
              <Text style={styles.timerTableItemLabel}>
                17
              </Text>
              <Text style={styles.timerTableItemLabel}>
                18
              </Text>
              <Text style={styles.timerTableItemLabel}>
                19
              </Text>
              <Text style={styles.timerTableItemLabel}>
                20
              </Text>
              <Text style={styles.timerTableItemLabel}>
                21
              </Text>
              <Text style={styles.timerTableItemLabel}>
                22
              </Text>
              <Text style={styles.timerTableItemLabel}>
                23
              </Text>
              <Text style={styles.timerTableItemLabel}>
                24
              </Text>
              <Text style={styles.timerTableItemLabel}>
                25
              </Text>
              <Text style={styles.timerTableItemLabel}>
                26
              </Text>
              <Text style={styles.timerTableItemLabel}>
                27
              </Text>
              <Text style={styles.timerTableItemLabel}>
                28
              </Text>
              <Text style={styles.timerTableItemLabel}>
                29
              </Text>
              <Text style={styles.timerTableItemLabel}>
                30
              </Text>
              <Text style={styles.timerTableItemLabel}>
                31
              </Text>
              <Text style={styles.timerTableItemLabel}>
                32
              </Text>
              <Text style={styles.timerTableItemLabel}>
                33
              </Text>
              <Text style={styles.timerTableItemLabel}>
                34
              </Text>
              <Text style={styles.timerTableItemLabel}>
                35
              </Text>
              <Text style={styles.timerTableItemLabel}>
                36
              </Text>
              <Text style={styles.timerTableItemLabel}>
                37
              </Text>
              <Text style={styles.timerTableItemLabel}>
                38
              </Text>
              <Text style={styles.timerTableItemLabel}>
                39
              </Text>
              <Text style={styles.timerTableItemLabel}>
                40
              </Text>
              <Text style={styles.timerTableItemLabel}>
                41
              </Text>
              <Text style={styles.timerTableItemLabel}>
                42
              </Text>
              <Text style={styles.timerTableItemLabel}>
                43
              </Text>
              <Text style={styles.timerTableItemLabel}>
                44
              </Text>
              <Text style={styles.timerTableItemLabel}>
                45
              </Text>
              <Text style={styles.timerTableItemLabel}>
                46
              </Text>
              <Text style={styles.timerTableItemLabel}>
                47
              </Text>
              <Text style={styles.timerTableItemLabel}>
                48
              </Text>
              <Text style={styles.timerTableItemLabel}>
                49
              </Text>
              <Text style={styles.timerTableItemLabel}>
                50
              </Text>
              <Text style={styles.timerTableItemLabel}>
                51
              </Text>
              <Text style={styles.timerTableItemLabel}>
                52
              </Text>
              <Text style={styles.timerTableItemLabel}>
                53
              </Text>
              <Text style={styles.timerTableItemLabel}>
                54
              </Text>
              <Text style={styles.timerTableItemLabel}>
                55
              </Text>
              <Text style={styles.timerTableItemLabel}>
                56
              </Text>
              <Text style={styles.timerTableItemLabel}>
                57
              </Text>
              <Text style={styles.timerTableItemLabel}>
                58
              </Text>
              <Text style={styles.timerTableItemLabel}>
                59
              </Text>
            </ScrollView>
            <ScrollView
              ref={(ref) => setStartedTimerInitialSecondsScroll(ref)}
              style={styles.timerTableItem}
              onScroll={(ref) => {
                const event = ref.nativeEvent
                const offset = event.contentOffset
                const verticalOffset = offset.y
                const correctScrollOffset = verticalOffset / 45
                const repeatedSecondsTimeLabelsIndex = Number.parseInt(correctScrollOffset)
                const secondsTime = repeatedSecondsTimeLabels[repeatedSecondsTimeLabelsIndex]
                setStartedTimerSecondsTime(secondsTime)
                console.log(`verticalOffset: ${verticalOffset}; secondsTime: ${secondsTime}`)
              }}
            >
              <Text style={styles.timerTableItemHeader}>
                сек.
              </Text>
              <Text style={styles.timerTableItemLabel}>
                00
              </Text>
              <Text style={styles.timerTableItemLabel}>
                01
              </Text>
              <Text style={styles.timerTableItemLabel}>
                02
              </Text>
              <Text style={styles.timerTableItemLabel}>
                03
              </Text>
              <Text style={styles.timerTableItemLabel}>
                04
              </Text>
              <Text style={styles.timerTableItemLabel}>
                05
              </Text>
              <Text style={styles.timerTableItemLabel}>
                06
              </Text>
              <Text style={styles.timerTableItemLabel}>
                07
              </Text>
              <Text style={styles.timerTableItemLabel}>
                08
              </Text>
              <Text style={styles.timerTableItemLabel}>
                09
              </Text>
              <Text style={styles.timerTableItemLabel}>
                10
              </Text>
              <Text style={styles.timerTableItemLabel}>
                11
              </Text>
              <Text style={styles.timerTableItemLabel}>
                12
              </Text>
              <Text style={styles.timerTableItemLabel}>
                13
              </Text>
              <Text style={styles.timerTableItemLabel}>
                14
              </Text>-
              <Text style={styles.timerTableItemLabel}>
                15
              </Text>
              <Text style={styles.timerTableItemLabel}>
                16
              </Text>
              <Text style={styles.timerTableItemLabel}>
                17
              </Text>
              <Text style={styles.timerTableItemLabel}>
                18
              </Text>
              <Text style={styles.timerTableItemLabel}>
                19
              </Text>
              <Text style={styles.timerTableItemLabel}>
                20
              </Text>
              <Text style={styles.timerTableItemLabel}>
                21
              </Text>
              <Text style={styles.timerTableItemLabel}>
                22
              </Text>
              <Text style={styles.timerTableItemLabel}>
                23
              </Text>
              <Text style={styles.timerTableItemLabel}>
                24
              </Text>
              <Text style={styles.timerTableItemLabel}>
                25
              </Text>
              <Text style={styles.timerTableItemLabel}>
                26
              </Text>
              <Text style={styles.timerTableItemLabel}>
                27
              </Text>
              <Text style={styles.timerTableItemLabel}>
                28
              </Text>
              <Text style={styles.timerTableItemLabel}>
                29
              </Text>
              <Text style={styles.timerTableItemLabel}>
                30
              </Text>
              <Text style={styles.timerTableItemLabel}>
                31
              </Text>
              <Text style={styles.timerTableItemLabel}>
                32
              </Text>
              <Text style={styles.timerTableItemLabel}>
                33
              </Text>
              <Text style={styles.timerTableItemLabel}>
                34
              </Text>
              <Text style={styles.timerTableItemLabel}>
                35
              </Text>
              <Text style={styles.timerTableItemLabel}>
                36
              </Text>
              <Text style={styles.timerTableItemLabel}>
                37
              </Text>
              <Text style={styles.timerTableItemLabel}>
                38
              </Text>
              <Text style={styles.timerTableItemLabel}>
                39
              </Text>
              <Text style={styles.timerTableItemLabel}>
                40
              </Text>
              <Text style={styles.timerTableItemLabel}>
                41
              </Text>
              <Text style={styles.timerTableItemLabel}>
                42
              </Text>
              <Text style={styles.timerTableItemLabel}>
                43
              </Text>
              <Text style={styles.timerTableItemLabel}>
                44
              </Text>
              <Text style={styles.timerTableItemLabel}>
                45
              </Text>
              <Text style={styles.timerTableItemLabel}>
                46
              </Text>
              <Text style={styles.timerTableItemLabel}>
                47
              </Text>
              <Text style={styles.timerTableItemLabel}>
                48
              </Text>
              <Text style={styles.timerTableItemLabel}>
                49
              </Text>
              <Text style={styles.timerTableItemLabel}>
                50
              </Text>
              <Text style={styles.timerTableItemLabel}>
                51
              </Text>
              <Text style={styles.timerTableItemLabel}>
                52
              </Text>
              <Text style={styles.timerTableItemLabel}>
                53
              </Text>
              <Text style={styles.timerTableItemLabel}>
                54
              </Text>
              <Text style={styles.timerTableItemLabel}>
                55
              </Text>
              <Text style={styles.timerTableItemLabel}>
                56
              </Text>
              <Text style={styles.timerTableItemLabel}>
                57
              </Text>
              <Text style={styles.timerTableItemLabel}>
                58
              </Text>
              <Text style={styles.timerTableItemLabel}>
                59
              </Text>
            </ScrollView>
            <ScrollView>
              
            </ScrollView>
            <ScrollView>
              
            </ScrollView>
          </View>
          <View style={styles.timerBtns}>
            <ScrollView style={styles.customTimers} horizontal={true}>
              {
                customTimers.map((customTimer, customTimerIndex) => {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        const isNeedClearTimers = !timersTogglers[customTimerIndex]
                        if (isNeedClearTimers) {
                          timersTogglers.fill(false)
                        }
                        timersTogglers[customTimerIndex] = !timersTogglers[customTimerIndex]
                        let correctScrollOffset = Number.parseInt(startedTimerHoursTime)
                        let verticalOffset = correctScrollOffset * 45
                        startedTimerInitialHoursScroll.scrollTo({
                          x: 0,
                          y: verticalOffset
                        })
                        correctScrollOffset = Number.parseInt(startedTimerMinutesTime)
                        verticalOffset = correctScrollOffset * 45
                        startedTimerInitialMinutesScroll.scrollTo({
                          x: 0,
                          y: verticalOffset
                        })
                        correctScrollOffset = Number.parseInt(startedTimerSecondsTime)
                        verticalOffset = correctScrollOffset * 45
                        startedTimerInitialSecondsScroll.scrollTo({
                          x: 0,
                          y: verticalOffset
                        })
                        
                      }}
                      style={
                        [
                          styles.customTimer,
                          timersTogglers[customTimerIndex] ? styles.activatedCustomTimer : styles.deactivatedCustomTimer
                        ]
                      }
                      key={customTimerIndex}
                    >
                      <Text style={styles.customTimerTitle}>
                        {
                          customTimer.name.length >= 1 ?
                            `${customTimer.name}\n${customTimer.hours}:${customTimer.minutes}:${customTimer.seconds}`
                          :
                          `${customTimer.hours}:${customTimer.minutes}:${customTimer.seconds}`
                        }
                      </Text>
                    </TouchableOpacity>
                  )
                })
              }
            </ScrollView>
            <View style={styles.timerBtn}>
              <Button
                title="Начать"
                onPress={() => {
                  let initialStartedTitle = ''
                  initialStartedTitle = `${startedTimerHoursTime}:${startedTimerMinutesTime}:${startedTimerSecondsTime}`
                  setCurrentTab('TimerStart')
                  runStartedTimer()
                  setStartTimerTitle(initialStartedTitle)
                }}
              />
            </View>
          </View>
          <Dialog
            visible={isDialogVisible}
            onDismiss={() => setIsDialogVisible(false)}>
            <Dialog.Title>Username</Dialog.Title>
            <Dialog.Content>
              <TextInput
                value={newCustomTimerTime}
                onChangeText={text => setNewCustomTimerTime(text)}
              />
              <TextInput
                value={newCustomTimerName}
                onChangeText={text => setNewCustomTimerName(text)}
              />
            </Dialog.Content>
            <Dialog.Actions>
              <Button title="Добавить" onPress={() => {
                console.log(`создаю Таймер: newCustomTimerName: ${newCustomTimerName}; newCustomTimerTime: ${newCustomTimerTime}`)
                const timerName = newCustomTimerName
                const possibleTime = newCustomTimerTime.split(':')
                const isTime = possibleTime.length === 3
                if (isTime) {
                  let timerHours = '00'
                  timerHours = possibleTime[0]
                  let timerMinutes = '00'
                  timerHours = possibleTime[1]
                  let timerSeconds = '00'
                  timerSeconds = possibleTime[2]
                  let sqlStatement = `INSERT INTO \"timers\"(name, hours, minutes, seconds) VALUES (\"${timerName}\", \"${timerHours}\", \"${timerMinutes}\", \"${timerSeconds}\");`
                  db.transaction(transaction => {
                    transaction.executeSql(sqlStatement, [], (tx, receivedTimers) => {
                      
                    }, (tx) => {
                      console.log('ошибка получения таймеров')
                    })
                  })
                  setIsDialogVisible(false)
                }
              }}>Done</Button>
            </Dialog.Actions>
          </Dialog>
        </View>
        : currentTab == 'TimerStart' ?
        <View>
          <View style={styles.alarmsTabBtns}>
            <TouchableOpacity style={styles.footerTabLabel} onPress={() => {
              console.log('создаю Таймер')
            }}>
              <Feather style={styles.alarmsTabBtn} name="plus" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.footerTabLabel} onPress={() => {
              console.log('открываю контекстное меню Таймера')
            }}>
              <Feather style={styles.alarmsTabBtn} name="more-vertical" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <View style={styles.startTimerLabelContainer}>
            <View style={styles.startTimerLabelBlock}>
              <Text style={styles.startTimerLabel}>
                {
                  startTimerTitle
                }
              </Text>
            </View>
          </View>
          <View style={styles.startTimerBtns}>
            <View  style={styles.startTimerBtn}>
              <Button
                title="Отмена"
                onPress={() => {
                  setCurrentTab('Таймер')
                  resetStartedTimer()
                  setStartedTimerPauseBtnСontent('Начать')
                }}  
              />
            </View>
            <View  style={styles.startTimerBtn}>
              <Button
                color={startedTimerPauseBtnColor}
                title={startedTimerPauseBtnСontent}
                onPress={() => {
                  if (isStartedTimerPause) {
                    
                    setStartedTimerPauseBtnСontent(pauseBtnContent)
                    setStartedTimerPauseBtnColor(pauseBtnColor)

                    runStartedTimer()

                  } else {

                    resetStartedTimer()
                    
                  }
                  setIsStartedTimerPause(value => !value)
                }}
              />
            </View>
          </View>
        </View>
        :
        <View />
      }
      {
        !isSelection ?
          <View style={styles.footerTabsRow}>
            <TouchableOpacity
              style={styles.footerTabLabel}
              onPress={() => {
                console.log('Меняю вкладку на Будильник')
                setCurrentTab('Будильник')
              }}
            >
              <Text
                style={
                  [
                    currentTab == 'Будильник' ? styles.activeFooterTabLabel : ''
                  ]
                }
              >
                Будильник
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.footerTabLabel}
              onPress={() => {
                console.log('Меняю вкладку на Мировое время')
                setCurrentTab('Мировое время')
              }}
            >
              <Text
                style={
                  [currentTab == 'Мировое время' ? styles.activeFooterTabLabel : '']
                }
              >
                Мировое время
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.footerTabLabel}
              onPress={() => {
                console.log('Меняю вкладку на Секундомер')
                setCurrentTab('Секундомер')
              }}
            >
              <Text
                style={
                  [
                    currentTab == 'Секундомер' ? styles.activeFooterTabLabel : ''
                  ]
                }
              >
                Секундомер
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.footerTabLabel} onPress={() => {
              console.log('Меняю вкладку на Таймер')
              setCurrentTab('Таймер')
            }}>
              <Text
                style={
                  [
                    currentTab === 'Таймер' || currentTab === 'TimerStart'  ? styles.activeFooterTabLabel : ''
                  ]
                }
              >
                Таймер
              </Text>
            </TouchableOpacity>
          </View>
        :
        <View style={styles.selectionFooter}>
          <TouchableOpacity
            style={styles.selectionFooterItem}
            onPress={() => {
              const isAlarmActivity = currentTab == 'Будильник'
              const isWorldTimeActivity = currentTab == 'Мировое время'
              if (isAlarmActivity) {
                alarmsCheckboxes.map((alarmsCheckbox, alarmsCheckboxIndex) => {
                  // здесь
                  db.transaction(transaction => {
                    const alarmId = alarms[alarmsCheckboxIndex].id
                    const sqlStatement = `DELETE FROM alarms WHERE _id=${alarmId};`
                    transaction.executeSql(sqlStatement, [], (tx, receivedAlarms) => {
                      // удаляем виджеты
                      const updatedAlarms = alarms.filter((alarm, alarmIndex) => {
                        // return alarmIndex !== alarmsCheckboxIndex
                        return alarm.id !== alarmId
                      })
                      setAlarms(updatedAlarms)
                      setAlarmsCheckboxes([])
                      setIsSelection(false)
                    })
                  })
                })
              } else if (isWorldTimeActivity) {
                citiesCheckboxes.map((citiesCheckbox, citiesCheckboxIndex) => {
                  // здесь
                  db.transaction(transaction => {
                    const cityId = cities[citiesCheckboxIndex].id
                    const sqlStatement = `DELETE FROM cities WHERE _id=${cityId};`
                    transaction.executeSql(sqlStatement, [], (tx, receivedCities) => {
                      // удаляем виджеты
                      const updatedCities = cities.filter((alarm, alarmIndex) => {
                        return city.id !== cityId
                      })
                      setCities(updatedCities)
                      setCitiesCheckboxes([])
                      setIsSelection(false)
                    })
                  })
                })
              }
            }}
          >
            <MaterialIcons name="delete" size={24} color="black" />
            <Text>
              Удалить
            </Text>
          </TouchableOpacity>
          {
            currentTab == 'Будильник' ?
              <TouchableOpacity
                style={styles.selectionFooterItem}
                onPress={() => {
                  const isAlarmActivity = currentTab == 'Будильник'
                  if (isAlarmActivity) {
                    alarmsCheckboxes.map((alarmCheckbox, alarmCheckboxIndex) => {
                      db.transaction(transaction => {
                        const alarmId = alarms[alarmCheckboxIndex].id
                        const alarmIsEnabled = !alarmsTogglers[alarmCheckboxIndex]
                        let sqlStatement = `UPDATE alarms SET isEnabled=${alarmIsEnabled} WHERE _id=${alarmId};`
                        transaction.executeSql(sqlStatement, [], (tx, receivedAlarms) => {
                          // переключаем виджеты
                          const updatedAlarmsTogglers = alarmsTogglers
                          updatedAlarmsTogglers[alarmCheckboxIndex] = !updatedAlarmsTogglers[alarmCheckboxIndex] 
                          setAlarmsTogglers(updatedAlarmsTogglers)
                          setAlarmsCheckboxes([])
                          setIsSelection(false)
                        })
                      })
                    })
                  }
                }}
              >
                <Ionicons name="alarm" size={24} color="black" />  
                <Text>
                  Переключить
                </Text>
              </TouchableOpacity>
            :
              <View>
              
              </View>
          }
        </View>
      }
    </View>
  )
}

export function AddAlarmActivity({ navigation }) {
  
  const [alarmHoursTime, setAlarmHoursTime] = useState('00')
  const [alarmMinutesTime, setAlarmMinutesTime] = useState('00')

  const [alarmSignalName, setAlarmSignalName] = useState('')

  const [alarmDate, setAlarmDate] = useState('22.11.2000')

  const [repeatedHoursTimeLabels, setRepeatedHoursTimeLabels] = useState([
    '00',
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '21',
    '22',
    '23',
    '00',
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '21',
    '22',
    '23',
    '00',
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '21',
    '22',
    '23',
    '00',
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '21',
    '22',
    '23',
    '00',
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '21',
    '22',
    '23'
  ])
  const [repeatedMinutesTimeLabels, setRepeatedMinutesTimeLabels] = useState([
    '00',
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '21',
    '22',
    '23',
    '24',
    '25',
    '26',
    '27',
    '28',
    '29',
    '30',
    '31',
    '32',
    '33',
    '34',
    '35',
    '36',
    '37',
    '38',
    '39',
    '40',
    '41',
    '42',
    '43',
    '44',
    '45',
    '46',
    '47',
    '48',
    '49',
    '50',
    '51',
    '52',
    '53',
    '54',
    '55',
    '56',
    '57',
    '58',
    '59',
    '00',
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '21',
    '22',
    '23',
    '24',
    '25',
    '26',
    '27',
    '28',
    '29',
    '30',
    '31',
    '32',
    '33',
    '34',
    '35',
    '36',
    '37',
    '38',
    '39',
    '40',
    '41',
    '42',
    '43',
    '44',
    '45',
    '46',
    '47',
    '48',
    '49',
    '50',
    '51',
    '52',
    '53',
    '54',
    '55',
    '56',
    '57',
    '58',
    '59',
    '00',
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '21',
    '22',
    '23',
    '24',
    '25',
    '26',
    '27',
    '28',
    '29',
    '30',
    '31',
    '32',
    '33',
    '34',
    '35',
    '36',
    '37',
    '38',
    '39',
    '40',
    '41',
    '42',
    '43',
    '44',
    '45',
    '46',
    '47',
    '48',
    '49',
    '50',
    '51',
    '52',
    '53',
    '54',
    '55',
    '56',
    '57',
    '58',
    '59',
    '00',
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '21',
    '22',
    '23',
    '24',
    '25',
    '26',
    '27',
    '28',
    '29',
    '30',
    '31',
    '32',
    '33',
    '34',
    '35',
    '36',
    '37',
    '38',
    '39',
    '40',
    '41',
    '42',
    '43',
    '44',
    '45',
    '46',
    '47',
    '48',
    '49',
    '50',
    '51',
    '52',
    '53',
    '54',
    '55',
    '56',
    '57',
    '58',
    '59',
    '00',
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '21',
    '22',
    '23',
    '24',
    '25',
    '26',
    '27',
    '28',
    '29',
    '30',
    '31',
    '32',
    '33',
    '34',
    '35',
    '36',
    '37',
    '38',
    '39',
    '40',
    '41',
    '42',
    '43',
    '44',
    '45',
    '46',
    '47',
    '48',
    '49',
    '50',
    '51',
    '52',
    '53',
    '54',
    '55',
    '56',
    '57',
    '58',
    '59'
  ])

  const [date, setDate] = useState(new Date(1598051730000))
  const [mode, setMode] = useState('date')
  const [isShowDatePicker, setIsShowDatePicker] = useState(false)

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date
    setIsShowDatePicker(Platform.OS === 'ios')
    setDate(currentDate)
    setAlarmDate(currentDate.toLocaleDateString())
  }

  const showMode = (currentMode) => {
    setIsShowDatePicker(true)
    setMode(currentMode)
  }

  const getTimeLabel = (rawTime) => {
    const isEditTime = rawTime <= 9
    if (isEditTime) {
      const time = `0${rawTime}`
      return time
    }
    return rawTime
  }

  const getNextDay = function (dayName) {
    // The current day
    var date = new Date()
    var now = date.getDay()
    // Days of the week
    var days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
    // The index for the day you want
    var day = days.indexOf(dayName.toLowerCase())  
    // Find the difference between the current day and the one you want
    // If it's the same day as today (or a negative number), jump to the next week
    var diff = day - now
    diff = diff < 1 ? 7 + diff : diff
    // Get the timestamp for the desired day
    var nextDayTimestamp = date.getTime() + (1000 * 60 * 60 * 24 * diff)
    // Get the next day
    const returnedDate = new Date(nextDayTimestamp)
    let returnedYear = returnedDate.getFullYear()
    let returnedMonth = returnedDate.getMonth() + 1 
    let returnedDay = returnedDate.getDay()
    returnedMonth = returnedMonth <= 9 ? `0${returnedMonth}` : returnedMonth
    returnedDay = returnedDay <= 9 ? `0${returnedDay}` : returnedDay
    const parsedDate = `${returnedYear}-${returnedMonth}-${returnedDay}`
    return parsedDate
  }

  return (
    <View>
      <ScrollView>
        <View style={styles.addAlarmTimeInput}>
          <View style={styles.addAlarmTimeInputItem}>
            <ScrollView
              style={styles.addAlarmTimeInputItemScroll}
              onScroll={(scroll) => {
                const scrollEvent = scroll.nativeEvent
                const offset = scrollEvent.contentOffset
                const scrollOffset = offset.y
                const correctScrollOffset = scrollOffset / 45
                const repeatedHoursTimeLabelsIndex = Number.parseInt(correctScrollOffset)
                const hoursTime = repeatedHoursTimeLabels[repeatedHoursTimeLabelsIndex]
                setAlarmHoursTime(hoursTime)
              }}
              ref={(ref) => {
                ref.scrollTo({
                  x: 0,
                  y: 2500,
                  animated: false
                })
              }}
            >
              {
                repeatedHoursTimeLabels.map((timeLabel, timeLabelIndex) => {
                  return (
                    <TouchableOpacity key={timeLabelIndex} onPress={() => {
                      console.log('выбираю часы для Будильника')
                      setAlarmHoursTime(timeLabel)
                    }}>
                      <Text style={
                        [
                          styles.addAlarmTimeInputItemLabel,
                          alarmHoursTime === timeLabel ? '' : styles.alarmBluredTimeInputLabel 
                        ]
                      }>
                        {
                          timeLabel
                        }
                      </Text>
                    </TouchableOpacity>
                  )
                })
              }
            </ScrollView>
          </View>
          <View style={styles.addAlarmTimeInputItem}>
            <ScrollView 
              ref={(ref) => {
                ref.scrollTo({
                  x: 0,
                  y: 7500,
                  animated: false
                })
              }}
              style={styles.addAlarmTimeInputItemScroll}
              onScroll={(scroll) => {
                const scrollEvent = scroll.nativeEvent
                const offset = scrollEvent.contentOffset
                const scrollOffset = offset.y
                const correctScrollOffset = scrollOffset / 45
                const repeatedMinutesTimeLabelsIndex = Number.parseInt(correctScrollOffset)
                const minutesTime = repeatedMinutesTimeLabels[repeatedMinutesTimeLabelsIndex]
                setAlarmMinutesTime(minutesTime)
              }}
            >
              {
                repeatedMinutesTimeLabels.map((timeLabel, timeLabelIndex) => {
                  return (
                    <TouchableOpacity key={timeLabelIndex} onPress={() => {
                      console.log('выбираю минуты для Будильника')
                      setAlarmMinutesTime(timeLabel)
                    }}>
                      <Text style={
                        [
                          styles.addAlarmTimeInputItemLabel,
                          alarmMinutesTime === timeLabel ? '' : styles.alarmBluredTimeInputLabel 
                        ]
                      }>
                        {
                          timeLabel
                        }
                      </Text>
                    </TouchableOpacity>
                  )
                })
              }
            </ScrollView>
          </View>
        </View>
        <View style={styles.addAlarmDateInput}>
          <Text style={styles.addAlarmDateInputLabel}>
            Завтра-чт, 22 ноя.
          </Text>
          <TouchableOpacity
            onPress={() => setIsShowDatePicker(true)}
          >
            <Entypo
              name="calendar"
              size={24}
              color="black"
              style={styles.addAlarmDateInputLabel}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.addAlarmWeek}>
          <TouchableOpacity onPress={() => {
            console.log('выбираю дату Будильника на понедельник на этой неделе')
            setAlarm
            setAlarmDate(getNextDay('monday'))
          }}>
            <Text style={styles.addAlarmWeekDay}>
              Пн
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            console.log('выбираю дату Будильника на вторник на этой неделе')
            setAlarmDate(getNextDay('tuesday'))
          }}>
            <Text style={styles.addAlarmWeekDay}>
              Вт
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            console.log('выбираю дату Будильника на среду на этой неделе')
            setAlarmDate(getNextDay('wednesday'))
          }}>
            <Text style={styles.addAlarmWeekDay}>
              Ср
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            console.log('выбираю дату Будильника на четверг на этой неделе')
            setAlarmDate(getNextDay('thursday'))
          }}>
            <Text style={styles.addAlarmWeekDay}>
              Чт
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            console.log('выбираю дату Будильника на пятницу на этой неделе')
            setAlarmDate(getNextDay('friday'))
          }}>
            <Text style={styles.addAlarmWeekDay}>
              Пт
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            console.log('выбираю дату Будильника на субботу на этой неделе')
            setAlarmDate(getNextDay('saturday'))
          }}>
            <Text style={styles.addAlarmWeekDay}>
              Сб
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            console.log('выбираю дату Будильника на воскресенье на этой неделе')
            setAlarmDate(getNextDay('sunday'))
          }}>
            <Text style={styles.addAlarmWeekDay, styles.addAlarmWeekHoliday}>
              Вс
            </Text>
          </TouchableOpacity>
        </View>
        <TextInput style={styles.alarmSignalNameInput} placeholder="Имя сигнала" value={alarmSignalName} onChangeText={(value) => setAlarmSignalName(value)} />
        <View style={styles.addAlarmOptions}>
          <View style={styles.addAlarmOption}>
            <TouchableOpacity onPress={() => {
              console.log('выбираю дату Будильника на воскресенье на этой неделе')
            }}>
              <View style={styles.addAlarmOptionAside}>
                <Text style={styles.addAlarmOptionAsideHeaderLabel}>
                  Звук будильника
                </Text>
                <Text style={styles.addAlarmOptionAsideFooterLabel}>
                  Home coming
                </Text>
              </View>
            </TouchableOpacity>
            <Switch style={styles.addAlarmOptionSwitch} />
          </View>
          <View style={[styles.addAlarmOption, styles.addAlarmVibrationOption]}>
            <TouchableOpacity onPress={() => {
              console.log('выбираю дату Будильника на воскресенье на этой неделе')
            }}>
              <View style={styles.addAlarmOptionAside}>
                <Text style={styles.addAlarmOptionAsideHeaderLabel}>
                  Вибрация
                </Text>
                <Text style={styles.addAlarmOptionAsideFooterLabel}>
                  Basic call
                </Text>
              </View>
            </TouchableOpacity>
            <Switch style={styles.addAlarmOptionSwitch} />
          </View>
          <View style={styles.addAlarmOption}>
            <TouchableOpacity onPress={() => {
              console.log('выбираю дату Будильника на воскресенье на этой неделе')
            }}>
              <View style={styles.addAlarmOptionAside}>
                <Text style={styles.addAlarmOptionAsideHeaderLabel}>
                  Пауза
                </Text>
                <Text style={styles.addAlarmOptionAsideFooterLabel}>
                  5 минут, 3 раза
                </Text>  
              </View>
            </TouchableOpacity>
            <Switch style={styles.addAlarmOptionSwitch} />
          </View>
        </View>
        <View style={styles.addAlarmFooter}>
          <TouchableOpacity style={styles.footerTabLabel} onPress={() => {
            console.log('отменяю создание Будильник')
            navigation.navigate('MainActivity')
          }}>
            <Text style={styles.addAlarmFooterLabel}>
              Отмена
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerTabLabel} onPress={() => {
            console.log('создаю Будильник')
            const alarmTime = `${alarmHoursTime}:${alarmMinutesTime}` 
            let sqlStatement = `INSERT INTO \"alarms\"(time, date, isEnabled) VALUES (\"${alarmTime}\",\"${alarmDate}\", true);`
            db.transaction(transaction => {
              transaction.executeSql(sqlStatement, [], (tx, receivedContacts) => {
                navigation.navigate('MainActivity')
              }, (tx) => {
                console.log("ошибка получения аватарки")
              })
            })
          }}>
            <Text style={styles.addAlarmFooterLabel}>
              Продолжить
            </Text>
            </TouchableOpacity>
        </View>
      </ScrollView>
      {isShowDatePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  )
}

export function AddWorldTimeActivity({ route, navigation }) {
  
  const [addWorldTimeBtnTitle, setAddWorldTimeBtnTitle] = useState('Добавить')
  
  const [cityName, setCityName] = useState('')

  const [addWorldTimeTitle, setAddWorldTimeTitle] = useState('Добавить город')

  var isChangeCity = false
  const [changedCityId, setChangedCityId] = useState(0)
  
  useEffect(() => {
    const { action, id } = route.params
    isChangeCity = action === 'change'
    setChangedCityId(id)
    console.log(`changedCityId: ${changedCityId}`)
    if (isChangeCity) {
      setAddWorldTimeBtnTitle('Изменить')
      setAddWorldTimeTitle('Изменить город')
    }
  }, [])

  return (
    <View>
      <View style={styles.addWorldTimeHeader}>
        <AntDesign style={styles.addWorldTimeHeaderItem} name="caretleft" size={24} color="black" />
        <Text style={[styles.addWorldTimeTitle, styles.addWorldTimeHeaderItem]}>
          {
            addWorldTimeTitle
          }
        </Text>
        <AntDesign style={styles.addWorldTimeHeaderItem} name="search1" size={24} color="black" />
      </View>
      <TextInput
        style={styles.addWorldTimeCityName}
        value={cityName}
        onChangeText={value => setCityName(value)}
      />
      <View style={styles.addWorldTimeBtn}>
        <Button
          title={addWorldTimeBtnTitle}
          onPress={() => {
            console.log(`isChangeCity ${isChangeCity} на имя ${cityName}`)
            if (addWorldTimeBtnTitle === 'Изменить') {
              console.log(`обновляю мировое время с _id = ${changedCityId} на имя ${cityName}`)
              let sqlStatement = `UPDATE cities SET name=\"${cityName}\" WHERE _id=${changedCityId};`
              db.transaction(transaction => {
                transaction.executeSql(sqlStatement, [], (tx, receivedCities) => {
                  navigation.navigate('MainActivity')
                }, (tx) => {
                  console.log('ошибка получения городов')
                })
              })
            } else {
              let sqlStatement = `INSERT INTO \"cities\"(name) VALUES (\"${cityName}\");`
              db.transaction(transaction => {
                transaction.executeSql(sqlStatement, [], (tx, receivedCities) => {
                  
                }, (tx) => {
                  console.log('ошибка получения городов')
                })
              })
            }
          }}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerTabsRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  footerTabLabel: {
    marginHorizontal: 15
  },
  activeFooterTabLabel: {
    fontWeight: '700',
    textDecorationLine: 'underline',
    // textUnderlineOffset: 5
  },
  alarmsTabTitle: {
    fontWeight: '500',
    fontSize: 24,
    textAlign: 'center',
    marginVertical: 25
  },
  alarmsTabBtns: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  alarmsTabBtn: {
    marginHorizontal: 5
  },
  backDrop: {
    backgroundColor: 'rgb(230, 230, 230)',
    height: '100%',
    width: '100%'
  },
  alarm: {
    display: 'flex',
    flexDirection: 'row',
    // justifyContent: 'space-between',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    marginHorizontal: 'auto',
    height: 100,
    backgroundColor: 'rgb(255, 255, 255)',
    borderRadius: 8,
    marginVertical: 15,
    // boxSizing: 'border-box',
    paddingRight: 90,
    paddingLeft: 50
  },
  alarmDate: {
    // marginHorizontal: 25,
    // marginRight: 500,
  },
  alarmAside: {
    display: 'flex',
    flexDirection: 'column',
    // marginLeft: 750
  },
  alarmTime: {
    fontSize: 36
  },
  alarms: {
    
  },
  notFoundAlarms: {
    marginHorizontal: 'auto',
    textAlign: 'center',
    marginVertical: 50,
    width: '100%'
  },
  stopwatchTitle: {
    fontSize: 36,
    textAlign: 'center',
    marginVertical: 150
  },
  stopwatchBtns: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    marginHorizontal: 'auto',
    marginVertical: 75
  },
  stopwatchBtn: {
    width: 125,
    marginHorizontal: 25
  },
  stopwatchIntervalBtn: {
    color: 'rgb(0, 0, 0)'
  },
  timerBtn: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 50
  },
  timerTable: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%'
  },
  timerTableItem: {
    marginHorizontal: 'auto',
    height: 250,
    width: '33%',
    textAlign: 'center'
  },
  timerTableItemHeader: {
    textAlign: 'center'
  },
  timerTableItemLabel: {
    marginVertical: 15,
    fontSize: 36,
    textAlign: 'center'
  },
  worldTimeTabSubTitle: {
    textAlign: 'center'
  },
  worldTimeTabTitle: {
    fontWeight: '500',
    fontSize: 24,
    textAlign: 'center'    
  },
  worldTimeTabHeader: {
    marginVertical: 25
  },
  cityName: {
    fontSize: 20,
    marginLeft: 25
  },
  addAlarmFooter: {
    marginVertical: 50,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  addAlarmFooterLabel: {
    fontWeight: '700'
  },
  addAlarmTimeInput: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  addAlarmTimeInputItem: {
    height: 125,
    overflow: 'hidden'
  },
  addAlarmTimeInputItemLabel: {
    fontSize: 36,
    textAlign: 'center'
  },
  addAlarmDateInput: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  addAlarmDateInputLabel: {
    marginHorizontal: 25
  },
  addAlarmWeekDay: {
    marginHorizontal: 15
  },
  addAlarmWeekHoliday: {
    color: 'rgb(255, 0, 0)'
  },
  addAlarmWeek: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  addAlarmOptions: {
    borderRadius: 20,
    overflow: 'hidden'
    // height: 250
  },
  addAlarmOption: {
    backgroundColor: 'rgb(255, 255, 255)',
    height: 50,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 50
  },
  addAlarmOptionAside: {
    marginHorizontal: 50  
  },
  addAlarmOptionAsideHeaderLabel: {
    fontSize: 18
  },
  addAlarmOptionAsideFooterLabel: {
    color: 'rgb(0, 0, 255)'
  },
  addAlarmOptionSwitch: {
    marginHorizontal: 50
  },
  alarmSignalNameInput: {
    height: 25,
    width: '75%',
    marginVertical: 50,
    borderBottomColor: 'rgb(0, 0, 0)',
    borderBottomWidth: 1
  },
  addAlarmVibrationOption: {
    borderBottomColor: 'rgb(200, 200, 200)',
    borderBottomWidth: 1,
    borderTopColor: 'rgb(200, 200, 200)',
    borderTopWidth: 1
  },
  alarmBluredTimeInputLabel: {
    color: 'rgb(200, 200, 200)'
  },
  addAlarmTimeInputItemScroll: {
    height: 125,
    overflow: 'hidden'
  },
  intervals: {
    
  },
  intervalsItem: {
    display: 'flex',
    flexDirection: 'row',
    marginVertical: 15
  },
  intervalsItemLabel: {
    width: '33%',
    textAlign: 'center'
  },
  startTimerBtns: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    marginVertical: 50
  },
  startTimerBtn: {
    marginHorizontal: 50
  },
  startTimerLabel: {
    fontSize: 36
  },
  startTimerLabelBlock: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'rgb(0, 0, 0)',
    borderWidth: 2,
    width: 350,
    height: 350,
    marginVertical: 50,
    // borderRadius: '100%'
    borderRadius: 1000
  },
  startTimerLabelContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  customTimer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 185,
    height: 185,
    // borderRadius: '100%',
    borderRadius: 1000,
    marginHorizontal: 15
  },
  customTimerTitle: {
    fontSize: 16,
    textAlign: 'center'
  },
  deactivatedCustomTimer: {
    backgroundColor: 'rgb(200, 200, 200)'
  },
  activatedCustomTimer: {
    borderWidth: 2,
    backgroundColor: 'rgb(255, 255, 255)'
  },
  customTimers: {
    marginVertical: 25
  },
  addWorldTimeHeader: {
    display: 'flex',
    flexDirection: 'row'
  },
  addWorldTimeHeaderItem: {
    marginHorizontal: 15
  },
  addWorldTimeBtn: {
    width: 125,
    marginHorizontal: 'auto'
  },
  addWorldTimeTitle: {
    fontSize: 20
  },
  addWorldTimeCityName: {
    borderBottomWidth: 2,
    height: 35,
    marginVertical: 35,
    marginHorizontal: 50
  },
  selectionFooter: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  selectionFooterItem: {
    height: 200,
    display: 'flex',
    alignItems: 'center'
  }
})