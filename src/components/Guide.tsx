import { FC, useState } from 'react';
import GuideOverview, { GuideOverviewProps } from './GuideOverview';

interface GuideProps {
  guides: Omit<GuideOverviewProps, 'onNext'>[];
  showGuide: boolean;
  localStorageKey?: string;
}

const Guide: FC<GuideProps> = ({ guides, showGuide, localStorageKey }) => {
  const [index, setIndex] = useState(0);
  const [show, setShow] = useState<boolean>(showGuide);

  if (!guides.length) {
    return null;
  }

  const currentGuide = guides[index];

  const handleNext = () => {
    if (index < guides.length - 1) {
      setIndex(index + 1);
    } else {
      setShow(false);
      if (localStorageKey) {
        localStorage.setItem(localStorageKey, 'false');
      }
    }
  };

  if (!show) {
    return null;
  }

  return (
    <GuideOverview element={currentGuide.element} text={currentGuide.text} onNext={handleNext} />
  );
};

export default Guide;
