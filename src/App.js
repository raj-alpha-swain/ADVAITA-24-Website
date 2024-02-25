import { Route, Routes, useLocation, Outlet, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect } from "react";
import AnimatedCursor from "react-animated-cursor";

import HomePage from "./routes/homePage";
import RegisterPage from "./routes/register";
import NavBar from "./components/navbar";
import Footer from "./components/footer";
import EventsPage from "./routes/events";
import SponsorsPage from "./routes/sponsors";
import MerchPage from "./routes/merch";
import Hackfest from "./events/hackfest";
import Whatsapp from "./events/whatsappChannel";
import { eventsData } from "./routes/eventsData";

// For preloading images start
import events1 from "./assets/bgpn.webp";
import events2 from "./assets/events.webp";
import sponsors1 from "./assets/bgcu.webp";
import sponsors2 from "./assets/contacts.webp";
import downloadIcon from "./assets/download.svg";

import MerchPopup from "./components/merchPopup";

import Marathon from "./events/marathon";
import BloodDonation from "./events/bloodDonation";
import SwigNCode from "./events/swigncode";
import SwitchCoding from "./events/switchCoding";
import AfterMovie from "./events/afterMovie";

// For preloading images end

const PageLayout = ({ children }) => children;

const pageVariants = {
  initial: {
    opacity: 0,
  },
  in: {
    opacity: 1,
  },
  out: {
    opacity: 0,
  },
};

const pageTransition = {
  type: "tween",
  ease: "linear",
  duration: 0.5,
};

const AnimationLayout = () => {
  const { pathname } = useLocation();
  return (
    <PageLayout>
      <motion.div
        key={pathname}
        initial="initial"
        animate="in"
        variants={pageVariants}
        transition={pageTransition}
      >
        <Outlet />
      </motion.div>
    </PageLayout>
  );
};

export default function App() {
  const preloadImgs = () => {
    let imgs = [events1, events2, sponsors1, sponsors2, downloadIcon];
    for (const et of eventsData) for (const e of et.events) imgs.push(e.image);
    imgs.forEach((image) => {
      const newImage = new Image();
      newImage.src = image;
      window[image] = newImage;
    });
  };

  useEffect(() => {
    const onPageLoad = () => {
      setTimeout(() => {
        document.getElementById("loader_block").style.opacity = 0;
        setTimeout(() => {
          document.getElementById("loader_block").style.display = "none";
        }, 310);
        preloadImgs();
      }, 200);
    };
    if (document.readyState === "complete") {
      onPageLoad();
    } else {
      window.addEventListener("load", onPageLoad, false);
      return () => window.removeEventListener("load", onPageLoad);
    }
  }, []);

  return (
    <div className="App">
      <AnimatedCursor
        innerSize={10}
        outerSize={50}
        outerScale={2}
        color="137, 87, 235"
      />
      <NavBar />
      <Routes>
        <Route element={<AnimationLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/sponsors" element={<SponsorsPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/merch" element={<MerchPage />} />
          <Route path="/event/hackfest" element={<Hackfest />} />
          <Route path="/event/marathon" element={<Marathon />} />
          <Route path="/event/bloodDonation" element={<BloodDonation />} />
          <Route path="/event/swig-n-code" element={<SwigNCode />} />
          <Route path="/event/switch-coding" element={<SwitchCoding />} />
          <Route path="/whatsapp" element={<Whatsapp />} />
          <Route path="/aftermovie" element={<AfterMovie />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
      <Footer />
      <MerchPopup/>
    </div>
  );
}
