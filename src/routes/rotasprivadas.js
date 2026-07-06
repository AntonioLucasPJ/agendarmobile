import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { color } from "../constants/theme.js";
import { Main } from "../screens/main";
import { TelaCadastroVeiculos } from "../screens/CadastroVeiculos/index.jsx";
import { Schedule } from '../screens/agendamento/index.jsx'
import { LoadMecanico } from "../screens/Mecanicos/index.jsx";
const Stack = createNativeStackNavigator();
function RotasPrivadas() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="main"
                component={Main}
                options={{
                    headerShown: false
                }}></Stack.Screen>
            <Stack.Screen
                name="vehicle"
                component={TelaCadastroVeiculos}
                options={{
                    headerTitle: "SingupVehicle",
                    headerTitleAlign: "center",
                    headerShadowVisible: false,
                    headerTintColor: color.white,
                    headerStyle: {
                        backgroundColor: color.blue
                    }
                    // headerShown:false
                }}
            ></Stack.Screen>
            <Stack.Screen
                name="mecanicos"
                component={LoadMecanico}
                options={{
                    headerTitle: "Mecanicos",
                    headerTitleAlign: "center",
                    headerShadowVisible: false,
                    headerTintColor: color.white,
                    headerStyle: {
                        backgroundColor: color.blue
                    }
                    // headerShown:false
                }}></Stack.Screen>
            <Stack.Screen
                name="Shedule"
                component={Schedule}
                options={{
                    headerTitle: "Agendamento",
                    headerTitleAlign: "center",
                    headerTintColor: color.white,
                    headerShadowVisible: false,
                    headerStyle: {
                        backgroundColor: color.blue,
                    }
                }}>

            </Stack.Screen>
        </Stack.Navigator>
    )
}
export default RotasPrivadas