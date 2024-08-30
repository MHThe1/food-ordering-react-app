import { useEffect, useState } from "react";
import FoodItem from "./FoodItem.jsx";

export default function Foods() {
  const [loadedMeals, setLoadedMeals] = useState([]);

  const apiUrl = import.meta.env.VITE_APP_API_URL;

  useEffect(() => {
    async function getMeals() {
      const response = await fetch(`${apiUrl}/meals`);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const meals = await response.json();
      setLoadedMeals(meals);
    }

    getMeals();
  }, []);

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
