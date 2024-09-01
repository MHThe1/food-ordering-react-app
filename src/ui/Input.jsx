export default function Input({ label, id, ...props }) {
    return (
      <div className="relative rounded-md shadow-sm">
        <label htmlFor={id} className="block text-sm font-medium text-gray-300 mb-1">
          {label}
        </label>
        <input
          type="text"
          id={id}
          name={id}
          className="block w-full p-2.5 text-sm text-gray-900 bg-gray-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
          {...props}
        />
      </div>
    );
  }
  