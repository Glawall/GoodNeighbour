export const fetchAndSetHelpTypes = async (sendRequest, setHelpTypes) => {
  try {
    const { helpTypes } = await sendRequest("help-types", "GET");
    setHelpTypes(helpTypes);
  } catch (err) {
    console.error("Error fetching helpTypes:", err);
  }
};
