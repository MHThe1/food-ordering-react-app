import useHttp from "../hooks/useHttp.js";
import FoodItem from "./FoodItem.jsx";

const requestConfig = {}

export default function Foods() {
  const apiUrl = import.meta.env.VITE_APP_API_URL;

  const { data: loadedMeals, isLoading, error } = useHttp(`${apiUrl}/meals`, requestConfig, []);

  if (isLoading) {
    return <p className="text-center text-xl mt-4 text-red-600 font-bold">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-xl mt-4 text-red-600 font-bold">Error: {error}</p>;
  }

  return (
    <ul className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {loadedMeals.map((meal) => (
        <FoodItem
          key={meal.id}
          id={meal.id}
          name={meal.name}
          price={meal.price}
          description={meal.description}
          image={`${apiUrl}/${meal.image}`}
        />
      ))}
    </ul>
  );
}
