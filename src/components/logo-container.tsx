import { Link } from 'react-router-dom'

export const LogoContainer = () => {
  return (
    <Link to={"/"}>
        <div className="flex items-center">
            <img 
                src="/assets/img/logo84.png" 
                alt="AI Mock Interview" 
                className="h-14 md:h-16 w-auto object-contain" 
            />
        </div>
    </Link>
 )
}
