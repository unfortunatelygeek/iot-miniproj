import React from 'react';
import { View, Animated, Easing } from 'react-native';
import { cssInterop } from "nativewind";

const StyledView = cssInterop(View, { className: 'style' });

interface LoaderProps {
  size?: number;
  color?: string;
}

export const Loader: React.FC<LoaderProps> = ({ 
  size = 60,
  color = '#ffffff'
}) => {
  // Create three animated values for the three dots
  const animation1 = React.useRef(new Animated.Value(0)).current;
  const animation2 = React.useRef(new Animated.Value(0)).current;
  const animation3 = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    const animate = (animation: Animated.Value, delay: number) => {
      return Animated.sequence([
        Animated.delay(delay),
        Animated.loop(
          Animated.sequence([
            Animated.timing(animation, {
              toValue: 1,
              duration: 600,
              easing: Easing.ease,
              useNativeDriver: true,
            }),
            Animated.timing(animation, {
              toValue: 0,
              duration: 600,
              easing: Easing.ease,
              useNativeDriver: true,
            }),
          ])
        ),
      ]).start();
    };

    animate(animation1, 0);
    animate(animation2, 200);
    animate(animation3, 400);

    return () => {
      animation1.stopAnimation();
      animation2.stopAnimation();
      animation3.stopAnimation();
    };
  }, []);

  const dots = [animation1, animation2, animation3].map((animation, index) => {
    const translateY = animation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -(size / 3)],
    });

    return (
      <Animated.View
        key={index}
        style={{
          width: size / 5,
          height: size / 5,
          borderRadius: size / 10,
          backgroundColor: color,
          margin: size / 15,
          transform: [{ translateY }],
        }}
      />
    );
  });

  return (
    <StyledView className="flex-row items-center justify-center">
      {dots}
    </StyledView>
  );
};