import { Color } from "three";

export type IconProps = {
  name: string;
  image: string;
  invoke: () => void;
}

export const ICONS: IconProps[] = [
  {
    name: "email",
    image: "/assets/contact/email.png",
    invoke() {
      const a = document.createElement("a");
      a.setAttribute("href", "mailto:eliang58@gmail.com");
      a.setAttribute("target", "_blank");
      a.setAttribute("rel", "noopenner noreferrer");
      document.body.appendChild(a);
      a.click();
      if (a.parentElement) {
        a.parentElement.removeChild(a);
      }
    },
  },
  {
    name: "github",
    image: '/assets/contact/github.png',
    invoke() {
      const a = document.createElement("a");
      a.setAttribute("href", "https://www.github.com/clericl");
      a.setAttribute("target", "_blank");
      a.setAttribute("rel", "noopenner noreferrer");
      document.body.appendChild(a);
      a.click();
      if (a.parentElement) {
        a.parentElement.removeChild(a);
      }
    },
  },
  {
    name: "linkedin",
    image: '/assets/contact/linkedin.png',
    invoke() {
      const a = document.createElement("a");
      a.setAttribute("href", "https://www.linkedin.com/in/eliang58/");
      a.setAttribute("target", "_blank");
      a.setAttribute("rel", "noopenner noreferrer");
      document.body.appendChild(a);
      a.click();
      if (a.parentElement) {
        a.parentElement.removeChild(a);
      }
    },
  },
  {
    name: "resume",
    image: '/assets/contact/resume.png',
    invoke() {
      const a = document.createElement("a");
      a.setAttribute("href", "/EricLiangResume.pdf");
      a.setAttribute("download", "EricLiangResume.pdf");
      document.body.appendChild(a);
      a.click();
      if (a.parentElement) {
        a.parentElement.removeChild(a);
      }
    },
  },
];

export const NUMBER_OF_ROTATIONS = 2;
export const STAIRS_PER_ROTATION = 36;
export const DEGREE_IN_RADIANS = 0.0174533;
export const SPACE_BETWEEN_STAIRS = 1.5;
export const STAIR_HEIGHT = 0.1;
export const PLATFORM_HEIGHT_BASE =
  (SPACE_BETWEEN_STAIRS * STAIRS_PER_ROTATION) / NUMBER_OF_ROTATIONS;
export const STAIRCASE_HEIGHT =
  SPACE_BETWEEN_STAIRS * NUMBER_OF_ROTATIONS * STAIRS_PER_ROTATION;
export const RADIAN_IN_DEGREES = 57.2958;
export const GOLDEN_RATIO = 1.61803398875;
export const PARTICLE_CLOUD_RADIUS = 32;
export const PARTICLE_CLOUD_COUNT = 100;
export const PORTAL_RADIUS = 4;
export const SUMMON_CIRCLE_RADIUS = 4;
export const ICON_CIRCLE_RADIUS = 2;
export const SUMMON_CIRCLE_SPEED_MULTIPLIER = 0.02;
export const GOLD_EMISSIVE = new Color(2.2, 1.2, 0.5);
export const GOLD_COLOR = new Color("#e3c584");
