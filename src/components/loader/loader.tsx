import { Html, useProgress } from "@react-three/drei";

import resumePdf from '../../assets/EricLiangResume.pdf'

export function Loader() {
  const progressData = useProgress();

  return (
    <Html>
      <div className="flex justify-center align-center absolute top-0 left-0 w-screen h-screen translate-x-[-50%] translate-y-[-50%] bg-black text-white text-center font-(family-name:--typeface-secondary)">
        <div className="flex flex-col justify-center">
          <div className="font-(family-name:--typeface-primary) uppercase text-6xl">Eric Liang</div>
          <div className="font-(family-name:--typeface-primary) uppercase text-3xl">Web Developer</div>
          <div className="my-8 mx-0 text-sm">
            <p>Loading...</p>
            <p>
              {progressData.progress >= 99
                ? (Math.random() * 0.99 + 99).toFixed(2)
                : progressData.progress.toFixed(2)}
              % done.
            </p>
          </div>
        </div>
        <div className="absolute bottom-2 right-2">
          <a className="text-white" target="_blank" rel="noopener noreferrer" href={resumePdf}>View printable version</a>
        </div>
      </div>
    </Html>
  );
}
