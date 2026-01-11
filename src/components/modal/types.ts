export type ModalKey = 
  | 'about'
  | 'work'
  | 'contact'
  | 'moethennessy'
  | 'miamimastercard'
  | 'rosewrapped'
  | 'arbor'
  | 'treeline'
  | 'skylight'


export type ModalContextProps = {
  modal: ModalKey | null;
  setModal: (key: ModalKey | null) => void;
}

export type IconProps = {
  name: string;
  image: string;
  invoke: () => void;
}
