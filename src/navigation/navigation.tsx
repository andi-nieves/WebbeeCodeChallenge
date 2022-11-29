import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Home from '../screens/Home/Home.screen';
import CategoryView from '../screens/CategoryView';

import { useAppSelector } from '../hooks/redux';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerNav() {
  const { types } = useAppSelector(state => state.categories);
  return <Drawer.Navigator>
    <Drawer.Screen name="Dashboard" component={Home} />
    {types.map((category: any) => <Drawer.Screen key={category?.id} initialParams={{ id: category.id }} name={`${category.name ||'Unnamed'}`} component={CategoryView} />)}
    <Drawer.Screen name="Manage Categories" component={Home} />
</Drawer.Navigator>
}

const MainNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="HomeBase"
          options={{ headerShown: false }}
          component={DrawerNav}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainNavigation;
