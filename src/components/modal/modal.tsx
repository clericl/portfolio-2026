import { useCallback, useContext, useEffect, useMemo, useState, type MouseEvent, type ReactNode } from "react";
import { getModals, ModalContext } from "./utils";
import { useSpring, animated, easings } from '@react-spring/web'
import type { ModalKey } from "./types";

type ModalProviderProps = {
  children?: ReactNode;
}

export function ModalProvider({ children }: ModalProviderProps) {
  const [modal, setModal] = useState<ModalKey | null>(null)

  const value = useMemo(() => ({
    modal,
    setModal
  }),
  [modal, setModal])

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  )
}

export function Modal() {
  const { modal, setModal } = useContext(ModalContext)

  const [backgroundSprings, backgroundApi] = useSpring(() => ({
    opacity: 0,
  }));

  const [contentSprings, contentApi] = useSpring(() => ({
    opacity: 0,
  }));

  const contentToDisplay = useMemo(
    () => modal && getModals(setModal)[modal],
    [modal, setModal],
  );

  const handleClose = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) {
        setModal(null)
      }
    },
    [setModal],
  );

  const handleCloseButton = useCallback(() => {
    setModal(null)
  }, [setModal]);

  useEffect(() => {
    backgroundApi.start({
      opacity: modal ? 1 : 0,
      delay: modal ? 0 : 200,
      config: {
        duration: 200,
        easing: easings.easeOutQuad,
      },
    });

    contentApi.start({
      opacity: modal ? 1 : 0,
      delay: modal ? 300 : 0,
      config: {
        duration: 200,
        easing: easings.easeOutQuad,
      },
    });
  }, [backgroundApi, contentApi, modal]);

  return (
    contentToDisplay && (
      <animated.div
        className="modal"
        onClick={handleClose}
        style={{
          ...backgroundSprings,
          pointerEvents: modal ? 'all' : 'none',
        }}
      >
        <animated.div
          className="modal-contents"
          style={contentSprings}
        >
          <div className="modal-details">
            <h2 className="modal-title">{contentToDisplay.title}</h2>
            {contentToDisplay.text}
          </div>
          {'video' in contentToDisplay && (
            <div className="modal-media">
              <video
                src={contentToDisplay.video}
                muted
                loop
                autoPlay
                playsInline
              />
            </div>
          )}
          <div className="close-button" onClick={handleCloseButton}>
            <button>
              <span className="material-symbols-outlined">
                close
              </span>
            </button>
          </div>
        </animated.div>
      </animated.div>
    )
  );
}
