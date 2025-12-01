import { useLocation } from "../../hooks";
import { Platform } from "../platforms";
import { SeasonsBoard } from "../seasons-board";

export function AboutPlatform() {
  const location = useLocation()

  const open = location.pathname === '/about'

  return (
    <Platform>
      <SeasonsBoard open={open} />
    </Platform>
  )
}
