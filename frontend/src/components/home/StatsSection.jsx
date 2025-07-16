export default function StatsSection() {
  const stats = [
    {
      icon: "bg-green-500",
      title: "Nhiều hơn",
      value: "4 nghìn",
      subtitle: "5 sao đánh giá",
    },
    {
      icon: "bg-orange-500",
      title: "",
      value: "65,000 khóa học",
      subtitle: "trong 300+ chủ đề",
    },
    {
      icon: "bg-green-600",
      title: "Tìm khóa học phù hợp",
      value: "Đảm bảo phù hợp tốt",
      subtitle: "",
    },
  ];

  return (
    <div className="flex flex-wrap justify-center items-center gap-8 text-center">
      {stats.map((stat, index) => (
        <div key={index} className="flex items-center gap-2">
          <div
            className={`w-4 h-4 ${stat.icon} rounded-sm transform rotate-45`}
          ></div>
          <div>
            {stat.title && (
              <div className="text-sm text-gray-600">{stat.title}</div>
            )}
            <div className="font-bold text-gray-800">{stat.value}</div>
            {stat.subtitle && (
              <div className="text-sm text-gray-600">{stat.subtitle}</div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
