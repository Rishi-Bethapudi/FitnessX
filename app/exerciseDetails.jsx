import { View, Text, TouchableOpacity, Modal, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Image } from 'expo-image';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function ExerciseDetails() {
  const router = useRouter();
  const item = useLocalSearchParams();

  const parsedItem = item ? JSON.parse(item.item) : {};

  const [modalVisibility, setModalVisibility] = useState(true);

  return (
    <Modal animationType="slide" transparent={true} visible={modalVisibility}>
      <View className="flex-1 justify-end ">
        {/* Modal Content */}
        <View className="bg-white rounded-t-[40px] shadow-lg p-5 max-h-[90%]">
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Exercise Image */}
            <View className="relative">
              <Image
                source={{ uri: parsedItem.gifUrl }}
                contentFit="cover"
                style={{
                  width: wp(100),
                  height: hp(45), // 🛠️ Adjusted for better proportional scaling
                  borderTopLeftRadius: 40,
                  borderTopRightRadius: 40,
                  resizeMode: 'cover', // Ensure it fills properly
                }}
              />

              {/* Close Button */}
              <TouchableOpacity
                onPress={() => router.back()}
                className="absolute right-5 top-5 bg-rose-500 rounded-full p-2"
              >
                <AntDesign name="closecircle" size={hp(3)} color="white" />
              </TouchableOpacity>
            </View>

            {/* Exercise Info */}
            <View className="mt-5 space-y-3 px-3">
              <Text className="text-3xl font-bold text-neutral-700">
                {parsedItem.name}
              </Text>
              <Text className="text-lg text-gray-500">
                Equipment:{' '}
                <Text className="font-semibold">{parsedItem.equipment}</Text>
              </Text>
              <Text className="text-lg text-gray-500">
                Target Muscle:{' '}
                <Text className="font-semibold">{parsedItem.target}</Text>
              </Text>
              <Text className="text-lg text-gray-500">
                Secondary Muscles:
                <Text className="font-semibold">
                  {' '}
                  {parsedItem.secondaryMuscles?.join(', ')}
                </Text>
              </Text>

              {/* Instructions Section */}
              <View className="mt-5">
                <Text className="text-xl font-bold text-neutral-700">
                  Instructions
                </Text>
                {Array.isArray(parsedItem?.instructions) &&
                parsedItem.instructions.length > 0 ? (
                  parsedItem.instructions.map((step, index) => (
                    <View key={index} className="flex-row items-start mt-2">
                      <Text className="text-lg font-semibold text-rose-500 mr-2">
                        {index + 1}.
                      </Text>
                      <Text className="text-lg text-gray-600 flex-1">
                        {step}
                      </Text>
                    </View>
                  ))
                ) : (
                  <Text className="text-lg text-gray-500 italic">
                    No instructions available.
                  </Text>
                )}
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
