const urlParams = new URLSearchParams(window.location.search);
const tab = urlParams.get('tab');

if (tab) {
  const tabElement = document.querySelector(`button[data-bs-target="#${tab}"]`);

  if (tabElement) {
    const bsTab = new bootstrap.Tab(tabElement);
    bsTab.show();
    window.history.replaceState({}, '', window.location.pathname);
  }
}