import React, { useCallback } from 'react';
import {
  SafeAreaView,
  View,
  StatusBar,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import Typo from '../../components/Typo';

import styles from './Home.style';
import { useAppSelector } from '../../hooks/redux';
import AddCategory from '../../components/AddCategory';

import { useAppDispatch } from '../../hooks/redux';
import { addNewCategory } from '../../stores/categories.reducer'


const Home = ({ navigation }: any) => {
  const dispatch = useAppDispatch();
  const { types } = useAppSelector(state => state.categories);
  
  const handleNewType = useCallback(() => {
    dispatch(addNewCategory())
  }, [types])

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" backgroundColor={'#f9f9f9'} />
      <SafeAreaView style={styles.SafeAreaView2}>
        <ScrollView>
          {types.length === 0 && <View style={styles.noItem}>
              <Typo color="#ccc" fontSize={16}>No items to display</Typo>
            </View>}
          {types.map(type => <AddCategory key={type.id} data={type} title={type.name} />)}
        </ScrollView>
        <TouchableOpacity onPress={handleNewType} style={styles.button}><Typo fontSize={16} color="#FFF">Add New Category</Typo></TouchableOpacity>
      </SafeAreaView>
    </View>
  );
};

export default Home;
