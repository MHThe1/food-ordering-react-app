import { formatPrice } from "../utils/formatting";

export default function FoodItem({ name, price, image, description }) {
    return (
      <li className="bg-pink-600 dark:bg-slate-900 text-white shadow rounded overflow-hidden flex flex-col">
        <article className="flex-grow flex flex-col items-center">
          <img src={image} alt={name} className="w-full h-48 object-cover" />
          <h3 className="text-lg font-semibold mt-4">{name}</h3>
          <p className="mt-2 mb-3">${formatPrice(price)}</p>
          <p className="text-sm text-center">{description}</p>
        </article>
      </li>
    );
  }