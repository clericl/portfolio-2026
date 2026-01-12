import { createContext } from "react"
import type { IconProps, ModalContextProps } from "./types"

import moethennessy from '../../assets/work/moethennessy.mp4'
import rosewrapped from '../../assets/work/rosewrapped.mp4'
import miamimastercard from '../../assets/work/miamimastercard.mp4'
import arbor from '../../assets/work/arbor.mp4'
import treeline from '../../assets/work/treeline.mp4'
import skylight from '../../assets/work/skylight.mp4'

import email from '../../assets/icons/email.png'
import github from '../../assets/icons/github.png'
import linkedin from '../../assets/icons/linkedin.png'
import resume from '../../assets/icons/resume.png'

export const ModalContext = createContext({
  modal: null,
  setModal: () => {},
} as ModalContextProps)

export const ICONS: IconProps[] = [
  {
    name: "email",
    image: email,
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
    image: github,
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
    image: linkedin,
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
    image: resume,
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

export const getModals = (setModal: ModalContextProps['setModal']) => ({
  about: {
    title: "About",
    text: [
      <div key={1} className="body">
        <p className="modal-text">
          I'm Eric, a full stack web developer specializing in 3D and
          augmented reality experiences. Thanks for stopping by, and check
          out this website on a desktop browser to see even more fun
          details!
        </p>
      </div>,
    ],
  },
  work: {
    title: "Selected work",
    text: [
      <div key={1} className="body">
        <div
          className="modal-link-over-banner"
          onClick={() => setModal("moethennessy")}
        >
          <video
            className="modal-banner"
            src={moethennessy}
            autoPlay={false}
            playsInline
            muted
            style={{ objectPosition: "left 68%" }}
          />
          <p className="modal-link">Moët-Hennessy Concierge Experience</p>
        </div>
        <div
          className="modal-link-over-banner"
          onClick={() => setModal("miamimastercard")}
        >
          <video
            className="modal-banner"
            src={miamimastercard}
            autoPlay={false}
            playsInline
            muted
            style={{ objectPosition: "left 29%" }}
          />
          <p className="modal-link">Miami Design District AR Tour</p>
        </div>
        <div
          className="modal-link-over-banner"
          onClick={() => setModal("rosewrapped")}
        >
          <video
            className="modal-banner"
            src={rosewrapped}
            autoPlay={false}
            playsInline
            muted
            style={{ objectPosition: "left 29%" }}
          />
          <p className="modal-link">ROSE Wrapped 2022</p>
        </div>
        <div
          className="modal-link-over-banner"
          onClick={() => setModal("arbor")}
        >
          <video
            className="modal-banner"
            src={arbor}
            autoPlay={false}
            playsInline
            muted
            style={{ objectPosition: "left 25%" }}
          />
          <p className="modal-link">Arbor</p>
        </div>
        <div
          className="modal-link-over-banner"
          onClick={() => setModal("treeline")}
        >
          <video
            className="modal-banner"
            src={treeline}
            autoPlay={false}
            playsInline
            muted
            style={{ objectPosition: "left 25%" }}
          />
          <p className="modal-link">Treeline NYC</p>
        </div>
      </div>,
    ],
  },
  contact: {
    title: "Contact",
    text: [
      <div key={1} className="body">
        <p className="modal-text">
          I'm currently open to work! I'm especially interested in building
          immersive web experiences to highlight cutting-edge, impactful,
          and democratized technologies.
        </p>
        <div className="block">
          <div
            className="modal-link-over-banner half"
            onClick={() => ICONS[0].invoke()}
          >
            <img className="modal-banner" src={email} alt="email" />
            <p className="modal-link">Email</p>
          </div>
          <div
            className="modal-link-over-banner half"
            onClick={() => ICONS[1].invoke()}
          >
            <img className="modal-banner" src={github} alt="github" />
            <p className="modal-link">GitHub</p>
          </div>
          <div
            className="modal-link-over-banner half"
            onClick={() => ICONS[2].invoke()}
          >
            <img className="modal-banner" src={linkedin} alt="linkedin" />
            <p className="modal-link">LinkedIn</p>
          </div>
          <div
            className="modal-link-over-banner half"
            onClick={() => ICONS[3].invoke()}
          >
            <img
              className="modal-banner"
              src={resume}
              alt="download resume"
            />
            <p className="modal-link">Download Resume</p>
          </div>
        </div>
      </div>,
    ],
  },
  moethennessy: {
    title: "Moët-Hennessy Concierge Experience",
    video: moethennessy,
    text: [
      <div key={1} className="body">
        <p className="modal-text">
          In a partnership with creative agency Admerasia, ROSE developed an
          augmented reality experience for Moët-Hennessy's Concierge, a
          campaign highlighting top-shelf spirits and champagne under the
          Moët-Hennessy umbrella. This AR experience placed a virtual
          beverage expert in the user's environment to engage the user with
          a series of questions, identifying the bottle best suited to the
          user's personality type.
        </p>
        <p className="modal-text">
          Try it&nbsp;
          <a
            href="https://www.8thwall.com/rosedigital/moethennessy-concierge"
            target="_blank"
            rel="noopener noreferrer"
          >
            here
          </a>
          .
        </p>
      </div>,
    ],
  },
  miamimastercard: {
    title: "Miami Design District AR tour",
    video: miamimastercard,
    text: [
      <div key={1} className="body">
        <p className="modal-text">
          To showcase the iconic visual art featured in the Miami Design
          District, ROSE partnered with Mastercard to produce an augmented
          reality tour of the area. The experience used Matterport
          technology to map display areas, allowing the view to explore
          paintings and sculptures by legends such as Buckminster Fuller,
          Virgil Abloh, and many more.
        </p>
        <p className="modal-text">
          Find more information{" "}
          <a
            href="https://www.8thwall.com/rosedigital/mc-priceless-design-district"
            target="_blank"
            rel="noopener noreferrer"
          >
            here
          </a>
          .
        </p>
      </div>,
    ],
  },
  rosewrapped: {
    title: "ROSE Wrapped 2022",
    video: rosewrapped,
    text: [
      <div key={1} className="body">
        <p className="modal-text">
          To cap off another successful year at ROSE, I used campaign
          footage and statistics from the projects we completed to create a
          snappy highlight reel. Featured were projects for Bloomingdale's,
          Selfridges, Mastercard, BET+, and more.
        </p>
        <p className="modal-text">
          Check it out&nbsp;
          <a
            href="https://wrapped.builtbyrose.co/"
            target="_blank"
            rel="noopener noreferrer"
          >
            here
          </a>
          .
        </p>
      </div>,
    ],
  },
  arbor: {
    title: "Arbor",
    video: arbor,
    text: [
      <div key={1} className="body">
        <p className="modal-text">
          Arbor is an etymology-finding tool that traces the ancestors of a
          given word and then recursively finds related words that stem from
          each ancestor. This personal project was inspired by my background
          in linguistics, my interest in data visualization, and the
          invaluable community-gathered resources collected in spaces like
          Wiktionary.
        </p>
        <p className="modal-text">
          Try it&nbsp;
          <a
            href="https://arbor.ericliang.dev"
            target="_blank"
            rel="noopener noreferrer"
          >
            here
          </a>
          .
        </p>
      </div>,
    ],
  },
  treeline: {
    title: "Treeline NYC",
    video: treeline,
    text: [
      <div key={1} className="body">
        <p className="modal-text">
          New York City currently boasts over 900,000 trees planted in its streets, parks,
          and other public places, with representatives from almost 600 different species
          and cultivars. I used data published by the Department of Parks and Recreation
          to build this project, which maps each one of these trees. Treeline NYC is made
          for all sorts of nature enthusiasts, amateur arborists, and people who are simply
          curious about a different face of this great city to learn about and explore the
          jungle that thrives amid the concrete.
        </p>
        <p className="modal-text">
          Try it&nbsp;
          <a
            href="https://treeline.ericliang.dev"
            target="_blank"
            rel="noopener noreferrer"
          >
            here
          </a>
          .
        </p>
      </div>,
    ],
  },
  skylight: {
    title: "Skylight",
    video: skylight,
    text: [
      <div key={1} className="body">
        <p className="modal-text">
          The stars, planets, and geometries of the celestial sphere have provided
          endless inspiration for both artists and scientists since we could look
          upwards. Skylight started as a simple passive weather display, but from that
          inspiration, has since evolved to incorporate a full star chart. I expect
          Skylight to continue to grow as an interactive visualization that balances
          aesthetic interpretation, mathematical accuracy, and daily usefulness.
        </p>
        <p className="modal-text">
          Try it&nbsp;
          <a
            href="https://skylight.ericliang.dev"
            target="_blank"
            rel="noopener noreferrer"
          >
            here
          </a>
          .
        </p>
      </div>,
    ],
  },
})
