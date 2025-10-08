"use client";

import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import HTMLFlipBook from "react-pageflip";

const flippingTime = 900;

const FlipBook = ({ pages = [] }) => {
  const [pageWidth, setPageWidth] = useState(0);
  const [pageHeight, setPageHeight] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [maxImgW, setMaxImgW] = useState(0);
  const [maxImgH, setMaxImgH] = useState(0);
  const [refreshKey, setRefreshKey] = useState(0);

  const bookRef = useRef(null);
  const wrapperRef = useRef(null);
  const isFlippingRef = useRef(false);

  // Görselleri yükle ve max genişlik/yükseklik hesapla
  useEffect(() => {
    if (!pages.length) {
      const ratio = 1 / 1.4;
      setMaxImgW(1000);
      setMaxImgH(1000 / ratio);
      setImagesLoaded(true);
      return;
    }
    let loaded = 0,
      maxW = 0,
      maxH = 0;
    pages.forEach((src) => {
      const img = new Image();
      img.onload = () => {
        loaded += 1;
        maxW = Math.max(maxW, img.naturalWidth || img.width);
        maxH = Math.max(maxH, img.naturalHeight || img.height);
        if (loaded === pages.length) {
          setMaxImgW(maxW || 1000);
          setMaxImgH(maxH || 1400);
          setImagesLoaded(true);
        }
      };
      img.onerror = () => {
        loaded += 1;
        if (loaded === pages.length) {
          setMaxImgW(maxW || 1000);
          setMaxImgH(maxH || 1400);
          setImagesLoaded(true);
        }
      };
      img.src = src;
    });
  }, [pages]);

  // Sayfa boyutlarını hesapla
  useEffect(() => {
    if (!imagesLoaded) return;
    const recalc = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const ratio = maxImgW && maxImgH ? maxImgW / maxImgH : 1 / 1.4;

      // >>> DAİMA ÇİFT SAYFA MODU <<<
      const totalW = Math.min(vw * 0.95, 1800);
      let singleW = totalW / 2;
      let singleH = singleW / ratio;

      // neredeyse tam ekran
      const hMax = vh * 0.95;
      if (singleH > hMax) {
        singleH = hMax;
        singleW = singleH * ratio;
      }
      setPageWidth(Math.floor(singleW));
      setPageHeight(Math.floor(singleH));

      setRefreshKey((k) => k + 1);
    };
    recalc();
    window.addEventListener("resize", recalc);
    return () => window.removeEventListener("resize", recalc);
  }, [imagesLoaded, maxImgW, maxImgH]);

  // Sayfaları normalize et (tek sayfa kalmasın diye boş ekle)
  const normalizedPages = useMemo(() => {
    if (!pages.length) return [null, null];
    const list = [...pages];
    if (list.length % 2 !== 0) list.push(null);
    return list;
  }, [pages]);

  // Tıklamayla sayfa çevir
  const handleClick = useCallback((e) => {
    if (isFlippingRef.current) return;
    const api = bookRef.current?.pageFlip?.();
    if (!api) return;
    const rect = wrapperRef.current?.getBoundingClientRect?.();
    const x = e.clientX;
    const mid = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
    isFlippingRef.current = true;
    if (x < mid) api.flipPrev();
    else api.flipNext();
    setTimeout(() => {
      isFlippingRef.current = false;
    }, flippingTime * 0.9);
  }, []);

  if (!imagesLoaded || pageWidth === 0 || pageHeight === 0) {
    return <div>Yükleniyor…</div>;
  }

  const wrapperWidth = pageWidth * 2; // daima çift sayfa

  return (
    <>
      <div>
        <div
          ref={wrapperRef}
          onClick={handleClick}
          className=" shadow-black shadow-2xl"
          style={{
            width: wrapperWidth,
            height: pageHeight,
            perspective: "2000px",
            overflow: "hidden",
            userSelect: "none",
            position: "relative",
            cursor: "pointer",
            WebkitTapHighlightColor: "transparent",
          }}
        >
          <HTMLFlipBook
            key={refreshKey}
            ref={bookRef}
            width={pageWidth}
            height={pageHeight}
            spacing={0}
            showCover={false}
            usePortrait={false} // <<< DAİMA ÇİFT SAYFA
            mobileScrollSupport={false}
            drawShadow
            maxShadowOpacity={0.85}
            flippingTime={flippingTime}
            useMouseEvents={false}
            style={{ margin: 0, overflow: "hidden", outline: "none" }}
            className="flipbook"
          >
            {normalizedPages.map((src, index) => (
              <div
                key={index}
                className="page"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  boxSizing: "border-box",
                  backfaceVisibility: "hidden",
                  transformStyle: "preserve-3d",
                  overflow: "hidden",
                  cursor: "pointer",
                  WebkitTapHighlightColor: "transparent",
                  userSelect: "none",
                  position: "relative",
                }}
              >
                {src ? (
                  <img
                    src={src}
                    alt={`Sayfa ${index + 1}`}
                    style={{
                      maxWidth: "100%",
                      width: "100%",
                      objectFit: "contain",
                      pointerEvents: "none",
                      display: "block",
                      WebkitUserSelect: "none",
                    }}
                    draggable={false}
                  />
                ) : (
                  <span style={{ color: "#9aa8bf", fontSize: 13 }} />
                )}
                {index % 2 === 1 && (
                  <div
                    style={{
                      position: "absolute",
                      left: 0,
                      top: 0,
                      width: "1px",
                      height: "100%",
                      background: "rgba(0,0,0,0.15)",
                      boxShadow: "0 0 6px rgba(0,0,0,0.3)",
                      pointerEvents: "none",
                      zIndex: 5,
                    }}
                  />
                )}
              </div>
            ))}
          </HTMLFlipBook>
        </div>
      </div>
      <div
        style={{
          position: "fixed",
          bottom: 20,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: 20,
          zIndex: 9999,
        }}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            bookRef.current?.pageFlip()?.flipPrev();
          }}
          style={{
            background: "rgba(0,0,0,0.6)",
            color: "white",
            border: "none",
            borderRadius: "50%",
            width: 50,
            height: 50,
            cursor: "pointer",
            fontSize: 22,
          }}
        >
          ‹
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            bookRef.current?.pageFlip()?.flipNext();
          }}
          style={{
            background: "rgba(0,0,0,0.6)",
            color: "white",
            border: "none",
            borderRadius: "50%",
            width: 50,
            height: 50,
            cursor: "pointer",
            fontSize: 22,
          }}
        >
          ›
        </button>
      </div>
    </>
  );
};

export default FlipBook;
