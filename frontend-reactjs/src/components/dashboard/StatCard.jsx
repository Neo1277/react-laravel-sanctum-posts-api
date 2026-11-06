import { FileText } from "lucide-react";

function StatCard({ title, value, description }) {
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">

      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-500">
          {title}
        </h3>

        <div className="rounded-lg bg-indigo-50 p-3">
          <FileText className="h-5 w-5 text-indigo-600" />
        </div>
      </div>

      <p className="mt-4 text-2xl font-bold text-gray-800">
        {value}
      </p>

      <p className="mt-2 text-sm text-gray-500">
        {description}
      </p>

    </div>
  );
}

export default StatCard;
