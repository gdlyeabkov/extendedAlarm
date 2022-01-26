import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Switch, Button } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import * as SQLite from 'expo-sqlite'
import { TextInput } from 'react-native-gesture-handler'
import { Entypo } from '@expo/vector-icons'

var db = null

export default function App() {
  const Stack = createStackNavigator();

  const testActivity = 'MainActivity'

  db = SQLite.openDatabase('alarmsdatabase.db')
  db.transaction(transaction => {
    let sqlStatement = "CREATE TABLE IF NOT EXISTS alarms (_id INTEGER PRIMARY KEY AUTOINCREMENT, time TEXT, date TEXT, isEnabled BOOLEAN);"
    transaction.executeSql(sqlStatement, [], (tx, receivedTable) => {
        
    })
  })

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={ testActivity }>
        <Stack.Screen name="MainActivity" component={ MainActivity } />
        <Stack.Screen name="AddAlarmActivity" component={ AddAlarmActivity } />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export function MainActivity({ navigation }) {
  
  const [ currentTab, setCurrentTab ] = useState([
    'Будильник'
  ])
  const [alarms, setAlarms] = useState([
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
  ])

  const [ cities, setCities ] = useState([
    {
      time: '11:00',
      name: 'Лондон'
    },
    {
      time: '12:00',
      name: 'Пекин'
    }
  ])

  const alarmsTogglers = alarms.map(alarm => {
    const alarmToggler = {
      isEnabled: false,
      setIsEnabled: null,
      toggleSwitch: null
    }
    const [a, b] = useState(alarm.isEnabled)  
    alarmToggler.isEnabled = a
    alarmToggler.setIsEnabled = b
    alarmToggler.toggleSwitch = () => alarmToggler.setIsEnabled(previousState => !previousState)
    return alarmToggler
  })

  // пока чтение будильников вызывает ошибку
  // db.transaction(transaction => {
  //   const sqlStatement = "SELECT * FROM alarms;"
  //   transaction.executeSql(sqlStatement, [], (tx, receivedAlarms) => {
  //     let tempReceivedAlarms = []
  //     Array.from(receivedAlarms.rows).forEach((remoteAlarmRow, remoteAlarmRowIdx) => {
  //       const alarm = Object.values(receivedAlarms.rows.item(remoteAlarmRowIdx))
  //       tempReceivedAlarms = [
  //         ...tempReceivedAlarms,
  //         {
  //           id: alarm[0],
  //           name: '',
  //           time: alarm[1],
  //           date: alarm[3],
  //           isEnabled: alarm[4],
  //         }
  //       ]
  //     })
  //     setAlarms(tempReceivedAlarms)
  //   })
  // })

  return (
    <View style={styles.backDrop}>
      {
        currentTab == 'Будильник' ?
          <View>
            <Text style={styles.alarmsTabTitle}>
              Все будильники<br />
              отключены
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
                      <View style={styles.alarm} key={alarmIndex}>
                        <Text style={styles.alarmTime}>
                          {
                            alarm.time
                          }
                        </Text>
                        <View style={styles.alarmAside}>
                          <Text style={styles.alarmDate}>
                            вт, 25 янв.
                          </Text>
                          <Switch
                            onValueChange={alarmsTogglers[alarmIndex].toggleSwitch}
                            value={alarmsTogglers[alarmIndex].isEnabled}
                          />
                        </View>
                      </View>
                    )
                  })
                :
                  <View style={styles.notFoundAlarms}>
                    <Text>
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
                      <View style={styles.alarm} key={cityIndex}>
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
                        <Text style={styles.alarmTime}>
                          {
                            city.time
                          }
                        </Text>
                      </View>
                    )
                  })
                :
                  <View style={styles.notFoundAlarms}>
                    <Text>
                      Нет установленных будильников
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
            00:00:00
          </Text>
          <View style={styles.stopwatchBtns}>
            <View  style={styles.stopwatchBtn}>
              <Button title="Интервал" style={styles.stopwatchIntervalBtn} color={'rgb(200, 200, 200)'} />
            </View>
            <View  style={styles.stopwatchBtn}>
              <Button title="Начать" />
            </View>
          </View>
        </View>
        : currentTab == 'Таймер' ?
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
          <View style={styles.timerTable}>
            <ScrollView style={styles.timerTableItem}>
              <Text style={styles.timerTableItemHeader}>
                ч.
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
            </ScrollView>
            <ScrollView style={styles.timerTableItem}>
              <Text style={styles.timerTableItemHeader}>
                мин.
              </Text>
              <Text style={styles.timerTableItemLabel}>
                59
              </Text>
              <Text style={styles.timerTableItemLabel}>
                00
              </Text>
              <Text style={styles.timerTableItemLabel}>
                01
              </Text>
            </ScrollView>
            <ScrollView style={styles.timerTableItem}>
              <Text style={styles.timerTableItemHeader}>
                сек.
              </Text>
              <Text style={styles.timerTableItemLabel}>
                59
              </Text>
              <Text style={styles.timerTableItemLabel}>
                00
              </Text>
              <Text style={styles.timerTableItemLabel}>
                01
              </Text>
            </ScrollView>
            <ScrollView>
              
            </ScrollView>
            <ScrollView>
              
            </ScrollView>
          </View>
          <View style={styles.timerBtns}>
            <View  style={styles.timerBtn}>
              <Button color={'rgb(200, 200, 200)'} title="00:10:00" />
            </View>
            <View  style={styles.timerBtn}>
              <Button title="Начать" />
            </View>
          </View>
        </View>
        :
        <View />
      }
      <View style={styles.footerTabsRow}>
        <TouchableOpacity style={styles.footerTabLabel} onPress={() => {
          console.log('Меняю вкладку на Будильник')
          setCurrentTab('Будильник')
        }}>
          <Text style={
              currentTab == 'Будильник' ? styles.activeFooterTabLabel : ''
            }>
            Будильник
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerTabLabel} onPress={() => {
          console.log('Меняю вкладку на Мировое время')
          setCurrentTab('Мировое время')
        }}>
          <Text style={
              currentTab == 'Мировое время' ? styles.activeFooterTabLabel : ''
            }>
            Мировое время
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerTabLabel} onPress={() => {
          console.log('Меняю вкладку на Секундомер')
          setCurrentTab('Секундомер')
        }}>
          <Text style={
              currentTab == 'Секундомер' ? styles.activeFooterTabLabel : ''
            }>
            Секундомер
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerTabLabel} onPress={() => {
          console.log('Меняю вкладку на Таймер')
          setCurrentTab('Таймер')
        }}>
          <Text style={
              currentTab == 'Таймер' ? styles.activeFooterTabLabel : ''
            }>
            Таймер
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export function AddAlarmActivity({ navigation }) {
  
  const [alarmHoursTime, setAlarmHoursTime] = useState('00')
  const [alarmMinutesTime, setAlarmMinutesTime] = useState('00')

  const [alarmSignalName, setAlarmSignalName] = useState('')

  let [lastScrollOffsetByYCoordFromAlarmTimeInputHoursLabel, setLastScrollOffsetByYCoordFromAlarmTimeInputHoursLabel] = useState(0)
  let [lastScrollOffsetByYCoordFromAlarmTimeInputMinutesLabel, setLastScrollOffsetByYCoordFromAlarmTimeInputMinutesLabel] = useState(0)

  const [alarmActualTimeInputHoursLabels, setAlarmActualTimeInputHoursLabels] = useState([
    '00',
    '01',
    '02'
  ])
  const [alarmActualTimeInputMinutesLabels, setAlarmActualTimeInputMinutesLabels] = useState([
    '00',
    '01',
    '02'
  ])

  const [alarmDate, setAlarmDate] = useState('22.11.2000')

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
      <View style={styles.addAlarmTimeInput}>
        <View style={styles.addAlarmTimeInputItem}>
          <ScrollView style={styles.addAlarmTimeInputItemScroll} onScroll={(scroll) => {
            const scrollEvent = scroll.nativeEvent
            const scrollOffset = scrollEvent.contentOffset
            const scrollOffsetByYCoord = scrollOffset.y 
            let offsetFromScrollTop = 0
            const isLt = scrollOffsetByYCoord < lastScrollOffsetByYCoordFromAlarmTimeInputHoursLabel
            const isGt = scrollOffsetByYCoord > lastScrollOffsetByYCoordFromAlarmTimeInputHoursLabel
            if (isLt) {
              offsetFromScrollTop = lastScrollOffsetByYCoordFromAlarmTimeInputHoursLabel - scrollOffsetByYCoord
            } else if (isGt) {
              offsetFromScrollTop = scrollOffsetByYCoord - lastScrollOffsetByYCoordFromAlarmTimeInputHoursLabel 
            }
            setLastScrollOffsetByYCoordFromAlarmTimeInputHoursLabel(scrollOffsetByYCoord)
            const debugMsg = offsetFromScrollTop
            console.log(debugMsg)
            const updatedAlarmActualTimeInputHoursLabels = []
            const timeLabelRatio = isLt ? -1 : 1
            const rawFirstHourLabel = alarmActualTimeInputHoursLabels[0]
            const rawSecondHourLabel = alarmActualTimeInputHoursLabels[1]
            const rawThirdHourLabel = alarmActualTimeInputHoursLabels[2]
            const firstHourLabel = Number(rawFirstHourLabel)
            const secondHourLabel = Number(rawSecondHourLabel)
            const thirdHourLabel = Number(rawThirdHourLabel)
            updatedAlarmActualTimeInputHoursLabels[0] = getTimeLabel(firstHourLabel + timeLabelRatio) 
            updatedAlarmActualTimeInputHoursLabels[1] = getTimeLabel(secondHourLabel + timeLabelRatio)
            updatedAlarmActualTimeInputHoursLabels[2] = getTimeLabel(thirdHourLabel + timeLabelRatio)
            setAlarmActualTimeInputHoursLabels(updatedAlarmActualTimeInputHoursLabels)
          }}>
            {
              alarmActualTimeInputHoursLabels.map((alarmActualTimeInputHoursLabel, alarmActualTimeInputHoursLabelIndex) => {
                return (
                  <TouchableOpacity key={alarmActualTimeInputHoursLabelIndex} onPress={() => {
                    console.log('выбираю часы для Будильника')
                    setAlarmHoursTime(alarmActualTimeInputHoursLabel)
                  }}>
                    <Text style={[
                        styles.addAlarmTimeInputItemLabel,
                        (alarmActualTimeInputHoursLabelIndex == 0 || alarmActualTimeInputHoursLabelIndex == 2) ? styles.alarmBluredTimeInputLabel : ''
                      ]}>
                      {
                        alarmActualTimeInputHoursLabel
                      }
                    </Text>
                  </TouchableOpacity>
                )
              })
            }
          </ScrollView>
        </View>
        <View style={styles.addAlarmTimeInputItem}>
          <ScrollView style={styles.addAlarmTimeInputItemScroll} onScroll={(scroll) => {
            const scrollEvent = scroll.nativeEvent
            const scrollOffset = scrollEvent.contentOffset
            const scrollOffsetByYCoord = scrollOffset.y 
            let offsetFromScrollTop = 0
            const isLt = scrollOffsetByYCoord < lastScrollOffsetByYCoordFromAlarmTimeInputMinutesLabel
            const isGt = scrollOffsetByYCoord > lastScrollOffsetByYCoordFromAlarmTimeInputMinutesLabel
            if (isLt) {
              offsetFromScrollTop = lastScrollOffsetByYCoordFromAlarmTimeInputMinutesLabel - scrollOffsetByYCoord
            } else if (isGt) {
              offsetFromScrollTop = scrollOffsetByYCoord - lastScrollOffsetByYCoordFromAlarmTimeInputMinutesLabel 
            }
            setLastScrollOffsetByYCoordFromAlarmTimeInputMinutesLabel(scrollOffsetByYCoord)
            const debugMsg = offsetFromScrollTop
            console.log(debugMsg)
            const updatedAlarmActualTimeInputMinutesLabels = []
            const timeLabelRatio = isLt ? -1 : 1
            const rawFirstMinuteLabel = alarmActualTimeInputMinutesLabels[0]
            const rawSecondMinuteLabel = alarmActualTimeInputMinutesLabels[1]
            const rawThirdMinuteLabel = alarmActualTimeInputMinutesLabels[2]
            const firstMinuteLabel = Number(rawFirstMinuteLabel)
            const secondMinuteLabel = Number(rawSecondMinuteLabel)
            const thirdMinuteLabel = Number(rawThirdMinuteLabel)
            updatedAlarmActualTimeInputMinutesLabels[0] = getTimeLabel(firstMinuteLabel + timeLabelRatio) 
            updatedAlarmActualTimeInputMinutesLabels[1] = getTimeLabel(secondMinuteLabel + timeLabelRatio)
            updatedAlarmActualTimeInputMinutesLabels[2] = getTimeLabel(thirdMinuteLabel + timeLabelRatio)
            setAlarmActualTimeInputMinutesLabels(updatedAlarmActualTimeInputMinutesLabels)
          }}>
            {
              alarmActualTimeInputMinutesLabels.map((alarmActualTimeInputMinutesLabel, alarmActualTimeInputMinutesLabelIndex) => {
                return (
                  <TouchableOpacity key={alarmActualTimeInputMinutesLabelIndex} onPress={() => {
                    console.log('выбираю минуты для Будильника')
                    setAlarmMinutesTime(alarmActualTimeInputMinutesLabel)
                  }}>
                    <Text style={[
                        styles.addAlarmTimeInputItemLabel,
                        (alarmActualTimeInputMinutesLabelIndex == 0 || alarmActualTimeInputMinutesLabelIndex == 2) ? styles.alarmBluredTimeInputLabel : ''
                      ]}>
                      {
                        alarmActualTimeInputMinutesLabel
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
        <Entypo
          name="calendar"
          size={24}
          color="black"
          style={styles.addAlarmDateInputLabel}
        />
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
          const alarmTime = `${alarmActualTimeInputHoursLabels[1]}:${alarmActualTimeInputMinutesLabels[1]}` 
          let sqlStatement = `INSERT INTO \"alarms\"(time, date, isEnabled) VALUES (\"${alarmTime}\",\"${alarmDate}\", true);`
          db.transaction(transaction => {
            transaction.executeSql(sqlStatement, [], (tx, receivedContacts) => {
              
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
    fontWeight: 700,
    textDecorationLine: 'underline',
    textUnderlineOffset: 5
  },
  alarmsTabTitle: {
    fontWeight: 500,
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
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
    marginHorizontal: 'auto',
    height: 100,
    backgroundColor: 'rgb(255, 255, 255)',
    borderRadius: 8,
    marginVertical: 15,
    boxSizing: 'border-box',
    paddingHorizontal: 50
  },
  alarmDate: {
    marginHorizontal: 25
  },
  alarmAside: {
    display: 'flex',
    flexDirection: 'row'
  },
  alarmTime: {
    fontSize: 36
  },
  alarms: {
    
  },
  notFoundAlarms: {
    textAlign: 'center',
    marginVertical: 50
  },
  stopwatchTitle: {
    fontSize: 36,
    textAlign: 'center',
    marginVertical: 150
  },
  stopwatchBtns: {
    display: 'flex',
    flexDirection: 'row',
    marginHorizontal: 'auto',
    marginVertical: 125
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
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%'
  },
  timerTableItem: {
    width: '33%',
    textAlign: 'center'
  },
  timerTableItemHeader: {

  },
  timerTableItemLabel: {
    marginVertical: 15,
    fontSize: 36
  },
  worldTimeTabSubTitle: {
    textAlign: 'center'
  },
  worldTimeTabTitle: {
    fontWeight: 500,
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
    fontWeight: 700
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
  }
})