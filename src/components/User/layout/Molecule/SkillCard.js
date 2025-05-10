import { FaStar, FaRegStar } from 'react-icons/fa';

const SkillCard = ({ iconSrc, name, level }) => {
    return (
        <div className="flex items-center gap-3">
            <img src={iconSrc} alt={name} className="w-6 h-6 object-contain" />
            <span className="w-24 font-medium">{name}</span>
            <div className="flex gap-[2px]">
                {Array.from({ length: 5 }, (_, i) =>
                    i < level ? (
                        <FaStar key={i} className="text-yellow-400" />
                    ) : (
                        <FaRegStar key={i} className="text-gray-300" />
                    )
                )}
            </div>
        </div>
    );
};

export default SkillCard;
