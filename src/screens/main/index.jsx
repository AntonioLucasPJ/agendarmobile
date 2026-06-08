import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TelaHome } from "../Home/index.jsx";
import { Perfil } from "../Perfil/index.jsx";
import { Calendary } from "../Calendary/index.jsx";
import icon from '../../constants/icon.js'
import { Image } from "react-native";
import { Ionicons } from '@expo/vector-icons';
const Tab = createBottomTabNavigator();
export function Main() {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name='Home'
                component={TelaHome}
                options={{
                    headerShown:false,
                    tabBarShowLabel:false,
                    headerTitleAlign: 'center',
                    tabBarShowLabel: false,
                    tabBarIcon: ({ focused,color,size }) => {
                        return (
                            <Ionicons
                                name={focused ? 'home': 'home-outline'}
                                size={26}
                                color={focused? '#002f6c':'#a0aec0'}
                            ></Ionicons>
                        )
                    }
                }}
            ></Tab.Screen>
            <Tab.Screen
                name="Calendar"
                component={Calendary}
                options={{
                    headerTitleAlign: 'center',
                    headerTitle: 'Meus Agendamentos',
                    tabBarIcon: ({ focused }) => {
                        return <Ionicons
                            name={focused ? "calendar": "calendar-outline"}
                            size={26}
                            color={focused ? "#002F6C":"#A0AEC0"}
                            >
                        </Ionicons>
                    },
                    tabBarShowLabel: false,
                    unmountOnBlur:true,
                }}

            ></Tab.Screen>
            <Tab.Screen
                name="Profile"
                component={Perfil}
                options={{
                    headerTitleAlign: "center",
                    tabBarShowLabel: false,
                    tabBarIcon: ({ focused }) => {
                        return (
                        <Ionicons
                            name={focused ?"person":"person-outline"}
                            size={26}
                            color={focused? "#002F6C":"#A0AEC0"}
                        />
                        );
                    }
                }}
            ></Tab.Screen>
        </Tab.Navigator>
    )
}