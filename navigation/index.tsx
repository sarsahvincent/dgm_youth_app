import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';
import useColorScheme from '../hooks/useColorScheme';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import ProfileScreen from '../screens/ProfileScreen';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import PaymentScreen from '../screens/PaymentScreen';
import SearchScreen from '../screens/SearchScreen';
import ViewProfileScreen from '../screens/ViewProfileScreen';
import {
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
} from '../types';
import LinkingConfiguration from './LinkingConfiguration';

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Login'
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='Root'
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='ViewProfile'
        component={ViewProfileScreen}
        options={{ headerShown: false }}
      />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name='Modal' component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName='Dashboard'
      screenOptions={{
        tabBarActiveTintColor: 'purple',
      }}
    >
      <BottomTab.Screen
        name='Dashboard'
        component={HomeScreen}
        options={({ navigation }: RootTabScreenProps<'Dashboard'>) => ({
          headerShown: false,
          title: 'Dashboard',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name='dashboard' color={color} />
          ),
        })}
      />
      <BottomTab.Screen
        name='Profile'
        component={ProfileScreen}
        options={{
          headerShown: false,
          title: 'Profile',
          tabBarIcon: ({ color }) => <TabBarIcon name='user' color={color} />,
        }}
      />
      <BottomTab.Screen
        name='Search'
        component={SearchScreen}
        options={{
          headerShown: false,
          title: 'Search',
          tabBarIcon: ({ color }) => <TabBarIcon name='search' color={color} />,
        }}
      />
      <BottomTab.Screen
        name='Payment'
        component={PaymentScreen}
        options={{
          headerShown: false,
          title: 'Search',
          tabBarIcon: ({ color }) => <TabBarIcon name='dollar' color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
