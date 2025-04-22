import { Progress } from 'antd';

const ReusableProgress = ({ completed, total, size = [, 20], showInfo = false }) => {
    return (
        <Progress
            percent={(completed / total) * 100}
            format={() => (
                <span className="text-white">
                    {completed}/{total}
                </span>
            )}
            showInfo={showInfo}
            size={size}
            strokeColor={{
                '0%': '#29ee48',
                '100%': '#079cd0'
            }}
            trailColor="#9CA3AF"
            percentPosition={{ align: 'end', type: 'inner' }}
        />
    );
};

export default ReusableProgress;
