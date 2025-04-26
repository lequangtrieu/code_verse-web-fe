const ProfileItem = ({ label, value }) => (
    <div className="flex items-center mb-4">
        <span className="w-40 text-sm text-gray-500">{label}</span>
        <span className="flex-1 text-base font-medium text-gray-800">{value}</span>
    </div>
);

export default ProfileItem;
