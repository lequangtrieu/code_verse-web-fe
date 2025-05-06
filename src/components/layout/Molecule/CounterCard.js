import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

const CounterCard = ({ end, suffix = '', label }) => {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.5,
    });

    return (
        <div ref={ref} className="text-left min-w-[260px]">
            <div className="text-4xl md:text-5xl font-bold text-[#506CF0]">
                {inView ? <CountUp end={end} duration={2} separator="," /> : 0}
                {suffix}
            </div>
            <div className="text-base mt-2 text-black">{label}</div>
        </div>
    );
};

export default CounterCard;
