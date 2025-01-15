export const hideDefaultMarkerButton = () => {
  const markerBtns = [
    ...document.querySelectorAll('.marker-app #feedback-button'),
  ];
  markerBtns.forEach((markerBtn) => (markerBtn.style.display = 'none'));
};
