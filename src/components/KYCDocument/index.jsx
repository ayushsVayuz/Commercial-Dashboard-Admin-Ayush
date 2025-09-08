import { Controller } from "react-hook-form";

export const KYCDocument = ({ label, image, control, errors }) => {
  return (
    <div class="flex lg:flex-row md:flex-col items-center  gap-4 border rounded-md shadow shadow-gray-100 dark:shadow-gray-600 dark:border-gray-600">
      <div className="w-[25%] text-center p-6">
        {image ? (
          <img className="w-full" src={image} alt="" />
        ) : (
          <RxIdCard size={32} />
        )}
      </div>
      <div className="w-[75%] border-l p-3 relative">
        <div className="customCheckBox absolute right-3 top-2">
          <label class="container">
            <Controller
              name="tenant.isVerified"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type={"checkbox"}
                  // errorContent={errors.tenant.tenantName?.message}
                />
              )}
            />
            <div class="checkmark"></div>
          </label>
        </div>
        <h5 className="text-gray-700 mb-3 dark:text-gray-50">{label}</h5>
        <div className="flex items-center gap-4">
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols items-center gap-4">
            <Controller
              name={`tenant.${label}`}
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  className="p-3 dark:bg-gray-900 rounded"
                  type="text"
                  placeholder={`${label} No`}
                  // errorContent={errors.tenant.tenantName?.message}
                />
              )}
            />
            <div className="flex flex-col gap-1">
              <div className="h-[49px] flex items-center">
                <input type="file" id="files" className="hidden" />
                <label
                  for="files"
                  className="text-primaryText dark:text-white cursor-pointer underline hover:text-secondaryText"
                >
                  Upload file
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
