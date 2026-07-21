// Demo ke liye fake AI replies — real project me isko hata kar
// Gemini API se live response fetch karoge
const CANNED_REPLIES = [
  "Great question! useEffect is used in React to handle side effects — like data fetching, subscriptions, or manually updating the DOM. It runs after every render, unless you control it with a dependency array.",
  "Breaking things into components makes your code reusable and easier to maintain. Each component handles one job well.",
  "Always use the setState function to update state, never modify the variable directly — otherwise React won't know it needs to re-render.",
  "This is a demo response. In the real project, this reply comes live from the Gemini API — connect your own API key in the .env file to get real AI responses.",
];

export default CANNED_REPLIES;
