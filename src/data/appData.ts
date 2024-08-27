export const userAccounts = [
  {
    email: "doctor1@gmail.com",
    password: "doctor1",
    role: "doctor",
  },
  {
    email: "nurse1@gmail.com",
    password: "nurse1",
    role: "nurse",
  },
  {
    email: "patient1@gmail.com",
    password: "patient1",
    role: "patient",
  },
];

export const patientData = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    age: 35,
    phone: "0987654321",
    filterInfo: {
      id: 1,
      used: 5,
      isFinished: false,
    },
    schedule: [
      {
        time: "08:00",
        dayofWeek: "monday",
      },
      {
        time: "09:00",
        dayofWeek: "friday",
      },
      {
        time: "08:00",
        dayofWeek: "sunday",
      },
    ],
  },
  {
    id: 2,
    name: "Trần Thị B",
    age: 28,
    phone: "0912345678",
    filterInfo: {
      id: 2,
      used: 2,
      isFinished: false,
    },
    schedule: [
      {
        time: "12:00",
        dayofWeek: "monday",
      },
      {
        time: "14:00",
        dayofWeek: "wednesday",
      },
      {
        time: "15:00",
        dayofWeek: "saturday",
      },
    ],
  },
  {
    id: 3,
    name: "Lê Văn C",
    age: 40,
    phone: "0908765432",
    filterInfo: {
      id: 3,
      used: 4,
      isFinished: false,
    },
    schedule: [
      {
        time: "08:00",
        dayofWeek: "monday",
      },
      {
        time: "09:00",
        dayofWeek: "friday",
      },
      {
        time: "08:00",
        dayofWeek: "sunday",
      },
    ],
  },
  {
    id: 4,
    name: "Phạm Thị D",
    age: 25,
    phone: "0934567890",
    filterInfo: {
      id: 4,
      used: 1,
      isFinished: false,
    },
    schedule: [
      {
        time: "08:00",
        dayofWeek: "monday",
      },
      {
        time: "09:00",
        dayofWeek: "friday",
      },
      {
        time: "08:00",
        dayofWeek: "sunday",
      },
    ],
  },
  {
    id: 5,
    name: "Hoàng Văn E",
    age: 50,
    phone: "0923456789",
    filterInfo: {
      id: 5,
      used: 3,
      isFinished: false,
    },
    schedule: [
      {
        time: "08:00",
        dayofWeek: "monday",
      },
      {
        time: "09:00",
        dayofWeek: "friday",
      },
      {
        time: "08:00",
        dayofWeek: "sunday",
      },
    ],
  },
];

export const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
