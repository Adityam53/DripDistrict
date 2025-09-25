import { useParams } from "react-router-dom";
import Heading from "./Heading";
import { useProductContext } from "../contexts/ProductContext";
import { useEffect } from "react";
const ComapnyInfoMap = () => {
  const { scrollToTop } = useProductContext();
  const { pageName } = useParams();

  useEffect(() => {
    scrollToTop();
  }, [pageName]);
  const contentMap = {
    returns: {
      title: "Return & Exchange Policy",
      body: [
        "You can exchange your order within 7 days from the date of delivery.",
        "Just to let you know, we do not cover your shipping costs back to us.",
        "Orders eligible for exchange are as follows:",
        "- if the garment is unworn",
        "- security tags and labels must be attached",
        "- You can exchange your item for another size or another item entirely",
        "- All exchanges are based on stock availability.",
        "- Cheaper replacement? We refund the difference to your Drip-District wallet.",
        "- If the replacement costs more, you will have to pay the difference.",
        "Generally, exchanges take 7–8 working days to process plus the delivery time to your area.",
        "In case of a return on an order, the amount will be credited back into the customer’s store wallet.",
        "You can contact us at +91 9818136578 or info@Drip-District.com. Our customer support team will get back to you and may ask you for some information.",
      ],
    },

    privacy: {
      title: "Privacy Policy",
      body: [
        "We value the trust you place in us. That’s why we insist upon the highest standards for secure transactions and customer information privacy. Please read the following statement to learn about our information gathering and dissemination practices.",
        "Note: Our privacy policy is subject to change at any time without notice. To make sure you are aware of any changes, please review this policy periodically.",
        "By visiting this Website or mobile application you agree to be bound by the terms and conditions of this Privacy Policy. If you do not agree please do not use or access our Website.",
        "By mere use of the Website, you expressly consent to our use and disclosure of your personal information in accordance with this Privacy Policy. This Privacy Policy is incorporated into and subject to the Terms of Use.",
        "**Collection of Personally Identifiable Information and other Information**",
        "When you use our Website, we collect and store your personal information which is provided by you from time to time. Our primary goal in doing so is to provide you a safe, efficient, smooth and customized experience.",
        "You can browse the Website without telling us who you are. Once you give us your personal information, you are not anonymous to us. We indicate which fields are required and which are optional. You always have the option to not provide information by choosing not to use a particular feature or service.",
        "We may automatically track certain information about you based upon your behavior on our Website. This includes:",
        "- The URL you came from and go to next",
        "- Your browser and IP address",
        "- Data collected via cookies",
        "We may collect your:",
        "- Billing address, credit/debit card number and expiry",
        "- Messages posted on the site, emails sent to us",
        "- Purchase and transaction behavior",
        "- Feedback, support queries, demographic info",
        "We use this to:",
        "- Process orders",
        "- Personalize experience",
        "- Prevent fraud",
        "- Conduct internal research",
        "- Improve services",
        "We may share this data:",
        "- With affiliates, unless you opt out",
        "- To comply with legal obligations",
        "- For enforcement or fraud prevention",
        "- During business transitions (e.g. mergers or acquisitions)",
        "**Security**",
        "We implement stringent security measures. Data is stored on secure servers. When you access or change account info, it happens over a secure connection.",
        "**Your Consent**",
        "By using our site, you consent to this policy and to us using your info as described.",
        "**Contact**",
        "For any privacy-related concerns, reach out to info@Drip-District.com.",
      ],
    },

    contact: {
      title: "Contact Us",
      body: [
        "**Can We Help?**",
        "Our team was handpicked for their understanding of materials, process, and passion for fashion. Whenever you are browsing our site and are in doubt about something, we are always willing to share our deep knowledge and understanding of our makers, their craft, and any technical assistance related to the website.",
        "**Contact Methods**",
        "- Email: info@Drip-District.com",
        "- Phone: +91 9818136578",
        "- Live Chat: Available on our website",
        "Most common questions are covered in our FAQs. If you have specific questions, don’t hesitate to reach out via the above methods.",
      ],
    },

    terms: {
      title: "Terms & Conditions",
      body: [
        "By accessing this website or placing an order, you agree to abide by our terms and conditions. These terms are subject to change at any time.",
        "**Usage**",
        "- Users must be at least 18 years of age or access under parental supervision.",
        "- You must use the site for lawful purposes only.",
        "**Product & Pricing**",
        "- Prices and availability are subject to change without notice.",
        "- We strive for accuracy but do not warrant that product descriptions are error-free.",
        "**Orders**",
        "- We reserve the right to refuse or cancel any order due to stock issues or fraudulent activity.",
        "- All transactions are subject to verification.",
        "**Returns & Exchanges**",
        "- Governed by our Return & Exchange Policy.",
        "**Privacy**",
        "- Governed by our Privacy Policy.",
        "**Contact**",
        "Reach us at info@Drip-District.com for any concerns regarding these terms.",
      ],
    },
  };

  const page = contentMap[pageName];
  if (!page) return <h2 className="text-center py-5">Page not found!</h2>;

  return (
    <>
      <Heading title={page.title} />
      <div className="container py-5" style={{ marginBottom: "75px" }}>
        <div
          className="mx-auto bg-white shadow p-4 p-md-5 rounded-4"
          style={{ maxWidth: "750px" }}
        >
          {page.body.map((item, index) => {
            // Render list items
            if (item.startsWith("- ")) {
              return (
                <li key={index} className="text-secondary ps-2 mb-1">
                  {item.replace("- ", "")}
                </li>
              );
            }

            // Render bold titles like **Section**
            if (item.startsWith("**") && item.endsWith("**")) {
              return (
                <h5
                  key={index}
                  className="mt-4 mb-2 text-dark fw-semibold border-bottom pb-1"
                >
                  {item.replace(/\*\*/g, "")}
                </h5>
              );
            }

            // Render normal paragraph
            return (
              <p
                key={index}
                className="text-secondary mb-3"
                style={{ lineHeight: "1.7" }}
              >
                {item}
              </p>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ComapnyInfoMap;
