interface SoundSVGProps{
  color?:string
}
export const SoundSVG = ({color} : SoundSVGProps) => {
    return(
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke={color}><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M3 11V13M6 8V16M9 10V14M12 7V17M15 4V20M18 9V15M21 11V13" stroke="#a4adad" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
        )
}