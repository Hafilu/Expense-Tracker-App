import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Manageexpense from "./screens/Manageexpense";
import Recentexpenses from "./screens/Recentexpenses";
import Allexpenses from "./screens/Allexpenses";
import { GlobalStyles } from "./constant/styles";
import { Ionicons } from "@expo/vector-icons";
import Iconbutton from "./components/ui/Iconbutton";
import ExpensesContextProvider from "./store/Expenses-context";

const stack = createStackNavigator();
const bottomtab = createBottomTabNavigator();

function ExpensesOverView() {
  return (
    <bottomtab.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        headerTintColor: "white",
        tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        tabBarActiveTintColor: GlobalStyles.colors.accent500,
        headerRight: ({ tintColor }) => (
          <Iconbutton
            icon="add"
            size={24}
            color={tintColor}
            onPress={() => {
              navigation.navigate("ManageExpense");
            }}
          />
        ),
      })}
    >
      <bottomtab.Screen
        name="Recentexpenses"
        component={Recentexpenses}
        options={{
          title: "Recent Expenses",
          tabBarLabel: "Recent",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="hourglass" size={size} color={color} />
          ),
        }}
      />
      <bottomtab.Screen
        name="Allexpenses"
        component={Allexpenses}
        options={{
          title: "All Expenses",
          tabBarLabel: "All Expenses",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" size={size} color={color} />
          ),
        }}
      />
    </bottomtab.Navigator>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <ExpensesContextProvider>
      <NavigationContainer>
        <stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
            headerTintColor: "white",
          }}
        >
          <stack.Screen
            name="ExpensesOverView"
            component={ExpensesOverView}
            options={{ headerShown: false }}
          />
          <stack.Screen name="ManageExpense" component={Manageexpense} />
        </stack.Navigator>
      </NavigationContainer>
      </ExpensesContextProvider>
    </>
  );
}

const styles = StyleSheet.create({});
