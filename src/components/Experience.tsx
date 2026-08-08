import { IdeaScene } from './canvas/IdeaScene'
import { SidePanel } from './ui/SidePanel'

export function Experience() {
  return (
    <div className="relative flex h-full w-full">
      <div className="absolute inset-0 z-0">
        <IdeaScene />
      </div>

      <div className="relative z-10 flex h-full w-full flex-col md:flex-row pointer-events-none">
        <div className="pointer-events-auto w-full md:w-[400px] lg:w-[420px] p-3 md:p-4 md:max-h-full">
          <SidePanel />
        </div>

        <div className="flex-1 hidden md:flex items-end justify-center p-6 pointer-events-none">
          <div className="glass rounded-xl px-4 py-2 text-xs text-white/30">
            Sürükle · Yakınlaştır · Fikirlere tıkla
          </div>
        </div>
      </div>
    </div>
  )
}
