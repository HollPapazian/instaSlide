import { useEffect, useRef, useState } from 'react';
import { Battery, Signal, Bluetooth, MapPin, Heart, MessageCircle, Send, Bookmark } from 'lucide-react';
import { formatNumber } from '../../utils/helpers';
import { ANIMATION_DURATION, TOTAL_SLIDES } from '../../utils/constants';

const PhonePreview = () => {
  const [time, setTime] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);
  const animationDirection = useRef(1);
  const animationTimerId = useRef<any>(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false 
      }));
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (animationTimerId.current) {
        clearInterval(animationTimerId.current)
    }
    animationTimerId.current = setInterval(() => {
        setCurrentSlide(prev => {
            const newValue = prev + 1 * animationDirection.current;
            if (newValue === TOTAL_SLIDES - 1 || newValue === 0) {
                animationDirection.current = -animationDirection.current;
            }
            return newValue;
        });
    }, ANIMATION_DURATION / TOTAL_SLIDES);

    return () => clearInterval(animationTimerId.current);
  }, []);

  return (
    <div className="w-[300px] aspect-[9/18]">
      <div className="relative w-full h-full rounded-[2rem] bg-black p-[2%] shadow-xl">
        {/* Phone notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[40%] h-[4%] bg-black rounded-b-[1rem] z-20" />
        
        {/* Phone frame */}
        <div className="w-full h-full rounded-[1.75rem] bg-white overflow-hidden">
          {/* Status bar */}
          <div className="h-[7%] bg-white flex items-center justify-between px-3.5 relative z-10">
            <div className="text-[12px] font-medium">{time}</div>
            <div className="flex items-center gap-[6px]">
              <Signal className="w-[16px] h-[16px] text-black" strokeWidth={2.5} />
              <Bluetooth className="w-[16px] h-[16px] text-black" strokeWidth={2.5} />
              <Battery className="w-[20px] h-[16px] text-black" strokeWidth={2.5} fill="black" />
            </div>
          </div>

          {/* Instagram post header */}
          <div className="px-[4%] py-[3%]">
            <div className="flex items-center gap-3">
              {/* Profile picture placeholder */}
              <div className="w-[32px] h-[32px] rounded-full bg-gradient-to-tr from-amber-500 to-fuchsia-600 p-[2px]">
                <div className="w-full h-full rounded-full bg-gray-200" />
              </div>
              {/* Author info */}
              <div className="flex-1">
                <div className="text-[13px] font-semibold">bilbo.baggins</div>
                <div className="flex items-center gap-1 text-[11px] text-gray-500">
                  <MapPin className="w-3 h-3" />
                  <span>The Shire, Middle-earth</span>
                </div>
              </div>
            </div>
          </div>

          {/* Content area with animation */}
          <div className="relative w-full h-[63%] overflow-hidden">
            {/* Slide counter */}
            <div className="absolute top-2 right-2 z-10 bg-black/50 backdrop-blur-sm rounded-full px-2.5 py-1 flex w-[38px] justify-end">
              <span className="text-[11px] text-white font-medium">
                {currentSlide + 1}/{TOTAL_SLIDES}
              </span>
            </div>
            <div 
              className="absolute inset-0 w-[300%] h-full transition-transform duration-1000 ease-in-out"
              style={{ transform: `translateX(${(100 / TOTAL_SLIDES) * (-currentSlide)}%)` }}
            >
              <img 
                src="/assets/landscape.svg"
                alt="Landscape preview"
                className="w-full h-full object-cover"
                style={{ aspectRatio: '15/4' }}
              />
            </div>
          </div>

          {/* Instagram interaction buttons */}
          <div className="px-[4%] pt-[3%]">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <Heart className="w-[20px] h-[20px] transition-colors" strokeWidth={2} />
                  <span className="text-[11px]">{formatNumber(247891)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageCircle className="w-[20px] h-[20px] transition-colors" strokeWidth={2} />
                  <span className="text-[11px]">{formatNumber(1834)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Send className="w-[20px] h-[20px] transition-colors rotate-12" strokeWidth={2} />
                  <span className="text-[11px]">{formatNumber(42391)}</span>
                </div>
              </div>
              <Bookmark className="w-[20px] h-[20px] transition-colors" strokeWidth={2} />
            </div>

            {/* Comments section */}
            <div className="mt-2">
              <div className="text-[12px]">
                <span className="font-semibold">the.dark.lord.sauron</span>
                &nbsp;wow nice scenery! I have to visit it some day 👁️
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhonePreview; 