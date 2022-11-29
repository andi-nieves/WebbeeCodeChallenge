import React, { useEffect, useState, useCallback } from 'react';
import {
  SafeAreaView,
  View,
  StatusBar,
  ScrollView,
} from 'react-native';
import { find } from 'lodash'
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import styles from '../Home/Home.style';
import EditItem from '../../components/EditItem';
import Typo from '../../components/Typo';
import { addCategoryData } from '../../stores/data.reducer'
import Button from '../../components/Button';



const CategoryView = ({ navigation, ...props }: any) => {
  
  const dispatch = useAppDispatch()
  const { categoryData, categories: { types } }: any = useAppSelector(({ categories, data: {categoryData} }) => { return { categories, categoryData } });
  const [type, setType]:any = useState()

  useEffect(() => {

    const category = find(categoryData, {categoryId: props.route.params.id});
    setType(category)

  }, [categoryData])
  
  const category = find(types, { id: props.route.params.id })

  const addNewHandler = useCallback(() => {
    dispatch(addCategoryData({ id: props.route.params.id, types }))
  }, [types, props])

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={'#f9f9f9'} />
      <SafeAreaView style={styles.SafeAreaView1} />
      <SafeAreaView style={styles.SafeAreaView2}>
        <ScrollView>
          <View style={{ paddingLeft: 10, flexDirection: 'row', justifyContent: 'space-between', paddingRight: 10 }}>
            <Typo fontSize={40} fontWeight="bold">{category?.name}</Typo>
            <Button onPress={ addNewHandler } text="Add New" />
          </View>
          {!type && <View style={{ alignItems: 'center' }}><Typo color="#ccc">No Items to display</Typo></View>}
          {(type?.data ||[]).map((item: any) => {
          return <EditItem key={`wrapper-${item?.id}`} category={category} item={type} data={item} />})}
        </ScrollView>

      </SafeAreaView>
    </>
  );
};

export default CategoryView;
