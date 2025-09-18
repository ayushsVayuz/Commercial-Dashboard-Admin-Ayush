import MicrofrontendLoader from "../../components/MFloader/MicroFrontendLoader";

export const Home = () => {
  const data = {
    name: "de89c7d828b318b0de46a6e0f2a17459:ec400680b0e2e093de1bc438434795c6",
    noticeBoardMF: "/notice-board",
    noticeBoardMF_headerBundle:
      "https://d18aratlqkym29.cloudfront.net/frontend-build/header/1.1/mf/header-bundle.js",
    noticeBoardMF_sidebarBundle:
      "https://d18aratlqkym29.cloudfront.net/frontend-build/sidebar/1.1/mf/sidebar-bundle.js",
    noticeBoardMF_tableBundle:
      "https://d18aratlqkym29.cloudfront.net/frontend-build/table/1.1/mf/reusableTable-bundle.js",
    noticeBoardMF_routes: [
      "compose_admin_notice",
      "detail",
      "listing",
      "notice_board",
      "pending_for_approval_notices",
      "draft-notices",
      "expiring-today",
      "expiring-this-week",
      "expired_notices",
      "approve-notice/:id",
      "reject-notice/:id",
      "view_notice/:id",
      "edit_notice/:id",
      "compose_admin_notice/validity",
      "compose_admin_notice/target",
      "preview_notice",
      "manage_noticeboard_templates",
      "manage_noticeboard_templates/add_noticeboard_template",
      "manage_noticeboard_templates/edit_noticeboard_template/:id",
      "reply-on-notice/:id",
      "compose_notice",
      "compose_notice/target",
      "compose_notice/validity",
      "2listing",
      "listing2",
      "create",
      "current-notices",
      "pending-approvals",
      "expired-notices",
      "detail/:id",
      "edit-notice/:id",
      "create/target",
      "create/validity",
      "previewNotice",
      "templates",
      "templates/create",
      "templates/edit/:id",
    ],
    noticeBoardPermissions: {
      admin_post_notice: true,
      admin_search: true,
      approve_edit_notice: true,
      approve_notice: true,
      compose_admin_notice: true,
      compose_notice: true,
      delete_notice: true,
      edit_notice: true,
      expired_notices: true,
      get_admin_notices: true,
      get_expired_notices: true,
      get_my_notices_list: true,
      get_notices_list: true,
      get_notice_access_level_options: true,
      get_notice_detail: true,
      get_pending_for_approval_notice: true,
      member_post_notice: true,
      member_search: true,
      notices: true,
      notice_board: true,
      pending_for_approval_notices: true,
      post_notice: true,
      preview_notice: true,
      reject_notice: true,
      show_notice: true,
      update_notice: true,
      view_notice_attachment: true,
    },
    password: "OTP new",
    signInMF: "/sign-in/",
    signInMF_headerBundle: undefined,
    signInMF_sidebarBundle: undefined,
    signInMF_tableBundle: undefined,
    signInMF_routes: ["sign-in"],
    token:
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJEWF91c2VyX2lkIjoiNCIsImVtYWlsIjoib2J1bEBldWtsZWlhdGVjaC5jb20iLCJjb21tdW5pdHlfaWQiOiIyIiwiY3VycmVudF9yb2xlX2lkIjoiMSIsImN1cnJlbnRfZG9jdW1lbnRfcm9vdCI6Im1vdmllX2luX3BhcmFkaXNlIiwiY29tbXVuaXR5RGF0YSI6eyJEWF91c2VyX2lkIjoiNCIsImVtYWlsIjoib2J1bEBldWtsZWlhdGVjaC5jb20iLCJJZF9wcm92aWRlciI6IkFwdGVtIiwiZnVsbF9uYW1lIjoiT2J1bCBSZWRkeSIsInByb2ZpbGVfaW1hZ2UiOiI5NTIyNTM1YjRjMmIzOGY4MzlkNWY3YjNiYzBiMWMxNF9fXzUwMjVhOTg4OWVjODE5N2YwOTFlZmRkNjkxM2JiZTdjX19fdmlyYXQta29obGkuanBnIiwibW9iaWxlX3Bob25lIjoiMzMzMzYzNjU1OCIsImN1cnJlbnRfY29tbXVuaXR5X2lkIjoiMiIsImN1cnJlbnRfY29tbXVuaXR5X25hbWUiOiJNb3ZlIEluIFByYWRpc2UgRXN0YXRlIiwiY3VycmVudF9kb2N1bWVudF9yb290IjoibW92aWVfaW5fcGFyYWRpc2UiLCJjdXJyZW50X2NvbW11bml0eV9jaXR5X25hbWUiOiJCYW5nYWxvcmUiLCJjb21tX3R5cGUiOiJ1bl9tYW5hZ2VkIiwicm91bmRpbmdfb2ZmIjoyLCJyb3VuZGluZ19vZmZfb3B0aW9uIjoibm9uZSIsImlzX2N1cl9jb21tX2ZlZCI6Ik5vIiwiY291bnRyeV9pZCI6IklORCIsImN1cnJlbmN5X3R5cGUiOiJScyIsImNvbW11bml0eV90aW1lem9uZSI6IkFzaWEvS29sa2F0YSIsInByb2Zvcm1hX2NoZWNrIjoiMSIsImN1cnJlbnRfY29tcGxleF90eXBlX2lkIjoiMSIsImlzX3ByZV9oYW5kb3ZlciI6ZmFsc2UsIm1hc3Rlcl9jb21tX3N1cHBvcnRfbnVtIjoiMjQzOTA3NiIsIm1hc3Rlcl9jb21tX25hbWUiOiJUaWxhbCBBbCBHaGFmIiwibWFzdGVyX2NvbW1fc3VwcG9ydF9lbWFpbCI6Im1hdGVyQGdtYWlsLmNvbSIsImN1cnJlbnRfY29tbXVuaXR5X2hpZGVfc2lkZWJhciI6IjAiLCJpc19wcmlvcml0eV9zdXBwb3J0X2VuYWJsZWQiOiIwIiwiaGlkZV9zaWRlYmFyX2Zvcl9hZG1pbnMiOiIxIiwibGFiZWxfcHJlZml4IjoiIiwicG9ydGFsX3R5cGUiOiIiLCJzaG93X3RfYW5kX2MiOjAsInJ1X251bXMiOnsiODAyIjoiSXJvbk1hbi1BLTIiLCI4MDEiOiJJcm9uTWFuLUEtMSIsIjY0NyI6IlVCUi0zMDYiLCIyNDQwIjoiMjZhdWcgdGVzdCBibG9jayBhYy0yMzk1In0sInJvbGVfaWRzIjpbIjEiLCIxMyIsIi0xMDAiXSwiY3VycmVudF9yb2xlX2lkIjoiMSIsInByaXZhdGVfdXNlcl9rZXkiOiJlTm9ydGpLeXNGSks5Y3N2S3NueU5nak44Z291VG85SzluWE1UbkpNenFfVE1kRXhWTElHWEREWGpRdGEiLCJkeW5hbWljX3NlcGVyYXRvcl9pbl91bml0X2FuZF9ibG9jayI6Ii0iLCJjb21tX2xvZ28iOiIiLCJ1c2VyX2NvbW11bml0eV9pZHMiOnsiOSI6IjkiLCIxMCI6IjEwIiwiNSI6IjUiLCI0OSI6IjQ5IiwiMiI6IjIiLCIxMDYiOiIxMDYiLCI4NiI6Ijg2IiwiNyI6IjciLCI5NSI6Ijk1IiwiMTExIjoiMTExIiwiMTQiOiIxNCIsIjExNSI6IjExNSIsIjExNiI6IjExNiIsIjQ3IjoiNDciLCIxMSI6IjExIiwiMTI5IjoiMTI5IiwiMTQzIjoiMTQzIiwiMTQ3IjoiMTQ3IiwiMTUyIjoiMTUyIiwiMTUzIjoiMTUzIiwiMTU0IjoiMTU0IiwiMTU1IjoiMTU1IiwiMTY5IjoiMTY5In19fQ.tZtEGZ5ehgeOqMpxc8d - V_CjP6oD_bw6hYCRWIYdbVg",
  };

  Object.entries(data).forEach(([key, value]) => {
    localStorage.setItem(key, JSON.stringify(value));
  });

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
        mountDivId="dashboardMF12"
        // propsToPass={staticProps}
      />
    </>
  );
};
