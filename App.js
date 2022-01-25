import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Switch, Button } from 'react-native'
import { Feather } from '@expo/vector-icons'

export default function App() {
  
  const [ currentTab, setCurrentTab ] = useState([
    'Будильник'
  ])
  const [ alarms, setAlarms ] = useState([
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
  );
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
  }
});
