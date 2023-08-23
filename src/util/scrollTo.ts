const scrollTo = (
  scrollToHere: any,
  headerOffset = 100,
  intervelTime = 100
) => {
  let timer;
  clearTimeout(timer);
  timer = setTimeout(() => {
    let element;
    element =
      typeof scrollToHere === "string"
        ? document.querySelector(scrollToHere)
        : scrollToHere;
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  }, intervelTime);
};

export default scrollTo;
