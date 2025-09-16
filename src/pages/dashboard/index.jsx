import { useEffect, useState } from "react";
import WidgetGrid from "../section/components/WidgetGrid";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import MicrofrontendLoader from "../../components/MFloader/MicroFrontendLoader";

const Dashboard = () => {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await fetch(
          "https://whitelabels-1.apnacomplex.com/dashboard-api/v1/dashboards/1689fab9-9c56-426a-bd15-368b9da4ce33/details"
        );
        const result = await res.json();

        if (result?.statusCode === 200) {
          const apiSections =
            result.data.sections?.map((s, idx) => ({
              section_id: s.id,
              name: s.name,
              order_index: s.order_index ?? idx,
              widgets:
                s.widgets?.map((w) => ({
                  widget_id: w.widget_id,
                  key_name: w.key_name,
                  title: w.widget_name,
                  is_active: w.is_active,
                  position: w.position || [0, 0, 4, 2],
                })) || [],
            })) || [];

          setSections(apiSections);
        }
      } catch (err) {
        console.error("Error fetching dashboard:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  // Handle drag end for sections
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
      id: s.section_id,
      order_index: s.order_index,
    }));

    console.log("Saving to backend:", payload);

    try {
      const res = await fetch(
        "https://whitelabels-1.apnacomplex.com/dashboard-api/v1/dashboards/1689fab9-9c56-426a-bd15-368b9da4ce33/save",
        {
          method: "PUT", // or PUT/PATCH based on your API spec
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
    <div>
      <MicrofrontendLoader
        // ref={tableRef}

        scriptUrl={
          `${
            localStorage.getItem(`noticeBoardMF-tableBundle`) ||
            "https://anarock-staging.s3.us-east-1.amazonaws.com/anarock-frontend/dashboard/mf/dashboard-bundle.js"
          }` + `?date=${Date.now()}`
        }
        globalVarName="dashboardMF"
        mountDivId="dashboardMF"
        // propsToPass={staticProps}
      />

      <div className="dashboardMF"></div>
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
      {sections.map((section) => (
        <div key={section.section_id} className="mb-6">
          <h3 className="text-lg font-semibold mb-2">{section.name}</h3>
          {section.widgets && section.widgets.length > 0 ? (
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
  );
};

export default Dashboard;
