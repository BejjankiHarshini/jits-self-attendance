const userStoreKey = "jits-attendance-users-v2";
    const activeUserKey = "jits-attendance-active-user-v2";
    const ownerPinKey = "jits-attendance-owner-pin-v2";
    const semesterStart = "2026-04-27";
    const firstPhaseEnd = "2026-05-08";
    const summerStart = "2026-05-09";
    const summerEnd = "2026-07-05";
    const classworkRestart = "2026-07-06";

    const periods = [
      { n: 1, time: "9:30 AM - 10:30 AM", half: "morning" },
      { n: 2, time: "10:30 AM - 11:30 AM", half: "morning" },
      { n: 3, time: "11:30 AM - 12:30 PM", half: "morning" },
      { n: 4, time: "1:15 PM - 2:15 PM", half: "afternoon" },
      { n: 5, time: "2:15 PM - 3:15 PM", half: "afternoon" },
      { n: 6, time: "3:15 PM - 4:15 PM", half: "afternoon" }
    ];

    const sectionMap = {
      CSE: ["A", "B", "C", "D"],
      CSM: ["A", "B", "C"],
      AIML: ["A"]
    };

    const subjectNames = {};

    function slot(period, subject, faculty = "", type = "theory", hours = 1) {
      return { period, subject, faculty, type, hours };
    }

    function lab(period, subject, faculty = "", hours = 3) {
      return slot(period, subject, faculty, "lab", hours);
    }

    const baseTimetables = {
      "CSE-A": {
        Monday: [lab(1, "CNS LAB", "Dr.HJ"), slot(4, "CC", "Dr.RJ"), slot(5, "SPPM", "GR"), slot(6, "RS&GIS", "MSK")],
        Tuesday: [slot(1, "CD", "RSR"), slot(2, "CC", "Dr.RJ"), slot(3, "SPPM", "GR"), slot(4, "CNS", "Dr.HJ"), slot(5, "RS&GIS", "MSK"), slot(6, "CD", "RSR")],
        Wednesday: [slot(1, "CNS", "Dr.HJ"), slot(2, "SPPM", "GR"), slot(3, "CC", "Dr.RJ"), slot(4, "CNS", "Dr.HJ"), slot(5, "CD", "RSR"), slot(6, "RS&GIS", "MSK")],
        Thursday: [lab(1, "PS-I LAB", "GSN"), slot(4, "RS&GIS", "MRK"), slot(5, "SL", "Dr.KSK"), slot(6, "DL", "GP")],
        Friday: [slot(1, "RS&GIS", "MSK"), slot(2, "CC", "Dr.RJ"), slot(3, "SPPM", "GR"), slot(4, "CD", "RSR"), slot(5, "RS&GIS", "MSK"), slot(6, "CNS", "Dr.HJ")],
        Saturday: [lab(1, "PS-I LAB", "CTK"), lab(4, "PS-I LAB", "PSV")]
      },
      "CSE-B": {
        Monday: [slot(1, "CC", "ES"), slot(2, "CNS", "MB"), slot(3, "SPPM", "KK"), slot(4, "RS&GIS", "MGP"), slot(5, "CD", "Dr.GSL"), slot(6, "CC", "ES")],
        Tuesday: [slot(1, "CNS", "MB"), slot(2, "CC", "ES"), slot(3, "RS&GIS", "MGP"), lab(4, "PS-I LAB", "MB")],
        Wednesday: [slot(1, "RS&GIS", "MGP"), slot(2, "CD", "Dr.GSL"), slot(3, "CC", "ES"), slot(4, "CC", "KSV"), slot(5, "RS&GIS", "MSG"), slot(6, "SPPM", "GR")],
        Thursday: [lab(1, "CD LAB", "Dr.GSL"), slot(4, "CD", "Dr.GSL"), slot(5, "SPPM", "KK"), slot(6, "CC", "ES")],
        Friday: [lab(1, "PS-I LAB", "RST"), slot(4, "SPPM", "KK"), slot(5, "CNS", "MB"), slot(6, "RS&GIS", "MGP")],
        Saturday: [slot(1, "CD", "Dr.GSL"), slot(2, "SPPM", "KK"), slot(3, "RS&GIS", "MGP"), slot(4, "CC", "KSV"), slot(5, "CNS", "ESB"), slot(6, "RS&GIS", "MSG")]
      },
      "CSE-C": {
        Monday: [lab(1, "PS-I LAB", "BJ"), slot(4, "CD", "Dr.AM"), slot(5, "CC", "KSV"), slot(6, "CNS", "ESB")],
        Tuesday: [slot(1, "SPPM", "GR"), slot(2, "CC", "KSV"), slot(3, "CNS", "ESB"), lab(4, "PS-I LAB", "MB")],
        Wednesday: [lab(1, "CD LAB", "Dr.AM"), slot(4, "RS&GIS", "GR"), slot(5, "CC", "ES"), slot(6, "SPPM", "KK")],
        Thursday: [slot(1, "CD", "Dr.AM"), slot(2, "CC", "KSV"), slot(3, "SPPM", "GR"), lab(4, "CNS LAB", "ESB")],
        Friday: [slot(1, "SPPM", "GR"), slot(2, "CD", "Dr.AM"), slot(3, "RS&GIS", "MSG"), slot(4, "CC", "ES"), slot(5, "CNS", "RV"), slot(6, "RS&GIS", "GR")],
        Saturday: [slot(1, "RS&GIS", "MSG"), slot(2, "CD", "Dr.AM"), slot(3, "SPPM", "GR"), slot(4, "CD", "RSR"), slot(5, "RS&GIS", "GR"), slot(6, "CNS", "RV")]
      },
      "CSE-D": {
        Monday: [slot(1, "CD", "RSR"), slot(2, "RS&GIS", "GR"), slot(3, "CC", "ES"), lab(4, "CD LAB", "RSR")],
        Tuesday: [lab(1, "CNS LAB", "RV"), slot(4, "CD", "RSR"), slot(5, "SPPM", "KK"), slot(6, "CC", "ES")],
        Wednesday: [slot(1, "SPPM", "KK"), slot(2, "CD", "RSR"), slot(3, "CNS", "RV"), slot(4, "DL", "GP"), slot(5, "SL", "Dr.KSK"), slot(6, "PPLE", "TK")],
        Thursday: [slot(1, "CC", "ES"), slot(2, "CNS", "RV"), slot(3, "SPPM", "KK"), slot(4, "CC", "ES"), slot(5, "CNS", "RV"), slot(6, "RS&GIS", "GR")],
        Friday: [slot(1, "RS&GIS", "GR"), slot(2, "CD", "RSR"), slot(3, "SPPM", "KK"), slot(4, "PPLE", "TK"), slot(5, "MC", "SB"), slot(6, "RS&GIS", "KB")],
        Saturday: [lab(1, "PS-I LAB", "DSK"), slot(4, "SL", "Dr.KSK"), slot(5, "PPLE", "TK"), slot(6, "MC", "MSP")]
      },
      "CSM-A": {
        Monday: [slot(1, "DL", "GP"), slot(2, "RS&GIS", "MRK"), slot(3, "NIC", "KP"), lab(4, "SL LAB", "Dr.KSK")],
        Tuesday: [slot(1, "RS&GIS", "MRK"), slot(2, "SL", "Dr.KSK"), slot(3, "DL", "GP"), slot(4, "PPLE", "TK"), slot(5, "MC", "MSP"), slot(6, "RS&GIS", "MRK")],
        Wednesday: [lab(1, "PS-I LAB", "GSK"), slot(4, "MC", "SB"), slot(5, "DL", "GSN"), slot(6, "NIC", "PBK")],
        Thursday: [slot(1, "NIC", "KP"), slot(2, "DL", "GP"), slot(3, "MC", "MSP"), slot(4, "RS&GIS", "MRK"), slot(5, "SL", "Dr.KSK"), slot(6, "DL", "GP")],
        Friday: [slot(1, "PPLE", "TK"), slot(2, "MC", "MSP"), slot(3, "NIC", "KP"), slot(4, "PPLE", "TK"), slot(5, "MC", "SB"), slot(6, "RS&GIS", "KB")],
        Saturday: [slot(1, "MC", "MSP"), slot(2, "NIC", "KP"), slot(3, "RS&GIS", "MRK"), slot(4, "SL", "Dr.KSK"), slot(5, "PPLE", "TK"), slot(6, "MC", "MSP")]
      },
      "CSM-B": {
        Monday: [slot(1, "DL", "GSN"), slot(2, "MC", "SB"), slot(3, "NIC", "PBK"), slot(4, "PPLE", "TK"), slot(5, "RS&GIS", "KB"), slot(6, "DL", "GSN")],
        Tuesday: [slot(1, "NIC", "PBK"), slot(2, "SL", "TSK"), slot(3, "DL", "GSN"), lab(4, "PS-I LAB", "ARS")],
        Wednesday: [slot(1, "MC", "SB"), slot(2, "RS&GIS", "KB"), slot(3, "PPLE", "TK"), slot(4, "SL", "TSK"), slot(5, "DL", "GSN"), slot(6, "MC", "SB")],
        Thursday: [lab(1, "SL LAB", "TSK"), slot(4, "MC", "SB"), slot(5, "RS&GIS", "KB"), slot(6, "NIC", "PBK")],
        Friday: [slot(1, "RS&GIS", "KB"), slot(2, "DL", "GSN"), slot(3, "SL", "TSK"), slot(4, "MC", "GSK"), slot(5, "RS&GIS", "Dr.RG"), slot(6, "SL", "Dr.KSK")],
        Saturday: [slot(1, "PPLE", "TK"), slot(2, "SL", "TSK"), slot(3, "NIC", "PBK"), lab(4, "PS-I LAB", "KP")]
      },
      "CSM-C": {
        Monday: [lab(1, "PS-I LAB", "Dr.PJ"), slot(4, "MC", "GSK"), slot(5, "DL", "ARS"), slot(6, "NIC", "PBK")],
        Tuesday: [slot(1, "MC", "GSK"), slot(2, "PPLE", "TK"), slot(3, "DL", "ARS"), slot(4, "NIC", "PBK"), slot(5, "RS&GIS", "Dr.RG"), slot(6, "MC", "GSK")],
        Wednesday: [slot(1, "PPLE", "TK"), slot(2, "SL", "Dr.KSK"), slot(3, "NIC", "PBK"), lab(4, "PS-I LAB", "MSP")],
        Thursday: [slot(1, "RS&GIS", "Dr.RG"), slot(2, "DL", "ARS"), slot(3, "SL", "Dr.KSK"), slot(4, "MC", "SB"), slot(5, "RS&GIS", "KB"), slot(6, "NIC", "PBK")],
        Friday: [lab(1, "SL LAB", "Dr.KSK"), slot(4, "PPLE", "TK"), slot(5, "MC", "SB"), slot(6, "RS&GIS", "KB")],
        Saturday: [slot(1, "DL", "ARS"), slot(2, "PPLE", "TK"), slot(3, "SL", "Dr.KSK"), slot(4, "RS&GIS", "Dr.RG"), slot(5, "NIC", "PBK"), slot(6, "DL", "ARS")]
      },
      "AIML-A": {
        Monday: [slot(1, "DL", "GSN"), slot(2, "MC", "SB"), slot(3, "NIC", "PBK"), slot(4, "PPLE", "TK"), slot(5, "RS&GIS", "KB"), slot(6, "DL", "GSN")],
        Tuesday: [slot(1, "NIC", "PBK"), slot(2, "SL", "TSK"), slot(3, "DL", "GSN"), lab(4, "PS-I LAB", "ARS")],
        Wednesday: [slot(1, "MC", "SB"), slot(2, "RS&GIS", "KB"), slot(3, "PPLE", "TK"), lab(4, "PS-I LAB", "MSP")],
        Thursday: [lab(1, "SL LAB", "TSK"), slot(4, "MC", "SB"), slot(5, "RS&GIS", "KB"), slot(6, "NIC", "PBK")],
        Friday: [slot(1, "RS&GIS", "KB"), slot(2, "DL", "GSN"), slot(3, "SL", "TSK"), slot(4, "PPLE", "TK"), slot(5, "MC", "SB"), slot(6, "RS&GIS", "KB")],
        Saturday: [slot(1, "PPLE", "TK"), slot(2, "SL", "TSK"), slot(3, "NIC", "PBK"), lab(4, "PS-I LAB", "KP")]
      }
    };
    const manuallyTypedTimetables = {
      "CSE-A": {
        Monday: [lab(1, "CNS LAB", "DR.HJ"), slot(4, "CC", "Dr.RJ"), slot(5, "SPPM", "GR"), slot(6, "RS&GIS", "MSK")],
        Tuesday: [slot(1, "CD", "RSR"), slot(2, "CC", "Dr.RJ"), slot(3, "SPPM", "GR"), slot(4, "CNS", "Dr.HJ"), slot(5, "RS&GIS", "MSK"), slot(6, "CD", "RSR")],
        Wednesday: [slot(1, "CNS", "Dr.HJ"), slot(2, "SPPM", "GR"), slot(3, "CC", "Dr.RJ"), lab(4, "CD LAB", "RSR")],
        Thursday: [lab(1, "PS-1 LAB", "GSN"), slot(4, "CNS", "Dr.HJ"), slot(5, "CD", "RSR"), slot(6, "RS&GIS", "MSK")],
        Friday: [slot(1, "RS&GIS", "MSK"), slot(2, "CC", "Dr.RJ"), slot(3, "SPPM", "GR"), slot(4, "CD", "RSR"), slot(5, "RS&GIS", "MSK"), slot(6, "CNS", "Dr.HJ")],
        Saturday: [lab(1, "PS-1 LAB", "CTK"), slot(4, "SPPM", "GR"), slot(5, "CC", "Dr.RJ"), slot(6, "CD", "RSR")]
      },
      "CSE-B": {
        Monday: [slot(1, "CC", "ES"), slot(2, "CNS", "MD"), slot(3, "SPPM", "KK"), slot(4, "RS&GIS", "MGP"), slot(5, "CD", "Dr.GSL"), slot(6, "CC", "ES")],
        Tuesday: [slot(1, "CNS", "MB"), slot(2, "CC", "ES"), slot(3, "RS&GIS", "MGP"), lab(4, "CNS LAB", "MB")],
        Wednesday: [slot(1, "RS&GIS", "MGP"), slot(2, "CD", "Dr.GSL"), slot(3, "CC", "ES"), slot(4, "SPPM", "KK"), slot(5, "CNS", "MB"), slot(6, "RS&GIS", "MGP")],
        Thursday: [lab(1, "CD LAB", "Dr.GSL"), slot(4, "CNS", "MB"), slot(5, "SPPM", "KK"), slot(6, "CD", "Dr.GSL")],
        Friday: [lab(1, "PS-1 LAB", "RST"), slot(4, "CD", "Dr.GSL"), slot(5, "SPPM", "KK"), slot(6, "CC", "ES")],
        Saturday: [slot(1, "CD", "Dr.GSL"), slot(2, "SPPM", "KK"), slot(3, "RS&GIS", "MGP"), lab(4, "PS-1 LAB", "PSV")]
      },
      "CSE-C": {
        Monday: [lab(1, "PS-1 LAB", "BJ"), slot(4, "CD", "Dr.AM"), slot(5, "CC", "KSV"), slot(6, "CNS", "ESB")],
        Tuesday: [slot(1, "SPPM", "GR"), slot(2, "CC", "KSV"), slot(3, "CNS", "ESB"), lab(4, "PS-1 LAB", "MB")],
        Wednesday: [lab(1, "CD LAB", "Dr.AM"), slot(4, "CC", "KSV"), slot(5, "RS&GIS", "MSG"), slot(6, "SPPM", "GR")],
        Thursday: [slot(1, "CD", "Dr.AM"), slot(2, "CC", "KSV"), slot(3, "SPPM", "GR"), slot(4, "CNS", "ESB"), slot(5, "RS&GIS", "MSG"), slot(6, "CD", "Dr.AM")],
        Friday: [slot(1, "SPPM", "GR"), slot(2, "CD", "Dr.AM"), slot(3, "RS&GIS", "MSG"), lab(4, "CNS LAB", "ESB")],
        Saturday: [slot(1, "RS&GIS", "MSG"), slot(2, "CD", "Dr.AM"), slot(3, "SPPM", "GR"), slot(4, "CC", "KSV"), slot(5, "CNS", "ESB"), slot(6, "RS&GIS", "MSG")]
      },
      "CSE-D": {
        Monday: [slot(1, "CD", "RSR"), slot(2, "RS&GIS", "GR"), slot(3, "CC", "ES"), lab(4, "CD LAB", "RSR")],
        Tuesday: [lab(1, "CNS LAB", "RB"), slot(4, "CD", "RSR"), slot(5, "SPPM", "KK"), slot(6, "CC", "ES")],
        Wednesday: [slot(1, "SPPM", "KK"), slot(2, "CD", "RSR"), slot(3, "CNS", "RV"), slot(4, "RS&GIS", "GR"), slot(5, "CC", "ES"), slot(6, "SPPM", "KK")],
        Thursday: [slot(1, "CC", "ES"), slot(2, "CNS", "RV"), slot(3, "SPPM", "KK"), lab(4, "PS-1 LAB", "PBK")],
        Friday: [slot(1, "RS&GIS", "GR"), slot(2, "CD", "RSR"), slot(3, "SPPM", "KK"), slot(4, "CC", "ES"), slot(5, "CNS", "RV"), slot(6, "RS&GIS", "GR")],
        Saturday: [lab(1, "PS-1 LAB", "DSK"), slot(4, "CD", "RSR"), slot(5, "RS&GIS", "GR"), slot(6, "CNS", "RV")]
      },
      "CSM-A": {
        Monday: [slot(1, "DL", "GP"), slot(2, "RS&GIS", "MRK"), slot(3, "NIC", "KP"), lab(4, "SL LAB", "Dr.KSK")],
        Tuesday: [slot(1, "RS&GIS", "MRK"), slot(2, "SL", "KSK"), slot(3, "DL", "GP"), slot(4, "PPLE", "PP"), slot(5, "MC", "MSP"), slot(6, "RS&GIS", "MRK")],
        Wednesday: [lab(1, "PS-1 LAB", "GSK"), slot(4, "DL", "GP"), slot(5, "SL", "KSK"), slot(6, "PPLE", "TK")],
        Thursday: [slot(1, "NIC", "KP"), slot(2, "DL", "GP"), slot(3, "MC", "MSP"), slot(4, "RS&GIS", "MRK"), slot(5, "SL", "Dr.KSK"), slot(6, "DL", "GP")],
        Friday: [slot(1, "PPLE", "TK"), slot(2, "MC", "MSP"), slot(3, "NIC", "KP"), lab(4, "PS-1 LAB", "SB")],
        Saturday: [slot(1, "MC", "MSP"), slot(2, "NIC", "KP"), slot(3, "RS&GIS", "MRK"), slot(4, "SL", "Dr.KSK"), slot(5, "PPLE", "TK"), slot(6, "MC", "MSP")]
      },
      "CSM-B": {
        Monday: [slot(1, "DL", "GSN"), slot(2, "MC", "SB"), slot(3, "NIC", "PBK"), slot(4, "PPLE", "TK"), slot(5, "RS&GIS", "KB"), slot(6, "DL", "GSN")],
        Tuesday: [slot(1, "NIC", "PBK"), slot(2, "SL", "TSK"), slot(3, "DL", "GSN"), lab(4, "PS-1 LAB", "ARS")],
        Wednesday: [slot(1, "MC", "SB"), slot(2, "RS&GIS", "KB"), slot(3, "PPLE", "TK"), slot(4, "SL", "TSK"), slot(5, "DL", "GSN"), slot(6, "MC", "SB")],
        Thursday: [lab(1, "SL LAB", "TSK"), slot(4, "MC", "SB"), slot(5, "RS&GIS", "KB"), slot(6, "NIC", "PBK")],
        Friday: [slot(1, "RS&GIS", "KB"), slot(2, "DL", "GSN"), slot(3, "SL", "TSK"), slot(4, "PPLE", "TK"), slot(5, "MC", "SB"), slot(6, "RS&GIS", "KB")],
        Saturday: [slot(1, "PPLE", "TK"), slot(2, "SL", "TSK"), slot(3, "NIC", "PBK"), lab(4, "PS-1 LAB", "KP")]
      },
      "CSM-C": {
        Monday: [lab(1, "PS-1 LAB", "DR.PP"), slot(4, "MC", "GSK"), slot(5, "DL", "ARS"), slot(6, "NIC", "PBK")],
        Tuesday: [slot(1, "MC", "GSK"), slot(2, "PPLE", "TK"), slot(3, "DL", "ARS"), slot(4, "NIC", "PBK"), slot(5, "RS&GIS", "Dr.RG"), slot(6, "MC", "GSK")],
        Wednesday: [slot(1, "PPLE", "TK"), slot(2, "SL", "Dr.KSK"), slot(3, "NIC", "PBK"), lab(4, "PS-1 LAB", "MSP")],
        Thursday: [slot(1, "RS&GIS", "Dr.RG"), slot(2, "DL", "ARS"), slot(3, "SL", "Dr.KSK"), slot(4, "PPLE", "TK"), slot(5, "MC", "GSK"), slot(6, "RS&GIS", "Dr.RG")],
        Friday: [lab(1, "SL LAB", "Dr.KSK"), slot(4, "MC", "GSK"), slot(5, "RS&GIS", "Dr.RG"), slot(6, "SL", "Dr.KSK")],
        Saturday: [slot(1, "DL", "ARS"), slot(2, "PPLE", "TK"), slot(3, "SL", "Dr.KSK"), slot(4, "RS&GIS", "Dr.RG"), slot(5, "NIC", "PBK"), slot(6, "DL", "ARS")]
      },
      "AIML-A": {
        Monday: [slot(1, "DL", "GSN"), slot(2, "MC", "SB"), slot(3, "NIC", "PBK"), slot(4, "PPLE", "TK"), slot(5, "RS&GIS", "KB"), slot(6, "DL", "GSN")],
        Tuesday: [slot(1, "NIC", "PBK"), slot(2, "SL", "TSK"), slot(3, "DL", "GSN"), lab(4, "PS-1 LAB", "ARS")],
        Wednesday: [slot(1, "MC", "SB"), slot(2, "RS&GIS", "KB"), slot(3, "PPLE", "TK"), slot(4, "SL", "TSK"), slot(5, "DL", "GSN"), slot(6, "MC", "SB")],
        Thursday: [lab(1, "SL LAB", "TSK"), slot(4, "MC", "SB"), slot(5, "RS&GIS", "KB"), slot(6, "NIC", "PBK")],
        Friday: [slot(1, "RS&GIS", "KB"), slot(2, "DL", "GSN"), slot(3, "SL", "TSK"), slot(4, "PPLE", "TK"), slot(5, "MC", "SB"), slot(6, "RS&GIS", "KB")],
        Saturday: [slot(1, "PPLE", "TK"), slot(2, "SL", "TSK"), slot(3, "NIC", "PBK"), lab(4, "PS-1 LAB", "KP")]
      }
    };
    Object.assign(baseTimetables, manuallyTypedTimetables);
    const baseTimetableVersion = "manual-typed-2026-04-27-v1";

    let users = readJson(userStoreKey, {});
    let currentHallticket = localStorage.getItem(activeUserKey) || "";
    let currentUser = currentHallticket ? users[currentHallticket] : null;
    let ownerUnlocked = false;

    const $ = (id) => document.getElementById(id);
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    function readJson(key, fallback) {
      try {
        return JSON.parse(localStorage.getItem(key)) || fallback;
      } catch {
        return fallback;
      }
    }

    function writeUsers() {
      localStorage.setItem(userStoreKey, JSON.stringify(users));
    }

    function makeStudent(name, hallticket, password, branch, section) {
      const key = `${branch}-${section}`;
      return {
        name,
        hallticket,
        password,
        year: "4th Year - 1st Semester",
        branch,
        section,
        timetable: structuredClone(baseTimetables[key] || {}),
        timetableVersion: baseTimetableVersion,
        days: {},
        manualSubjects: {}
      };
    }

    function updateSectionOptions(branchId, sectionId) {
      const branch = $(branchId).value;
      const sectionSelect = $(sectionId);
      sectionSelect.innerHTML = sectionMap[branch].map((section) => `<option>${section}</option>`).join("");
    }

    function timetableKey() {
      return `${currentUser.branch}-${currentUser.section}`;
    }

    function getTimetable() {
      if (!currentUser.timetable || currentUser.timetableVersion !== baseTimetableVersion) {
        currentUser.timetable = structuredClone(baseTimetables[timetableKey()] || {});
        currentUser.timetableVersion = baseTimetableVersion;
      }
      return currentUser.timetable;
    }

    function getDateDayName() {
      const date = new Date(`${$("classDate").value}T00:00:00`);
      return dayNames[date.getDay()];
    }

    function getVisibleSlots() {
      const day = getDateDayName();
      const dayType = $("dayType").value;
      if (day === "Sunday" || dayType === "holiday" || dayType === "mid") return [];
      let slots = (getTimetable()[day] || []).map((item) => ({ ...item }));
      return slots.sort((a, b) => Number(a.period) - Number(b.period));
    }

    function dateInRange(date, start, end) {
      return date >= start && date <= end;
    }

    function autoDayType(date) {
      if (dateInRange(date, summerStart, summerEnd)) return "holiday";
      return "working";
    }

    function moveDate(days) {
      const date = parseDateInput($("classDate").value);
      date.setDate(date.getDate() + days);
      $("classDate").value = formatInputDate(date);
      renderApp();
    }

    function percentage(attended, held) {
      return held ? Math.round((attended / held) * 1000) / 10 : 0;
    }

    function statusClass(value) {
      if (value >= 75) return "good";
      if (value >= 65) return "warn";
      return "bad";
    }

    function subjectLabel(code) {
      return subjectNames[code] || "";
    }

    function classMeta(slotItem, period) {
      const parts = [];
      if (period?.time) parts.push(period.time);
      if (subjectLabel(slotItem.subject)) parts.push(subjectLabel(slotItem.subject));
      if (slotItem.faculty) parts.push(`Faculty: ${slotItem.faculty}`);
      return parts.join(" / ");
    }

    function collectTotals(cutoffDate) {
      const totals = {};
      Object.entries(currentUser.days || {}).forEach(([date, day]) => {
        if (cutoffDate && date > cutoffDate) return;
        Object.values(day.entries || {}).forEach((entry) => {
          totals[entry.subject] ||= { held: 0, attended: 0, type: entry.type };
          totals[entry.subject].held += Number(entry.held || 0);
          totals[entry.subject].attended += Number(entry.attended || 0);
        });
      });
      return totals;
    }

    function renderLoginOrApp() {
      if (!currentUser) {
        $("loginView").classList.remove("hidden");
        $("appView").classList.add("hidden");
        updateSectionOptions("loginBranch", "loginSection");
        return;
      }
      $("loginView").classList.add("hidden");
      $("appView").classList.remove("hidden");
      renderApp();
    }

    function renderApp() {
      $("studentName").textContent = currentUser.name;
      $("studentHallticket").textContent = currentUser.hallticket;
      $("studentClass").textContent = `${currentUser.year} / ${currentUser.branch}-${currentUser.section}`;
      $("pageSubtitle").textContent = `${currentUser.name} / ${currentUser.hallticket} / ${currentUser.branch}-${currentUser.section}`;
      $("branchSelect").value = currentUser.branch;
      updateSectionOptions("branchSelect", "sectionSelect");
      $("sectionSelect").value = currentUser.section;
      $("dayName").textContent = getDateDayName();
      $("adminLocked").classList.toggle("hidden", ownerUnlocked);
      $("adminEditor").classList.toggle("hidden", !ownerUnlocked);
      $("ownerButton").textContent = ownerUnlocked ? "Lock timetable edit" : "Unlock timetable edit";
      $("labExamPart").disabled = $("dayType").value !== "labExam";
      renderClasses(false);
      renderDaySummary();
      renderSubjectPanel();
      renderHistory();
      saveCurrentUser();
    }

    function legacyRenderClasses(preserveSelection) {
      const date = $("classDate").value;
      const savedDay = currentUser.days?.[date] || {};
      if (!preserveSelection) {
        $("extraNote").value = savedDay.note || "";
        if (savedDay.type) {
          $("dayType").value = savedDay.type;
        } else {
          $("dayType").value = autoDayType(date);
        }
        if (savedDay.labExamPart) $("labExamPart").value = savedDay.labExamPart;
      }
      $("labExamPart").disabled = $("dayType").value !== "labExam";
      const slots = getVisibleSlots();

      const list = $("classList");
      if (!slots.length) {
        const dayType = $("dayType").value;
        const message = dayType === "holiday" ? "Holiday selected. No classes will be counted." :
          dayType === "mid" ? "Internal mid exam selected. No classes will be counted." :
          getDateDayName() === "Sunday" ? "Sunday has no timetable classes." :
          "No timetable slots found for this day.";
        list.innerHTML = `<div class="panel empty">${message}</div>`;
        return;
      }

      const entries = savedDay.entries || {};
      list.innerHTML = slots.map((slotItem, index) => {
        const key = entryKey(slotItem, index);
        const existing = entries[key];
        const period = periods.find((p) => p.n === Number(slotItem.period));
        const held = Number(slotItem.hours || 1);
        const attended = existing ? Number(existing.attended || 0) : held;
        const isLab = slotItem.type === "lab";
        return `
          <div class="class-card" data-slot="${key}">
            <div>
              <div class="class-title">
                <span class="chip">P${slotItem.period}</span>
                <strong>${escapeHtml(slotItem.subject)}</strong>
                <span class="chip">${isLab ? `${held} hr lab` : "class"}</span>
              </div>
              <p class="muted">${escapeHtml(classMeta(slotItem, period))}</p>
            </div>
            ${isLab ? `
              <div class="mark-row lab">
                <div class="lab-hours">
                  <span class="muted">Attended hours out of ${held}</span>
                  <input type="number" min="0" max="${held}" value="${attended}" data-lab-hours="${key}">
                </div>
              </div>
            ` : `
              <div class="mark-row">
                <button class="good ${attended ? "active" : ""}" data-mark="${key}" data-value="1">✓ Present</button>
                <button class="bad ${attended ? "" : "active"}" data-mark="${key}" data-value="0">✕ Absent</button>
              </div>
            `}
          </div>
        `;
      }).join("");

      list.querySelectorAll("[data-mark]").forEach((button) => {
        button.addEventListener("click", () => {
          const card = button.closest("[data-slot]");
          card.querySelectorAll("[data-mark]").forEach((item) => item.classList.remove("active"));
          button.classList.add("active");
        });
      });
    }

    function renderClasses(preserveSelection) {
      const date = $("classDate").value;
      const savedDay = currentUser.days?.[date] || {};
      if (!preserveSelection) {
        $("extraNote").value = savedDay.note || "";
        $("dayType").value = savedDay.type || autoDayType(date);
        if (savedDay.labExamPart) $("labExamPart").value = savedDay.labExamPart;
      }
      $("labExamPart").disabled = $("dayType").value !== "labExam";
      const slots = getVisibleSlots();
      const list = $("classList");

      if (!slots.length) {
        const dayType = $("dayType").value;
        const message = dayType === "holiday" ? "Holiday selected. No classes will be counted." :
          dayType === "mid" ? "Internal mid exam selected. No classes will be counted." :
          getDateDayName() === "Sunday" ? "Sunday has no timetable classes." :
          "No timetable slots found for this day.";
        list.innerHTML = `<div class="panel empty">${message}</div>`;
        renderLiveDaySummary();
        return;
      }

      const entries = savedDay.entries || {};
      list.innerHTML = slots.map((slotItem, index) => {
        const key = entryKey(slotItem, index);
        const existing = entries[key];
        const period = periods.find((p) => p.n === Number(slotItem.period));
        const held = Number(slotItem.hours || 1);
        const attended = existing ? Number(existing.attended || 0) : held;
        const isLab = slotItem.type === "lab";
        return `
          <div class="class-card" data-slot-index="${index}">
            <div>
              <div class="class-title">
                <span class="chip">P${slotItem.period}</span>
                <strong>${escapeHtml(slotItem.subject)}</strong>
                <span class="chip">${isLab ? `${held} hr lab` : "class"}</span>
              </div>
              <p class="muted">${escapeHtml(classMeta(slotItem, period))}</p>
            </div>
            ${isLab ? `
              <div class="mark-row lab">
                <div class="lab-hours">
                  <span class="muted">Attended hours out of ${held}</span>
                  <input type="number" min="0" max="${held}" value="${attended}" data-lab-hours-index="${index}">
                </div>
              </div>
            ` : `
              <div class="mark-row">
                <button class="good ${attended ? "active" : ""}" data-mark-index="${index}" data-value="1">Present</button>
                <button class="bad ${attended ? "" : "active"}" data-mark-index="${index}" data-value="0">Absent</button>
              </div>
            `}
          </div>
        `;
      }).join("");

      list.querySelectorAll("[data-mark-index]").forEach((button) => {
        button.addEventListener("click", () => {
          const card = button.closest("[data-slot-index]");
          card.querySelectorAll("[data-mark-index]").forEach((item) => item.classList.remove("active"));
          button.classList.add("active");
          renderLiveDaySummary();
        });
      });
      list.querySelectorAll("[data-lab-hours-index]").forEach((input) => {
        input.addEventListener("input", renderLiveDaySummary);
      });
      renderLiveDaySummary();
    }

    function getLiveDayEntries() {
      return getVisibleSlots().map((slotItem, index) => {
        const held = Number(slotItem.hours || 1);
        let attended = 0;
        if (slotItem.type === "lab") {
          attended = Math.max(0, Math.min(held, Number(document.querySelector(`[data-lab-hours-index="${index}"]`)?.value || 0)));
        } else {
          attended = Number(document.querySelector(`[data-mark-index="${index}"].active`)?.dataset.value || 0);
        }
        return {
          subject: slotItem.subject,
          faculty: slotItem.faculty,
          type: slotItem.type,
          held,
          attended,
          period: slotItem.period
        };
      });
    }

    function renderLiveDaySummary() {
      renderDaySummary(getLiveDayEntries(), true);
    }

    function renderDaySummary(entriesOverride, isLive = false) {
      const date = $("classDate").value;
      const savedDay = currentUser.days?.[date];
      const entries = entriesOverride || Object.values(savedDay?.entries || {});
      const held = entries.reduce((sum, entry) => sum + Number(entry.held || 0), 0);
      const attended = entries.reduce((sum, entry) => sum + Number(entry.attended || 0), 0);
      const panel = $("daySummaryPanel");
      const title = isLive ? "Current marks before saving" : "Saved calculation";
      if (!held) {
        panel.innerHTML = `<div class="empty">${savedDay ? `${dayLabel(savedDay.type)}: no classes counted.` : "No saved calculation for this date yet."}</div>`;
        return;
      }
      const subjectBits = entries.map((entry) => {
        const mark = entry.type === "lab" ? `${entry.attended}/${entry.held} hrs` : Number(entry.attended) ? "Present" : "Absent";
        return `<span class="chip">P${entry.period} ${escapeHtml(entry.subject)}: ${mark}</span>`;
      }).join("");
      panel.innerHTML = `
        <div class="panel-pad">
          <div class="history-line">
            <strong>${title}: ${attended}/${held} hours</strong>
            <span class="percent-pill ${statusClass(percentage(attended, held))}">${percentage(attended, held)}%</span>
          </div>
          <div class="mini-results" style="margin-top:10px">${subjectBits}</div>
        </div>
      `;
    }

    function renderHistory() {
      const dates = Object.keys(currentUser.days || {}).sort().reverse();
      const panel = $("historyPanel");
      if (!dates.length) {
        panel.innerHTML = `<div class="empty">No saved days yet. Save any past or current date and it will appear here.</div>`;
        return;
      }
      panel.innerHTML = `
        <div class="history-list">
          ${dates.map((date) => {
            const day = currentUser.days[date];
            const entries = Object.values(day.entries || {});
            const held = entries.reduce((sum, entry) => sum + Number(entry.held || 0), 0);
            const attended = entries.reduce((sum, entry) => sum + Number(entry.attended || 0), 0);
            const labels = entries.slice(0, 4).map((entry) => {
              const value = entry.type === "lab" ? `${entry.attended}/${entry.held}` : Number(entry.attended) ? "✓" : "✕";
              return `<span class="chip">${escapeHtml(entry.subject)} ${value}</span>`;
            }).join("");
            const more = entries.length > 4 ? `<span class="chip">+${entries.length - 4}</span>` : "";
            return `
              <button class="history-item ${date === $("classDate").value ? "active" : ""}" data-history-date="${date}">
                <span class="history-line">
                  <strong>${formatDate(date)}</strong>
                  <span class="percent-pill ${statusClass(percentage(attended, held))}">${held ? `${attended}/${held}` : day.type}</span>
                </span>
                <span class="muted">${dayLabel(day.type)}${day.note ? " / " + escapeHtml(day.note) : ""}</span>
                <span class="mini-results">${labels || `<span class="chip">No classes counted</span>`}${more}</span>
              </button>
            `;
          }).join("")}
        </div>
      `;
      panel.querySelectorAll("[data-history-date]").forEach((button) => {
        button.addEventListener("click", () => {
          $("classDate").value = button.dataset.historyDate;
          renderApp();
        });
      });
    }

    function renderSubjectPanel() {
      const cutoffDate = $("classDate").value || formatInputDate(new Date());
      const totals = collectTotals(cutoffDate);
      const rows = Object.entries(totals).sort(([a], [b]) => a.localeCompare(b));
      const held = rows.reduce((sum, [, item]) => sum + item.held, 0);
      const attended = rows.reduce((sum, [, item]) => sum + item.attended, 0);
      const overall = percentage(attended, held);
      $("overallPercent").textContent = `${overall}%`;
      $("attendedUnits").textContent = attended;
      $("heldUnits").textContent = held;
      $("riskSubjects").textContent = rows.filter(([, item]) => item.held > 0 && percentage(item.attended, item.held) < 75).length;

      if (!rows.length) {
        $("subjectPanel").innerHTML = `<div class="empty">Save attendance from 27 Apr 2026 onward to start cumulative percentages.</div>`;
        return;
      }

      $("subjectPanel").innerHTML = `
        <div class="panel-pad">
          <strong>Cumulative from 27 Apr 2026 to ${escapeHtml(formatDate(cutoffDate))}</strong>
          <p class="muted">Subject-wise held hours, attended hours, and percentage.</p>
        </div>
        <table>
          <thead>
            <tr><th>Subject</th><th>Attended / Held</th><th>Percentage</th><th>Need for 75%</th></tr>
          </thead>
          <tbody>
            ${rows.map(([code, item]) => {
              const value = percentage(item.attended, item.held);
              const need = value >= 75 ? 0 : Math.ceil((0.75 * item.held - item.attended) / 0.25);
              return `
                <tr>
                  <td><strong>${escapeHtml(code)}</strong>${subjectLabel(code) ? `<br><span class="muted">${escapeHtml(subjectLabel(code))}</span>` : ""}</td>
                  <td>${item.attended} / ${item.held}</td>
                  <td>
                    <span class="percent-pill ${statusClass(value)}">${value}%</span>
                    <div class="bar" style="--w:${Math.min(value, 100)}%; --c:${barColor(value)}"><i></i></div>
                  </td>
                  <td>${need ? `${need} hour${need === 1 ? "" : "s"}` : "OK"}</td>
                </tr>
              `;
            }).join("")}
          </tbody>
        </table>
      `;
    }

    function entryKey(slotItem, index) {
      return `${slotItem.period}-${slotItem.subject}-${index}`;
    }

    function legacySaveDay() {
      const slots = getVisibleSlots();
      const entries = {};
      slots.forEach((slotItem, index) => {
        const key = entryKey(slotItem, index);
        const held = Number(slotItem.hours || 1);
        let attended = 0;
        if (slotItem.type === "lab") {
          attended = Math.max(0, Math.min(held, Number(document.querySelector(`[data-lab-hours="${cssEscape(key)}"]`)?.value || 0)));
        } else {
          attended = Number(document.querySelector(`[data-mark="${cssEscape(key)}"].active`)?.dataset.value || 0);
        }
        entries[key] = {
          subject: slotItem.subject,
          faculty: slotItem.faculty,
          type: slotItem.type,
          held,
          attended,
          period: slotItem.period
        };
      });
      currentUser.days[$("classDate").value] = {
        type: $("dayType").value,
        labExamPart: $("labExamPart").value,
        note: $("extraNote").value.trim(),
        entries
      };
      saveCurrentUser();
      renderApp();
    }

    function saveDay() {
      const slots = getVisibleSlots();
      const entries = {};
      slots.forEach((slotItem, index) => {
        const key = entryKey(slotItem, index);
        const held = Number(slotItem.hours || 1);
        let attended = 0;
        if (slotItem.type === "lab") {
          attended = Math.max(0, Math.min(held, Number(document.querySelector(`[data-lab-hours-index="${index}"]`)?.value || 0)));
        } else {
          attended = Number(document.querySelector(`[data-mark-index="${index}"].active`)?.dataset.value || 0);
        }
        entries[key] = {
          subject: slotItem.subject,
          faculty: slotItem.faculty,
          type: slotItem.type,
          held,
          attended,
          period: slotItem.period
        };
      });
      currentUser.days[$("classDate").value] = {
        type: $("dayType").value,
        labExamPart: $("labExamPart").value,
        note: $("extraNote").value.trim(),
        entries
      };
      saveCurrentUser();
      renderApp();
    }

    function saveSlot() {
      const day = $("editDay").value;
      const period = Number($("editPeriod").value);
      const subject = $("editSubject").value.trim().toUpperCase();
      const faculty = $("editFaculty").value.trim();
      const type = $("editType").value;
      const hours = Math.max(1, Math.min(3, Number($("editHours").value || 1)));
      if (!subject) {
        $("editSubject").focus();
        return;
      }
      const timetable = getTimetable();
      timetable[day] ||= [];
      timetable[day] = timetable[day].filter((item) => Number(item.period) !== period);
      timetable[day].push(slot(period, subject, faculty, type, hours));
      timetable[day].sort((a, b) => Number(a.period) - Number(b.period));
      saveCurrentUser();
      renderApp();
    }

    function saveCurrentUser() {
      users[currentUser.hallticket] = currentUser;
      writeUsers();
    }

    function setToday() {
      $("classDate").value = formatInputDate(new Date());
    }

    function parseDateInput(value) {
      const [year, month, day] = value.split("-").map(Number);
      return new Date(year, month - 1, day);
    }

    function formatInputDate(date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    }

    function formatDate(dateText) {
      const date = new Date(`${dateText}T00:00:00`);
      return date.toLocaleDateString("en-IN", { weekday: "short", day: "2-digit", month: "short", year: "numeric" });
    }

    function dayLabel(type) {
      if (type === "holiday") return "Holiday";
      if (type === "mid") return "Internal mid exam";
      if (type === "labExam") return "Lab exam day";
      return "Working day";
    }

    function barColor(value) {
      if (value >= 75) return "var(--good)";
      if (value >= 65) return "var(--warn)";
      return "var(--bad)";
    }

    function cssEscape(value) {
      return globalThis.CSS?.escape ? CSS.escape(value) : String(value).replaceAll('"', '\\"');
    }

    function escapeHtml(value) {
      return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
    }

    $("loginBranch").addEventListener("change", () => updateSectionOptions("loginBranch", "loginSection"));
    $("branchSelect").addEventListener("change", () => {
      currentUser.branch = $("branchSelect").value;
      updateSectionOptions("branchSelect", "sectionSelect");
      currentUser.section = $("sectionSelect").value;
      currentUser.timetable = structuredClone(baseTimetables[timetableKey()] || {});
      currentUser.timetableVersion = baseTimetableVersion;
      renderApp();
    });
    $("sectionSelect").addEventListener("change", () => {
      currentUser.section = $("sectionSelect").value;
      currentUser.timetable = structuredClone(baseTimetables[timetableKey()] || {});
      currentUser.timetableVersion = baseTimetableVersion;
      renderApp();
    });

    $("loginButton").addEventListener("click", () => {
      const name = $("loginName").value.trim();
      const hallticket = $("loginHallticket").value.trim().toUpperCase();
      const password = $("loginPassword").value.trim();
      if (!hallticket || !password) {
        $("loginHallticket").focus();
        return;
      }
      if (users[hallticket]) {
        if (users[hallticket].password !== password) {
          alert("Wrong password for this hall ticket number.");
          return;
        }
        currentUser = users[hallticket];
      } else {
        currentUser = makeStudent(name || "Student", hallticket, password, $("loginBranch").value, $("loginSection").value);
      }
      currentHallticket = hallticket;
      localStorage.setItem(activeUserKey, hallticket);
      saveCurrentUser();
      renderLoginOrApp();
    });

    $("logoutButton").addEventListener("click", () => {
      localStorage.removeItem(activeUserKey);
      currentHallticket = "";
      currentUser = null;
      ownerUnlocked = false;
      renderLoginOrApp();
    });

    $("ownerButton").addEventListener("click", () => {
      if (ownerUnlocked) {
        ownerUnlocked = false;
      } else {
        const existingPin = localStorage.getItem(ownerPinKey) || "1234";
        ownerUnlocked = $("ownerPin").value === existingPin;
        if (!ownerUnlocked) alert("Owner PIN is incorrect. Default PIN is 1234 unless you changed it.");
      }
      $("ownerPin").value = "";
      renderApp();
    });

    $("todayButton").addEventListener("click", () => {
      setToday();
      renderApp();
    });
    $("prevDayButton").addEventListener("click", () => moveDate(-1));
    $("nextDayButton").addEventListener("click", () => moveDate(1));
    $("startDateButton").addEventListener("click", () => {
      $("classDate").value = semesterStart;
      renderApp();
    });
    $("restartDateButton").addEventListener("click", () => {
      $("classDate").value = classworkRestart;
      renderApp();
    });
    $("classDate").addEventListener("change", renderApp);
    $("dayType").addEventListener("change", () => renderClasses(true));
    $("labExamPart").addEventListener("change", () => renderClasses(true));
    $("saveDayButton").addEventListener("click", saveDay);
    $("saveSlotButton").addEventListener("click", saveSlot);
    $("markAllButton").addEventListener("click", () => {
      document.querySelectorAll("[data-mark-index][data-value='1']").forEach((button) => button.click());
      document.querySelectorAll("[data-lab-hours-index]").forEach((input) => input.value = input.max);
      renderLiveDaySummary();
    });
    $("markAbsentButton").addEventListener("click", () => {
      document.querySelectorAll("[data-mark-index][data-value='0']").forEach((button) => button.click());
      document.querySelectorAll("[data-lab-hours-index]").forEach((input) => input.value = 0);
      renderLiveDaySummary();
    });

    $("backupButton").addEventListener("click", () => {
      const blob = new Blob([JSON.stringify({ users, active: currentHallticket }, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "jits-attendance-backup.json";
      link.click();
      URL.revokeObjectURL(url);
    });

    $("restoreButton").addEventListener("click", () => $("restoreFile").click());
    $("restoreFile").addEventListener("change", async (event) => {
      const file = event.target.files[0];
      if (!file) return;
      const data = JSON.parse(await file.text());
      users = data.users || {};
      writeUsers();
      currentHallticket = data.active || "";
      currentUser = users[currentHallticket] || null;
      if (currentHallticket) localStorage.setItem(activeUserKey, currentHallticket);
      renderLoginOrApp();
    });

    setToday();
    updateSectionOptions("loginBranch", "loginSection");
    renderLoginOrApp();
