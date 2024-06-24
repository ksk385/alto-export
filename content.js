window.navigation.addEventListener("navigate", (event) => {
  const url = event.destination.url;
  console.log("location changed!");
  if (url.match("central-fill/[0-9]+")) {
    console.log("Patient page found!");
    let foundPatientCard = false;
    // Select the node that will be observed for mutations
    const targetNode = document.getElementById("__next");

    // Options for the observer (which mutations to observe)
    const config = { childList: true, subtree: true };

    // Callback function to execute when mutations are observed
    const callback = (mutationList, observer) => {
      for (const mutation of mutationList) {
        if (mutation.type === "childList" && !foundPatientCard) {
          console.log("A child node has been added or removed.");
          const cardHeaders = document.querySelectorAll(".card-header");
          if (cardHeaders.length > 0) {
            console.log("Card headers found:", cardHeaders);
            const targetHeader = Array.from(cardHeaders).find((header) =>
              header.textContent.includes("Patient")
            );
            console.log("Target header found:", targetHeader);

            if (targetHeader) {
              foundPatientCard = true;
              const button = document.createElement("button");
              button.textContent = "Extract";
              button.style.padding = "5px";
              button.onclick = function () {
                alert("Button clicked!");
              };

              targetHeader.appendChild(button);

              // Stop observing the target node
              observer.disconnect();
            } else {
              console.log(
                'No card-header with text "Patient" found on this page.'
              );
            }
          }
        }
      }
    };

    // Create an observer instance linked to the callback function
    const observer = new MutationObserver(callback);

    // Start observing the target node for configured mutations
    observer.observe(targetNode, config);
  }
});
