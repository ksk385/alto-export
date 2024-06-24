chrome.storage.local.get("patients", function (result) {
  const patients = result.patients || [];
  const patientList = document.getElementById("patient-list");
  patients.forEach((patient) => {
    const patientElement = document.createElement("li");
    patientElement.textContent = JSON.stringify(patient);
    patientList.appendChild(patientElement);
  });
});

// Listen for messages in the popup
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.type === "EXTRACT_PATIENT") {
    console.log("Data received in panel:", message.payload);
    const patient = message.payload;
    // Do something with the data in your popup's UI
    const patientList = document.getElementById("patient-list");
    const patientElement = document.createElement("li");
    patientElement.textContent = JSON.stringify(patient);
    patientList.appendChild(patientElement);
  }
});

function convertToCsv(patients) {
  const headers = [
    "Last name",
    "First name",
    "Birthdate",
    "Address 1",
    "City",
    "State",
    "Zip",
    "Phone",
  ];
  const rows = patients.map((patient) => {
    const patientFirstName = patient.Name.substring(
      0,
      patient.Name.lastIndexOf(" ")
    ).trim();

    const patientLastName = patient.Name.substring(
      patient.Name.lastIndexOf(" ")
    ).trim();

    const patientBirthdate = patient["Date of Birth"];

    const patientAddressParts = patient.Address.split(",");
    const patientAddress1 = patientAddressParts[0];
    const patientZipcode =
      patientAddressParts[patientAddressParts.length - 1].split(" ")[2];
    const patientState =
      patientAddressParts[patientAddressParts.length - 1].split(" ")[1];
    const patientCity =
      patientAddressParts[patientAddressParts.length - 2].trim();
    const patientPhone = patient.Phone;

    return `${patientLastName},${patientFirstName},${patientBirthdate},${patientAddress1},${patientCity},${patientState},${patientZipcode},${patientPhone}`;
  });
  return `${headers.join(",")}\n${rows.join("\n")}`;
}

function exportData() {
  console.log("Exporting data...");
  chrome.storage.local.get("patients", function (result) {
    const patients = result.patients || [];
    const data = new Blob([convertToCsv(patients)], {
      type: "application/csv;charset=utf-8",
    });
    const url = URL.createObjectURL(data);

    const a = document.createElement("a");
    a.href = url;
    a.download = "patients.csv";
    a.click();
  });
}

document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("export-button")
    .addEventListener("click", function () {
      console.log("Button Clicked!");
      exportData();
    });
});
