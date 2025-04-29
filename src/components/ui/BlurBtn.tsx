interface BlurBtnProps{
    text : string
}
export const BlurBtn = ({text} : BlurBtnProps) => {
    return(
        <button className="h-12 flex items-center gap-2 px-4 rounded-lg bg-white/5 backdrop-blur-md text-white font-medium text-sm shadow-inner hover:bg-white/10 transition">
            <span className="text-sm text-gray-300 ">{text}</span>
        </button>
    )
}