import React from 'react';
import classNames from 'classnames';
import { format, parseISO, getDay } from 'date-fns';

const ActivityGrid = ({ activityData }) => {
    const totalWeeks = 5;
    const daysPerWeek = 7;

    // Khởi tạo ma trận trống
    const grid = Array.from({ length: totalWeeks * daysPerWeek }, () => ({ level: 0 }));

    // Mapping dữ liệu thực tế vào lưới
    activityData.forEach(item => {
        const date = parseISO(item.date);
        const weekday = getDay(date); // 0 (Sun) to 6 (Sat)
        const week = Math.floor((date.getDate() - 1) / daysPerWeek);
        const index = week * daysPerWeek + (weekday === 0 ? 6 : weekday - 1); // Đổi thứ bắt đầu từ Mon
        grid[index] = {
            level: item.level,
            date: format(date, 'd/M'),
        };
    });

    const getColor = (level) => {
        return [
            'bg-indigo-100',
            'bg-indigo-200',
            'bg-indigo-400',
            'bg-indigo-600',
        ][level] || 'bg-indigo-50';
    };

    return (
        <div className="bg-white rounded-xl border p-6  max-w-3xl">
            <h2 className="text-xl font-bold text-[#2f2fce] mb-4">Your activity</h2>
            <div className="grid grid-cols-7 gap-2 text-center font-medium text-gray-600 mb-2">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                    <div key={day}>{day}</div>
                ))}
            </div>
            <div className="grid grid-cols-7 gap-2">
                {grid.map((item, i) => (
                    <div
                        key={i}
                        className={classNames('w-8 h-8 rounded flex items-center justify-center text-xs', getColor(item.level))}
                    >
                        {item.date}
                    </div>
                ))}
            </div>
            <hr className="my-4" />
            <div className="flex items-center gap-2">
                <span>Your activity</span>
                {[0, 1, 2, 3].map(l => (
                    <div key={l} className={`w-6 h-6 ${getColor(l)} rounded`}></div>
                ))}
            </div>
        </div>
    );
};

export default ActivityGrid;
