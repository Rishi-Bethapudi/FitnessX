import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { bodyParts } from '../constants/consts';
import { Link } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown } from 'react-native-reanimated';

export default function BodyParts() {
  return (
    <View className="px-4 py-6 bg-white">
      {/* Heading */}
      <Text className="text-2xl font-bold text-neutral-800 mb-4">
        Select a Body Part
      </Text>

      {/* Grid List */}
      <FlatList
        data={bodyParts}
        numColumns={2}
        keyExtractor={(item) => item.name}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        renderItem={({ item, index }) => (
          <BodyPartCard index={index} item={item} />
        )}
      />
    </View>
  );
}

const BodyPartCard = ({ item, index }) => {
  return (
    // <Animated.View entering={FadeInDown.duration(400).delay(index * 200)}>
    <Link href={{ pathname: '/exercises', params: item }} asChild>
      <TouchableOpacity
        className="relative w-[48%] h-[54vw] mb-4 rounded-3xl overflow-hidden shadow-md bg-rose-300"
        activeOpacity={0.85}
      >
        {/* Background Image */}
        <Image
          source={item.image}
          resizeMode="cover"
          className="w-full h-full"
        />

        {/* Gradient Overlay */}
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.85)']}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          className="absolute bottom-0 w-full h-2/5"
        />

        {/* Title */}
        <Text className="absolute bottom-6 left-0 right-0 text-center text-white text-lg font-semibold tracking-wide">
          {item?.name}
        </Text>
      </TouchableOpacity>
    </Link>
    // </Animated.View>
  );
};
