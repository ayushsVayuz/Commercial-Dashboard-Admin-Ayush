import React, { useState, useEffect } from "react";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [collapsedSections, setCollapsedSections] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // API Configuration
  const API_BASE_URL =
    process.env.REACT_APP_API_BASE_URL ||
    "https://apnacomplex.vayuz.com/dashboard-api/v1";
  const DASHBOARD_ENDPOINT =
    "/dashboards/1689fab9-9c56-426a-bd15-368b9da4ce33/details";

  // Custom SVG Icons
  const ChevronDownIcon = () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );

  const ChevronRightIcon = () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );

  const BarChartIcon = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <line x1="12" x2="12" y1="20" y2="10" />
      <line x1="18" x2="18" y1="20" y2="4" />
      <line x1="6" x2="6" y1="20" y2="16" />
    </svg>
  );

  const LineChartIcon = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="m3 3 3 9 4-6 5 6 3-9" />
      <path d="m21 21-6-6-4 6-4-3-4 3-3-6" />
    </svg>
  );

  const RefreshIcon = () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M3 12a9 9 0 019-9 9.75 9.75 0 016.74 2.74L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M21 12a9 9 0 01-9 9 9.75 9.75 0 01-6.74-2.74L3 16" />
      <path d="M3 21v-5h5" />
    </svg>
  );

  // API Helper function
  const apiRequest = async (url, options = {}) => {
    const defaultOptions = {
      headers: {
        "Content-Type": "application/json",
      },
      ...options,
    };

    // Add authorization header if token exists
    const token = localStorage?.getItem?.("authToken");
    if (token) {
      defaultOptions.headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${url}`, defaultOptions);

    if (!response.ok) {
      if (response.status === 401) {
        // Handle unauthorized
        localStorage?.removeItem?.("authToken");
        throw new Error("Unauthorized access. Please log in again.");
      } else if (response.status >= 500) {
        throw new Error("Server error. Please try again later.");
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    }

    return response.json();
  };

  // Fetch dashboard data
  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      // For demo purposes, we'll use the local JSON data if API call fails
      let data;
      try {
        const response = await apiRequest(DASHBOARD_ENDPOINT);
        if (response.status === "success") {
          data = response.data;
        } else {
          throw new Error(response.message || "Failed to fetch dashboard data");
        }
      } catch (apiError) {
        console.warn("API call failed, using fallback data:", apiError.message);
        // Fallback to the original JSON data for demo
        data = getFallbackData();
      }

      setDashboardData(data);

      // Initialize collapsed sections based on data
      const initialCollapsed = new Set();
      data.sections.forEach((section) => {
        if (section.is_collapsed) {
          initialCollapsed.add(section.id);
        }
      });
      setCollapsedSections(initialCollapsed);
    } catch (err) {
      setError(err.message || "Failed to load dashboard data");
      console.error("Dashboard fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fallback data (your original JSON)
  const getFallbackData = () => {
    return {
      id: "1689fab9-9c56-426a-bd15-368b9da4ce33",
      name: "Reside Inn Avenue Dashboard",
      version: "1.0",
      last_modified: "2025-09-10T09:55:37.000Z",
      theme: "light",
      auto_refresh: 30000,
      compact_mode: 0,
      grid_config: {
        gap: 16,
        columns: 12,
        rowHeight: 100,
      },
      breakpoints: {
        mobile: 480,
        tablet: 768,
        desktop: 1200,
      },
      sections: [
        {
          id: "21148c79-e756-43b2-8f13-0ec163897133",
          dashboard_id: "1689fab9-9c56-426a-bd15-368b9da4ce33",
          name: "Community Updated",
          order_index: 1,
          is_collapsible: 1,
          is_collapsed: 0,
          section_config: {
            padding: 16,
            borderRadius: 8,
            backgroundColor: "#f8f9fa",
          },
          api_endpoint: "/financial/community",
          method: "GET",
          response_type: "json",
          refresh_interval: 40000,
          params: {
            period: "current_month",
          },
          response_mapping: {
            income: "data.income",
            expenditure: "data.expenditure",
          },
          created_at: "2025-09-09T07:01:14.000Z",
          updated_at: "2025-09-10T09:35:02.000Z",
          widgets: [
            {
              id: "9183932a-c405-4990-b16e-d023087c6142",
              section_id: "21148c79-e756-43b2-8f13-0ec163897133",
              type: "chart",
              name: "New Chart",
              position: {
                h: 2,
                w: 3,
                x: 3,
                y: 0,
              },
              constraints: {
                maxWidth: 4,
                minWidth: 2,
                draggable: true,
              },
              group_id: "group-uuid",
              response_mapping: {
                dataField: "sales",
              },
              styling: {
                borderColor: "#ccc",
                backgroundColor: "#fff",
              },
              config: {
                chartType: "line",
              },
              responsive: {
                mobile: {},
                tablet: {},
                desktop: {},
              },
              created_at: null,
              updated_at: "2025-09-10T09:35:02.000Z",
            },
          ],
        },
      ],
    };
  };

  // Auto-refresh functionality
  useEffect(() => {
    fetchDashboardData();

    // Set up auto-refresh if enabled
    let refreshInterval;
    if (dashboardData?.auto_refresh) {
      refreshInterval = setInterval(() => {
        fetchDashboardData();
      }, dashboardData.auto_refresh);
    }

    return () => {
      if (refreshInterval) {
        clearInterval(refreshInterval);
      }
    };
  }, [dashboardData?.auto_refresh]);

  // Manual refresh handler
  const handleRefresh = () => {
    fetchDashboardData();
  };

  const toggleSection = (sectionId) => {
    const newCollapsed = new Set(collapsedSections);
    if (newCollapsed.has(sectionId)) {
      newCollapsed.delete(sectionId);
    } else {
      newCollapsed.add(sectionId);
    }
    setCollapsedSections(newCollapsed);
  };

  const renderWidget = (widget, gridConfig) => {
    const { position, styling, config, name, type } = widget;

    // Calculate widget dimensions based on grid
    const widthPercent = (position.w / gridConfig.columns) * 100;
    const height = position.h * gridConfig.rowHeight;
    const leftPercent = (position.x / gridConfig.columns) * 100;
    const top = position.y * gridConfig.rowHeight;

    // Filter out widgets with zero dimensions
    if (position.w === 0 || position.h === 0) {
      return null;
    }

    const widgetStyle = {
      position: "absolute",
      left: `${leftPercent}%`,
      top: `${top}px`,
      width: `calc(${widthPercent}% - ${gridConfig.gap}px)`,
      height: `${height - gridConfig.gap}px`,
      backgroundColor: styling?.backgroundColor || "#fff",
      border: `1px solid ${styling?.borderColor || "#e0e0e0"}`,
      borderRadius: "8px",
      padding: "16px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      display: "flex",
      flexDirection: "column",
      transition: "all 0.3s ease",
      cursor: widget.constraints?.draggable ? "move" : "default",
    };

    const getChartIcon = (chartType) => {
      switch (chartType) {
        case "bar":
          return <BarChartIcon />;
        case "line":
          return <LineChartIcon />;
        default:
          return <BarChartIcon />;
      }
    };

    return (
      <div key={widget.id} style={widgetStyle} className="widget">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-blue-500">
              {getChartIcon(config?.chartType)}
            </span>
            <h4 className="text-sm font-medium text-gray-800 truncate">
              {name}
            </h4>
          </div>
          <span className="text-xs text-gray-500 uppercase bg-gray-100 px-2 py-1 rounded">
            {config?.chartType || "chart"}
          </span>
        </div>

        <div className="flex-1 flex items-center justify-center bg-gray-50 rounded">
          <div className="text-center">
            <div className="text-gray-400 mb-2">
              {getChartIcon(config?.chartType)}
            </div>
            <p className="text-xs text-gray-500">
              {config?.chartType?.toUpperCase() || "CHART"} PLACEHOLDER
            </p>
            <p className="text-xs text-gray-400 mt-1">
              {position.w}×{position.h} grid
            </p>
          </div>
        </div>

        <div className="mt-2 flex justify-between text-xs text-gray-500">
          <span>Data: {widget.response_mapping?.dataField || "N/A"}</span>
          <span>{type}</span>
        </div>
      </div>
    );
  };

  const renderSection = (section) => {
    const isCollapsed = collapsedSections.has(section.id);

    // Calculate section height based on widgets
    let maxHeight = 0;
    if (section.widgets && section.widgets.length > 0) {
      section.widgets.forEach((widget) => {
        const widgetBottom =
          (widget.position.y + widget.position.h) *
          dashboardData.grid_config.rowHeight;
        maxHeight = Math.max(maxHeight, widgetBottom);
      });
    }

    // Add padding for empty sections
    const sectionHeight = Math.max(maxHeight + 40, 120);

    const sectionStyle = {
      backgroundColor: section.section_config?.backgroundColor || "#fff",
      borderRadius: `${section.section_config?.borderRadius || 8}px`,
      padding: `${section.section_config?.padding || 16}px`,
      marginBottom: "24px",
      border: "1px solid #e0e0e0",
      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
    };

    const gridContainerStyle = {
      position: "relative",
      height: isCollapsed ? "0px" : `${sectionHeight}px`,
      overflow: "hidden",
      transition: "height 0.3s ease",
    };

    return (
      <div key={section.id} style={sectionStyle} className="section">
        <div
          className="flex items-center justify-between cursor-pointer mb-4"
          onClick={() => section.is_collapsible && toggleSection(section.id)}
        >
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-semibold text-gray-800">
              {section.name}
            </h3>
            <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
              {section.widgets?.length || 0} widgets
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-xs text-gray-500">
              Order: {section.order_index} | Refresh:{" "}
              {section.refresh_interval || "N/A"}ms
            </div>
            {section.is_collapsible && (
              <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                {isCollapsed ? <ChevronRightIcon /> : <ChevronDownIcon />}
              </button>
            )}
          </div>
        </div>

        <div style={gridContainerStyle}>
          {section.widgets && section.widgets.length > 0 ? (
            section.widgets.map((widget) =>
              renderWidget(widget, dashboardData.grid_config)
            )
          ) : (
            <div className="flex items-center justify-center h-20 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
              <p className="text-gray-500 text-sm">
                No widgets in this section
              </p>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center max-w-md">
          <div className="text-red-500 mb-4">
            <svg
              className="h-12 w-12 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.728-.833-2.498 0L4.316 15.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Failed to Load Dashboard
          </h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={handleRefresh}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // No data state
  if (!dashboardData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-gray-600">No dashboard data available</p>
          <button
            onClick={handleRefresh}
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Refresh
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Dashboard Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {dashboardData.name}
              </h1>
              <p className="text-sm text-gray-600">
                Version {dashboardData.version} • Last modified:{" "}
                {new Date(dashboardData.last_modified).toLocaleString()}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={handleRefresh}
                className="flex items-center gap-2 px-3 py-2 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                disabled={loading}
              >
                <RefreshIcon />
                Refresh
              </button>
              <div className="text-sm text-gray-500">
                Auto-refresh: {dashboardData.auto_refresh / 1000}s
              </div>
              <div className="text-sm text-gray-500">
                Theme: {dashboardData.theme}
              </div>
              <div className="h-2 w-2 bg-green-400 rounded-full"></div>
              <span className="text-sm text-green-600">Live</span>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Sections</p>
                <p className="text-2xl font-bold text-gray-900">
                  {dashboardData.sections.length}
                </p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg
                  className="h-6 w-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 11H5m14-7H5a2 2 0 00-2 2v12a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Widgets</p>
                <p className="text-2xl font-bold text-gray-900">
                  {dashboardData.sections.reduce(
                    (sum, section) => sum + (section.widgets?.length || 0),
                    0
                  )}
                </p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                <BarChartIcon />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Grid Columns</p>
                <p className="text-2xl font-bold text-gray-900">
                  {dashboardData.grid_config.columns}
                </p>
              </div>
              <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg
                  className="h-6 w-6 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Sections */}
        <div>
          {dashboardData.sections
            .sort((a, b) => a.order_index - b.order_index)
            .map((section) => renderSection(section))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
