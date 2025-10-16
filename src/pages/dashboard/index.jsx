import { useEffect, useState } from "react";
import DNDGridLayout from "../section/components/DNDGridLayout";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { NoData } from "../../components/noDara";
import {
  fetchDashboardDetails,
  updateSectionOrder,
} from "../../redux/actions/dashboard-action";
import { useDispatch, useSelector } from "react-redux";
import { pxToGridUnits } from "../../utils";

const Dashboard = () => {
  const [sectionsOrder, setSectionsOrder] = useState();
  const { data: sections, loading } = useSelector((state) => state.dashboard);

  const dispatch = useDispatch();

  const userId = 4;

  useEffect(() => {
    dispatch(fetchDashboardDetails({ userId: userId, communityId: 2 }));
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

    setSectionsOrder(updated);

    // prepare payload for API
    const payload = updated.map((s) => ({
      id: s?.section_id,
      order_index: s?.order_index,
    }));
    dispatch(updateSectionOrder({ sections: payload }));
  };

  if (loading) return <div>Loading Dashboard...</div>;

  // console.log(pxToGridUnits(184), "px")

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
          {sections?.map((section, index) => (
            <div key={section.section_id} className="mb-6">
              {index !== 0 && (
                <h3 className="text-lg font-semibold mb-2">{section.name}</h3>
              )}
              {section?.widgets && section?.widgets?.length > 0 ? (
                <DNDGridLayout
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
