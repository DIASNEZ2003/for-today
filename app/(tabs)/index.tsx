import { Ionicons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { Audio } from "expo-av";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

const MusicList = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState(null);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullPlayerVisible, setIsFullPlayerVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  // 1. DATA: Your songMap with all your special descriptions
  const songMap = {
    "MUSIC 1": {
      title: "THE ONLY EXCEPTION",
      file: require("../../assets/m1.mp3"),
      image: require("../../assets/1.jpg"),
      desc: "I choose this song baby because always ko ka remeber nmo baby because you are my only Exception my baby nako😘",
    },
    "MUSIC 2": {
      title: "I THOUGHT I SAW YOUR FACE AGAIN",
      file: require("../../assets/m2.mp3"),
      image: require("../../assets/2.jpg"),
      desc: "I always remember na travel ta togehter my baby nako kay ka remeber ko sa view na dusk baby sunset 🥰",
    },
    "MUSIC 3": {
      title: "WALKING BACK HOME",
      file: require("../../assets/m3.mp3"),
      image: require("../../assets/3.jpg"),
      desc: "Kani baby I always remeber you katong talking stage pata my baby nako super inlove kaayo ko nmo my baby nako 🥺",
    },
    "MUSIC 4": {
      title: "YELLOW",
      file: require("../../assets/m4.mp3"),
      image: require("../../assets/4.jpg"),
      desc: "I choose this music baby becaue your my yellow my baby nako my warmth, my brightness my hope 🥰🥰",
    },
    "MUSIC 5": {
      title: "THIS IS WHAT FALLING IN LOVE FEELS LIKE",
      file: require("../../assets/m5.mp3"),
      image: require("../../assets/5.jpg"),
      desc: "this song alwaysremonds me at our second year my baby nako im so very in love with you 🥰🥰🥰",
    },
    "MUSIC 6": {
      title: "YOU'LL BE SAFE HERE",
      file: require("../../assets/m6.mp3"),
      image: require("../../assets/6.jpg"),
      desc: "This song motivates me to be strong my baby nako because im the one whom protects you baby 🥰🥰🥰",
    },
    "MUSIC 7": {
      title: "7 / 11",
      file: require("../../assets/m7.mp3"),
      image: require("../../assets/7.jpg"),
      desc: "Our motivational song my baby nako to go in japan and be successful in the future 🥰🥰🥰",
    },
    "MUSIC 8": {
      title: "FROM THE START",
      file: require("../../assets/m8.mp3"),
      image: require("../../assets/8.jpeg"),
      desc: "So nostalgic my baby nako this song baby nako this me first year my baby nmako 🥰🥰🥰",
    },
    "MUSIC 9": {
      title: "FIX YOU",
      file: require("../../assets/m9.mp3"),
      image: require("../../assets/9.jpeg"),
      desc: "This song reminds me always my baby nako that I promise you always baby na I will heal you 🥺",
    },
    "MUSIC 10": {
      title: "I THINK I LIKE WHEN IT RAINS",
      file: require("../../assets/m10.mp3"),
      image: require("../../assets/10.jpg"),
      desc: "This song remins me about rain how you like the rain my baby nako🥰🥰🥰",
    },
    "MUSIC 11": {
      title: "SOMEONE TO SPEND TIME WITH",
      file: require("../../assets/m11.mp3"),
      image: require("../../assets/11.jpg"),
      desc: "I remeber the times that we spend together my baby nako na kita suha my baby nako",
    },
    "MUSIC 12": {
      title: "BINIBINI",
      file: require("../../assets/m12.mp3"),
      image: require("../../assets/12.jpg"),
      desc: "My baby nako my binibini super preety always reminds me of you my baby nako🥰🥰🥰",
    },
    "MUSIC 13": {
      title: "SUNFLOWER",
      file: require("../../assets/m13.mp3"),
      image: require("../../assets/13.jpg"),
      desc: "Always reminds me of you my baby nako your so pretty like an sunflower my baby nako🥰🥰🥰",
    },
    "MUSIC 14": {
      title: "COME INSIDE OF MY HEART",
      file: require("../../assets/m14.mp3"),
      image: require("../../assets/14.jpg"),
      desc: "Very Nostalgic my baby nako mao ni ako cge pa music pag third year my baby nako🥰🥰🥰",
    },
    "MUSIC 15": {
      title: "PASILYO",
      file: require("../../assets/m15.mp3"),
      image: require("../../assets/15.jpg"),
      desc: "Ma tan aw nako na kasal nata my baby nko if makadungog ko ani musica my baby nako🥰🥰🥰",
    },
    "MUSIC 16": {
      title: "THOSE EYES",
      file: require("../../assets/m16.mp3"),
      image: require("../../assets/16.jpg"),
      desc: "This song reminds of you my baby nako ma hunahuna ko na kita gi describe sa song 🥰🥰🥰",
    },
    "MUSIC 17": {
      title: "KISS ME",
      file: require("../../assets/m17.mp3"),
      image: require("../../assets/17.jpg"),
      desc: "So nostalgic kaayo ni my baby nako kiss me my baby nako😘😘😘",
    },
    "MUSIC 18": {
      title: "WONT GO HOME WITHOUT YOU",
      file: require("../../assets/m18.mp3"),
      image: require("../../assets/18.jpg"),
      desc: "Kani na song baby wont go home without you my baby nako 🥺🥺🥺",
    },
  };

  const [currentSong, setCurrentSong] = useState({
    id: "MUSIC 1",
    ...songMap["MUSIC 1"],
  });

  // 2. AUDIO FUNCTIONS
  const onPlaybackStatusUpdate = (status) => {
    if (status.isLoaded) {
      setPosition(status.positionMillis);
      setDuration(status.durationMillis);
      setIsPlaying(status.isPlaying);
      if (status.didJustFinish) handleSkipNext();
    }
  };

  async function loadAndPlay(songId) {
    const selected = songMap[songId];
    if (!selected) return;
    setCurrentSong({ id: songId, ...selected });
    if (sound) await sound.unloadAsync();
    try {
      const { sound: newSound } = await Audio.Sound.createAsync(
        selected.file,
        { shouldPlay: true, volume: 1.0 },
        onPlaybackStatusUpdate,
      );
      setSound(newSound);
      setIsSearching(false);
      setSearchQuery("");
    } catch (error) {
      console.log("Error loading sound: ", error);
    }
  }

  const handleSkipNext = () => {
    let currentNum = parseInt(currentSong.id.split(" ")[1]);
    let nextNum = currentNum >= 18 ? 1 : currentNum + 1;
    loadAndPlay(`MUSIC ${nextNum}`);
  };

  const handleSkipPrev = () => {
    let currentNum = parseInt(currentSong.id.split(" ")[1]);
    let prevNum = currentNum <= 1 ? 18 : currentNum - 1;
    loadAndPlay(`MUSIC ${prevNum}`);
  };

  const togglePlayPause = async () => {
    if (!sound) return;
    isPlaying ? await sound.pauseAsync() : await sound.playAsync();
  };

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  // 3. SEARCH & LIST LOGIC
  const filteredSongs = Object.keys(songMap).filter((key) =>
    songMap[key].title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const songsArray = Object.keys(songMap).map((key) => ({
    id: key,
    ...songMap[key],
  }));

  // Helper for YouTube Quick Picks rows
  const rows = [[], [], [], []];
  songsArray.forEach((item, index) => {
    rows[index % 4].push(item);
  });

  return (
    <View className="flex-1 bg-black">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header & Search */}
        <View className="mt-14 px-6 flex-row justify-between items-center">
          {!isSearching ? (
            <>
              <Text className="font-mono text-3xl font-bold">
                <Text className="text-[#FF69B4]">HEX</Text>
                <Text className="text-white">PLAY</Text>
              </Text>
              <TouchableOpacity onPress={() => setIsSearching(true)}>
                <Ionicons name="search" size={24} color="white" />
              </TouchableOpacity>
            </>
          ) : (
            <View className="flex-1 flex-row items-center bg-[#1C1C1E] rounded-full px-4 py-2">
              <TextInput
                autoFocus
                placeholder="Search..."
                placeholderTextColor="gray"
                className="flex-1 text-white"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
              <TouchableOpacity
                onPress={() => {
                  setIsSearching(false);
                  setSearchQuery("");
                }}
              >
                <Ionicons name="close" size={20} color="white" />
              </TouchableOpacity>
            </View>
          )}
        </View>

        {isSearching && searchQuery.length > 0 ? (
          <View className="px-6 mt-4">
            {filteredSongs.map((id) => (
              <TouchableOpacity
                key={id}
                onPress={() => loadAndPlay(id)}
                className="flex-row items-center py-3 border-b border-gray-900"
              >
                <Image
                  source={songMap[id].image}
                  className="w-12 h-12 rounded-md"
                />
                <View className="ml-3">
                  <Text className="text-white font-bold">
                    {songMap[id].title}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <>
            {/* Quick Picks (Horizontal Grid) */}
            <View className="mt-8 px-6">
              <Text className="text-white text-2xl font-bold mb-4">
                Quick picks
              </Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View>
                  {rows.map((row, i) => (
                    <View key={i} className="flex-row">
                      {row.map((item) => (
                        <TouchableOpacity
                          key={item.id}
                          onPress={() => loadAndPlay(item.id)}
                          className="flex-row items-center w-72 mb-4 mr-4"
                        >
                          <Image
                            source={item.image}
                            className="w-14 h-14 rounded-md"
                          />
                          <View className="ml-3 flex-1">
                            <Text
                              numberOfLines={1}
                              className={`font-bold ${currentSong.id === item.id ? "text-[#FF69B4]" : "text-white"}`}
                            >
                              {item.title}
                            </Text>
                            <Text className="text-gray-500 text-xs">
                              {item.id}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      ))}
                    </View>
                  ))}
                </View>
              </ScrollView>
            </View>

            {/* All Memories (Vertical List) */}
            <View className="mt-10 px-6 pb-40">
              <Text className="text-white text-2xl font-bold mb-6">
                All Memories
              </Text>
              {songsArray.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => loadAndPlay(item.id)}
                  className="flex-row items-center mb-6"
                >
                  <Image
                    source={item.image}
                    className="w-16 h-16 rounded-lg"
                    style={{ opacity: currentSong.id === item.id ? 0.5 : 1 }}
                  />
                  <View className="ml-4 flex-1">
                    <Text
                      numberOfLines={1}
                      className={`text-lg font-bold ${currentSong.id === item.id ? "text-[#FF69B4]" : "text-white"}`}
                    >
                      {item.title}
                    </Text>
                    <Text numberOfLines={1} className="text-gray-400 text-sm">
                      {item.desc.substring(0, 35)}...
                    </Text>
                  </View>
                  <Ionicons name="play-outline" size={22} color="gray" />
                </TouchableOpacity>
              ))}
            </View>
          </>
        )}
      </ScrollView>

      {/* Mini Player */}
      {sound && (
        <View className="absolute bottom-0 w-full bg-[#121212] border-t border-gray-800 pb-8 pt-2">
          <Slider
            style={{ width: "100%", height: 30 }}
            minimumValue={0}
            maximumValue={duration}
            value={position}
            minimumTrackTintColor="#FF69B4"
            thumbTintColor="#FF69B4"
            onSlidingComplete={(v) => sound.setPositionAsync(v)}
          />
          <Text className="text-white text-center font-bold text-[9px] uppercase">
            {currentSong.title}
          </Text>
          <View className="flex-row items-center justify-center space-x-16 mt-2">
            <TouchableOpacity onPress={handleSkipPrev}>
              <Ionicons name="play-skip-back" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={togglePlayPause}>
              <Ionicons
                name={isPlaying ? "pause" : "play"}
                size={30}
                color="white"
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSkipNext}>
              <Ionicons name="play-skip-forward" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setIsFullPlayerVisible(true)}
              className="absolute right-6"
            >
              <Ionicons name="expand-outline" size={22} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Full Player Modal */}
      <Modal visible={isFullPlayerVisible} animationType="slide">
        <View className="flex-1 bg-[#0A0A0A] px-8 pt-10">
          <TouchableOpacity onPress={() => setIsFullPlayerVisible(false)}>
            <Ionicons name="chevron-down" size={30} color="pink" />
          </TouchableOpacity>
          <Image
            source={currentSong.image}
            style={{ width: width - 64, height: width - 64 }}
            className="rounded-xl mt-10 mb-10"
          />
          <Text className="text-white text-2xl font-bold">
            {currentSong.title}
          </Text>
          <Text className="text-gray-400 mt-2">
            {currentSong.description || currentSong.desc}
          </Text>
          <Slider
            style={{ width: "100%", height: 40, marginTop: 20 }}
            minimumValue={0}
            maximumValue={duration}
            value={position}
            minimumTrackTintColor="#FFF"
            thumbTintColor="#FFF"
            onSlidingComplete={(v) => sound.setPositionAsync(v)}
          />
          <View className="flex-row justify-between px-10 items-center mt-10">
            <TouchableOpacity onPress={handleSkipPrev}>
              <Ionicons name="play-skip-back" size={35} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={togglePlayPause}
              className="bg-white p-6 rounded-full"
            >
              <Ionicons
                name={isPlaying ? "pause" : "play"}
                size={40}
                color="black"
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSkipNext}>
              <Ionicons name="play-skip-forward" size={35} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default MusicList;
