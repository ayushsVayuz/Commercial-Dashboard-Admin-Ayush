export const dummyDashboardData = {
  financeSummary: {
    incomeSummary: {
      opening_balance: 50000,
      income: 120000,
      collection: 90000,
      closing_balance: 80000,
    },
    expenditureSummary: {
      opening_balance: 40000,
      expenditure: 70000,
      payment: 50000,
      outstanding: 20000,
    },
  },

  facilities: {
    totalBookings: 45,
    totalSlots: 60,
    utilizationRate: 75.5,
    slots: [
      { slot_start_time: "08:00", slot_end_time: "09:00", slot_bookings: 5, total_slots: 8 },
      { slot_start_time: "09:00", slot_end_time: "10:00", slot_bookings: 8, total_slots: 8 },
      { slot_start_time: "10:00", slot_end_time: "11:00", slot_bookings: 10, total_slots: 8 },
      { slot_start_time: "11:00", slot_end_time: "12:00", slot_bookings: 7, total_slots: 8 },
      { slot_start_time: "12:00", slot_end_time: "13:00", slot_bookings: 15, total_slots: 8 },
    ],
  },

  engagement: {
    total_notices: 15,
    total_topics: 30,
    total_polls: 12,
    total_surveys: 8,
  },

  community: {
    thisMonthMoveIns: 25,
    thisMonthMoveOuts: 15,
    moveInPercentChange: 12,
    moveOutPercentChange: -5,
    lastMonthMoveIns: 20,
    lastMonthMoveOuts: 18,
  },

  gateUpdates: {
    summary: {
      activeWalkins: { visitor_in: 12, total_pass: 20 },
      preApprovedCheckins: { expected_pass_scanned: 8, total_expected_pass: 15 },
    },
    chart: [
      { hour: 8, walkins: 5, preApproved: 3 },
      { hour: 9, walkins: 8, preApproved: 5 },
      { hour: 10, walkins: 12, preApproved: 7 },
      { hour: 11, walkins: 15, preApproved: 9 },
      { hour: 12, walkins: 10, preApproved: 6 },
      { hour: 13, walkins: 6, preApproved: 4 },
      { hour: 14, walkins: 9, preApproved: 5 },
      { hour: 15, walkins: 14, preApproved: 10 },
      { hour: 16, walkins: 11, preApproved: 8 },
      { hour: 17, walkins: 7, preApproved: 5 },
    ],
  },

  helpdesk: {
    today_open_complaints: 18,
    percent_change: 5,
    today_L1: 7,
    today_L2: 5,
    today_L3: 3,
    today_NoLevel: 3,
  },
};
