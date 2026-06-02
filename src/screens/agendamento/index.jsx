import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { styles } from './index.js'
import { Button } from "../../components/button/button.jsx";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { ptBR } from "../../constants/calendar.js";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/auth.js";
import { Picker } from "@react-native-picker/picker";
import Loading from "../../components/loading/index.jsx";
import { MaterialCommunityIcons } from '@expo/vector-icons'
import api from "../../constants/api.js";
import { ReservationContext } from "../../contexts/reservation.jsx";
import { ModalCustom } from "../../components/modalcustom/index.jsx";
import { useNavigation, useRoute } from "@react-navigation/native";
import { FaS } from "react-icons/fa6";
import { SafeAreaView } from "react-native-safe-area-context";
import { ActivityIndicator } from "react-native-web";
import { ServiceContext } from "../../contexts/service.jsx";
import { Icon } from "lucide-react-native";
LocaleConfig.locales["pt-br"] = ptBR
LocaleConfig.defaultLocale = 'pt-br'
export function Schedule() {
    const route = useRoute()
    const navigation = useNavigation()
    const { user } = useContext(AuthContext);
    const renderServiceIcon = (IconName) => {
        if (IconName === 'engine') {
            return (
                <MaterialCommunityIcons name='engine' size={25} color='#ffffff'></MaterialCommunityIcons>
            )
        } else if (IconName === 'calendar-check') {
            return (
                <MaterialCommunityIcons name='calendar-check' size={25} color='#ffffff'></MaterialCommunityIcons>
            )
        }
        return (
            <MaterialCommunityIcons name='alert'></MaterialCommunityIcons>
        )
    }
    const formatarvalor = (valor) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(valor)
    }
    const { serviceicon, servicename, servicedescription, serviceprice } = useContext(ServiceContext)
    const today_date = new Date().toISOString().split('T')[0]
    const {
        statusapi,
        booking_hour, setbooking_hour,
        selectdate, setselectdate,
        loand,
        activenotification, setactivenotification,
        setmsgnotification, msgnotification,
        loadinghours,
        horariosdisponiveis,
        Createappointment,
        CheckhoursAvaileble
    } = useContext(ReservationContext)
    const formvalid = selectdate !== '' && booking_hour !== '';
    function LoadData() {
        Createappointment()
    }

    function CleanNotification() {
        setmsgnotification('')
        setactivenotification(false)
        navigation.navigate('main')
    }
    useEffect(() => {
        if(selectdate !== ''){
            CheckhoursAvaileble(selectdate)
        }
    }, [selectdate])
    //Calendario 
    //https://github.com/wix/react-native-calendars.git

    return (
        <SafeAreaView style={styles.container}>
            {loand ?
                <Loading visible={loand}></Loading> :
                ""
            }
            {activenotification ?
                <ModalCustom msgmodal={msgnotification} statusapi={statusapi} onClose={() => CleanNotification()}></ModalCustom>
                : ''
            }
            <ScrollView
                showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}
            >
                <View style={styles.resumoCard}>
                    <View style={styles.resumoIconContainer}>
                        {renderServiceIcon(serviceicon)}
                    </View>
                    <View style={styles.resumoTextContainer}>
                        <Text style={styles.resumoNome}>{servicename}</Text>
                        <Text style={styles.resumoDescricao}>{servicedescription}</Text>
                        <Text style={styles.resumoPreco}>{formatarvalor(serviceprice)}</Text>
                    </View>
                </View>
                <Text style={styles.sectionTitle}>Selecione a Data</Text>
                <View style={styles.calendarCard}>
                    <Calendar
                        current={today_date}
                        minDate={today_date}
                        onDayPress={day => {
                            setselectdate(day.dateString)
                            setbooking_hour('')

                        }}
                        markedDates={{
                            [selectdate]: { selected: true, selectedColor: '#e08519' }
                        }}
                        theme={{
                            selectedDayBackgroundColor: '#e08519',
                            selectedDayTextColor: '#ffffff',
                            todayTextColor: '#14213d',
                            arrowColor: '#14213d',
                            monthTextColor: '#14213d',
                            textMonthFontWeight: 'bold',
                            dayTextColor: '#475569'
                        }}
                    ></Calendar>
                </View>
                <Text style={styles.sectionTitle}>Selecione o Horario</Text>
                {loadinghours ? (
                    <View style={styles.centerLoading}>
                        <ActivityIndicator size='large' color='#e08519'></ActivityIndicator>
                        <Text style={styles.loadingText}>Buscando Horarios disponiveis...</Text>
                    </View>

                ) : selectdate === '' ? (
                    <View style={styles.feedbackContainer}>
                        <Text style={styles.feedbackText}>Porfavor, selecione uma data acima</Text>
                    </View>
                ) : (
                    <View style={styles.hoursGrid}>
                        {horariosdisponiveis.map((hora) => {
                            const isSelected = booking_hour?.trim() === hora.trim();
                            return (
                                <TouchableOpacity
                                    key={hora}
                                    disabled={!hora}
                                    style={[
                                        styles.hourButton,
                                        isSelected && styles.hourButtonActive,

                                    ]}
                                    onPress={() => setbooking_hour(hora)}>
                                    <Text style={[
                                        styles.hourText,
                                        isSelected && styles.hourTextActive,
                                    ]}>
                                        {hora}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                )}
                <TouchableOpacity
                    disabled={!formvalid}
                    activeOpacity={0.8}
                    style={[
                        styles.btnConfirmar,
                        !formvalid && styles.btnConfirmarDisabled
                    ]}
                    onPress={() => LoadData()}>
                    <Text style={styles.btnConfirmarText}>CONFIRMAR RESERVA</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    )
}