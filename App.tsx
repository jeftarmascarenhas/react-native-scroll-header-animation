import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  ScrollView,
  Animated,
  Platform,
  StatusBar,
} from "react-native";

import User from "./components/User";
import { users } from "./api";

export default function App() {
  const scrollOffSet = new Animated.Value(0);
  const [userSelected, setUserSelected] = useState(null);
  const [userInfoVisible, setUserInfoVisible] = useState(false);

  const handleSelectUser = (user: any): void => {
    setUserSelected(user);
    setUserInfoVisible(true);
  };

  const renderDetails = (): React.ReactElement => {
    return userSelected && <User user={userSelected} />;
  };

  const renderList = (): React.ReactElement => {
    return (
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.containerList}
          scrollEventThrottle={16}
          onScroll={Animated.event([
            {
              nativeEvent: {
                contentOffset: {
                  y: scrollOffSet,
                },
              },
            },
          ])}
        >
          {users.map((user) => (
            <User
              user={user}
              key={user.id}
              onPress={() => handleSelectUser(user)}
            />
          ))}
        </ScrollView>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Animated.View
        style={[
          styles.header,
          {
            height: scrollOffSet.interpolate({
              inputRange: [0, 140],
              outputRange: [200, 70],
              extrapolate: "clamp",
            }),
          },
        ]}
      >
        <Animated.Text
          style={[
            styles.headerText,
            {
              fontSize: scrollOffSet.interpolate({
                inputRange: [120, 140],
                outputRange: [24, 16],
                extrapolate: "clamp",
              }),
            },
          ]}
        >
          React Native
        </Animated.Text>
      </Animated.View>
      {renderList()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  containerList: {
    paddingHorizontal: 10,
  },
  header: {
    paddingTop: Platform.OS === "ios" ? 0 : 20,
    paddingHorizontal: 15,
    backgroundColor: "#222",
    width: "100%",
  },
  headerText: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "900",
    position: "absolute",
    bottom: 20,
    left: 15,
    zIndex: 2,
  },
});
