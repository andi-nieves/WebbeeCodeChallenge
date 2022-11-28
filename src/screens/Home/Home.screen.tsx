import React, { useCallback } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  ScrollView
} from 'react-native';

import styles from './Home.style';
import { useAppSelector } from '../../hooks/redux';
import AddField from '../../components/AddField';

const Home = ({ navigation }: any) => {
  // const dispatch = useAppDispatch();
  const { types } = useAppSelector(state => state.categories);
  console.log('ca', types)
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={'#f9f9f9'} />
      <SafeAreaView style={styles.SafeAreaView2}>
        {types.map(type => <AddField data={type} title={type.name} />)}
        
      </SafeAreaView>
    </>
  );
};

export default Home;
