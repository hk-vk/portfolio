import { LazyMotion, MotionConfig, domAnimation } from '../lib/motion';
import { motionTransition } from '../utils/motionContract';

const MotionProvider = ({ children }) => (
  <LazyMotion features={domAnimation}>
    <MotionConfig reducedMotion="user" transition={motionTransition.componentEnter}>
      {children}
    </MotionConfig>
  </LazyMotion>
);

export default MotionProvider;
