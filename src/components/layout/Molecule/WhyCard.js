import React from 'react';
import ScrollFadeIn from "../Molecule/ScrollFadeIn";

const WhyCard = ({ image, title, description }) => {
    return (
        <ScrollFadeIn className="bg-[#EDF0FD] rounded-2xl p-8 flex flex-col items-center text-center shadow-md hover:shadow-lg transition duration-300">
            <img src={image} alt={title} className="w-full mb-6 object-contain" />
            <h3 className="font-semibold text-xl mb-2">{title}</h3>
            <p className="text-base text-gray-800">{description}</p>
        </ScrollFadeIn>
    );
};

export default WhyCard;