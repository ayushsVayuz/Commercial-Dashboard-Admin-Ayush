import MicrofrontendLoader from "../../components/MFloader/MicroFrontendLoader";

export const Home = () => {
  return (
    <>
      <MicrofrontendLoader
        // ref={tableRef}
        // scriptUrl={`https://anarock-staging.s3.us-east-1.amazonaws.com/anarock-frontend/dashboard/dashboard-bundle.js`}
        scriptUrl={
          `${"https://anarock-staging.s3.us-east-1.amazonaws.com/anarock-frontend/dashboard/mf/dashboard-bundle.js"}` +
          `?date=${Date.now()}`
        }
        cssUrl={
          "https://anarock-staging.s3.us-east-1.amazonaws.com/anarock-frontend/dashboard/mf/dashboardmf.css"
        }
        globalVarName="dashboardMF"
        mountDivId="dashboardMF"
        // propsToPass={staticProps}
      />
    </>
  );
};
