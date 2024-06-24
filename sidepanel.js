chrome.storage.local.get("patients", function (result) {
  const patients = result.patients || [];
  const patientList = document.getElementById("patient-list");
  patients.forEach((patient) => {
    const patientElement = document.createElement("li");
    patientElement.textContent = JSON.stringify(patient);
    patientList.appendChild(patientElement);
  });
});
