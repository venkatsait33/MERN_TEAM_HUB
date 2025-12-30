const PerformanceBannerCards = () => {
  return (
    <div>
      <div>
        <div className="flex max-sm:flex-col max-md:grid max-sm:grid-cols-2 justify-between items-center gap-3">
          <div className="flex  gap-2 rounded-xl transition-all w-full p-4 shadow-xl">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-star w-7 h-7 text-white"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
            </div>
            <div>
              <p>Average Rating</p>
              <div>
                <span className=" font-semibold">0</span>
                <span>/10</span>
              </div>
            </div>
          </div>
          <div className="flex  gap-2 rounded-xl transition-all w-full p-4 shadow-xl">
            <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-target w-7 h-7 text-white"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <circle cx="12" cy="12" r="6"></circle>
                <circle cx="12" cy="12" r="2"></circle>
              </svg>
            </div>

            <div>
              <p>Task Completion</p>
              <div>
                <span className="font-semibold">0</span>
                <span>%</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2 rounded-xl transition-all w-full p-4 shadow-xl">
            <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-award w-7 h-7 text-white"
              >
                <circle cx="12" cy="8" r="6"></circle>
                <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"></path>
              </svg>
            </div>
            <div>
              <p>Behavior Score</p>
              <div>
                <span className=" font-semibold">0</span>
                <span>/100</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PerformanceBannerCards;
