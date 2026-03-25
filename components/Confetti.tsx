import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";

interface ConfettiProps {
  visible: boolean;
  onComplete?: () => void;
}

export const Confetti: React.FC<ConfettiProps> = ({ visible, onComplete }) => {
  const particles = useRef(
    Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: -10,
      color: ["#72ddf7", "#9a52ff", "#e382f9", "#ffb2e6"][
        Math.floor(Math.random() * 4)
      ],
      size: Math.random() * 6 + 4,
      speed: Math.random() * 3 + 2,
      rotation: Math.random() * 360,
      rotationSpeed: Math.random() * 10 - 5,
      horizontalSpeed: (Math.random() - 0.5) * 2,
    })),
  ).current;

  const animations = useRef(particles.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    if (visible) {
      // Start all animations
      const anims = animations.map((anim, index) => {
        const particle = particles[index];
        return Animated.parallel([
          Animated.timing(anim, {
            toValue: 1,
            duration: 2000, // 2 seconds duration
            useNativeDriver: false,
          }),
        ]);
      });

      Animated.parallel(anims).start(() => {
        if (onComplete) {
          onComplete();
        }
      });
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <View style={styles.container} pointerEvents="none">
      {particles.map((particle, index) => {
        const anim = animations[index];
        const translateY = anim.interpolate({
          inputRange: [0, 1],
          outputRange: [particle.y, 150], // Slide down further
          extrapolate: "clamp",
        });
        const translateX = anim.interpolate({
          inputRange: [0, 1],
          outputRange: [particle.x, particle.x + particle.horizontalSpeed * 50],
          extrapolate: "clamp",
        });
        const rotate = anim.interpolate({
          inputRange: [0, 1],
          outputRange: [`0deg`, `${particle.rotation + particle.rotationSpeed * 20}deg`],
          extrapolate: "clamp",
        });
        const opacity = anim.interpolate({
          inputRange: [0, 0.7, 1],
          outputRange: [1, 1, 0], // Fade out at the end
          extrapolate: "clamp",
        });
        const scale = anim.interpolate({
          inputRange: [0, 0.1, 1],
          outputRange: [0, 1.2, 1], // Brief scale up at start
          extrapolate: "clamp",
        });

        return (
          <Animated.View
            key={particle.id}
            style={[
              styles.particle,
              {
                backgroundColor: particle.color,
                width: particle.size,
                height: particle.size,
                left: `${particle.x}%`,
                transform: [
                  { translateX },
                  { translateY },
                  { rotate },
                  { scale },
                ],
                opacity,
              },
            ]}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 9999,
  },
  particle: {
    position: "absolute",
    borderRadius: 2,
  },
});
