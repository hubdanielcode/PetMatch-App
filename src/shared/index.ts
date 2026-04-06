/* - UI - */

export { Header } from "./ui/Header";
export { Footer } from "./ui/Footer";
export { Badges } from "./ui/Badges";
export { FeedCard } from "./ui/FeedCard";
export { StarRating } from "./ui/StarRating";

/* - Pages - */

// 1. Main

export { MainPage } from "./pages/main/MainPage";
export { PetFeed } from "./pages/main/PetFeed";
export { PetFilter } from "./pages/main/PetFilter";

// 2. Modal

export { Modal } from "./pages/modal/Modal";
export { Welcome } from "./pages/modal/Welcome";

// 3. Missing

export { Missing } from "./pages/missing/Missing";

// 4. Footer Links

export { About } from "./pages/footer-links/About";
export { HowDoesItWork } from "./pages/footer-links/HowDoesItWork";
export { PrivacyPolicy } from "./pages/footer-links/PrivacyPolicy";
export { TermsOfUse } from "./pages/footer-links/TermsOfUse";

/* - Hooks - */

export { useCreateRating } from "./hooks/useCreateRating";
export { useGetRatings } from "./hooks/useGetRatings";
export { useUpdateRating } from "./hooks/useUpdateRating";
export { useDeleteRating } from "./hooks/useDeleteRating";
