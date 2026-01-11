import { Frame } from './frame'

import moethennessy from '../../../../assets/work/moethennessy.jpg'
import rosewrapped from '../../../../assets/work/rosewrapped.png'
import miamimastercard from '../../../../assets/work/miamimastercard.jpg'
import arbor from '../../../../assets/work/arbor.jpg'
import treeline from '../../../../assets/work/treeline.jpg'
import skylight from '../../../../assets/work/skylight.jpg'

const IMAGES = [
  {
    image: moethennessy,
    name: 'moethennessy',
  },
  {
    image: miamimastercard,
    name: 'miamimastercard',
  },
  {
    image: rosewrapped,
    name: 'rosewrapped',
  },
  {
    image: arbor,
    name: 'arbor',
  },
  {
    image: treeline,
    name: 'treeline',
  },
  {
    image: skylight,
    name: 'skylight',
  },
]

export function Frames() {
  return (
    <>
      {IMAGES.slice(0, 3).map(({ name, image }, index) => (
        <Frame
          key={name}
          name={name}
          url={image}
          position={[(index * 2.5), 1.25, 0]}
        />
      ))}
      {IMAGES.slice(3).map(({ name, image }, index) => (
        <Frame
          key={name}
          name={name}
          url={image}
          position={[(index * 2.5), -1.25, 0]}
        />
      ))}
    </>
  )
}
