export const hoverFadeOpacity = 0.4;
export const hoverFadeDuration = 0.2;
export const moduleFadeDuration = 1.0;

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const fadeInEnterDelay = (duration) => ({
  initial: {
    opacity: 0,
  },
  enter: {
    opacity: 1,
    transition: {
      delay: duration,
      duration: duration,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: duration,
    },
  },
});

export const expandCollapse = {
  hidden: { opacity: 0, height: 0 },
  visible: { opacity: 1, height: 'auto' },
};
