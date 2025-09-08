import { PageHeading } from "../../components/heading";

export const NotificationDetail = ({}) => {
  const notificationData = [
    { notificationTitle: "sdfasd", notification: "dsafasd", is_read: 0 },
  ];

  return (
    <section className="px-4 w-full flex flex-col">
      <PageHeading containerClassName={"my-4"}>Notifications</PageHeading>
      <div className="w-full flex flex-col">
        {notificationData?.map((data, i) => {
          return (
            <div
              className={`${
                data.is_read === 0 ? "bg-gray-200" : ""
              } p-2 border-t !border-gray-200 `}
              key={i}
              onClick={() => handleView(data.id)}
            >
              <div className="flex justify-between items-center">
                <h1 className="font-bold text-xl text-gray-950">
                  {data.notificationTitle}
                </h1>
                {data.is_read === 0 ? (
                  <span className="w-2 h-2 rounded-full bg-[#FBB03B]"></span>
                ) : (
                  <></>
                )}
              </div>
              <p className="text-sm text-gray-500">{data.notification}</p>
              <div className="py-2 flex justify-between">
                <p className="font-normal text-xs text-[#888]">
                  {data.updated_at}
                </p>
              </div>
              <div className="cursor-pointer">View</div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
