const SlideVideo = () => {
  return (
    <div className="w-full h-screen relative overflow-hidden bg-white flex items-center justify-center">
      <div className="w-full max-w-7xl aspect-video px-4">
        {/* <iframe
          className="w-full h-full rounded-lg shadow-2xl"
          src="https://www.youtube.com/embed/AlKSIWgFnkM?autoplay=1&mute=1&loop=1&playlist=AlKSIWgFnkM&controls=1"
          //  src="https://www.youtube.com/embed/AlKSIWgFnkM?modestbranding=1&rel=0"
          title="YouTube video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          allowFullScreen
        ></iframe> */}

        <iframe
          className="w-full h-full rounded-lg shadow-2xl"
          src="https://www.youtube.com/embed/AlKSIWgFnkM?autoplay=1&mute=0&loop=1&playlist=AlKSIWgFnkM&controls=1&modestbranding=1&rel=0&showinfo=0"
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
