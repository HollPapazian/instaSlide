export const Instructions = () => {
  return (
    <div className="mt-4 p-6 bg-gray-50 rounded-lg">
      <h2 className="text-xl font-bold text-gray-800 mb-4">How and Why to use InstaSlide</h2>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="border-2 border-gray-300 rounded-[1rem] p-2 md:p-1 bg-white order-2 md:order-1">
          <img 
            src="/assets/preview.gif" 
            alt="InstaSlide preview" 
            className="w-full md:w-[300px] h-auto rounded-[1.5rem] object-cover"
          />
        </div>
        <div className="order-1 md:order-2">
          <ul className="space-y-3 text-gray-600">
            <li className="flex gap-2">
              <span className="font-medium">1.</span>
              <span>Upload your panoramic or wide photo using the file selector</span>
            </li>
            <li className="flex gap-2">
              <span className="font-medium">2.</span>
              <span>Choose one of Instagram's supported aspect ratios (1:1, 1.91:1, or 4:5)</span>
            </li>
            <li className="flex gap-2">
              <span className="font-medium">3.</span>
              <span>Select the number of slides you want (1-10)</span>
            </li>
            <li className="flex gap-2">
              <span className="font-medium">4.</span>
              <span>Pick your preferred image format (PNG, JPG, WebP, or BMP)</span>
            </li>
            <li className="flex gap-2">
              <span className="font-medium">5.</span>
              <span>Adjust the crop area to frame your image perfectly</span>
            </li>
            <li className="flex gap-2">
              <span className="font-medium">6.</span>
              <span>Click "Crop and Split" to generate your carousel slides</span>
            </li>
            <li className="flex gap-2">
              <span className="font-medium">7.</span>
              <span>Download each slide and upload them to Instagram in order</span>
            </li>
          </ul>
          <p className="mt-4 text-sm text-gray-500">
            InstaSlide helps you create seamless, professional-looking carousel posts for Instagram by splitting your panoramic photos into perfectly sized slides while maintaining Instagram's required aspect ratios.
          </p>
        </div>
      </div>
    </div>
  )
} 