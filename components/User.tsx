import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
  Animated,
} from "react-native";

interface UserProps {
  user?: {
    id: number;
    name: string;
    avatar: string;
    description: string;
  };
  onPress?: () => void;
}

const randomColor = (): string => {
  const colors: string = Math.floor(Math.random() * 16777215).toString(16);
  return `#${colors}`;
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  thumb: {
    height: 200,
  },
  info: {
    padding: 8,
    backgroundColor: randomColor(),
  },
  name: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
  },
  description: {
    fontSize: 14,
    fontWeight: "400",
    color: "#fff",
  },
});

const User: React.FC<UserProps> = ({ user, onPress }: UserProps) => {
  const opacity = new Animated.Value(0);
  const offset = new Animated.ValueXY({ x: 0, y: 50 });
  useEffect(() => {
    Animated.parallel([
      Animated.spring(offset.y, {
        toValue: 0,
        speed: 5,
        bounciness: 20,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
      }),
    ]).start();
  }, []);
  return (
    <Animated.View
      style={[
        {
          transform: [...offset.getTranslateTransform()],
        },
        { opacity: opacity },
      ]}
    >
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={styles.container}>
          <Image source={{ uri: user.avatar }} style={styles.thumb} />
          <View style={styles.info}>
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.description}>{user.description}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Animated.View>
  );
};

export default User;
