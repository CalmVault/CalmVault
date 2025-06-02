import TestimonialCard from "./testimonial-card";

interface TestimonialsSectionProps {
  therapistRating: number;
}

// Mock testimonials data - expanded to show scroll functionality
const getTestimonialsForTherapist = () => [
  {
    id: 1,
    username: "Zz Xx",
    text: "Amazing Listener is a an amazing listener",
    profileImage: "/elipse.png",
  },
  {
    id: 2,
    username: "Zz Xx",
    text: "Amazing Listener is a an amazing listener",
    profileImage: "/elipse.png",
  },
  {
    id: 3,
    username: "Zz Xx",
    text: "Amazing Listener is a an amazing listener",
    profileImage: "/elipse.png",
  },
  {
    id: 4,
    username: "Zz Xx",
    text: "Amazing Listener is a an amazing listener",
    profileImage: "/elipse.png",
  },
];

function TestimonialsSection({ therapistRating }: TestimonialsSectionProps) {
  const testimonials = getTestimonialsForTherapist();

  return (
    <div
      className={`space-y-4 ${
        testimonials.length > 3
          ? "max-h-[600px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800"
          : ""
      }`}
    >
      {testimonials.map((testimonial) => (
        <TestimonialCard
          key={testimonial.id}
          testimonial={testimonial}
          therapistRating={therapistRating}
        />
      ))}
    </div>
  );
}

export default TestimonialsSection;
