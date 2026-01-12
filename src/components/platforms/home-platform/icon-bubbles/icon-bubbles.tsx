import { Center } from '@react-three/drei'
import email from '../../../../assets/icons/email.png'
import github from '../../../../assets/icons/github.png'
import linkedin from '../../../../assets/icons/linkedin.png'
import resume from '../../../../assets/icons/resume.png'
import { IconBubble } from './icon-bubble/icon-bubble'
import type { ThreeElements } from '@react-three/fiber'

import resumePdf from '../../../../assets/EricLiangResume.pdf'

const CONTACT_OPTIONS = [
  {
    name: 'email',
    image: email,
    onClick: () => {
      const a = document.createElement("a");
      a.setAttribute("href", "mailto:eliang8@proton.me");
      a.setAttribute("target", "_blank");
      a.setAttribute("rel", "noopenner noreferrer");
      document.body.appendChild(a);
      a.click();
      if (a.parentElement) {
        a.parentElement.removeChild(a);
      }
    }
  },
  {
    name: 'github',
    image: github,
    onClick: () => {
      const a = document.createElement("a");
      a.setAttribute("href", "https://www.github.com/clericl");
      a.setAttribute("target", "_blank");
      a.setAttribute("rel", "noopenner noreferrer");
      document.body.appendChild(a);
      a.click();
      if (a.parentElement) {
        a.parentElement.removeChild(a);
      }
    }
  },
  {
    name: 'linkedin',
    image: linkedin,
    onClick: () => {
      const a = document.createElement("a");
      a.setAttribute("href", "https://www.linkedin.com/in/eliang58/");
      a.setAttribute("target", "_blank");
      a.setAttribute("rel", "noopenner noreferrer");
      document.body.appendChild(a);
      a.click();
      if (a.parentElement) {
        a.parentElement.removeChild(a);
      }
    }
  },
  {
    name: 'resume',
    image: resume,
    onClick: () => {
      const a = document.createElement("a");
      a.setAttribute("href", resumePdf);
      a.setAttribute("target", "_blank");
      a.setAttribute("rel", "noopenner noreferrer");
      document.body.appendChild(a);
      a.click();
      if (a.parentElement) {
        a.parentElement.removeChild(a);
      }
    }
  },
]

export function IconBubbles(props: ThreeElements['group']) {
  return (
    <group {...props}>
      <Center disableY disableZ position-y={5}>
        {CONTACT_OPTIONS.map((opt, index) => (
          <IconBubble icon={opt.image} position-x={index * 7.5} onClick={opt.onClick} key={opt.name} />
        ))}
      </Center>
    </group>
  )
}
