import React from 'react';
import Lottie from 'lottie-react';
import reactIcon from './Reactjs.json';
import nextIcon from './nextjs_pulse_animation.json';
import nodeIcon from './Nodejs.json';


type AnimationType = 'react' | 'next' | 'node' ;

interface LottieWrapperProps {
  type: AnimationType;
  width?: number;
  height?: number;
  loop?: boolean;
  containerStyles?: React.CSSProperties;
}

const animationMap: Record<AnimationType, object> = {
  react: reactIcon,
  next: nextIcon,
  node: nodeIcon,
  
};

const LottieWrapper: React.FC<LottieWrapperProps> = ({
  type,
  width = 200,
  height = 200,
  loop = true,
  containerStyles = {},
}) => {
  const animationData = animationMap[type];

  return (
    <div style={{ width, height, ...containerStyles }}>
      <Lottie animationData={animationData} loop={loop} style={{ width: '100%', height: '100%' }} />
    </div>
  );
};

export default LottieWrapper;
