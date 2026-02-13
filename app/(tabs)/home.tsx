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

const Home = () => {
  const [activePage, setActivePage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState(null);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullPlayerVisible, setIsFullPlayerVisible] = useState(false);

  // Search States
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const [currentSong, setCurrentSong] = useState({
    id: "MUSIC 1",
    title: "THE ONLY EXCEPTION",
    file: require("../../assets/m1.mp3"),
    image: require("../../assets/1.jpg"),
    description:
      "I choose this song baby because always ko ka remeber nmo baby because you are my only Exception my baby nako😘",
  });

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
      desc: "This song remins me about rain how you like the rain my baby nako na calm my baby nako🥰🥰🥰",
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

  const filteredSongs = Object.keys(songMap).filter((key) =>
    songMap[key].title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

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
    setCurrentSong({ id: songId, ...selected, description: selected.desc });
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

  const seekMusic = (value) => {
    if (sound) sound.setPositionAsync(value);
  };

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const getMusicImage = (name) => {
    const images = {
      "MUSIC 1": require("../../assets/1.jpg"),
      "MUSIC 2": require("../../assets/2.jpg"),
      "MUSIC 3": require("../../assets/3.jpg"),
      "MUSIC 4": require("../../assets/4.jpg"),
      "MUSIC 5": require("../../assets/5.jpg"),
      "MUSIC 6": require("../../assets/6.jpg"),
      "MUSIC 7": require("../../assets/7.jpg"),
      "MUSIC 8": require("../../assets/8.jpeg"),
      "MUSIC 9": require("../../assets/9.jpeg"),
      "MUSIC 10": require("../../assets/10.jpg"),
      "MUSIC 11": require("../../assets/11.jpg"),
      "MUSIC 12": require("../../assets/12.jpg"),
      "MUSIC 13": require("../../assets/13.jpg"),
      "MUSIC 14": require("../../assets/14.jpg"),
      "MUSIC 15": require("../../assets/15.jpg"),
      "MUSIC 16": require("../../assets/16.jpg"),
      "MUSIC 17": require("../../assets/17.jpg"),
      "MUSIC 18": require("../../assets/18.jpg"),
    };
    return images[name] || null;
  };

  const quickPicksList = Object.keys(songMap);
  const rows = [[], [], [], []];
  quickPicksList.forEach((item, index) => {
    rows[index % 4].push(item);
  });

  const pages = [
    [
      ["MUSIC 1", "MUSIC 2", "MUSIC 3"],
      ["MUSIC 4", "MUSIC 5", "MUSIC 6"],
      ["MUSIC 7", "MUSIC 8", "MUSIC 9"],
    ],
    [
      ["MUSIC 10", "MUSIC 11", "MUSIC 12"],
      ["MUSIC 13", "MUSIC 14", "MUSIC 15"],
      ["MUSIC 16", "MUSIC 17", "MUSIC 18"],
    ],
  ];

  return (
    <View className="flex-1 bg-black">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header with Functional Search */}
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
              <Ionicons name="search" size={20} color="gray" />
              <TextInput
                autoFocus
                placeholder="Search songs..."
                placeholderTextColor="gray"
                className="flex-1 ml-2 text-white"
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

        {/* Live Search Suggestions */}
        {isSearching && searchQuery.length > 0 ? (
          <View className="px-6 mt-4">
            {filteredSongs.length > 0 ? (
              filteredSongs.map((item) => (
                <TouchableOpacity
                  key={item}
                  onPress={() => loadAndPlay(item)}
                  className="flex-row items-center py-3 border-b border-gray-900"
                >
                  <Image
                    source={getMusicImage(item)}
                    className="w-12 h-12 rounded-md"
                  />
                  <View className="ml-3">
                    <Text className="text-white font-bold">
                      {songMap[item].title}
                    </Text>
                    <Text className="text-gray-500 text-xs">
                      {item} • Tap to play
                    </Text>
                  </View>
                </TouchableOpacity>
              ))
            ) : (
              <Text className="text-gray-500 text-center mt-10">
                No songs found matching "{searchQuery}"
              </Text>
            )}
          </View>
        ) : (
          <>
            {/* Standard UI Components - Profile Image replaced with Heart Icon */}
            <View className="px-6 mt-10 flex-row items-center">
              <View className="w-12 h-12 rounded-full border-2 border-[#FF69B4] justify-center items-center">
                <Ionicons name="heart" size={24} color="white" />
              </View>
              <View className="ml-3">
                <Text className="text-white font-bold text-lg">
                  Flordeliz Hilongos
                </Text>
                <Text className="text-[#FF69B4] text-xs font-mono">
                  @hexpyre
                </Text>
              </View>
            </View>

            <View className="mt-8 px-6">
              <Text className="text-gray-400 text-xs uppercase font-bold tracking-widest mb-1">
                Start Radio From a Song
              </Text>
              <Text className="text-white text-2xl font-bold mb-4">
                Quick picks
              </Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View>
                  {rows.map((row, i) => (
                    <View key={i} className="flex-row">
                      {row.map((item) => (
                        <TouchableOpacity
                          key={item}
                          onPress={() => loadAndPlay(item)}
                          className="flex-row items-center w-72 mb-4 mr-4"
                        >
                          <Image
                            source={getMusicImage(item)}
                            className="w-14 h-14 rounded-md"
                          />
                          <View className="ml-3 flex-1">
                            <Text
                              numberOfLines={1}
                              className="text-white font-bold text-sm"
                            >
                              {songMap[item].title}
                            </Text>
                            <Text
                              numberOfLines={1}
                              className="text-gray-400 text-xs mt-1"
                            >
                              {item} • Memories
                            </Text>
                          </View>
                        </TouchableOpacity>
                      ))}
                    </View>
                  ))}
                </View>
              </ScrollView>
            </View>

            <View className="px-6 mt-10">
              <Text className="text-white font-bold text-xl uppercase tracking-widest">
                Memories
              </Text>
            </View>
            <View>
              <ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onMomentumScrollEnd={(e) =>
                  setActivePage(
                    Math.round(e.nativeEvent.contentOffset.x / width),
                  )
                }
                className="mt-4"
              >
                {pages.map((grid, pageIndex) => (
                  <View
                    key={pageIndex}
                    style={{ width: width }}
                    className="px-6"
                  >
                    {grid.map((row, rowIndex) => (
                      <View
                        key={rowIndex}
                        className="flex-row justify-between mb-4"
                      >
                        {row.map((musicItem) => (
                          <TouchableOpacity
                            key={musicItem}
                            onPress={() => loadAndPlay(musicItem)}
                            className="w-[30%] aspect-square bg-[#1C1C1E] rounded-2xl border border-gray-800 justify-center items-center overflow-hidden"
                          >
                            {getMusicImage(musicItem) && (
                              <Image
                                source={getMusicImage(musicItem)}
                                className="w-full h-full absolute"
                              />
                            )}
                            <View className="absolute bottom-1 bg-black/50 px-2 rounded w-[90%]">
                              <Text
                                numberOfLines={1}
                                className="text-white text-[7px] font-mono font-bold text-center"
                              >
                                {musicItem === "MUSIC 5"
                                  ? "THIS IS WHAT FALLING.."
                                  : songMap[musicItem]?.title || musicItem}
                              </Text>
                            </View>
                          </TouchableOpacity>
                        ))}
                      </View>
                    ))}
                  </View>
                ))}
              </ScrollView>
              <View className="flex-row justify-center mt-2">
                {pages.map((_, index) => (
                  <View
                    key={index}
                    className={`h-1.5 w-1.5 rounded-full mx-1 ${activePage === index ? "bg-[#FF69B4]" : "bg-gray-700"}`}
                  />
                ))}
              </View>
            </View>
          </>
        )}
        <View className="h-40" />
      </ScrollView>

      {/* MINI PLAYER */}
      {sound && (
        <View className="absolute bottom-0 w-full bg-[#121212] border-t border-gray-800 pb-5 pt-2">
          <Slider
            style={{ width: "100%", height: 30 }}
            minimumValue={0}
            maximumValue={duration}
            value={position}
            minimumTrackTintColor="#FF69B4"
            maximumTrackTintColor="#333"
            thumbTintColor="#FF69B4"
            onSlidingComplete={seekMusic}
          />
          <Text className="text-white text-center font-bold text-[9px] mb-3 px-4 uppercase tracking-tighter">
            {currentSong.title.length > 25
              ? currentSong.title.substring(0, 22) + ".."
              : currentSong.title}
          </Text>
          <View className="flex-row items-center justify-center gap-5 space-x-16">
            <TouchableOpacity onPress={handleSkipPrev}>
              <Ionicons name="play-skip-back" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={togglePlayPause}
              className="bg-white/5 p-2 rounded-full border border-gray-900"
            >
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

      {/* FULL PLAYER MODAL */}
      <Modal visible={isFullPlayerVisible} animationType="slide">
        <View className="flex-1 bg-[#0A0A0A] px-8 pt-2">
          <TouchableOpacity
            onPress={() => setIsFullPlayerVisible(false)}
            className="mt-4 mb-8"
          >
            <Ionicons name="chevron-down" size={30} color="pink" />
          </TouchableOpacity>
          <Image
            source={currentSong.image}
            style={{ width: width - 64, height: width - 64 }}
            className="rounded-xl mb-10"
          />
          <View className="mb-8">
            <Text className="text-white text-2xl font-bold">
              {currentSong.title}
            </Text>
            <Text className="text-gray-400 text-xs mt-1">
              {currentSong.description}
            </Text>
          </View>
          <Slider
            style={{ width: "100%", height: 40 }}
            minimumValue={0}
            maximumValue={duration}
            value={position}
            minimumTrackTintColor="#FFF"
            maximumTrackTintColor="#333"
            thumbTintColor="#FFF"
            onSlidingComplete={seekMusic}
          />
          <View className="flex-row justify-between px-10 items-center mt-5">
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

export default Home;
