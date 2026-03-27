import type { IBlog, IStat, IStep } from '@/types';
import blogImg_01 from '@/assets/images/blog-img-01.jpg';
import blogImg_02 from '@/assets/images/blog-img-02.jpg';
import blogImg_03 from '@/assets/images/blog-img-03.jpg';
import blogImg_04 from '@/assets/images/blog-img-04.jpg';

export const HIRER_STEPS: IStep[] = [
  {
    id: 'create-profile',
    title: 'Create your profile',
    desc: 'Add your name, phone number and event history to get started.',
  },
  {
    id: 'browse-venues',
    title: 'Browse & shortlist venues',
    desc: 'Search by name, location, capacity or event suitability.',
  },
  {
    id: 'submit-application',
    title: 'Submit an application',
    desc: 'Provide event details, expected guests, date and duration.',
  },
  {
    id: 'track-reputation',
    title: 'Track your reputation',
    desc: 'View your hiring history and star ratings from previous vendors.',
  },
];

export const VENDOR_STEPS: IStep[] = [
  {
    id: 'review-applicants',
    title: 'Review applicants',
    desc: "See event requirements and assess each applicant's suitability.",
  },
  {
    id: 'check-credibility',
    title: 'Check hirer credibility',
    desc: 'View hire history, compliance documents and reputation score.',
  },
  {
    id: 'leave-comments',
    title: 'Leave comments & select',
    desc: 'Add notes on candidates and shortlist the best fit for your venue.',
  },
  {
    id: 'approve-booking',
    title: 'Approve & confirm booking',
    desc: 'Finalize the application and manage your venue availability.',
  },
];

export const STATS: IStat[] = [
  {
    value: '2,400+',
    label: 'Venues listed',
  },
  {
    value: '98%',
    label: 'Satisfaction rate',
  },
  {
    value: '150+',
    label: 'Cities covered',
  },
];

export const BLOGS: IBlog[] = [
  {
    id: 1,
    img: blogImg_01,
    tag: 'Tips',
    title: '5 Tips Before Hiring a Venue',
    desc: 'Smart things every event organizer should check before committing to a space.',
    price: 120,
  },
  {
    id: 2,
    img: blogImg_02,
    tag: 'Trends',
    title: 'Top Event Trends in 2026',
    desc: "From hybrid experiences to eco-friendly venues shaping Melbourne's event scene.",
    price: 85,
  },
  {
    id: 3,
    img: blogImg_03,
    tag: 'Story',
    title: 'Booked in Under 24 Hours',
    desc: 'How one hirer found and confirmed their dream venue faster than ever with Venue Vendors.',
    price: 200,
  },
  {
    id: 4,
    img: blogImg_04,
    tag: 'Guide',
    title: 'How to Choose the Right Venue Size',
    desc: 'A practical guide to matching your guest list with the perfect space — without overpaying.',
    price: 150,
  },
];
