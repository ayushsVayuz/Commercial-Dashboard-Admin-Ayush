import { useEffect, useState } from "react";
import WidgetGrid from "../section/components/WidgetGrid";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { NoData } from "../../components/noDara";
import { fetchDashboardDetails } from "../../redux/actions/dashboard-action";
import { useDispatch } from "react-redux";

const Dashboard = () => {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await dispatch(
          fetchDashboardDetails({ userId: 4, communityId: 2 })
        ).unwrap();

        console.log("Fetched dashboard data:", response);
        setSections(response);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching dashboard:", error);
      }
    };

    fetchDashboard();
  }, [dispatch]);

  // Handle drag end for sections
  const handleDragEnd = async (result) => {
    if (!result.destination) return;

    const reordered = Array.from(sections);
    const [removed] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, removed);

    // Update order_index based on new order
    const updated = reordered.map((s, idx) => ({
      ...s,
      order_index: idx + 1,
    }));

    setSections(updated);

    // prepare payload for API
    const payload = updated.map((s) => ({
      id: s?.section_id,
      order_index: s?.order_index,
    }));

    console.log("Saving to backend:", payload);

    try {
      const res = await fetch(
        `https://apnacomplex.vayuz.com/dashboard-api/v1/dashboards/1689fab9-9c56-426a-bd15-368b9da4ce33/save`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ sections: payload }),
        }
      );

      if (!res.ok) {
        throw new Error(`Failed to save sections: ${res.status}`);
      }

      const result = await res.json();
      console.log("Save success:", result);
    } catch (err) {
      console.error("Error saving section order:", err);
    }
  };

  if (loading) return <div>Loading Dashboard...</div>;

  return (
    <>
      {sections?.length > 0 ? (
        <div>
          {/* Section Tabs (draggable) */}
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="sections" direction="horizontal">
              {(provided) => (
                <div
                  className="flex gap-4 mb-6"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {sections.map((section, index) => (
                    <Draggable
                      key={section.section_id}
                      draggableId={section.section_id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`px-4 py-2 rounded-lg border text-sm font-medium bg-white text-gray-600 border-gray-200 ${
                            snapshot.isDragging ? "shadow-md" : ""
                          }`}
                        >
                          {section.name}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
          {/* Render all sections with their widgets */}
          {sections?.map((section) => (
            <div key={section.section_id} className="mb-6">
              <h3 className="text-lg font-semibold mb-2">{section.name}</h3>
              {section?.widgets && section?.widgets?.length > 0 ? (
                <WidgetGrid
                  data={section.widgets}
                  isDraggable={false}
                  isResizable={false}
                />
              ) : (
                <div>No widgets found</div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <NoData />
      )}
    </>
  );
};

export default Dashboard;
