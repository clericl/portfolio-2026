import { Center } from '@react-three/drei'
import email from '../../../../assets/icons/email.png'
import github from '../../../../assets/icons/github.png'
import linkedin from '../../../../assets/icons/linkedin.png'
import resume from '../../../../assets/icons/resume.png'
import { IconBubble } from './icon-bubble/icon-bubble'

const CONTACT_OPTIONS = [
  {
    name: 'email',
    image: email,
  },
  {
    name: 'github',
    image: github,
  },
  {
    name: 'linkedin',
    image: linkedin,
  },
  {
    name: 'resume',
    image: resume,
  },
]

export function IconBubbles() {
  return (
    <Center disableY disableZ position-y={5}>
      {CONTACT_OPTIONS.map((opt, index) => (
        <IconBubble icon={opt.image} position-x={index * 5} key={opt.name} />
      ))}
    </Center>
  )
}
