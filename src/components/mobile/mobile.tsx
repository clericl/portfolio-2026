import resumePdf from '../../assets/EricLiangResume.pdf'

export function Mobile() {
  return (
    <div className="w-screen h-screen bg-black font-(family-name:--typeface-secondary) text-white flex flex-col justify-center align-center">
      <span className="p-4">This website is best viewed on a desktop browser.</span>
      <span className="p-4">In the meanwhile, download my resume <a href={resumePdf} target="_blank" rel="noopener noreferrer">here</a>.</span>
    </div>
  )
}
