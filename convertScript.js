const rawPatientData = {
  Address: "72-40 Juno St, Flushing, NY 11375",
  Allergies: "No Known Allergies",
  "Date of Birth": "06/26/1989",
  Gender: "F",
  Name: "Erica Abraham",
  Phone: "(914) 589 - 3822",
};

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

console.log(convertToCsv([rawPatientData]));
