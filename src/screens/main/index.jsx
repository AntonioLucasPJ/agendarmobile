import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TelaHome } from "../Home/index.jsx";
import { Perfil } from "../Perfil/index.jsx";
import { Calendary } from "../Calendary/index.jsx";
import icon from '../../constants/icon.js'
import { Image } from "react-native";
const Tab = createBottomTabNavigator();
export function Main() {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name='Home'
                component={TelaHome}
                options={{
                    headerTitleAlign: 'center',
                    headerTitle: () => {
                        return <Image source={icon.logo} style={{ width: 120, height: 60 }}></Image>
                    },
                    tabBarShowLabel: false,
                    tabBarIcon: ({ focused }) => {
                        return <Image
                            source={icon.casa}
                            style={{
                                width: 30,
                                height: 30,
                                opacity: focused ? 1 : 0.3
                            }}
                        ></Image>
                    }
                }}
            ></Tab.Screen>
            <Tab.Screen
                name="Calendar"
                component={Calendary}
                options={{
                    headerTitleAlign: 'center',
                    headerTitle: () => {
                        return <Image source={icon.logo} style={{ width: 120, height: 60 }}></Image>
                    },
                    tabBarIcon: ({ focused }) => {
                        return <Image
                            source={icon.calendar}
                            style={{
                                width: 30,
                                height: 30,
                                opacity: focused ? 1 : 0.3
                            }}>
                        </Image>
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
                        return <Image
                            source={icon.user}
                            style={{
                                width: 35,
                                height: 35,
                                opacity: focused ? 1 : 0.3
                            }}
                        ></Image>
                    }
                }}
            ></Tab.Screen>
        </Tab.Navigator>
    )
}