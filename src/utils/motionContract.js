import { duration } from './motionSettings';

const ms = (value) => value / 1000;

export const motionTransition = {
  microEnter: { duration: ms(duration.quick), ease: 'easeOut' },
  microExit: { duration: ms(duration.quick), ease: 'easeIn' },
  componentEnter: { duration: ms(duration.standard), ease: 'easeOut' },
  componentExit: { duration: ms(duration.quick), ease: 'easeIn' },
  pageEnter: { duration: ms(duration.moderate), ease: 'easeOut' },
  pageExit: { duration: ms(duration.quick), ease: 'easeIn' },
};

export const motionInteraction = {
  hoverLift: {
    y: -1,
    scale: 1,
    transition: motionTransition.microEnter,
  },
  hoverIcon: {
    y: -1,
    scale: 1.03,
    transition: motionTransition.microEnter,
  },
  press: {
    scale: 0.97,
    transition: { duration: ms(duration.instant), ease: 'easeInOut' },
  },
};

export const sequenceDelay = (index, offset = 0) => offset + index * 0.04;

export const cardMotion = {
  gridVariants: {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
        delayChildren: 0.04,
      },
    },
  },
  itemVariants: {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: motionTransition.componentEnter,
    },
  },
  hover: motionInteraction.hoverLift,
  press: motionInteraction.press,
};
