import React from 'react';
import { View, Text, Image, Dimensions } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { SliderImages } from '../constants/consts';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const { width } = Dimensions.get('window');

const ImageSlider = () => {
  if (!SliderImages || SliderImages.length === 0) {
    return (
      <View className="h-48 w-[90%] bg-gray-200 mx-auto rounded-lg flex items-center justify-center">
        <Text className="text-neutral-600 text-lg font-semibold">
          No Images Available
        </Text>
      </View>
    );
  }

  return (
    <View className="items-center justify-center mt-4">
      <Carousel
        loop
        autoPlay
        autoPlayInterval={4000}
        data={SliderImages}
        width={wp(90)}
        height={hp(25)}
        scrollAnimationDuration={700}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 40,
        }}
        renderItem={({ item }) => (
          <View className="rounded-xl overflow-hidden shadow-lg bg-white">
            <Image
              source={typeof item === 'string' ? { uri: item } : item}
              className="w-full h-full rounded-lg"
              resizeMode="cover"
            />
          </View>
        )}
      />
    </View>
  );
};

export default ImageSlider;
