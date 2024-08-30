import { CheckCircle, Wrench, Truck, Stethoscope } from "lucide-react";
import styles from "../styles/About.module.css";
import Navbar from "./Navbar.tsx";
import DesignArt from "./designArt.tsx";

export default function AboutPage() {
    return (
        <div className={styles.aboutBackground}>
            <Navbar />
            <div className={styles.container}>
                <header className={styles.header}>
                    <h1 className={styles.title}>About Us</h1>
                    <p className={styles.subtitle}>Your One-Stop Solution for All Services</p>
                </header>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>About Service Management App</h2>
                    <p className={styles.sectionText}>
                        Service Management App is a comprehensive service management application designed to simplify your life.
                        We connect you with skilled professionals for a wide range of services, from home repairs to
                        health check-ups, all at your fingertips.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Key Features</h2>
                    <div className={styles.featuresGrid}>
                        {[
                            { title: "Easy Request Raising", description: "Quickly submit service requests with a few taps" },
                            { title: "Wide Service Network", description: "Access a vast network of verified service providers" },
                            { title: "Real-time Tracking", description: "Track the status of your service requests in real-time" },
                            { title: "Secure Payments", description: "Make safe and hassle-free payments through the app" },
                            { title: "Rating System", description: "Rate and review service providers to ensure quality" },
                            { title: "24/7 Support", description: "Get assistance anytime with our round-the-clock customer support" }
                        ].map((feature, index) => (
                            <div key={index} className={styles.featureCard}>
                                <h3 className={styles.featureTitle}>{feature.title}</h3>
                                <p className={styles.featureDescription}>{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Our Services</h2>
                    <div className={styles.servicesGrid}>
                        {[
                            { title: "Home Repairs", icon: <Wrench className={styles.icon} />, items: ["AC Repair", "Washing Machine Repair", "Plumbing Services", "Electrical Work"] },
                            { title: "Delivery Services", icon: <Truck className={styles.icon} />, items: ["Parcel Pickup", "Parcel Delivery", "Courier Services", "Food Delivery"] },
                            { title: "Health Services", icon: <Stethoscope className={styles.icon} />, items: ["Doctor Consultations", "Lab Test Bookings", "Medicine Delivery", "Health Check-ups"] }
                        ].map((service, index) => (
                            <div key={index} className={styles.serviceCard}>
                                <h3 className={styles.serviceTitle}>
                                    {service.icon}
                                    {service.title}
                                </h3>
                                <ul className={styles.serviceList}>
                                    {service.items.map((item, idx) => (
                                        <li key={idx}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Benefits</h2>
                    <ul className={styles.benefitsList}>
                        {[
                            "Save time and effort in finding reliable service providers",
                            "Get competitive prices for all services",
                            "Enjoy the convenience of doorstep services",
                            "Access a wide range of services through a single platform",
                            "Benefit from a quality-assured service experience"
                        ].map((benefit, index) => (
                            <li key={index} className={styles.benefitItem}>
                                <CheckCircle className={styles.checkIcon} />
                                {benefit}
                            </li>
                        ))}
                    </ul>
                </section>

                <section className={styles.callToAction}>
                    <h2 className={styles.downloadtitle}>Ready to Get Started?</h2>
                    <p className={styles.callToActionText}>
                        Join thousands of satisfied users and experience the ease of ServiceHub today!
                    </p>
                    <a href="#download" className={styles.downloadButton}>
                        Download ServiceHub Now
                    </a>
                </section>
            </div>
            <DesignArt/>
        </div>
    );
}
