import { useEffect, useState } from 'react';

const useWindowFocus = (): boolean => {
  const [isFocus, setIsFocus] = useState(true);
  const [isVisible, setIsVisible] = useState(true);

  const onFocus = () => setIsFocus(true);
  const onBlur = () => setIsFocus(false);
  const onVisbilityChange = () => {
    setIsVisible(!document.hidden);
  };

  useEffect(() => {
    window.addEventListener('focus', onFocus);
    window.addEventListener('blur', onBlur);
    document.addEventListener('visibilitychange', onVisbilityChange);
    return () => {
      window.removeEventListener('focus', onFocus);
      window.removeEventListener('blur', onBlur);
      document.removeEventListener('visibilitychange', onVisbilityChange);
    };
  });

  return isFocus && isVisible;
};

export default useWindowFocus;
