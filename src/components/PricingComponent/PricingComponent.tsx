import React from "react";
import "./PricingComponent.scss";
import MainButtonComponent from "../ButtonComponents/MainButtonComponent";

type PricingComponentProps = {
  handleFreeSubscription?: () => void;
  handlePaidSubscription?: () => void;
  handlePointsSubscription?: () => void;
};

export default function PricingComponent({
  handleFreeSubscription,
  handlePaidSubscription,
  handlePointsSubscription,
}: PricingComponentProps) {
  return (
    <section className="pricing-wrapper">
      <div className="pricing-card">
        <div className="pricing-card__header">
          <span>Watch with ads</span>
        </div>
        <div className="pricing-card__content">
          <div className="pricing-card__title">
            <span>Free</span>
          </div>
          <ul className="pricing-card__list">
            <li>Access to a Vast Library</li>
            <li>Unlimited Streaming </li>
            <li>Multiple Devices</li>
            <li>No Subscription Fee</li>
          </ul>
        </div>
        <MainButtonComponent
          handler={handleFreeSubscription}
          customStyles={"btn--sm"}
        >
          Register
        </MainButtonComponent>
      </div>
      <div className="pricing-card pricing-card--target">
        <div className="pricing-card__header">
          <span>Pay to watch</span>
        </div>
        <div className="pricing-card__content">
          <div className="pricing-card__title">
            <span>499den./month</span>
          </div>
          <ul className="pricing-card__list">
            <li>Access to a Vast Library</li>
            <li>Unlimited Streaming </li>
            <li>Multiple Devices</li>
            <li>Watch without ads</li>
            <li>Offline Viewing</li>
          </ul>
        </div>
        <MainButtonComponent
          handler={handlePaidSubscription}
          customStyles={"btn--sm"}
        >
          Register
        </MainButtonComponent>
      </div>
      <div className="pricing-card">
        <div className="pricing-card__header">
          <span>Engage and receive points</span>
        </div>
        <div className="pricing-card__content">
          <div className="pricing-card__title">
            <span>Watch with points</span>
          </div>
          <ul className="pricing-card__list">
            <li>Earn points when you engage</li>
            <li>Claim rewards with earned points</li>
            <li>No Subscription Fee</li>
          </ul>
        </div>
        <MainButtonComponent
          handler={handlePointsSubscription}
          customStyles={"btn--sm"}
        >
          Register
        </MainButtonComponent>
      </div>
    </section>
  );
}
