import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { fetchExercisesFromDB } from '../api/exerciseDB';
import { StatusBar } from 'expo-status-bar';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { ScrollView } from 'react-native-virtualized-view';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ExerciseList from '../components/exercisesList';

export default function Exercises() {
  const router = useRouter();
  const [exercises, SetExercises] = useState([]);
  const item = useLocalSearchParams();

  useEffect(() => {
    if (item?.name) getExercises(item.name);
  }, [item.name]);

  const getExercises = async (bodyPart) => {
    if (!bodyPart) return;
    let data = await fetchExercisesFromDB(bodyPart);
    if (data && Array.isArray(data)) {
      SetExercises(data);
    } else {
      SetExercises([]);
    }
  };
  return (
    <ScrollView>
      <StatusBar style="light" />
      <Image
        source={item.image}
        style={{ width: wp(100), height: hp(45) }}
        className="rounded-b-[35px]"
      ></Image>
      <TouchableOpacity
        onPress={() => {
          router.back();
        }}
        className="bg-rose-500 mx-4 absolute rounded-full justify-center items-center pr-1"
        style={{ width: hp(5), height: hp(5), marginTop: hp(7) }}
      >
        <Ionicons name="arrow-back-circle" size={hp(5)} color="white" />
      </TouchableOpacity>

      <View className="mx-4 space-y-3 mt-4">
        <Text
          style={{ fontSize: hp(3) }}
          className="font-semibold text-neutral-600"
        >
          {item.name} exercises
        </Text>
        <View className="mb-10">
          <ExerciseList data={exercises} />
        </View>
      </View>
    </ScrollView>
  );
}
