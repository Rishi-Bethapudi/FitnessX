import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Link } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Image } from 'expo-image';

export default function ExerciseList({ data }) {
  return (
    <View className="px-4 py-6">
      <FlatList
        data={data}
        numColumns={2}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 60 }}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        renderItem={({ item, index }) => (
          <ExerciseCard index={index} item={item} />
        )}
      />
    </View>
  );
}

const ExerciseCard = ({ item, index }) => {
  return (
    <Link
      href={{
        pathname: '/exerciseDetails',
        params: { item: JSON.stringify(item) },
      }}
      asChild
    >
      <TouchableOpacity className="flex py-3 space-y-2">
        <View className="bg-neutral-200 shadow rounded-[25px]">
          <Image
            source={{ uri: item.gifUrl }}
            contentFit="cover"
            style={{ width: wp(40), height: wp(52) }}
            className="rounded-b-[35px]"
          />
        </View>
        <Text
          style={{ fontSize: hp(1.7) }}
          className="text-neutral-700 font-semibold ml-1 tracking-wide"
        >
          {item?.name?.length > 20 ? item.name.slice(0, 20) + '...' : item.name}
        </Text>
      </TouchableOpacity>
    </Link>
  );
};
