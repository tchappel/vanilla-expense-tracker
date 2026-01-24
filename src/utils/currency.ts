export default {
  format: new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format,
};
