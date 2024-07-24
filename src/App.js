import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ETECreditCards from "./components/CustomerExperience/ETECreditCards"
import HyperPersonalised from "./components/CustomerExperience/HyperPersonalised"
// import OperationalEfficiency from "./components/OperationalEfficiency/OperationalEfficiency"
import RiskAndRegulatoryManagement from "./RiskAndRegulatoryManagement"
import CreditDecisioning from "./CreditDecisioning"
import CampaignAndChannelManagement from "./CampaignAndChannelManagement"
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Hero,
  Chat
} from "./container";
import { CustomerExperience, OperationalEfficiency } from "./components";

function App() {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/customer-experience" element={<CustomerExperience />} />
          <Route path="/operational-efficiency" element={<OperationalEfficiency />} />
          <Route path="/risk-and-regulatory-management" element={<RiskAndRegulatoryManagement />} />
          <Route path="/campaign-and-channel-management" element={<CampaignAndChannelManagement />} />
          <Route path="/credit-decisioning" element={<CreditDecisioning />} />
          <Route path="/customer-experience/ETECreditCards" element={<ETECreditCards />} />
          <Route path="/customer-experience/HyperPersonalised" element={<HyperPersonalised />} />
        </Routes>
        {/* <Services /> */}
      </div>
    </Router>
  );
}

export default App;

// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Testimonials, CaseStudies, Contact, Footer, Hero, Process, Services, Team , CTA, Chat} from './container';
// import { Menu } from './components';

// const App = () => (
//   <div className="container">
//     <Hero />
//     <Services />
//   </div>
// );

// export default App;
