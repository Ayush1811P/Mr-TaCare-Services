import { FinalCta } from '@/components/home/FinalCta';
import { Hero } from '@/components/home/Hero';
import { HowItWorks } from '@/components/home/HowItWorks';
import { SeoContent } from '@/components/home/SeoContent';
import { Services } from '@/components/home/Services';
import { ValueProps } from '@/components/home/ValueProps';
import { JsonLd } from '@/components/seo/JsonLd';
import { defaultServiceArea, siteConfig } from '@/config/site';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { faqSchema } from '@/lib/seo/structuredData';

export const metadata = buildPageMetadata({
  title: `${siteConfig.name} | Find Veterinary Doctors in Noida`,
  description:
    'Find nearby veterinary doctors in Noida and connect with them through WhatsApp with Jivaayu Pet Care. No account needed — answer a few questions and send your appointment request.',
  path: '/',
});

const faqs = [
  {
    question: `How do I find a veterinary doctor near me in ${defaultServiceArea.city}?`,
    answer: `Tap “See a Doctor”, answer a few short questions about your pet, then share your location or type your sector. Jivaayu Pet Care lists veterinary doctors near you with their clinic, services and distance.`,
  },
  {
    question: 'Do I need to create an account?',
    answer:
      'No. There is no sign-up, password or OTP. We only ask for your name and mobile number so the doctor knows who is requesting the appointment.',
  },
  {
    question: 'Does Jivaayu Pet Care confirm my appointment?',
    answer:
      'No. We prepare your appointment request and open WhatsApp so you can send it to the doctor yourself. Only the doctor can confirm availability and the appointment.',
  },
  {
    question: 'Is pet grooming available?',
    answer:
      'Not yet. Grooming is planned as our second service and is marked “Coming Soon” on the site. Veterinary doctor search is live today.',
  },
];

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <ValueProps />
      <HowItWorks />
      <SeoContent />
      <FinalCta />
      <JsonLd data={faqSchema(faqs)} />
    </>
  );
}
