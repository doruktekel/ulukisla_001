import { useEffect, useRef } from "react";

const SlideVideo = ({ isActive }) => {
  const iframeRef = useRef(null);

  useEffect(() => {
    if (!isActive && iframeRef.current) {
      // YouTube player'a pause komutu gönder
      iframeRef.current.contentWindow.postMessage(
        '{"event":"command","func":"pauseVideo","args":""}',
        "*"
      );
    } else if (isActive && iframeRef.current) {
      // Slide aktif olduğunda videoyu oynat
      iframeRef.current.contentWindow.postMessage(
        '{"event":"command","func":"playVideo","args":""}',
        "*"
      );
    }
  }, [isActive]);

  return (
    <div className="w-full h-screen relative overflow-hidden bg-white flex items-center justify-center">
      <div className="w-full max-w-7xl aspect-video px-4">
        <iframe
          ref={iframeRef}
          className="w-full h-full rounded-lg shadow-2xl"
          src="https://www.youtube.com/embed/AlKSIWgFnkM?autoplay=1&mute=0&loop=1&playlist=AlKSIWgFnkM&controls=1&modestbranding=1&rel=0&showinfo=0&enablejsapi=1"
          title="YouTube video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default SlideVideo;
