import { useState } from "react";
import { Link } from "react-router-dom";

export default function OffersSection() {
  const [imageErrors, setImageErrors] = useState({});

  const handleImageError = (offerId) => {
    setImageErrors((prev) => ({
      ...prev,
      [offerId]: true,
    }));
  };

  const offers = [
    {
      id: 1,
      title: "Học 1 kèm 1",
      description:
        "Tìm giáo viên từ khắp nơi trên thế giới chia sẻ ngôn ngữ, phương ngữ và văn hóa của họ.",
      buttonText: "Tìm giáo viên",
      buttonLink: "/teacher",
      image: "/images/offers/teacher-1-1.png",
      imageAlt:
        "Man waving with teacher avatars around him representing 1-on-1 online lessons",
      bgColor: "bg-blue-50",
      accentColor: "text-blue-600",
    },
    {
      id: 2,
      title: "Lớp học nhóm",
      description:
        "Các lớp học nhóm trực tuyến thú vị và hấp dẫn được thiết kế và hướng dẫn bởi các giáo viên chuyên gia.",
      buttonText: "Xem tất cả lớp học",
      buttonLink: "/class",
      image: "/images/offers/group-class.png",
      imageAlt:
        "Woman on video call with computer representing online group classes",
      bgColor: "bg-green-50",
      accentColor: "text-green-600",
    },
    {
      id: 3,
      title: "Các khóa học tốt nhất",
      description:
        "Các khóa học được AI gợi ý phù hợp với trình độ và sở thích của bạn.",
      buttonText: "Xem gợi ý",
      buttonLink: "/community",
      image: "/images/offers/community.png",
      imageAlt:
        "Two women looking at phones with global community icons representing free practice",
      bgColor: "bg-orange-50",
      accentColor: "text-orange-600",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
            See what our platform offers
          </h2>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className="text-center group hover:transform hover:-translate-y-2 transition-all duration-300"
            >
              {/* Image Container */}
              <div
                className={`${offer.bgColor} rounded-3xl p-4 mb-8 h-64 flex items-center justify-center overflow-hidden`}
              >
                <img
                  src={
                    imageErrors[offer.id] ? "images/default.jpg" : offer.image
                  }
                  alt={offer.imageAlt}
                  className="w-full h-full object-contain rounded-2xl transition-transform duration-300 group-hover:scale-105"
                  onError={() => handleImageError(offer.id)}
                />
              </div>

              {/* Content */}
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-gray-900">
                  {offer.title}
                </h3>

                <p className="text-gray-600 leading-relaxed max-w-sm mx-auto">
                  {offer.description}
                </p>

                {/* CTA Link */}
                <div className="pt-4">
                  <Link
                    to={offer.buttonLink}
                    className={`inline-flex items-center gap-2 ${offer.accentColor} font-medium hover:underline transition-all duration-200 group-hover:gap-3`}
                  >
                    {offer.buttonText}
                    <svg
                      className="w-4 h-4 transition-transform group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
