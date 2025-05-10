import { Star } from 'lucide-react';

export default function DoctorCard() {
  return (
    <div className="max-w-4xl mx-auto p-4 bg-white rounded-xl shadow-md flex gap-6">
      <div className="w-1/3">
        <img
          src="/path-to-image.png"
          alt="Dr. Ivana Cure"
          className="rounded-lg object-cover h-full w-full"
        />
      </div>
      <div className="w-2/3 flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-semibold flex items-center gap-2">
            Dr. Ivana Cure <span className="text-blue-500">✔</span>
          </h2>
          <p className="text-sm text-gray-600">
            MBBS - Psychiatrist <span className="ml-2 px-2 py-0.5 text-xs bg-gray-100 rounded">4 Years</span>
          </p>

          <div className="mt-2 text-gray-800 text-sm">
            <p className="font-medium">📞 +977984355124</p>
            <p className="mt-2">
              Dr. Ivana Cure is a dedicated psychiatrist with a strong commitment to delivering comprehensive mental health care. She focuses on early diagnosis, personalized treatment plans, and preventive strategies to support long-term emotional well-being.
            </p>
          </div>
        </div>

        <div className="mt-4 flex justify-between items-center text-sm text-gray-800">
          <p>Appointment fee: <span className="font-semibold text-black">$30</span></p>
          <div className="flex items-center text-yellow-500 font-semibold">
            4.5 <Star size={16} fill="currentColor" className="ml-1" />
          </div>
        </div>
      </div>
    </div>
  );
}
