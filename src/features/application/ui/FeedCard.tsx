import { FaLocationDot } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";

interface FeedCardProps {
  image: string;
  badge?: string;
  name: string;
  rating?: string;
  description: {
    breed: string;
    gender: string;
    age: string;
  };
  location: string;
}

const FeedCard: React.FC<FeedCardProps> = ({
  image,
  badge,
  name,
  rating,
  description: { breed, gender, age },
  location,
}) => {
  return (
    <div className="bg-white border border-black/40 rounded-lg w-full h-fit flex flex-col cursor-pointer hover:shadow-lg shadow-black/20">
      <div className="flex flex-col">
        <AnimatePresence>
          <motion.div className="overflow-hidden rounded-t-md">
            <motion.img
              src={image}
              alt={name}
              className="flex object-cover object-center h-50 w-70"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        </AnimatePresence>

        <div className="flex">
          <span className="px-4 py-2 m-1">{badge}</span>
        </div>
        <div className="flex flex-col p-3">
          <div className="flex-col">
            <div className="flex">
              <p className="text-xl text-black font-bold mb-2">{name}</p>
              <div className="bg-gray-200 text-black rounded-lg w-fit h-fit">
                {rating}
              </div>
            </div>

            <p className="text-sm text-black/70 mb-3">
              {breed} • {gender} • {age}
            </p>
            <div className="flex">
              <FaLocationDot className="h-4 w-4 text-amber-600 mr-2" />
              <p className="text-sm text-black/70">{location}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export { FeedCard };
